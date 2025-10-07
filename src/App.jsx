import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Menu from "./components/Menu/Menu";

import Home from "./pages/Home/Home";
import Work from "./pages/Work/Work";
import Project_1 from "./pages/Project/Project_1";
import Project_2 from "./pages/Project/Project_2";
import Project_3 from "./pages/Project/Project_3";
import Project_4 from "./pages/Project/Project_4";
import About from "./pages/About/About";
import FAQ from "./pages/FAQ/FAQ";
import Contact from "./pages/Contact/Contact";

import { AnimatePresence } from "framer-motion";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1400);
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Menu />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/work" element={<Work />} />
          <Route path="/sample-project" element={<Project_1 />} />
          <Route path="/hungvuongconcert" element={<Project_2 />} />
          <Route path="/terrene" element={<Project_3 />} />
          <Route path="/negative-film" element={<Project_4 />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
