import React, { useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { allPostData } from '../pages/News/Data';
import { allRecruitData } from '../pages/Recruitment/Data';


// init posts data
async function initializePostData() {
  const postsCol = collection(db, 'posts');

  for (const post of allPostData) {
    await addDoc(postsCol, post);
  }
};

// init jobs data
async function initializeRecruitData() {
  const recCol = collection(db, 'jobs');

  for (const rec of allRecruitData) {
    await addDoc(recCol, rec);
  }
};

const CreateData = () => {

  // create data at beginning, called only one time
  useEffect(() => {
    async function fetchData() {
      await initializePostData();
    }
    fetchData();
  })

  useEffect(() => {
    async function fetchData() {
      await initializeRecruitData();
    }
    fetchData();
  })
  
  
  return (
    <div>createData</div>
  )
}

export default CreateData;
