import React from 'react';
import { Navbar, Footer } from './components';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
import { JobsProvider, PostsProvider, UsersProvider, CurrentUserProvider } from './api/api';
import Dashboard from './pages/Dashboard/Dashboard';
import CreatePost from './components/CreatePost/CreatePost';
import CreateJob from './components/CreateJob/CreateJob';
import EditPost from './components/EditPost/EditPost';
import EditJob from './components/EditJob/EditJob';
import UploadImg from './components/UploadImgGallery/UploadImgGallery';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


// const LoginWithProvider = () => (
//   <UsersProvider>
//     <Login />
//   </UsersProvider>
// )


function App() {
  return (
    <>
      <UsersProvider>
        <CurrentUserProvider>
          <PostsProvider>
            <JobsProvider>
              <Router>
                <GlobalStyle />
                <ScrollToTop />
                <Navbar />
                <ToastContainer />
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
                  <Route path='/admin' element={<Login />} />
                  <Route path='/admin/dashboard' element={<Dashboard />} />
                  <Route path='/admin/dashboard/users' element={<Dashboard />} />
                  <Route path='/admin/dashboard/jobs' element={<Dashboard />} />
                  <Route path='/admin/dashboard/jobs/create' element={<CreateJob />} />
                  <Route path='/admin/dashboard/jobs/edit/:displayId' element={<EditJob />} />
                  <Route path='/admin/dashboard/posts' element={<Dashboard />} />
                  <Route path='/admin/dashboard/posts/create' element={<CreatePost />} />
                  <Route path='/admin/dashboard/posts/edit/:displayId' element={<EditPost />} />
                  <Route path='/admin/dashboard/gallery' element={<Dashboard />} />
                  <Route path='/admin/dashboard/gallery/upload' element={<UploadImg />} />
                </Routes>
                <Footer />
              </Router>
            </JobsProvider>
          </PostsProvider>
        </CurrentUserProvider>
      </UsersProvider>
      <ScrollToTop />    
    </>
  );
}

export default App;
