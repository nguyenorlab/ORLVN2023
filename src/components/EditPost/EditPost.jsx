import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PostsContext, getPosts } from '../../api/api';
import { db } from '../../config/firebase';
import { collection, doc, updateDoc, getDocs, where, query } from 'firebase/firestore';
import { Button } from '../../globalStyles';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Spin } from 'antd';


const Container = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 900px;
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

const EditHeading = styled.h2`
    margin: 40px 0px;
    font-size: 20px;
    line-height: 1.1;
    color: rgb(0, 94, 141);
    font-style: italic;    
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
  width: ${({ width }) => width ? '32%': 'unset'};
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

const InfoColumnJob = styled.div`
    padding-left: 30px;
    width: 100%;

    @media screen and (max-width: 768px) {
        max-width: 100%;
        padding-left: unset;
    }
`;

const TextWrapper = styled.div`
    padding-top: 0;

    @media screen and (max-width: 768px) {

    }
`;

const Input = styled.textarea`
  width: 100%;
`;

const Select = styled.select``;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: ${({ center }) => center ? 'center' : 'unset'};
  margin: ${({ top }) => top ? '20px 0px' : '0px'};
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width:  100%;
`;

const TypeContainer = styled.div`
  display: flex;
  flex-direction: row;
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

const TextContainer = styled.div`
  margin-top: 10px;
  width: 100%;
`;

// const NewsDetailTitle = styled.p`
//   margin-bottom: 20px;
//   font-size: 24px;
//   line-height: 24px;
//   color: rgb(0, 94, 141);
//   font-weight: bold;
//   text-transform: capitalize;
// `;

// const NewsDetailInfoContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   margin-bottom: 70px;
// `;

// const PostInfo = styled.div`
//   color: rgb(140, 146, 151);
//   font-size: 12px;
//   line-height: 16px;
//   margin-right: 20px;
//   display: flex;
//   align-items: center;
  
//   @media screen and (max-width: 390px) {
//     margin-right: 8px;
//   }
// `;

// const CalendarIcon = styled(BsCalendarCheck)`
//   margin-right: 10px;
// `;

// const CompanyIcon = styled(BsBuildingCheck)`
//   margin-right: 10px;
// `;

// const TechIcon = styled(BsTerminal)`
//   margin-right: 10px;
// `;

// const NewsDetailHeader = styled.h3`
//   margin-bottom: 30px;
//   font-size: 22px;
//   line-height: 24px;
//   color: rgb(0, 94, 141);
//   font-weight: bold;
//   text-transform: capitalize;
// `;

// const NewsDetailText = styled.p`
//   width: 100%;
//   font-size: 17px;
//   color: rgb(140, 146, 151);
//   line-height: 1.5rem;
// `;

// const NewsDetailImg = styled.img`
//   display: block;
//   margin: auto;
//   width: 400px;
//   height: 400px;
//   object-fit: contain;

//   @media screen and (max-width: 768px) {
//     width: 300px;
//     height: 300px;
//   }
// `;


