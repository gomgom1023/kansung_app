import React, { useEffect, useRef, useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HeaderProvider } from "./State/HeaderContext.jsx";
import Layout from "./Layout";
import Welcome from "./Components/Main/Welcome";
import NotFound from "./NotFound";
import Lenis from "@studio-freight/lenis";
import "./App.css";

// 서브페이지
import About01 from "./Pages/About/About01.jsx";
import Notice from "./Pages/Board/Notice/Notice.jsx";
import NoticeView from "./Pages/Board/Notice/NoticeView.jsx";
import News from "./Pages/Board/News/News.jsx";
import SubVisual from "./State/Sub_Visual.jsx";

// Lenis Context 생성
export const LenisContext = createContext();

function App() {
  const [lenisInstance, setLenisInstance] = useState(null);

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      smoothTouch: true,
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    setLenisInstance(lenis); // 초기화된 Lenis 인스턴스를 상태로 설정

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Lenis 해제
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      <HeaderProvider>
        <div id="wrapper">
          <BrowserRouter>
            <Routes>
              {/* 메인페이지 */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Welcome />} />
              </Route>

              {/* 서브페이지 */}
              <Route path="/" element={<Layout />}>
                <Route element={<SubVisual />}>
                  <Route path="/About01" element={<About01 />} />
                  <Route path="/Notice" element={<Notice />} />
                  <Route path="/NoticeView/:id" element={<NoticeView />} />
                  <Route path="/News" element={<News />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </HeaderProvider>
    </LenisContext.Provider>
  );
}

export default App;
