import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../globalStyles';
import { db } from '../../config/firebase';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage';
import Cookies from 'js-cookie';
import { getJobs } from '../../api/api';


const Form = styled.form``;

const Container = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 1300px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 30px;
    padding-left: 30px;

    @media screen and (max-width: 991px) {
        padding-right: 30px;
        padding-left: 30px;
    }
`;

const InfoColumnJob = styled.div`
    margin-bottom: 15px;
    /* padding-right: 15px; */
    padding-left: 15px;
    flex: 1;
    max-width: 70%;
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
  font-size: 18px;
  line-height: 24px;
  color: rgb(0, 94, 141);
  margin-right: 10px;
  width: 32%;
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

const CreateJobHeading = styled.h2`
    /* margin-bottom: 24px; */
    margin-bottom: 39px;
    font-size: 20px;
    line-height: 1.1;
    color: rgb(0, 94, 141);
    font-style: italic;    
`;

const Input = styled.textarea`
  color: black;
`;

const InputCoverImg = styled.input`
  color: black;
`;



const CreateJob = () => {
  // const locationRoute = useLocation();
  const navigate = useNavigate();
  // const { username } = locationRoute.state;

  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [exp, setExp] = useState('');
  const [expPlus, setExpPlus] = useState('');
  const [treatment, setTreatment] = useState('');
  const [username, setUsername] = useState('');
  const [minId, setMinId] = useState();

  // -- get username from cookie -- //
  useEffect(() => {
    const usernameFromCookie = Cookies.get('username');
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    }
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


  // const [coverImg, setCoverImg] = useState(null);

  // const handleUploadCoverImg = async (event) => {
  //   const storage = getStorage();
  //   try {
  //     const coverImgFile = event.target.files[0];      
  //     const storageRef = ref(storage, 'JobsImagesUpload/' + coverImgFile.name);
  
  //   // upload to Storage and wait for it to complete
  //     const uploadTask = uploadBytesResumable(storageRef, coverImgFile);
  //     const snapshot = await uploadTask;
  
  //     // get image URL public
  //     const downloadURL = await getDownloadURL(snapshot.ref);
  //     console.log('Download URL:', downloadURL);
  //     setCoverImg(downloadURL);
  //   } catch (error) {
  //     console.error('Error in handleUploadCoverImg:', error);
  //   }
  // };


  // get min ID before create
  const findMinUnusedId = async () => {
    const postsSnapshot = await getDocs(collection(db, 'jobs'));
    const usedIds = postsSnapshot.docs.map(doc => doc.data().displayId);
    let displayId = 1;
    while (usedIds.includes(displayId)) {
      displayId++;
    }
    return displayId;
  };
  
  useEffect(() => {
    findMinUnusedId().then(displayId => {
      setMinId(displayId);
    })
  },[]);
  // console.log(minId);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const storage = getStorage();
      const coverImgInput = document.querySelector('input[type=file]');
      const coverImgFile = coverImgInput.files[0];
      if(!coverImgFile) {
        console.error('Please select an image');
        return;
      }
      
      const storageRef = ref(storage, 'JobsImagesUpload/' + coverImgFile.name);
    
      // upload to Storage and wait for it to complete
      const uploadTask = uploadBytesResumable(storageRef, coverImgFile);
      const snapshot = await uploadTask;

      // get image URL public
      const downloadURL = await getDownloadURL(snapshot.ref);
      // setCoverImg(downloadURL);
    
      const jobData = {
        displayId: minId,
        lightText: false,
        jobTitle: title,
        location: location,
        shortDescription: shortDescription,
        salary: salary,
        description: description,
        experience: exp,
        expPlus: expPlus,
        img: downloadURL,
        treatment: treatment,
        createdAt: serverTimestamp(),
      };
     
      await addDoc(collection(db, 'jobs'), jobData);      
      navigate('/admin/dashboard');
      await getJobs();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };


  const handleBack = () => {
    navigate('/admin/dashboard');
  };


  return (
    <>
      <h2>Hi, {username}. You are creating a job.</h2>
      <Form onSubmit={handleSubmit}>
        <Container>
          <InfoColumnJob>
            <TextWrapper>
              <CreateJobHeading>Create Job</CreateJobHeading>
              <JDContainer>
                <JDSubtitle>Job Description</JDSubtitle>
                <JDText>
                  <JobTitleContainer>
                    <JobTitleElement>Job Title:</JobTitleElement>
                    <Input
                      type='text'
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      required
                    />
                  </JobTitleContainer>

                  <JobTitleContainer>
                    <JobTitleElement>Salary:</JobTitleElement>
                    <Input
                      type='text'
                      value={salary}
                      onChange={(event) => setSalary(event.target.value)}
                      required
                    />
                  </JobTitleContainer>

                  <JobTitleContainer>
                    <JobTitleElement>Location:</JobTitleElement>
                    <Input
                      type='text'
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      required
                    />
                  </JobTitleContainer>

                  <DetailContainer>
                    <JobTitleElementDetail>General Description</JobTitleElementDetail>
                    <Input
                      type='text'
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      required
                    />
                  </DetailContainer>

                  <DetailContainer>
                    <JobTitleElementDetail>Short Description</JobTitleElementDetail>
                    <p>nên có dòng in nghiêng mô tả nội dung cần nhập là gì ở tất cả các trường</p>
                    <Input
                      type='text'
                      value={shortDescription}
                      onChange={(event) => setShortDescription(event.target.value)}
                      required
                    />
                  </DetailContainer>

                  <DetailContainer>
                    <JobTitleElementDetail>Experience Requirement</JobTitleElementDetail>
                    <Input
                      type='text'
                      value={exp}
                      onChange={(event) => setExp(event.target.value)}
                      required
                    />
                  </DetailContainer>

                  <DetailContainer>
                    <JobTitleElementDetail>Nice to have</JobTitleElementDetail>
                    <Input
                      type='text'
                      value={expPlus}
                      onChange={(event) => setExpPlus(event.target.value)}
                      required
                    />
                  </DetailContainer>

                  <DetailContainer>
                    <JobTitleElementDetail>Treatment</JobTitleElementDetail>
                    <Input
                      type='text'
                      value={treatment}
                      onChange={(event) => setTreatment(event.target.value)}
                      required
                    />
                  </DetailContainer>

                  <DetailContainer>
                    <JobTitleElementDetail>Upload Cover Image</JobTitleElementDetail>
                    <InputCoverImg
                      type='file'
                      accept='image/*'
                      // onChange={handleUploadCoverImg}
                      required
                    />
                  </DetailContainer>

                </JDText>
                <Button type="submit">Submit</Button>
                <Button onClick={handleBack}>Back to Dashboard</Button>
              </JDContainer>
            </TextWrapper>
          </InfoColumnJob>

        </Container>
      </Form>    
    </>
  )
}

export default CreateJob