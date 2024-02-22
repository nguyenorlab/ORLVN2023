import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { auth } from '../../config/firebase';


const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledOutlet = styled.div`
  width: -webkit-fill-available;
`;

const SidebarContainer = styled.div`
  margin-bottom: 70px;
`;


const Tracking = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  // -- get username from cookie -- //
  useEffect(() => {
    const usernameFromCookie = Cookies.get('username');
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    } else {
      toast.info('Login session has expired!');
      navigate('/admin');
    }
  }, [navigate]);


  const handleItemClick = async (item) => {
    switch (item) {
      case 'Time Keeping':
        navigate('/tracking/timekeeping');
        break;
      case 'Leave Request':
        navigate('/tracking/leave-request');
        break;
      case 'Logout':
        handleLogout();        
        break;
      default:
        toast.info(`No handler for ${item}`);
    }
  };


  // Logout
  const handleLogout = () => {
    // logout from Firebase
    auth.signOut().then(() => {
      Cookies.remove('username');
      setUsername(null);  
      navigate('/admin');
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };
  


  return (
    <Container>
      <SidebarContainer>
        <Sidebar items={['Time Keeping', 'Leave Request', 'Logout']} username={username} onItemClick={handleItemClick} />
      </SidebarContainer>
      <StyledOutlet>
        <Outlet />
      </StyledOutlet>
    </Container>
  )
}

export default Tracking;