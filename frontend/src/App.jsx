import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Predictpage from './pages/Predictpage';


function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HeroSection/>} />
        <Route path="/predict" element={<Predictpage/>}/>
      </Routes>
      <Footer/>
    </Router>
    </>

  )
}

export default App
