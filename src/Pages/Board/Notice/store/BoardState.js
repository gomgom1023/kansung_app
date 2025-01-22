import React from "react";
import { create } from 'zustand';
import axios from 'axios';

const useBoardState = create((set) => ({
    boards: [], // 게시판 데이터
    currentPage: 1, // 현재 페이지
    currentGroup: 1, // 현재 그룹
    boardPerPage: 5, // 페이지당 게시물 수

    setBoards : (newBoards) => set({ boards:newBoards }),
    setCurrentPage : (page) => set({ currentPage:page }),
    setCurrentGroup : (group) => set({ currentGroup:group }),

    fetchBoards: async () => {
        try{
            const response = await axios.get("http://localhost:5000/api/boards");
            set({boards : response.data})
        }catch(error){
            console.error("게시글 조회 실패:", error);
        }
    },

    createBoard: async (newBoard) => {
        try{
            await axios.post("http://localhost:5000/api/boards", newBoard);
            const res = await axios.get("http://localhost:5000/api/boards");
            set({boards : res.data})
        }catch(error){
            alert('게시글 등록 실패')
            console.error("게시글 저장 실패:", error);
        }
    }

})) 
    

export default useBoardState;