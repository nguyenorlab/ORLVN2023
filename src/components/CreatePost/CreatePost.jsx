import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import { v4 as uuidv4 } from 'uuid';
import { db } from '../../config/firebase';
import { collection, addDoc, getDocs, updateDoc, getFirestore, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage';
import moment from 'moment';
import { toast } from 'react-toastify';
// import { getPosts } from '../../api/api';
import Cookies from 'js-cookie';



const Form = styled.form`
  /* Add your styles here */
`;

const Input = styled.input`
  /* Add your styles here */
`;

const Select = styled.select`
  /* Add your styles here */
`;

const Button = styled.button`
  /* Add your styles here */
`;

const findMinUnusedId = async () => {
  const postsSnapshot = await getDocs(collection(db, 'posts'));
  const usedIds = postsSnapshot.docs.map(doc => doc.data().displayId);
  let displayId = 1;
  while (usedIds.includes(displayId)) {
    displayId++;
  }
  return displayId;
};

let minId;
findMinUnusedId().then(displayId => {
  minId = displayId;
  // console.log(minId);
})


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

  
  const handleImageUpload = async (imageFile, postId, sectionId, dataIndex) => {   
    const storage = getStorage();
    const storageRef = ref(storage, `PostsImagesUpload/${Date.now()}_${Math.random()}.jpg`);
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
  // console.log(tempImages);


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
  
    try {
      if (thumbnailImage) {
        const storage = getStorage();
        const thumbImageRef = ref(storage, `PostsThumbnailImage/${Date.now()}_${Math.random()}.jpg`);
        await uploadBytesResumable(thumbImageRef, thumbnailImage);
        const downloadURL = await getDownloadURL(thumbImageRef);
        postData.image = downloadURL;
      }

      const postRef = await addDoc(collection(db, 'posts'), postData);
      toast.success('Post is created successfully', {
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
    } catch (error) {
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
    <>
      <h2>Hi, {username}. You are creating a post.</h2>
      <Form onSubmit={handleSubmit}>

        <h3>Main Title</h3>
        <Input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <h3>Select Category</h3>
        <Select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="Company News">Company News</option>
          <option value="Technology News">Technology News</option>
        </Select>

        <h3>Upload Thumbnail Image</h3>
        <Input
          type='file'
          accept='image/*'
          onChange={handleUploadThumb}
          required
        />

        <h3>Your Content</h3>
        {content.map((section, index) => (
          <div key={index}>
            <h4>Section {index + 1}</h4>
            {section.data.map((data, dataIndex) => (              
              <div key={`${section.section}-${dataIndex}`}>
                <label>Type:</label>
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

                <label>{data.type === 'image' ? 'Image Upload:' : 'Text'}</label>
                {
                  data.type === 'image' ? (
                    <Input
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
                )}

                <Button type='button' onClick={() => {
                  const newData = [...content];
                  newData[index].data.splice(dataIndex, 1);
                  setContent(newData);
                }}>Delete Data</Button>
              </div>
            ))}

            <Button 
              type='button' 
              onClick={() => {
              const newData = [...content];
              newData[index].data.push({ type: '', text: '' });
              setContent(newData);
            }}>Add Data</Button>

            {/* upload thumbnail image here */}

            {content.length > 1 && (
              <Button type='button' onClick={() => handleDeleteSection(section.section)}>Delete Section</Button>
            )}
          </div>
        ))}
        <Button type="button" onClick={handleAddSection}>Add Section</Button>
        <Button type="submit">Submit</Button>
        <Button onClick={handleBack}>Back to Dashboard</Button>
      </Form>
    </>
  );
};

export default CreatePost;