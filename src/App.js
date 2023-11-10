import React from 'react';
import { Navbar, Footer } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import Home from './pages/HomePage/Home';
import Services from './pages/Services/Services';
import Recruitment from './pages/Recruitment/Recruitment';
import About from './pages/About/About';
import News from './pages/News/News';
import Gallery from './pages/Gallery/Gallery';
import ScrollToTop from './components/ScrollToTop';
import JobDetail from './pages/JobDetail/JobDetail';
import ServiceDetail from './pages/ServiceDetail/ServiceDetail';
// import NewsDetail from './pages/NewsDetail/NewsDetail';


function App() {
  return (
    <Router>
      <GlobalStyle />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/services/:selectedService' element={<ServiceDetail />} />
        <Route path='/news' element={<News />} />
        {/* <Route path='/news/:selectedNews' element={<NewsDetail />} /> */}
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/about' element={<About />} />
        <Route path='/recruitment' element={<Recruitment />} />
        <Route path='/recruitment/:selectedJobTitle' element={<JobDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
