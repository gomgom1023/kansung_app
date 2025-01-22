import React from "react";
import useBoardState from "./store/BoardState";
import { useLocation, useNavigate, Link } from "react-router-dom";
import './noticeview.css';

const NoticeView = () => {
    const { boards } = useBoardState();
    const location = useLocation()
    const board = location?.state?.board || {};

    console.log("Board data in NoticeView:", board);

    if (!board) {
        return (
          <div>
            <h2>잘못된 접근입니다.</h2>
            <Link to="/Notice">목록으로 돌아가기</Link>
          </div>
        );
      }

    return(
        <div className="sub_wrap">
            <div className="view_title">
                <span>공지</span>
                <h2>{board.title}</h2>
                <ul>
                    <li><span><strong>작성일&nbsp;:&nbsp;</strong>{board.create_at}</span></li>
                    <li><span><strong>조회&nbsp;:&nbsp;</strong>{board.views}</span></li>
                </ul>
            </div>
            <div className="view_contents">
                {board.contents}
            </div>
            <div className="view_bot">
                <ul>
                    <li>
                        <span>이전글<i className="xi-caret-up-min"></i></span>
                        <button>{board.title}</button>
                    </li>
                    <li>
                        <span>다음글<i className="xi-caret-down-min"></i></span>
                        <button>{board.title}</button>
                    </li>
                </ul>
            </div>
            <Link to='/Notice' className="board_btn">목록</Link>
        </div>
    )
}

export default NoticeView;