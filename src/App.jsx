import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import CareerChatbot from './pages/CareerChatbot';
import Roadmap from './pages/Roadmap';
import News from './pages/News';
import Contact from './pages/Contact';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/finder" element={<CareerChatbot />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/trends" element={<News />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<Contact />} />
      </Routes>
      <Footer />
      <ChatWidget />
    </>
  );
}
