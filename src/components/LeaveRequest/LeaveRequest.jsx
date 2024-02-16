import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../globalStyles';
import { db } from '../../config/firebase';
import { updateDoc, setDoc, doc, getDoc } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Spin, DatePicker } from 'antd';
import moment from 'moment';

// const { Option } = Select;
const FatherContainer = styled.div`
  position: relative;
`;

const Form = styled.form``;

const Container = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 800px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 30px;
    padding-left: 30px;
    display: flex;
    justify-content: center;

    @media screen and (max-width: 991px) {
        padding-right: 30px;
        padding-left: 30px;
    }
`;

const InfoColumnJob = styled.div`
    margin-bottom: 15px;
    padding-left: 15px;
    flex: 1;
    /* max-width: 70%; */
    max-width: 100%;
    flex-basis: 50%;

    @media screen and (max-width: 768px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
    }
`;

const TextWrapper = styled.div`
    /* max-width: 540px; */
    padding-top: 0;
    padding-bottom: 60px;

    @media screen and (max-width: 768px) {
        padding-bottom: 65px;
    }
`;

const JDContainer = styled.label`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  height: auto;
  color: #707070;
  border: 3px solid #bdbdbd;
  font-size: 14px;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 30px;
`;

const JDSubtitle = styled.p`
  margin-bottom: 30px;
  font-size: 20px;
  line-height: 24px;
  color: rgb(0, 94, 141);
  font-weight: bold;
  text-decoration: underline;
  text-transform: uppercase;
`;

const JDText = styled.div`
  font-size: 18px;
  line-height: 24px;
  color: rgb(140, 146, 151);
  /* display: flex;
  flex-direction: column; */
`;

const JobTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const JobTitleElement = styled.p`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  line-height: 24px;
  color: rgb(0, 94, 141);
  margin-right: 10px;
  width: 32%;
  align-items: center;
  /* background-color: rgb(0, 94, 141); */
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 30px 0px;
`;

const JobTitleElementDetail = styled.p`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  line-height: 24px;
  color: white;
  margin-right: 10px;
  width: 100%;
  background-color: rgb(0, 94, 141);
  padding: 10px;
  margin: 5px 0px;
`;

const CreateHeading = styled.h2`
    margin: 40px 0px;
    font-size: 20px;
    line-height: 1.1;
    color: rgb(0, 94, 141);
    font-style: italic;    
`;

const Select = styled.select`
  border-color: #d9d9d9;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  padding: 6px 7px;
  color: ${({ value }) => (value === '' ? '#d9d9d9' : 'black')};

  &:hover {
    border-color: #1677ff;
  }

  &:focus {
    outline: none;
    border-color: #1677ff;
    box-shadow: 0 0 0 0.1px #1677ff;
  }
`;

const Option = styled.option`
  font-size: 16px;
`;

const Input = styled.textarea`
  color: ${({ value }) => (value === '' ? '#d9d9d9' : 'black')};
  padding: 6px 7px;
  border-radius: 5px;

  &:hover {
    border-color: #1677ff;
  }

  &:focus {
    outline: none;
    border-color: #1677ff;
    box-shadow: 0 0 0 0.1px #1677ff;
  }
`;

const RemainDays = styled.input`
  color: black;
  padding: 6px 7px;
  border-radius: 5px;
`;


const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const GuideTitle = styled.p`
  color: rgb(140, 146, 151);
  font-size: 14px;
  line-height: 24px;
  font-style: italic;
