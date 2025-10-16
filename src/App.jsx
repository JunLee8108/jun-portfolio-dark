import Home from "./pages/Home";
import DiaryFriend from "./pages/diaryfriend/DiaryFriend";
import DiaryFriendPrivacy from "./pages/diaryfriend/DiaryFriendPrivacy";
import DiaryFriendSupport from "./pages/diaryfriend/DiaryFriendSupport";
import Navbar from "./components/navbar";
import { BrowserRouter, Routes, Route } from "react-router";
import { useState, useEffect } from "react";

// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "work", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <BrowserRouter>
      <Navbar activeSection={activeSection} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diaryfriend" element={<DiaryFriend />} />
        <Route path="/diaryfriend/privacy" element={<DiaryFriendPrivacy />} />
        <Route path="/diaryfriend/support" element={<DiaryFriendSupport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
