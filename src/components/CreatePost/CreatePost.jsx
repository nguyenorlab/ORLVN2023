import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { db } from '../../config/firebase';
import { collection, addDoc, getDocs, updateDoc, getFirestore, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage';
import moment from 'moment';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Button } from '../../globalStyles';
import { Spin } from 'antd';


const FatherContainer = styled.div`
  position: relative;
`;

const Form = styled.form``;

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

const CreateHeading = styled.h2`
    margin: 40px 0px;
    font-size: 20px;
    line-height: 1.1;
    color: rgb(0, 94, 141);
    font-style: italic;    
`;

const Input = styled.textarea`
  color: black;
`;

const InputImg = styled.input`

`;

const Select = styled.select`
  /* Add your styles here */
`;

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
`;

const TypeContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const DeleteSectionButton = styled.div`
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  background: ${({ red }) => red ? 'red' : 'rgb(0, 94, 141)'}
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



const CreatePost = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const { username } = location.state;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Company News');
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [usedSectionIds, setUsedSectionIds] = useState([1]);
  const [content, setContent] = useState([{ section: usedSectionIds[0], data: [{ type: '', text: '' }] }]);
  const [tempImages, setTempImages] = useState({});
  const [username, setUsername] = useState('');
  const [minId, setMinId] = useState();
  const [loading, setLoading] = useState(false);

  // -- get username from cookie -- //
  useEffect(() => {
    const usernameFromCookie = Cookies.get('username');
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    }
  }, []);

  // reload browser
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


  // get min ID before create
  const findMinUnusedId = async () => {
    const postsSnapshot = await getDocs(collection(db, 'posts'));
    const usedIds = postsSnapshot.docs.map(doc => doc.data().displayId);
    let displayId = 1;
    while (usedIds.includes(displayId)) {
      displayId++;
    }
    return displayId;
  };
  
  findMinUnusedId().then(displayId => {
    setMinId(displayId);
  })
  

  const handleImageUpload = async (imageFile, postId, sectionId, dataIndex) => {   
    const storage = getStorage();
    const storageRef = ref(storage, `PostsImagesUpload/${moment(Date.now()).format('YYYY-MM-DD_HH-mm-ss-SSS')}_Post_ID_${minId}.jpg`);
    const metadata = {contentType: 'image/jpeg',}
    const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);
  
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', 
        (snapshot) => {}, 
        (error) => {
          reject(error);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve({
              postId,
              sectionId,
              dataIndex,
              downloadURL
            });
          });
        }
      );
    });
  };


  const handleImageChange = (event, sectionId, dataIndex) => {
    try {
      const newImageFile = event.target.files[0];
      // console.log('image changed:', event.target.files[0]);
      // setImageFile({ file: newImageFile, sectionId });
      setTempImages(prevTempImages => ({
        ...prevTempImages,
        [`${sectionId}-${dataIndex}`]: newImageFile,
        // sectionId,
        // dataIndex
      }));
    } catch (error) {
      console.error('Error in handleImageChange:', error);
    }
  };


  const handleUploadThumb = async (event) => {
    try {
      const thumbImageFile = event.target.files[0];
      setThumbnailImage(thumbImageFile);
    } catch (error) {
      console.error('Error in handleUploadThumb:', error);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const displayId = minId;
    let postData = {
      displayId,
      title,
      category,
      date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      image: '',
      content
    };

    setLoading(true);

    try {
      if (thumbnailImage) {
        const storage = getStorage();
        const thumbImageRef = ref(storage, `PostsThumbnailImage/${moment(Date.now()).format('YYYY-MM-DD_HH-mm-ss-SSS')}_Post_ID_${minId}.jpg`);
        await uploadBytesResumable(thumbImageRef, thumbnailImage);
        const downloadURL = await getDownloadURL(thumbImageRef);
        postData.image = downloadURL;
      }

      const postRef = await addDoc(collection(db, 'posts'), postData);
      toast.success('Post is created successfully.', {
        onClose: () => navigate('/admin/dashboard')
      });
  
      const uploadPromises = [];
  
      for (let i = 0; i < postData.content.length; i++) {
        const section = postData.content[i];
        for (let j = 0; j < section.data.length; j++) {
          const data = section.data[j];
          if (data.type === 'image') {
            const imageFile = tempImages[`${section.section}-${j}`]; // Get the corresponding image file
            if (imageFile) {
              const uploadPromise = handleImageUpload(imageFile, postRef.id, section.section, j);
              uploadPromises.push(uploadPromise);
            }
          }
        }
      }
  
      const uploadResults = await Promise.all(uploadPromises);
  
      for (const result of uploadResults) {
        const db = getFirestore();
        const postRef = doc(db, 'posts', result.postId);
        const postSnap = await getDoc(postRef);
  
        if (postSnap.exists()) {
          const postData = postSnap.data();
          const sectionIndex = postData.content.findIndex(section => section.section === result.sectionId);

          if (!Array.isArray(postData.content[sectionIndex].data[result.dataIndex].text)) {
            postData.content[sectionIndex].data[result.dataIndex].text = [postData.content[sectionIndex].data[result.dataIndex].text];
          }
          if (postData.content[sectionIndex].data[result.dataIndex].text[0] === '') {
            postData.content[sectionIndex].data[result.dataIndex].text.shift();
          }
          // if (postData.content[result.sectionIndex].data[result.dataIndex].text[0] === '') {
          //   postData.content[result.sectionIndex].data[result.dataIndex].text.shift();
          // }
          postData.content[sectionIndex].data[result.dataIndex].text.push(result.downloadURL);
          await updateDoc(postRef, postData);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error adding document: ', error);
      toast.error('An error occurred while creating the post. Please try again.', {
        onClose: () => navigate('/admin/dashboard')
      });
    }
  };
  

  const handleAddSection = async () => {
    let newSectionId = 1;
    while (usedSectionIds.includes(newSectionId)) {
      newSectionId++;
    }
    setContent([...content, { section: newSectionId, data: [{ type: '', text: '' }] }]);
    setUsedSectionIds([...usedSectionIds, newSectionId]);
  };


  const handleDeleteSection = (displayId) => {
    setContent(content.filter(section => section.section !== displayId));
    setUsedSectionIds(usedSectionIds.filter(sectionId => sectionId !== displayId));
  };

  const handleBack = () => {
    navigate('/admin/dashboard');
  };


  return (
    <FatherContainer>
      <Form onSubmit={handleSubmit}>
        <Container>
          <InfoColumnJob>
            <TextWrapper>
              <CreateHeading>Hi, {username}. You are creating a post.</CreateHeading>
              <JDContainer>
                <JDText>
                  <JobTitleContainer>
                    <JobTitleElement width={true.toString()}>Main Title</JobTitleElement>
                    <Input
                      type="text"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      required
                    />
                  </JobTitleContainer>

                  <JobTitleContainer>
                    <JobTitleElement width={true.toString()}>Select Category</JobTitleElement>
                    <Select value={category} onChange={(event) => setCategory(event.target.value)}>
                      <option value="Company News">Company News</option>
                      <option value="Technology News">Technology News</option>
                    </Select>
                  </JobTitleContainer>

                  <JobTitleContainer>
                    <JobTitleElement width={true.toString()}>Upload Thumbnail Image</JobTitleElement>
                    <InputImg
                      type='file'
                      accept='image/*'
                      onChange={handleUploadThumb}
                      required
                    />
                  </JobTitleContainer>

                  <DetailContainer>
                    <JobTitleElementDetail>Your Content</JobTitleElementDetail>
                    {content.map((section, index) => (
                      <div key={index}>
                        <JobTitleElementDetail>Section {index + 1}</JobTitleElementDetail>
                        {section.data.map((data, dataIndex) => (              
                          <SectionContent key={`${section.section}-${dataIndex}`}>
                            <TypeContainer>
                              <JobTitleElement>Type:</JobTitleElement>
                              <Select
                                value={data.type}
                                onChange={(event) => {
                                  const newData = [...content];
                                  newData[index].data[dataIndex].type = event.target.value;
                                  setContent(newData);  
                                }}
                                required
                              >
                                <option value=''>Please Select</option>
                                <option value='header'>Header</option>
                                <option value='paragraph'>Paragraph</option>
                                <option value='image'>Image</option>
                              </Select>
                            </TypeContainer>

                            <label>{data.type === 'image' ? <JobTitleElement>Image Upload:</JobTitleElement> : <JobTitleElement>Text:</JobTitleElement>}</label>
                            {
                              data.type === 'image' ? (
                                <InputImg
                                  type='file'
                                  accept='image/*'
                                  onChange={(event) => handleImageChange(event, section.section, dataIndex)}
                                />
                              ) : (
                                <>
                                  <Input
                                    type='text'                      
                                    value={data.text}
                                    onChange={(event) => {
                                      const newData = [...content];
                                      newData[index].data[dataIndex].text = event.target.value;
                                      setContent(newData);
                                    }}
                                    required
                                  />
                                  <div></div>   {/* this div tag to fix controlled to uncontrolled */}                     
                                </>
                              )
                            }
                            <ButtonContainer top>
                              <StyledButton red type='button' onClick={() => {
                                const newData = [...content];
                                newData[index].data.splice(dataIndex, 1);
                                setContent(newData);
                              }}>Delete Data</StyledButton>

                              <Button 
                                type='button' 
                                onClick={() => {
                                const newData = [...content];
                                newData[index].data.push({ type: '', text: '' });
                                setContent(newData);
                              }}>Add Data</Button>
                            </ButtonContainer>
                            
                          </SectionContent>
                        ))}

                        
                        <DeleteSectionButton>
                          {content.length > 1 && (
                            <StyledButton red type='button' onClick={() => handleDeleteSection(section.section)}>Delete This Section</StyledButton>
                          )}
                        </DeleteSectionButton>
                      </div>
                    ))}
                    <Button type="button" onClick={handleAddSection}>Add Section</Button>
                  </DetailContainer>
                </JDText>

                <ButtonContainer center>
                  <Button type='submit' disabled={loading}>
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
  );
};

export default CreatePost;