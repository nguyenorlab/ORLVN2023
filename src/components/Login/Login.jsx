import React, { useState, useContext, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { UsersContext, CurrentUserContext } from '../../api/api';
import { Button } from '../../globalStyles';
import Cookies from 'js-cookie';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Form = styled.form`
  width: 350px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  background-color: #fff;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: rgb(0 94 141);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: rgb(0 94 141);
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
`;

const Alert = styled.p`
  padding: 10px;
  background-color: rgb(255 17 0);
  color: white;
  margin-top: 10px;
  border-radius: 5px;
`;

const StyledButton = styled(Button)`
  margin-top: 40px;
`;


const Login = () => {
  const usersData = useContext(UsersContext);
  const { setUsername } = useContext(CurrentUserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [username, setUsername] = useState('');
  const [alert, setAlert] = useState('');
  const [invalid, setInvalid] = useState(null);


  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !email.includes('@')) {
      setAlert('Input valid email');
      return;
    }

    if (!password || password.length < 6) {
      setAlert('Password at least 6 characters');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // console.log(userCredential);
      let foundUsername;
      usersData.forEach(user => {
        if(user.email === userCredential.user.email) {
          foundUsername = user.username;
        }
      });      
      if(foundUsername) {
        setUsername(foundUsername);
        Cookies.set('username', foundUsername, { expires: 1/48 });  // 1/48 of a day = 30 mins
        navigate('/admin/dashboard');
      } else {
        setAlert('User not found');
      }
    } catch(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setInvalid(errorMessage);
          setAlert('User not found');
      }
  };

  useEffect(() => {
    const usernameFromCookie = Cookies.get('username');
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    }
  },[setUsername]);

  // useEffect(() => {
  //   if(username) {
  //     navigate('/admin/dashboard');
  //   }
  // },[navigate, username]);



  return (
    <Container>
      <Title>Welcome to Admin</Title>
      <Form onSubmit={handleLogin}>
        <Label>Email:</Label>
        <Input
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          required
        />
        <Label>Password:</Label>
        <Input
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
        />
        {invalid ? 
          <Alert>{alert}</Alert>
          : ''        
        }
        <StyledButton type='submit'>Log in</StyledButton>
      </Form>
    </Container>
  );
}

export default Login;
