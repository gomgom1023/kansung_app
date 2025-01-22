import React, { useRef, useState } from "react";
import axios from "axios";
import useBoardState from "./BoardState";

const CreateNotice = () => {
    const {createBoard} = useBoardState();
    const [createInput,setCreateInput] = useState({title:'', contents:''})
    const {title,contents} = createInput;
    const titleRef = useRef(null);
    const contentsRef = useRef(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(title === '' || contents === ''){
            alert(`${!title ? '제목' : '내용'}을 입력하세요.`);
            !title ? titleRef.current.focus() : contentsRef.current.focus();
            return;
        }else if(title && contents){
            await createBoard({title,contents})
            setCreateInput({title:'',contents:''})
        }  
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목</label>
                    <input ref={titleRef} name='title' value={title} onChange={(e) => setCreateInput((prev) => ({...prev,title:e.target.value}))} placeholder="제목"/>
                </div>
                <div>
                    <label>내용</label>
                    <input ref={contentsRef} name='contents' value={contents} onChange={(e) => setCreateInput((prev) => ({...prev,contents:e.target.value}))} placeholder="내용"/>
                </div>
                <button type='submit'>글 등록</button>
            </form>
        </div>
    )
}

export default CreateNotice;