import { ReactNode, useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";

const ScrollToTop = (props: { children: ReactNode }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  return <>{props.children}</>;
};

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}
