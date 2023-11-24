import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
// import { v4 as uuidv4 } from 'uuid';
import { db } from '../../config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';



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
  const usedIds = postsSnapshot.docs.map(doc => doc.data().id);
  let id = 1;
  while (usedIds.includes(id)) {
    id++;
  }
  return id;
};
console.log(findMinUnusedId());

const PostForm = ({ onSubmit }) => {
  const location = useLocation();
  const { username } = location.state;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Company');
  const [content, setContent] = useState([{ section: findMinUnusedId(), data: [] }]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = await findMinUnusedId();
    console.log(typeof id);
    const postData = {
      id,
      title,
      category,
      date: new Date().toISOString(),
      content
    };

    try {
      const docRef = await addDoc(collection(db, 'posts'), postData);
      console.log('Document written: ', docRef);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleAddSection = async () => {
    setContent([...content, { section: await findMinUnusedId(), data: [] }]);
  };

  const handleDeleteSection = (sectionId) => {
    setContent(content.filter(section => section.section !== sectionId));
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
          <option value="Tech News">Tech News</option>
        </Select>

        <h3>Your Content</h3>
        {content.map((section, index) => (
          <div key={section.section}>
            <h4>Sub Title {index + 1}</h4>
            <Input
              type="text"
              value={content[index].data.title || ''}
              onChange={(event) => {
                const newData = [...content];
                newData[index].data.title = event.target.value;
                setContent(newData);
              }}
              required
            />
            <h4>Paragraph {index + 1}</h4>
            <Input
              type="text"
              value={content[index].data.paragraph || ''}
              onChange={(event) => {
                const newData = [...content];
                newData[index].data.paragraph = event.target.value;
                setContent(newData);
              }}
              required
            />
            {/* upload image here */}
            {content.length > 1 && (
              <Button type='button' onClick={() => handleDeleteSection(section.section)}>Delete Section</Button>
            )}
          </div>
        ))}
        <Button type="button" onClick={handleAddSection}>Add Section</Button>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default PostForm;