import React, { useState/*, useEffect*/ } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { collection, getDocs/*, addDoc*/ } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Sidebar from '../../components/Sidebar/Sidebar';
import DataTable from '../../components/DataTable/DataTable';
// import PostForm from '../../components/PostForm/PostForm';

// import { allPostData } from '../News/Data';
// import { allRecruitData } from '../Recruitment/Data';



// init posts data
// async function initializeData() {
//   const postsCol = collection(db, 'posts');

//   for (const post of allPostData) {
//     await addDoc(postsCol, post);
//   }
// };

// init recruit data
// async function initializeData() {
//   const recCol = collection(db, 'recruit');

//   for (const rec of allRecruitData) {
//     await addDoc(recCol, rec);
//   }
// };


// get all users from Firestore Database
async function getUsers() {
  const usersCol = collection(db, 'users');
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map(doc => doc.data());
  return userList;
};

// get all users from Firestore Database
async function getPosts() {
  const postsCol = collection(db, 'posts');
  const postSnapshot = await getDocs(postsCol);
  const postList = postSnapshot.docs.map(doc => doc.data());
  return postList;
};

// get all users from Firestore Database
async function getJobs() {
  const jobCol = collection(db, 'recruit');
  const jobSnapshot = await getDocs(jobCol);
  const jobList = jobSnapshot.docs.map(doc => doc.data());
  return jobList;
};



const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state;

  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);

  const itemFields = {
    'Users': {id: 'ID', username: 'Username', email: 'Email'},
    'Jobs': {id: 'ID', jobTitle: 'Job Title', location: 'Location', salary: 'Salary', shortDescription: 'Short Description'},
    'Posts': {id: 'ID', date: 'Date', category: 'Category', title: 'Post Title'}
  };


  const handleItemClick = async (item) => {
    let data;
    switch (item) {
      case 'Users':
        data = await getUsers();
        break;
      case 'Jobs':
        data = await getJobs();
        break;
      case 'Posts':
        data = await getPosts();
        break;
      default:
        console.log(`No handler for ${item}`);
    }
    setData(data);
    setFields(itemFields[item]);
  };


  const handleCreate = () => {
    navigate('/admin/dashboard/create/post', { state: { username: username }});
  };


  const handleEdit = () => {};


  const handleDelete = () => {};



  // // create data at beginning, called only one time
  // useEffect(() => {
  //   async function fetchData() {
  //     await initializeData();
  //   }
  //   fetchData();
  // })



  return (
    <>
      <h2>Welcome, {username}</h2>
      <div style={{ display: 'flex' }}>
        <Sidebar items={['Users', 'Jobs', 'Posts']} onItemClick={handleItemClick}/>

        <main>
          {data.length > 0 && 
            <DataTable data={data} fields={fields} onEdit={handleEdit} onDelete={handleDelete} onCreate={handleCreate}/>
          }
        </main>
      </div>    
    </>
  );
}

export default Dashboard