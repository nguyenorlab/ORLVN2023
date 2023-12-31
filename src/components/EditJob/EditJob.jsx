import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getJobs } from '../../api/api';
import { Button } from '../../globalStyles';
import { db } from '../../config/firebase';
import { collection, doc, updateDoc, getDocs, where, query } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { Spin } from 'antd';


const Container = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 1300px;
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
  margin: 40px 0px;
  font-size: 20px;
  line-height: 1.1;
  color: rgb(0, 94, 141);
  font-style: italic;    
`;

const Input = styled.textarea`
  color: black;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
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



const EditJob = () => {
  // const allJobsData = useContext(JobsContext);
  const [allJobsData, setAllJobsData] = useState([]);
  const { displayId } = useParams();
  const navigate = useNavigate();

  const [editedJobTitle, setEditedJobTitle] = useState('');
  const [editedSalary, setEditedSalary] = useState('');
  const [editedLocation, setEditedLocation] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedShortDescription, setEditedShortDescription] = useState('');
  const [editedExp, setEditedExp] = useState('');
  const [editedExpPlus, setEditedExpPlus] = useState('');
  const [editedTreatment, setEditedTreatment] = useState('');
  const [documentId, setDocumentId] = useState(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  // -- get username from cookie -- //
  useEffect(() => {
    const usernameFromCookie = Cookies.get('username');
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    }
  }, []);

  // -- get document ID from displayId -- //
  useEffect(() => {
    const getDocumentId = async () => {
      const jobsCollection = collection(db, 'jobs');
      const q = query(jobsCollection, where('displayId', '==', Number(displayId))); 
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setDocumentId(doc.id);
      });
    };

    getDocumentId();
  }, [displayId]);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsList = await getJobs();
      setAllJobsData(jobsList);
    };
    fetchJobs();
  }, []);

  // check allJobsData and wait it from Firebase API
  useEffect(() => {
    if(allJobsData.length > 0) {
      const jobData = allJobsData.find((post) => post.displayId === Number(displayId));
      setEditedJobTitle(jobData.jobTitle);
      setEditedSalary(jobData.salary);
      setEditedLocation(jobData.location);
      setEditedDescription(jobData.description);
      setEditedShortDescription(jobData.shortDescription);
      setEditedExp(jobData.experience);
      setEditedExpPlus(jobData.expPlus);
      setEditedTreatment(jobData.treatment);
    }
  },[allJobsData, displayId]);

  if(allJobsData.length === 0) {
    return <Spin />;
  }

  const handleSave = async () => {
    const jobRef = doc(db, 'jobs', documentId);
    const updatedJob = {
      jobTitle: editedJobTitle,
      salary: editedSalary,
      location: editedLocation,
      description: editedDescription,
      shortDescription: editedShortDescription,
      experience: editedExp,
      expPlus: editedExpPlus,
      treatment: editedTreatment
    };
    
    setLoading(true);

    await updateDoc(jobRef, updatedJob)
      .then(() => {
        console.log('Update job successfully');
        navigate('/admin/dashboard');
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Update fail', error);
      });
  };


  const handleCancel = () => {
    navigate('/admin/dashboard');
  };

  return (
    <>
      <Container>
        <InfoColumnJob>
          <TextWrapper>
            <CreateJobHeading>Hi, {username}. You are editing a job</CreateJobHeading>
            <JDContainer>
              <JDSubtitle>Job Description</JDSubtitle>
              <JDText>
                <JobTitleContainer>
                  <JobTitleElement>Job Title:</JobTitleElement>
                  <Input
                    type='text'
                    value={editedJobTitle}
                    onChange={(event) => setEditedJobTitle(event.target.value)}                  
                  />
                </JobTitleContainer>

                <JobTitleContainer>
                  <JobTitleElement>Salary:</JobTitleElement>
                  <Input
                    type='text'
                    value={editedSalary}
                    onChange={(event) => setEditedSalary(event.target.value)}                  
                  />
                </JobTitleContainer>

                <JobTitleContainer>
                  <JobTitleElement>Location:</JobTitleElement>
                  <Input
                    type='text'
                    value={editedLocation}
                    onChange={(event) => setEditedLocation(event.target.value)}                  
                  />
                </JobTitleContainer>

                <DetailContainer>
                  <JobTitleElementDetail>General Description</JobTitleElementDetail>
                  <GuideTitle>General description of the project and work performed for this position || プロジェクトとこのポジションで実行された作業の一般的な説明</GuideTitle>
                  <Input
                    type='text'
                    value={editedDescription}
                    onChange={(event) => setEditedDescription(event.target.value)}                  
                  />
                </DetailContainer>

                <DetailContainer>
                  <JobTitleElementDetail>Short Description</JobTitleElementDetail>
                  <GuideTitle>3 essential skills || 3つの必須スキル</GuideTitle>
                  <Input
                    type='text'
                    value={editedShortDescription}
                    onChange={(event) => setEditedShortDescription(event.target.value)}                  
                  />
                </DetailContainer>

                <DetailContainer>
                  <JobTitleElementDetail>Experience Requirement</JobTitleElementDetail>
                  <GuideTitle>Description of required experience for the job || 仕事に必要な経験の説明</GuideTitle>
                  <Input
                    type='text'
                    value={editedExp}
                    onChange={(event) => setEditedExp(event.target.value)}                  
                  />
                </DetailContainer>

                <DetailContainer>
                  <JobTitleElementDetail>Nice to have</JobTitleElementDetail>
                  <GuideTitle>Plus point || あった方がよい</GuideTitle>
                  <Input
                    type='text'
                    value={editedExpPlus}
                    onChange={(event) => setEditedExpPlus(event.target.value)}                  
                  />
                </DetailContainer>

                <DetailContainer>
                  <JobTitleElementDetail>Benefit</JobTitleElementDetail>
                  <GuideTitle>Working Time, Holidays, Bonus... || 勤務時間とか、有給休暇とか、ボーナスとか...</GuideTitle>
                  <Input
                    type='text'
                    value={editedTreatment}
                    onChange={(event) => setEditedTreatment(event.target.value)}                  
                  />
                </DetailContainer>              
              </JDText>

              <ButtonContainer>
                <Button onClick={handleSave}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                {loading && <Spin size='large' />}
                <Button onClick={handleCancel}>Cancel</Button>
              </ButtonContainer>

            </JDContainer>
          </TextWrapper>
        </InfoColumnJob>
      </Container>
      {loading && <Loading />}
    </>
  )
}

export default EditJob;