import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useLayoutEffect, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeaderContext } from "../../State/HeaderContext.jsx"; // Context import
import "./welcome.css";
import { useLanguageStore } from "../../State/LanguageContext.js";
import useBoardState from "../../Pages/Board/Notice/store/BoardState.js";

gsap.registerPlugin(ScrollTrigger);

const Welcome = () => {
  const { language } = useLanguageStore();
  const { setHeaderClass } = useContext(HeaderContext); // Context 값 사용
  const visualRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const circleRef = useRef(null); // rotating-circle-container 참조
  const location = useLocation();
  const { boards, fetchBoards } = useBoardState();

  useEffect(()=>{
    fetchBoards();
  },[fetchBoards])

  useLayoutEffect(() => {
    //section01 애니메이션
    const visualContainer = visualRef.current;
    const videoElement = videoRef.current;
    const textElement = textRef.current;
    const circleContainer = circleRef.current;

    gsap.set(videoElement, {
      bottom: "0", // 하단 고정
      left: "calc(50% - (30% / 2))", // 수평 중앙 기준
      width: "30%", // 초기 너비
      height: "calc(50vh)", // 초기 높이
      borderRadius: "300px 300px 0 0", // 둥근 모서리
      transformOrigin: "center bottom", // 중앙 하단 기준
    });

    // rotating-circle-container를 GSAP 타임라인에 추가
    gsap.timeline({
      scrollTrigger: {
        trigger: visualContainer,
        start: "top top", // 첫 번째 섹션 시작 지점
        end: "bottom+=1000", // 첫 번째 섹션 끝 지점
        scrub: true, // 스크롤과 동기화
        markers: true, // 디버깅용 마커 (배포 시 제거 가능)
      },
    }).to(circleContainer, {
      opacity: 0, // 서서히 사라지게 설정
      duration: 1, // 지속 시간
      ease: "power2.out", // 부드러운 감속
    });

    // 비디오 애니메이션 타임라인
    gsap.timeline({
      scrollTrigger: {
        trigger: visualContainer,
        start: "top",
        end: "bottom+=200% top",
        scrub: true,
        pin: true,
        markers: true, // 디버깅 활성화
      },
    })
    .to(
      videoElement,
      {delay:1}
    )
    .to(
      videoElement,
      {
        width: "100%",
        height: "100%",
        top: "0",
        left:"0",
        borderRadius: "0",
        duration: 3,
        scrub: 1.5,
      },
      "<"
    )
    .to(
      videoElement,
      {scale: 1,delay:3, duration: 9}
    );

    // 텍스트 애니메이션 타임라인
    gsap.timeline({
      scrollTrigger: {
        trigger: visualContainer,
        start: "top top+=60",
        end: "bottom+=100",
        scrub: 1.5,
        markers: true, // 디버깅 활성화
      },
    }).fromTo(
      textElement,
      { opacity: 1, y: 0 },
      { opacity: 0, y: -70, duration: 1, ease: "power3.inOut" }
    );


  // Section02 애니메이션
  const section02Container = document.getElementById("section02");
  const textBox = section02Container?.querySelector(".text_box");
  const imgBox = section02Container?.querySelector(".section02_img");
  const sub_TextBox = section02Container?.querySelector(".section02_sub_text");

  if (!section02Container || !textBox) {
    console.error("Some refs are missing in Section02!");
    return;
  }

  // 초기 스타일 설정
  gsap.set(textBox, {
    opacity: 0, // 완전히 투명
    scale: 10, // 초기 크기: 브라우저를 벗어나는 크기
    top:'50%',
    left: "50%",
    transform:'translate(-50%,-50%)',
    transformOrigin: "center center", // 중심 기준
  });
  gsap.set(imgBox, {
    opacity:0,
    bottom:'-20%',
    left: "50%",
    transform: "translateX(-50%)", /* 수평 중앙 기준 */
    width: "280px",
    height: "340px",
    transformOrigin: "center bottom", // 중심 기준
  });
  gsap.set(sub_TextBox, {
    opacity: 0, // 완전히 투명
    bottom:'-20%',
    left:'50%',
    transform:'translateX(-50%)',
    transformOrigin: "bottom", // 중심 기준
  });

  const textBoxTimeLine = gsap.timeline({
    scrollTrigger: {
      trigger: section02Container,
      start: "center center", // 애니메이션 시작 시점
      end: "bottom+=2000",
      scrub: 1.5,
      pin: true, // 두 번째 섹션 고정
      markers: true, // 디버깅용 마커 활성화
    },
  })
  textBoxTimeLine
  .to(textBox, {
    opacity: 1, // 서서히 나타남
    scale: 1, // 정해진 크기로 줄어듬
    scrub: 1.5,
    duration: 10000,
    ease: "power3.out",
  },">+=2")
  .to(textBox, {
    y: -280, // textBox의 위치만 변경
    delay: 1,
    scrub: 1.5,
    duration: 10000,
    ease: "power3.out",
  })
  .to(imgBox, {
    opacity: 1, // imgBox의 속성만 변경
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    scrub: 1.5,
    duration: 10000,
    ease: "power3.out",
  },'<')
  .to(sub_TextBox, {
    opacity: 1, // 텍스트가 서서히 나타남
    bottom: '23%', // 텍스트가 아래에서 위로 올라옴
    scrub: 1.5,
    duration: 10000,
    ease: "power3.out",
  },'<')
  .to(imgBox, {
    delay:10,
    scrub: 1.5,
    duration: 1000, // 약간의 시간 (스크롤 딜레이처럼 보임)
  })
  .to(imgBox, {
    width:'66%',
    scrub: 1.5,
    duration: 10000,
    delay:10,
    ease: "power3.out",
  },">+=2")
  .to(imgBox, {
    delay:10000,
    scrub: 1.5,
    duration: 10000,
  });
  

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [location.pathname]);

  
  document.addEventListener("DOMContentLoaded", () => {
    const notice = document.querySelector("#notice");
    const news = document.querySelector("#news");
  
    console.log("Notice position:", window.getComputedStyle(notice).position);
    console.log("News position:", window.getComputedStyle(news).position);
  
    if (window.getComputedStyle(notice).position !== "sticky") {
      console.error("Sticky not applied to #notice.");
    }
  
    if (window.getComputedStyle(news).position !== "sticky") {
      console.error("Sticky not applied to #news.");
    }
  });

  return (
    <>
      <div className="rotating-circle-container" ref={circleRef}>
        <svg width="160" height="160" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="rotating-circle" preserveAspectRatio="xMidYMid meet">
          {/* 원형 경로 */}
          <defs>
            <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"/>
          </defs>

          {/* 텍스트 경로 */}
          <text fill="#111111" fontSize="12" fontWeight="medium">
            <textPath href="#circlePath" startOffset="0" className="font-eng_Jomolhari">
            SCROLL DOWN&nbsp;&nbsp;&nbsp;SCROLL DOWN&nbsp;&nbsp;&nbsp;SCROLL DOWN&nbsp;&nbsp;&nbsp;SCROLL DOWN&nbsp;&nbsp;&nbsp;SCROLL DOWN
            </textPath>
          </text>
        </svg>
      </div>

      {/* Section 01 */}
      <section id="section01" className="section_box" ref={visualRef}>
        <video ref={videoRef} className="background-video" src="kansong_video.mp4" muted autoPlay loop playsInline></video>
        <div className="text-overlay" ref={textRef}>
          <h1>Daegu Kansong Art Museum</h1>
          <p>
            {language === 'kor' 
              ? '1938년 보화각에서 비롯된 문화보국의 첫 걸음'
              : 'The first step of cultural patriotism starting in 1938 at Bohwagak'
            }
          </p>
        </div>
      </section>

      {/* Section 02 */}
      <section id="section02" className="section_box text-center py-28">
        <div className="text_box">
          <p className="text-xl font-eulyoo">
            {language === 'kor' ? '미래로 이어가는 문화보국 정신' : 'The spirit of cultural patriotism that continues into the future'}
          </p>
          <h2 className="text-7xl mt-2 font-eulyoo font-semibold">
            {language === 'kor' ? '대구 간송미술관' : 'Daegu Kansong Museum of Art'}
          </h2>
        </div>
        <div className="section02_img fixed-background"></div>
        <p className="section02_sub_text font-normal text-lg">
          {language === 'kor'
          ? (
            <>
             대구간송미술관이 <span className="font-semibold">‘국채보상운동’</span>의 시작점이자, <span className="font-semibold">‘한국 근대미술의 발상지’</span>인 대구에서 새롭게 출발합니다.
            </>
            
          ) : (
            <>
              The Daegu Kansong Art Museum embarks on a new journey in Daegu, the birthplace of the <span className="font-semibold">‘Korean modern art movement and the starting point’</span> of <span className="font-semibold">‘the National Debt Repayment Movement’</span>.
            </>
          )} 
        </p>
      </section>

      {/* Section 03 */}
      <section id="section03" className="section_box my-32">
        <div className="section03_text">
          <h2 className="mb-16 font-eng_Jomolhari text-7xl text-transparent text-stroke">
            Our Treasured Artifacts<br />Await You
          </h2>
          <Link
            to="#/"
            className="text-lg transition-all duration-1000 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              alert("준비중입니다.");
            }}
          >
            {language === 'kor' ? '전시품 더보기' : 'Show More'}
          </Link>
        </div>
        <div className="bg_object">
          <img src="/public/bg_object_01.png" alt="Object 1" />
          <img src="/public/bg_object_02.png" alt="Object 2" />
          <img src="/public/bg_object_03.png" alt="Object 3" />
        </div>
      </section>

      {/* Section 04 */}
      <section id="section04" className="section_box">
        {/* 공지사항 */}
        <div id='notice' className="media_box">
          <div className="media_box_title">
            <div>
              <h2 className="text-6xl font-eulyoo font-semibold">
                {language === 'kor' ? '공지사항' : 'Notice'}
              </h2>
              <p className="mt-3 font-eulyoo text-lg">
                {language === 'kor' ? '간송미술관의 소식을 빠르게 알려드릴께요.' : 'We will promptly deliver the latest news about the Kansong Art Museum.'}
              </p>
            </div>
            <Link to="/Notice" className="text-lg">
              {language === 'kor' ? '간송소식 더보기' : 'View More'} 
            </Link>
          </div>
          <div className="media_box_contents">
            <table>
                  <tbody>
                      {boards.map((board) => (
                          <tr key={board.id}>
                              <td><Link to=''><span className="title_icon">{language === 'kor' ? '공지' : 'notice'}</span>{board.title}</Link></td>
                              <td>{board.create_at}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
        </div>

        {/* 보도자료 */}
        <div id='news' className="media_box">
          <div className="media_box_title">
            <div>
              <h2 className="text-6xl font-eulyoo font-semibold">
                {language === 'kor' ? '간송뉴스' : 'News'}
              </h2>
              <p className="mt-3 font-eulyoo text-lg">
                {language === 'kor' ? '간송미술관의 소식을 빠르게 알려드릴께요.' : 'We will promptly deliver the latest news about the Kansong Art Museum.'}
              </p>
            </div>
            
            <Link to="#/" className="text-lg" onClick={(e) => {e.preventDefault(); alert("준비중입니다.");}}>
              {language === 'kor' ? '간송뉴스 더보기' : 'View More'}
            </Link>
          </div>
          <div className="media_box_contents">
            <table>
              <tbody>
                  {boards.map((board) => (
                      <tr key={board.id}>
                          <td><Link to=''><span className="title_icon">{language === 'kor' ? '뉴스' : 'news'}</span>{board.title}</Link></td>
                          <td>{board.create_at}</td>
                      </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      <div id="section05" className="section_box p-12">
          <h2 className="font-eng_Jomolhari text-6xl">Kansong Art Museum of Daegu</h2>
          <div className="section05_text_box mt-56">
            <ul className="flex justify-between font-light">
              <li>
                <p className="info_title text-lg mb-[10px]">
                  {language === 'kor' ? '오시는 길' : 'Directions'} 
                </p>
                <p>
                  <Link to="#/" onClick={(e) => {e.preventDefault(); alert("준비중입니다.");}}>
                    {language === 'kor' ? '대구광역시 수성구 미술관로 70' : '70, Misulgwan-ro, Suseong-gu, Daegu, South Korea'}
                  </Link>
                </p>
              </li>
              <li>
                <p className="info_title text-lg mb-[10px]">
                  {language === 'kor' ? '관람시간' : 'Opening Hours'}
                </p>
                <ul>
                  <li>
                    <Link to="#/" className="flex gap-2" onClick={(e) => {e.preventDefault(); alert("준비중입니다.");}}>
                      {language === 'kor'
                      ? '실내 : 오전 10시 ~ 오후 19시, 실외 : 오전 10시 ~ 오후 18시'
                      : 'Indoor : 10:00 AM ~ 7:00 PM, Outdoor : 10:00 AM ~ 6:00 PM'}
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

      {/* Section 05
      <section id="section05" className="section_box p-12">
        <h2 className="font-eng_Jomolhari text-6xl">Kansong Art Museum of Daegu</h2>
        <div className="section05_text_box mt-56">
          <ul className="flex justify-between font-light">
            <li>
              <p className="info_title text-lg mb-[10px]">
                {language === 'kor' ? '오시는 길' : 'Directions'} 
              </p>
              <p>
                <Link to="#/" onClick={(e) => {e.preventDefault(); alert("준비중입니다.");}}>
                  {language === 'kor' ? '대구광역시 수성구 미술관로 70' : '70, Misulgwan-ro, Suseong-gu, Daegu, South Korea'}
                </Link>
              </p>
            </li>
            <li>
              <p className="info_title text-lg mb-[10px]">
                {language === 'kor' ? '관람시간' : 'Opening Hours'}
              </p>
              <ul>
                <li>
                  <Link to="#/" className="flex gap-2" onClick={(e) => {e.preventDefault(); alert("준비중입니다.");}}>
                    {language === 'kor'
                    ? '실내 : 오전 10시 ~ 오후 19시, 실외 : 오전 10시 ~ 오후 18시'
                    : 'Indoor : 10:00 AM ~ 7:00 PM, Outdoor : 10:00 AM ~ 6:00 PM'}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section> */}
    </>
    
  );
};

export default Welcome;
