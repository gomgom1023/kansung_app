import { Link } from "react-router-dom"

export default function NotFound(){
    return(
        <section>
            <h2>페이지를 찾을 수 없습니다.</h2>
            <Link to='/'>메인페이지로 돌아가기</Link>
        </section>
    )
}