const EditPost = () => {
  const navigate = useNavigate();
  const [allPostData, setAllPostData] = useState(useContext(PostsContext));
  const { displayId } = useParams();
  const [documentId, setDocumentId] = useState(null);
  const [username, setUsername] = useState('');  
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState([]);
  const [editedCategory, setEditedCategory] = useState('');
  const [editedDate, setEditedDate] = useState('');
  const [dataReady, setDataReady] = useState(false);  
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
      const postsCollection = collection(db, 'posts');
      const q = query(postsCollection, where('displayId', '==', Number(displayId))); 
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setDocumentId(doc.id);
      });
    };
    getDocumentId();
  }, [displayId]);
  

  useEffect(() => {
    getPosts().then(data => {
      setAllPostData(data);
      setDataReady(true);
    })
  },[]); 


  // check allPostData and await it from Firebase API
  useEffect(() => {
    if(dataReady) {
      const postData = allPostData.find((post) => post.displayId === Number(displayId));
      setEditedTitle(postData.title);
      setEditedContent(postData.content);
      setEditedCategory(postData.category);
      setEditedDate(postData.date);
    }
  },[allPostData, dataReady, displayId]);

  if(allPostData.length === 0 || !dataReady) {
    return <div>Loading...</div>;
  }

  
  const handleEdit = (sectionIndex, itemIndex, newText, newType) => {
    const newContent = [...editedContent];
    newContent[sectionIndex].data[itemIndex] = {
      ...newContent[sectionIndex].data[itemIndex],
      text: newText,
      type: newType
    }
    setEditedContent(newContent);
  };

  const handleSave = async () => {
    const postRef = doc(db, 'posts', documentId);  
    const updatedPost = {
      title: editedTitle,
      date: editedDate,
      category: editedCategory,
      content: editedContent,
    };
    
    setLoading(true);

    await updateDoc(postRef, updatedPost)
      .then(() => {
        toast.success('Document successfully written!');
        // console.log('Document successfully written!');
        setLoading(false);
        navigate('/admin/dashboard');
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Error writing document: ', error);
        console.error('Error writing document: ', error);
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
            <EditHeading>Hi, {username}. You are editing a post.</EditHeading>
            <JDContainer>
              <JDText>
                <JobTitleContainer>
                  <JobTitleElement width={true.toString()}>Main Title</JobTitleElement>
                  <Input
                    type='text'
                    value={editedTitle}
                    onChange={(event) => setEditedTitle(event.target.value)}
                  />
                </JobTitleContainer>

                <JobTitleContainer>
                  <JobTitleElement width={true.toString()}>Date Time</JobTitleElement>
                  <Input
                    type='text'
                    value={editedDate}
                    onChange={(event) => setEditedDate(event.target.value)}
                  />
                </JobTitleContainer>

                <JobTitleContainer>
                  <JobTitleElement width={true.toString()}>Select Category</JobTitleElement>
                    <Select value={editedCategory} onChange={(event) => setEditedCategory(event.target.value)}>
                      <option value="Company News">Company News</option>
                      <option value="Technology News">Technology News</option>
                    </Select>
                </JobTitleContainer>

                <DetailContainer>
                  <JobTitleElementDetail>Your Content</JobTitleElementDetail>
                  {editedContent.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <JobTitleElementDetail>Section {sectionIndex + 1}</JobTitleElementDetail>
                      {section.data.map((item, itemIndex) => {
                        switch (item.type) {
                          case 'header':
                            return (
                              <SectionContent key={`${sectionIndex}-${itemIndex}`}>
                                <TypeContainer>
                                  <JobTitleElement>Type:</JobTitleElement>
                                  <Select
                                    value={item.type}
                                    onChange={(event) => handleEdit(sectionIndex, itemIndex, item.text, event.target.value)}
                                  >
                                    <option value=''>Please Select</option>
                                    <option value='header'>Header</option>
                                    <option value='paragraph'>Paragraph</option>
                                  </Select>
                                </TypeContainer>

                                <TextContainer>
                                  <JobTitleElement>Text:</JobTitleElement>
                                  <Input
                                    key={`${sectionIndex}-${itemIndex}`}
                                    type='text'
                                    value={item.text}
                                    onChange={(event) => handleEdit(sectionIndex, itemIndex, event.target.value, item.type)}
                                  />
                                </TextContainer>
                              </SectionContent>
                            );
                          case 'paragraph':
                            return (
                              <SectionContent key={`${sectionIndex}-${itemIndex}`}>
                                <TypeContainer>
                                  <JobTitleElement>Type:</JobTitleElement>
                                  <Select
                                    value={item.type}
                                    onChange={(event) => handleEdit(sectionIndex, itemIndex, item.text, event.target.value)}
                                  >
                                    <option value=''>Please Select</option>
                                    <option value='header'>Header</option>
                                    <option value='paragraph'>Paragraph</option>
                                  </Select>
                                </TypeContainer>                              

                                <TextContainer>
                                  <JobTitleElement>Text:</JobTitleElement>
                                  <Input
                                    key={`${sectionIndex}-${itemIndex}`}
                                    type='text'
                                    value={item.text}
                                    onChange={(event) => handleEdit(sectionIndex, itemIndex, event.target.value, item.type)}
                                  />
                                </TextContainer>  
                              </SectionContent>
                            );
                          default:
                            return null;
                        }
                      })}
                    </div>
                  ))}
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
  );
};

export default EditPost;