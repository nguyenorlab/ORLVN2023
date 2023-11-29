import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { collection, getDocs/*, addDoc*/, doc, where, query, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Sidebar from '../../components/Sidebar/Sidebar';
import DataTable from '../../components/DataTable/DataTable';
import { getUsers, getJobs, getPosts } from '../../api/api';

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




const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state;

  // const { setPostToEdit } = useContext(EditPostContext);

  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);

  const itemFields = {
    'Users': {id: 'ID', username: 'Username', email: 'Email'},
    'Jobs': {id: 'ID', jobTitle: 'Job Title', location: 'Location', salary: 'Salary', shortDescription: 'Short Description'},
    'Posts': {displayId: 'ID', date: 'Date', category: 'Category', title: 'Post Title'}
  };


  const handleItemClick = async (item) => {
    let data;
    switch (item) {
      case 'Users':
        data = await getUsers();
        navigate('/admin/dashboard/users', { state: {username: username }});
        break;
      case 'Jobs':
        data = await getJobs();
        navigate('/admin/dashboard/jobs', { state: {username: username }});
        break;
      case 'Posts':
        data = await getPosts();
        navigate('/admin/dashboard/posts', { state: {username: username }});
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


  const handleEdit = (post) => {
    // setPostToEdit(post);
    navigate(`/admin/dashboard/edit/post/${post.displayId}`, { state: { username: username }});
  };


  const handleDelete = async (post) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this post?');
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, where('displayId', '==', post.displayId)); 
    const querySnapshot = await getDocs(q);

    let documentIdToDelete = null;

    querySnapshot.forEach((doc) => {
      documentIdToDelete = doc.id;
    });

    if(shouldDelete && documentIdToDelete) {
      try {
        await deleteDoc(doc(db, 'posts', documentIdToDelete));
        console.log('Document successfully deleted!');
        const newData = await getPosts();
        setData(newData);
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    } else {
      console.log('Invalid Document ID');
    }
  };

  // create data at beginning, called only one time
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