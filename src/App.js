import React from 'react';
import { Navbar, Footer } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import Home from './pages/HomePage/Home';
import Services from './pages/Services/Services';
import Recruitment from './pages/Recruitment/Recruitment';
import About from './pages/About/About';
import News from './pages/News/News';
import ScrollToTop from './components/ScrollToTop';
import JobDetail from './pages/JobDetail/JobDetail';
import ServiceDetail from './pages/ServiceDetail/ServiceDetail';
import Login from './components/Login/Login';
import { JobsProvider, PostsProvider, UsersProvider } from './api/api';
import Dashboard from './pages/Dashboard/Dashboard';
import PostForm from './components/PostForm/PostForm';



const LoginWithProvider = () => (
  <UsersProvider>
    <Login />
  </UsersProvider>
)


function App() {
  return (
    <PostsProvider>
      <JobsProvider>
        <Router>
          <GlobalStyle />
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/services' element={<Services />} />
            <Route path='/services/:selectedService' element={<ServiceDetail />} />
            <Route path='/news' element={<News />} />
            <Route path='/news/:category' element={<News />} />
            <Route path='/news/:categoty/:id/:title' element={<News />} />
            <Route path='/recruitment' element={<Recruitment />} />
            <Route path='/recruitment/:selectedJobTitle' element={<JobDetail />} />
            <Route path='/admin' element={<LoginWithProvider />} />
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/dashboard/create/post' element={<PostForm />} />
          </Routes>
          <Footer />
        </Router>
      </JobsProvider>
    </PostsProvider>
  );
}

export default App;
