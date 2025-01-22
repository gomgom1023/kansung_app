import { Link, useLocation, useNavigate } from "react-router-dom"
import React, { useEffect, useRef, useState, useContext } from "react"
import { HeaderContext } from "../../State/HeaderContext"; // Context import
import { useLanguageStore } from "../../State/LanguageContext";
import { resources } from '../../State/Menu';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import headerLogo_dark from '/logo_header_dark.png'
import './header.css'

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const {language, toggleLanguage} = useLanguageStore();
  const { headerClass, setHeaderClass } = useContext(HeaderContext); // Context 값 사용
  const [languageMenuVisible, setLanguageMenuVisible] = useState(false);
  const [langHover, setLangHover] = useState(false);
  const [menuToggle,setMenuToggle] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();
  const visualRef = useRef(null);
  const lastScrollY = useRef(0);
  const navigate = useNavigate(); // useNavigate 가져오기

  useEffect(() => {
    const isMainPage = location.pathname === "/";
  
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
  
      if (isMainPage) {
        // 메인 페이지 로직
        const visualContainer = visualRef.current;
        if (!visualContainer) return;
  
        const rect = visualContainer.getBoundingClientRect();
        const visualStart = rect.top + currentScrollY; // 첫 번째 섹션 시작
        const visualTriggerPoint = visualStart + 30; // hidden 활성화 트리거 지점
        const gsapProgress = ScrollTrigger.getAll()[0]?.progress || 0; // GSAP 진행률
  
        // 최상단 초기화 상태
        if (currentScrollY === 0) {
          setTimeout(() => setHeaderClass(""), 10); // 초기화 상태
          lastScrollY.current = currentScrollY;
          return;
        }
  
        // 첫 번째 섹션에서 hidden 활성화
        if (gsapProgress < 0.3) {
          if (currentScrollY >= visualTriggerPoint) {
            setTimeout(() => setHeaderClass("hidden"), 10); // 숨김
          } else if (currentScrollY < visualTriggerPoint) {
            setTimeout(() => setHeaderClass(""), 10); // 초기화
          }
        } else {
          // 첫 번째 섹션 이후 일반적인 스크롤 동작
          const isScrollingDown = currentScrollY > lastScrollY.current;
          setTimeout(() => setHeaderClass(isScrollingDown ? "hidden" : "show"), 10);
        }
  
        lastScrollY.current = currentScrollY; // 마지막 스크롤 위치 업데이트
      } else {
        // 서브 페이지 로직
        if (currentScrollY > 100) {
          setHeaderClass("sub_class_white"); // 스크롤 100 이상이면 white 클래스 추가
        } else {
          setHeaderClass("sub_class"); // 초기 sub_class 복구
        }
      }
    };
  
    // 스크롤 이벤트 등록
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      // 스크롤 이벤트 제거
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname, setHeaderClass]);

  const toggleLanguageMenu = () => {
    setLanguageMenuVisible((prev) => {
      const newState = !prev;
      setLangHover(newState)
      return newState
    })
  }

  const handleChangeLanguage = (lang) => {
    toggleLanguage(lang);
    setLanguageMenuVisible(false);
    setLangHover(false);
  };

  const openMenu = () => {
    setIsAnimating(true); // 애니메이션 시작
    setMenuToggle(true); // 열림 상태
  };

  const closeMenu = (path) => {
    console.log("closeMenu called, path:", path); // 디버깅 메시지
    setMenuToggle(false); // 메뉴 닫기
    setIsAnimating(true); // 애니메이션 시작
  
    const hamburgerOpen = document.getElementById("hamburger_open");
  
    // 트랜지션 완료 후 이동
    const handleTransitionEnd = (e) => {
      if (e.propertyName === "opacity") { // opacity 트랜지션만 감지
        console.log("Transition ended, navigating to:", path); // 디버깅 메시지
        hamburgerOpen.removeEventListener("transitionend", handleTransitionEnd);
        navigate(path); // 페이지 이동
        setIsAnimating(false); // 애니메이션 상태 초기화
      }
    };
  
    // transitionend 이벤트 등록
    hamburgerOpen.addEventListener("transitionend", handleTransitionEnd);
  
    // 안전망: transitionend가 실행되지 않을 경우 대비
    setTimeout(() => {
      if (isAnimating) {
        console.log("Fallback: Transition timeout, navigating to:", path); // 디버깅 메시지
        hamburgerOpen.removeEventListener("transitionend", handleTransitionEnd);
        navigate(path);
        setIsAnimating(false);
      }
    }, 1000); // CSS 트랜지션 시간 (0.3s)에 안전 여유시간 포함
  };

  const onAnimationEnd = () => {
    if (!menuToggle) {
      setIsAnimating(false); // 닫기 애니메이션 완료 후 상태 초기화
    }
  };

    return (
      <header id="header">
          <div ref={visualRef} className={`header_bar flex justify-between items-center py-4 px-6 border-b border-[#111111] ${headerClass}`}>
            <h1>
              <Link to="/" className="block">
                <img src={headerLogo_dark} alt="대구 간송미술관" className="w-[50px] md:w-15 headerLogo_dark" />
              </Link>
            </h1>
            <nav id='nav' className="hidden md:block max-w-3xl w-full">
              <ul className="header_menu flex gap-8 flex-row flex-nowrap justify-between w-full text-lg font-medium text-[#111111]">
                {resources.map(({ href, text, text_eng, subMenu }) => (
                  <li key={href}>
                    <Link to={href} className="">
                      {language === 'kor' ? text : text_eng}
                    </Link>
                    {subMenu && (
                      <ul className="sub_menu">
                        {subMenu.map(({sub_href,sub_text, sub_text_eng}) => (
                          <li key={sub_href}>
                            <Link to={sub_href} className="block w-full px-6 py-3 text-sm">
                              {language === 'kor' ? sub_text : sub_text_eng}</Link>
                          </li>
                        ))}
                      </ul>
                      )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-9">
              <div className="choice_lang">
                <button onClick={toggleLanguageMenu} className="text-lg line- flex flex-row items-center gap-[6px]">
                  <span className='text-base'>{language.toUpperCase()}</span>
                  <img className={`max-w-[17px] w-full transition-transform duration-300 transform ${langHover ? 'rotate-180' : 'rotate-0'}`} src="/lan_icon.png" alt="Language" />
                </button>
                <ul className={`choice-lang-menu ${langHover ? 'active' : ''} text-sm`}>
                  <li><button onClick={() => handleChangeLanguage('kor')}>KOR</button></li>
                  <li><button onClick={() => handleChangeLanguage('eng')}>ENG</button></li>
                </ul>
                {/* {languageMenuVisible && (
                  <ul className={langHover ? 'active' : ''}>
                    <li><button onClick={() => handleChangeLanguage('kor')}>KOR</button></li>
                    <li><button onClick={() => handleChangeLanguage('eng')}>ENG</button></li>
                  </ul>
                )} */}
              </div>
              
              <button onClick={openMenu} className="hamburger-menu">
                <ul>
                  <li><span></span></li>
                  <li><span></span></li>
                  <li><span></span></li>
                </ul>
              </button>
            </div>
          </div>
          
          <div id="hamburger_open" className={`${menuToggle ? "open" : "close"} ${isAnimating ? "animating" : ""}`} onAnimationEnd={onAnimationEnd}>
            <div className="segment"></div>
            <div className="segment"></div>
            <div className="segment"></div>
            <div className="segment"></div>
            <div className="segment"></div>
            <div className="close_btn font-eulyoo text-white flex justify-end mt-[1em] mx-[1em]">
              <button onClick={closeMenu} className="hover:underline p-2 text-lg">
                {language === 'kor' ? '닫기' : 'Close'}
              </button>
            </div>
            <div className="max-w-[1300px] my-3 mx-auto px-10">
              <h2 className="hamburger_title text-white text-[6rem] text-center font-eng_Jomolhari">Kansong Museum of Daegu</h2>
            </div>
            <div className="menu_list max-w-[1300px] w-full mx-auto px-10">
              <ul className="w-full">
                {resources.map(({href,text, text_eng, subMenu})=>(
                  <li key={href} className="flex justify-between items-center px-3 py-10">
                    <Link className="text-4xl font-eulyoo" to={href} onClick={(e) => {e.preventDefault(); closeMenu(href)}}>
                      {language === 'kor' ? text : text_eng}
                    </Link>
                    {subMenu && (
                      <ul className="open_sub_menu flex items-center">
                        {subMenu.map(({sub_href,sub_text, sub_text_eng}) => (
                          <li key={sub_href}>
                            <Link className="text-lg" to={sub_href} onClick={(e) => {e.preventDefault(); closeMenu(href)}}>
                              {language === 'kor' ? sub_text : sub_text_eng}
                            </Link>
                            <span>&#47;</span>
                          </li>
                        ))}
                    </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>
    )
}
