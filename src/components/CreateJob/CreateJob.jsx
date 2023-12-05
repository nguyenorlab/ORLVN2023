import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../globalStyles';
import { db } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';



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

const Input = styled.input`
  color: black;
`;


const CreateJob = () => {
  const locationRoute = useLocation();
  const navigate = useNavigate();
  const { username } = locationRoute.state;

  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [exp, setExp] = useState('');
  const [expPlus, setExpPlus] = useState('');
  const [treatment, setTreatment] = useState('');
  const [coverImg, setCoverImg] = useState(null);

  const handleUploadCoverImg = async (event) => {
    const storage = getStorage();
    try {
      const coverImgFile = event.target.files[0];      
      const storageRef = ref(storage, 'JobsImagesUpload/' + coverImgFile.name);
  
      // upload to Storage
      await uploadBytes(storageRef, coverImgFile);
  
      // get image URL public
      const downloadURL = await getDownloadURL(storageRef);
      console.log('Download URL:', downloadURL);
      setCoverImg(downloadURL);
    } catch (error) {
      console.error('Error in handleUploadCoverImg:', error);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Cover Image:', coverImg);
    const jobData = {
      displayId: 1,
      lightText: false,
      jobTitle: title,
      location: location,
      shortDescription: shortDescription,
      salary: salary,
      description: description,
      experience: exp,
      expPlus: expPlus,
      img: coverImg,
      treatment: treatment,
      createdAt: serverTimestamp(),
    };

    try {      
      await addDoc(collection(db, 'jobs'), jobData);      
      navigate('/admin/dashboard', { state: { username: username } });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };


  const handleBack = () => {
    navigate('/admin/dashboard', { state: { username: username }});
  };



  return (
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
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={handleUploadCoverImg}
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
  )
}

export default CreateJob