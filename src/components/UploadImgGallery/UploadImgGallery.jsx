import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../globalStyles';
import { db } from '../../config/firebase';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage';
import Cookies from 'js-cookie';
import { getGallery } from '../../api/api';
import { toast } from 'react-toastify';
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

const JDSubtitle = styled.p`
  margin-bottom: 10px;
  font-size: 20px;
  line-height: 24px;
  color: rgb(0, 94, 141);
  font-weight: bold;
  text-decoration: underline;
  text-transform: uppercase;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 15px 0px;
`;

const CreateHeading = styled.h2`
    margin: 40px 0px;
    font-size: 20px;
    line-height: 1.1;
    color: rgb(0, 94, 141);
    font-style: italic;    
`;

const InputCoverImg = styled.input`
  color: black;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: center;
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

const GalleryTitleElement = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: rgb(0, 94, 141);
  margin-bottom: 30px;

  span {
    font-weight: bold;
    font-size: 24px;
  }
`;

const UploadImgGallery = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [minId, setMinId] = useState();
  const [loading, setLoading] = useState(false);
  const [dataLength, setDataLength] = useState();

  // -- get username from cookie -- //
  useEffect(() => {
    const usernameFromCookie = Cookies.get('username');
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    }
  }, []);

  const getDataLength = async () => {
    try {
      const data = await getGallery();
      setDataLength(data.length);      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    getDataLength();
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


  // get min ID before create
  const findMinUnusedId = async () => {
    const postsSnapshot = await getDocs(collection(db, 'gallery'));
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


  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const storage = getStorage();
      const coverImgInput = document.querySelector('input[type=file]');
      const coverImgFile = coverImgInput.files[0];
      if(!coverImgFile) {
        console.error('Please select an image');
        return;
      }
      
      const storageRef = ref(storage, 'Gallery/' + coverImgFile.name);
    
      // upload to Storage and wait for it to complete
      const uploadTask = uploadBytesResumable(storageRef, coverImgFile);
      const snapshot = await uploadTask;

      // get image URL public
      const downloadURL = await getDownloadURL(snapshot.ref);
      // setCoverImg(downloadURL);
    
      const galleryData = {
        displayId: minId,
        pathImg: downloadURL,
        uploadedAt: serverTimestamp(),
      };
     
      await addDoc(collection(db, 'gallery'), galleryData);
      toast.success('Image is uploaded successfully.', {
        onClose: () => navigate('/admin/dashboard')
      });
      await getGallery();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error adding document: ', error);
      toast.error('Image is uploaded failed. Please try again.', {
        onClose: () => navigate('/admin/dashboard')
      }) 
    }
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
              <CreateHeading>Hi, {username}. You are uploading some images.</CreateHeading>
              <JDContainer>
                <JDSubtitle>Choose your image to upload</JDSubtitle>

                  <DetailContainer>
                    <GalleryTitleElement>
                      The number of photos is not greater than <span>9</span> pictures.
                      So now, the remaining photos you can upload are {isNaN(dataLength) ? <span>Loading...</span> : <span>{9 - dataLength}</span>} picture(s).
                    </GalleryTitleElement>
                    <InputCoverImg
                      type='file'
                      accept='image/*'
                      required
                    />
                  </DetailContainer>


                <ButtonContainer>                  
                  <Button type='submit' disabled={dataLength === 9}>
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

export default UploadImgGallery