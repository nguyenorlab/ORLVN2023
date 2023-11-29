import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import { v4 as uuidv4 } from 'uuid';
import { db } from '../../config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage';
import moment from 'moment';
import { toast } from 'react-toastify';
// import { getPosts } from '../../api/api';


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


const CreatePost = ({ onSubmit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Company News');
  const [usedSectionIds, setUsedSectionIds] = useState([1]);
  const [content, setContent] = useState([{ section: usedSectionIds[0], data: [{ type: '', text: '' }] }]);
  const [imageFile, setImageFile] = useState(null);


  const handleImageUpload = async () => {
    if (imageFile) {
      const { file, sectionId } = imageFile;
      const storage = getStorage();
      const storageRef = ref(storage, `PostsImagesUpload/${minId}-${sectionId}.jpg`); // Điều chỉnh đường dẫn dựa vào cấu trúc bạn đã chọn
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Trạng thái upload (optional)
        },
        (error) => {
          console.error('Error uploading image:', error);
        },
        () => {
          // Upload thành công
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // Lưu đường dẫn của ảnh vào content > section > data > src
            const newData = [...content];
            const sectionIndex = newData.findIndex((section) => section.section === sectionId);
            const dataIndex = newData[sectionIndex].data.findIndex((data) => data.type === 'image');
            newData[sectionIndex].data[dataIndex].src = downloadURL;
            setContent(newData);
  
            // Xóa file ảnh khỏi state
            setImageFile(null);
          });
        }
      );
    }
  };


  const handleImageChange = (event, sectionId) => {
    const newImageFile = event.target.files[0];
    setImageFile({ file: newImageFile, sectionId });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleImageUpload();
    const displayId = minId;
    const postData = {
      displayId,
      title,
      category,
      date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      content
    };
    // save data to Firestore
    try {
      await addDoc(collection(db, 'posts'), postData);
      // console.log('Document written: ', docRef);
      toast.success('Post is created successfully', {
        onClose: () => navigate('/admin/dashboard', { state: { username: username }})
      });
      // await getPosts();

    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('An error occurred while creating the post. Please try again.', {
        onClose: () => navigate('/admin/dashboard', { state: { username: username }})
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
    navigate('/admin/dashboard', { state: { username: username }});
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
                {console.log(data.type)}
                {
                  data.type === 'image' ?
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={(event) => handleImageChange(event, section.section)}
                    />
                    :
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
                }

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