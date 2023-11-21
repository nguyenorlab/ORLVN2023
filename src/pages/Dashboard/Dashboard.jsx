import React, { useState/*, useEffect*/ } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { collection, getDocs/*, addDoc*/ } from 'firebase/firestore';
import { db } from '../../config/firebase';
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
  const { username } = location.state;
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [jobs, setJobs] = useState([]);

  const handleUsersClick = async () => {
    const userList = await getUsers();
    setUsers(userList);
  };

  const handlePostsClick = async () => {
    const postList = await getPosts();
    setPosts(postList);
  };

  const handleJobsClick = async () => {
    const jobList = await getJobs();
    setJobs(jobList);
  };

  // // create data at beginning, called only one time
  // useEffect(() => {
  //   async function fetchData() {
  //     await initializeData();
  //   }
  //   fetchData();
  // })

  console.log(username);
  console.log(posts);
  console.log(jobs);

  return (
    <>
      <h2>Welcome, {username}</h2>
      <div style={{ display: 'flex' }}>
        <Sidebar>
          <Menu iconShape="square">
            <MenuItem onClick={handleUsersClick}>Users</MenuItem>
            <MenuItem onClick={handleJobsClick}>Jobs</MenuItem>
            <MenuItem onClick={handlePostsClick}>Posts</MenuItem>
          </Menu>
        </Sidebar>


        <main>
          <h3>{users.map((user) => user.username)}</h3>
        </main>
      </div>    
    </>
  );
}

export default Dashboard