`;

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const { RangePicker } = DatePicker;

const options = [
  'One day off with pay',
  'One a day off without pay',
  'Rest from day to day',
  'Half day break (morning)',
  'Half day break (afternoon)',
  'Marriage leave (3 days)',
  'Summer vacation (3 days)',
];



const LeaveRequest = () => {
  const navigate = useNavigate();
  const [request, setRequest] = useState('');           //type
  const [dateRange, setDateRange] = useState([]);       // date 
  const [otherReason, setOtherReason] = useState('');   // reason
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [remainingDays, setRemainingDays] = useState();
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  // -- get username from cookie -- //
  // useEffect(() => {
  //   const usernameFromCookie = Cookies.get('username');
  //   if (usernameFromCookie) {
  //     setUsername(usernameFromCookie);
  //   }
  // }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const usernameFromCookie = Cookies.get('username');
      if(usernameFromCookie) {
        const userRef = doc(db, 'request', String(usernameFromCookie));
        const userDoc = await getDoc(userRef);
    
        if(userDoc.exists()) {
          const userData = userDoc.data();
          const maxDays = typeof userData.max_days === 'number' ? userData.max_days : 12;
          setRemainingDays(maxDays);
        }
        setUsername(usernameFromCookie);
      } else {
        toast.error('Username is not provided');
      }
    };
  
    fetchUserData();
  }, []);
  

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'Are you sure you want to leave this page? Any changes will not be saved';
    };

    // add event beforeunload into window before component is reloaded
    window.addEventListener('beforeunload', handleBeforeUnload);

    // remove event when component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);


  const handleChangeRequest = (event) => {
    setRequest(event.target.value);
  }

  const handleDateRangeChange = (dates) => {
    if(!dates) {
      setDateRange([]);
      return;
    }
    const [startDate, endDate] = dates.map(date => date.format('YYYY-MM-DD'));
    setDateRange([startDate, endDate]);


    const numberOfDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (24 * 60 * 60 * 1000) + 1);
    console.log(numberOfDays);

    switch (request) {
      case 'One day off with pay':
      case 'One a day off without pay':
      case 'Half day break (morning)':
      case 'Half day break (afternoon)':
        if (numberOfDays !== 1) {
          toast.error('You must select exactly 1 day for this option.');
          setSubmitDisabled(true);
        } else {
          setSubmitDisabled(false);
        }
        break;
      case 'Rest from day to day':
        if (numberOfDays <= 1) {
          toast.error('You must select more than 1 day for this option.');
          setSubmitDisabled(true);
        } else {
          setSubmitDisabled(false);
        }
        break;
      case 'Marriage leave (3 days)':
        if (numberOfDays !== 3) {
          toast.error('You must select exactly 3 days for this option.');
          setSubmitDisabled(true);
        } else {
          setSubmitDisabled(false);
        }
        break;
      default:
        setSubmitDisabled(false);
    }
  };

  const handleOtherReasonChange = (e) => {
    setOtherReason(e.target.value);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const userRef = doc(db, 'request', String(username)); // tham chiếu đến document của người dùng trong collection 'request'
    const userDoc = await getDoc(userRef);

    try {
      let maxDays = 12;
      let usedDays = 0;
  
      if(userDoc.exists()) {
        const userData = userDoc.data();
        maxDays = typeof userData.max_days === 'number' ? userData.max_days : 12;
        usedDays = typeof userData.used_days === 'number' ? userData.used_days : 0;

        // const remainingDays = maxDays - usedDays;
        // setRemainingDays(remainingDays);
      }

      const startDate = new Date(dateRange[0]);
      const endDate = new Date(dateRange[1]);

      // Tính toán số ngày từ khoảng thời gian
      const isSingleDay = startDate.toDateString() === endDate.toDateString();
      const numberOfDays = isSingleDay ? 1 : Math.ceil((endDate - startDate) / (24 * 60 * 60 * 1000) + 1);

      // maxDays -= numberOfDays;
      // usedDays += numberOfDays;
      
      let datetime;
      let dayValue;
      switch (request) {
        case 'Half day break (morning)':
          datetime = `${startDate.toISOString().split('T')[0]} Shift AM`;
          dayValue = 0.5;
          break;
        case 'Half day break (afternoon)':
          datetime = `${startDate.toISOString().split('T')[0]} Shift PM`;
          dayValue = 0.5;
          break;
        default:
          datetime = isSingleDay ? startDate.toISOString().split('T')[0] : dateRange;
          dayValue  = numberOfDays;
      }
      maxDays -= dayValue;
      usedDays += dayValue;

      const timestamp = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');    // because Firebase not support use serverTimestamp() in array
      const reqData = {
        type: request,
        datetime: datetime,
        // max_days: calculatedRemainingDays,
        // used_days: newUsedDays,
        other_reason: otherReason,
        createdAt: timestamp,
      };
    
      if(!userDoc.exists()) {
        await setDoc(userRef, { max_days: maxDays, used_days: usedDays, requests: [reqData] }, { merge: true });          
      } else {
        const userData = userDoc.data();
        const requests = userData.requests || [];
        requests.push(reqData);
        await updateDoc(userRef, {max_days: maxDays, used_days: usedDays, requests });
      }

      toast.success('Request is created successfully.', {
        onClose: () => navigate('/tracking')
      });
      setLoading(false);
      setRemainingDays(maxDays);
    } catch (error) {
      setLoading(false);
      console.error('Error adding document: ', error);
      toast.error('Request is cretead failed. Please try again.', {
        onClose: () => navigate('/tracking')
      }) 
    }
  };


  const handleBack = () => {
    navigate('/tracking');
  };


  return (
    <FatherContainer>
      <Form onSubmit={handleSubmit}>
        <Container>
          <InfoColumnJob>
            <TextWrapper>
              <CreateHeading>Hi, {username}. You are creating a leave request.</CreateHeading>
              <JDContainer>
                <JDSubtitle>Leave Your Request</JDSubtitle>
                <JDText>
                  <JobTitleContainer>
                    <JobTitleElement>Select your request type</JobTitleElement>
                    <Select value={request} onChange={handleChangeRequest} required>
                      <Option value='' disabled>Select an option</Option>
                      {options.map((option, index) => (
                        <Option key={index} value={option}>{option}</Option>
                      ))}
                    </Select>
                  </JobTitleContainer>

                  <JobTitleContainer>
                    <JobTitleElement>Choose your date</JobTitleElement>
                    <RangePicker required onChange={handleDateRangeChange} />
                  </JobTitleContainer>

                  <JobTitleContainer>
                    <JobTitleElement>Your remaining days of leave</JobTitleElement>
                    <RemainDays
                      type='text'
                      value={remainingDays || ''}
                      disabled
                    />
                  </JobTitleContainer>


                  <DetailContainer>
                    <JobTitleElementDetail>Other Reason</JobTitleElementDetail>
                    <GuideTitle>Write something to describle about your request if needed.</GuideTitle>
                    <Input
                      type='text'
                      value={otherReason}
                      onChange={handleOtherReasonChange}
                    />
                  </DetailContainer>
                </JDText>

                <ButtonContainer>
                  <Button type='submit' disabled={isSubmitDisabled}>
                    {loading ? 'Processing...' : 'Submit'}
                  </Button>
                  {loading && <Spin size='large' />}
                  <Button onClick={handleBack}>Back to Dashboard</Button>
                </ButtonContainer>
              </JDContainer>
            </TextWrapper>
          </InfoColumnJob>

        </Container>
      </Form>
      {loading && <Loading />}
    </FatherContainer>
  )
}

export default LeaveRequest;