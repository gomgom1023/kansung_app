import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import useBoardState from '../store/BoardState'
import searchIcon from '../../../../images/search_icon.png'
import Pagenation from './Pagenation'

const BoardList = () => {
    const { boards, fetchBoards } = useBoardState();
    const searchRef = useRef(null);
    const navigate = useNavigate();

    useEffect(()=>{
        fetchBoards();
    },[fetchBoards])

    const handleSearch = () => {}

    const handleCheck = (e) => {
        e.preventDefault();
    }

    const titleClick = (board) => {
        console.log("Navigating to NoticeView:", board); // 데이터 확인

        navigate(`/NoticeView/${board.id}`,{
            state : { board : board }
        })
    }

    return(
        <div className="sub_wrap notice">
            <div className="notice_top_contents">
                <div className="tab_box">
                    <ul>
                        <li><button className="active">전체</button></li>
                        <li className="text-gray-200">&#124;</li>
                        <li><button>공지사항</button></li>
                        <li className="text-gray-200">&#124;</li>
                        <li><button>보도자료</button></li>
                    </ul>
                </div>
                <div className="search_wrap">
                    <form action="handleSearch">
                        <div>
                            <div className="search_select">
                                <p>제목</p>
                                <img/>
                            </div>
                            <ul className="search_list">
                                <li><button>제목</button></li>
                                <li><button>내용</button></li>
                            </ul>
                        </div>
                        <label htmlFor="">
                            <input ref={searchRef} type="text" name='search' placeholder="검색어를 입력하세요"/>
                        </label>
                        <button type='submit'><img src={searchIcon} alt='Search'/></button>
                    </form>
                </div>
            </div>
            
            <table>
                <thead className="text-white">
                    <tr className="text-base">
                        <th>순서</th>
                        <th>제목</th>
                        <th>작성일</th>
                        <th>조회</th>
                    </tr>
                </thead>
                <tbody>
                    {boards.map((board) => (
                        <tr key={board.id}>
                            <td>{board.id}</td>
                            <td className="text_left"><button onClick={()=>{titleClick(board)}}>{board.title}</button></td>
                            <td>{board.create_at}</td>
                            <td>{board.views}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={handleCheck} className="px-6 py-3 bg-orange-800 text-white">관리자 글 등록</button>
            
            <Pagenation/>
        </div>
    )
}

export default BoardList;