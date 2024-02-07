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
`;

const StyledOutlet = styled.div`
  width: -webkit-fill-available;
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
      <Sidebar items={['Time Keeping', 'Leave Request', 'Logout']} username={username} onItemClick={handleItemClick} />
      <StyledOutlet>
        <Outlet />
      </StyledOutlet>
    </Container>
  )
}

export default Tracking;