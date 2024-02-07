import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../globalStyles';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import { db } from '../../config/firebase';
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore"; 



const Wrapper = styled.div`
  display: flex;
  height: 100vh;

  @media screen and (max-width: 820px) {
    display: unset;
    height: unset;
  }
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  text-align: center;

  @media screen and (max-width: 820px) {
    padding: 30px;

  }
`;

const Heading = styled.h1`
  margin-bottom: 20px;
  color: rgb(0 94 141);
  text-transform: uppercase;
  font-size: 40px;
`;

const Time = styled.div`
  color: rgb(0 94 141);
  font-size: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 30px 30px;
  gap: 100px;

  @media screen and (max-width: 768px) {
    gap: 5px;
  }
`;

const StyledButton = styled(Button)`
  width: 170px;
  height: 60px;
  text-transform: uppercase;
  font-size: 23px;
`;

const Iframe = styled.iframe`
  width: 600px;
  height: 450px;
  border: none;
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 350px;
  }
`;



const TimeKeeping = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const predefinedLocation = { latitude: 21.040859748285232, longitude: 105.79019343313993 };
  const [checkinTime, setCheckinTime] = useState(null);
  const [checkoutTime, setCheckoutTime] = useState(null);

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


  useEffect(() => {
    const tick = () => {
      setCurrentTime(new Date());
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(tick);
    };
  }, []);  

  const formattedTime = currentTime.toLocaleTimeString();


  useEffect(() => {
    // Sử dụng Geolocation API để lấy toạ độ
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);


  const calculateDistance = (location1, location2) => {
    // Hàm tính khoảng cách giữa hai điểm trên bản đồ
    const R = 6371; // Bán kính trái đất (đơn vị km)
    const dLat = (location2.latitude - location1.latitude) * (Math.PI / 180);
    const dLon = (location2.longitude - location1.longitude) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((location1.latitude * Math.PI) / 180) *
        Math.cos((location2.latitude * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance; // Khoảng cách giữa hai điểm (đơn vị km)
  };


  const isWithin500m = () => {
    // Kiểm tra xem vị trí hiện tại có nằm trong phạm vi 500m không
    if (currentLocation) {
      const distance = calculateDistance(currentLocation, predefinedLocation);
      return distance <= 0.5; // 0.5 km = 500m
    }
    return false;
  };
  
  
  const handleTimekeeping = async (username, checkinTime, checkoutTime) => {
    const userRef = doc(db, 'timekeeping', String(username)); // tham chiếu đến document của người dùng trong collection 'timekeeping'
    const userDoc = await getDoc(userRef);
    const userData = userDoc.exists() ? userDoc.data() : { datetime: [] };
    const currentDate = new Date().toISOString().split('T')[0];   // current date with YYYY-MM-DD format
    const currentDateIndex = userData?.datetime?.findIndex(entry => entry.date === currentDate);

    if (currentDateIndex !== -1) {
      // If current date exist, update checkin checkout to current date
      userData.datetime[currentDateIndex].checkin = checkinTime;
      userData.datetime[currentDateIndex].checkout = checkoutTime;
    } else {
      // If current date has not exist, add it to datetime array
      const newEntry = {
        date: currentDate,
        checkin: checkinTime,
        checkout: checkoutTime,
      };
      userData.datetime = userData.datetime || [];
      userData.datetime.push(newEntry);
    }

    // If user document has not exist, create new
    if (!userDoc.exists()) {
      await setDoc(userRef, userData);
    } else {
      // If user document has existed, update document
      await updateDoc(userRef, userData);
    }    
    // const newEntry = {
    //   date: new Date().toISOString().split('T')[0], // lấy ngày hiện tại theo định dạng YYYY-MM-DD
    //   checkin: checkinTime,
    //   checkout: checkoutTime
    // };  

    // await setDoc(userRef, {
    //   datetime: arrayUnion(newEntry)
    // }) //, { merge: true }); // sử dụng option { merge: true } để cập nhật mảng datetime mà không ghi đè lên dữ liệu hiện có
  };
  
  const handleCheckIn = async () => {
    const currentTime = new Date().toLocaleTimeString();
    setCheckinTime(currentTime);
    try {
      await handleTimekeeping(username, currentTime, checkoutTime);
      toast.success('Checkin Successfully !');
    } catch (error) {
      toast.error('Uh Oh..Checkin Error !!!')
    }
  };

  const handleCheckOut = async () => {
    const currentTime = new Date().toLocaleTimeString();
    setCheckoutTime(currentTime);
    try {
      await handleTimekeeping(username, checkinTime, currentTime);
      toast.success('Checkout Successfully !');      
    } catch (error) {
      toast.error('Uh Oh..Checkout Error !!!')      
    }
  };


  return (
    <>
      <ToastContainer />
      <Wrapper>
        <Container>
          <Heading>timekeeping system</Heading>
          <Time>{formattedTime}</Time>
          <ButtonContainer>
            <StyledButton disabled={!isWithin500m()} onClick={handleCheckIn}>Check In</StyledButton>
            <StyledButton disabled={!isWithin500m()} onClick={handleCheckOut}>Check Out</StyledButton>
          </ButtonContainer>
          <Iframe
            title='Google map'
            loading='lazy'
            src={`https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`}
          ></Iframe>
        </Container>
      </Wrapper>
    </>
  );
};

export default TimeKeeping;
