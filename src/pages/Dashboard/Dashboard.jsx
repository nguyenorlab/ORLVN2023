import React, { useState, /*useContext*/ } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { /*collection,*/ /*getDocs,*/ getDoc, /*addDoc,*/ doc, /*where, query,*/ deleteDoc } from 'firebase/firestore';
import { deleteObject, ref, getStorage } from 'firebase/storage';
import Sidebar from '../../components/Sidebar/Sidebar';
import DataTable from '../../components/DataTable/DataTable';
import { getUsers, getJobs, getPosts, /*UsersContext*/ } from '../../api/api';


// import { allPostData } from '../News/Data';
// import { allRecruitData } from '../Recruitment/Data';


// init posts data
// async function initializeData() {
//   const postsCol = collection(db, 'posts');

//   for (const post of allPostData) {
//     await addDoc(postsCol, post);
//   }
// };

// init jobs data
// async function initializeData() {
//   const recCol = collection(db, 'jobs');

//   for (const rec of allRecruitData) {
//     await addDoc(recCol, rec);
//   }
// };


// get all users from Firestore Database




const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state;
  // const usersData = useContext(UsersContext);

  // const jobsData = useContext(JobsContext);
  // const postsData = useContext(PostsContext);

  // const { setPostToEdit } = useContext(EditPostContext);

  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);

  const itemFields = {
    'Users': {id: 'ID', username: 'Username', email: 'Email'},
    'Jobs': {displayId: 'ID', jobTitle: 'Job Title', location: 'Location', salary: 'Salary', shortDescription: 'Short Description'},
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


  const handleCreate = (item) => {
    console.log(item);
    try {
      switch (item.typeName) {
        case 'Users':
          navigate('/admin/dashboard/create/user', { state: { username: username }});
          break;
        case 'Jobs':
          navigate('/admin/dashboard/create/job', { state: { username: username }});
          break;
        case 'Posts':
          navigate('/admin/dashboard/create/post', { state: { username: username }});          
          break;      
        default:
          break;
      }
    } catch (error) {
      console.error('Error createing item: ', error);
    }
  };


  const handleEdit = (post) => {
    // setPostToEdit(post);
    navigate(`/admin/dashboard/edit/post/${post.displayId}`, { state: { username: username }});
  };


  const handleDelete = async (item) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete ${item.typeName}-${item.displayId}?`);
    if (shouldDelete) {
      try {
        switch (item.typeName) {
          case 'Users':

            break;
          case 'Jobs':
            await handleDeleteJob(item);
            break;
          case 'Posts':
            await handleDeletePost(item);
            break;
          default:
            console.log(`No handler for ${item}`);
        }
  
        console.log(`${item.typeName}-${item.displayId} successfully deleted!`);
        const newData = await getPosts();
        setData(newData);
      } catch (error) {
        console.error(`Error deleting ${item}: `, error);
      }
    }
  };

  const handleDeleteJob = async (job) => {

  };


  const handleDeletePost = async (post) => {
    // const shouldDelete = window.confirm('Are you sure you want to delete this post?');
    const documentIdToDelete = post.id;
    // if (shouldDelete) {
    //   const postsCollection = collection(db, 'posts');
    //   const q = query(postsCollection, where('displayId', '==', post.displayId));
    //   const querySnapshot = await getDocs(q);
  
    //   let documentIdToDelete = null;
  
    //   querySnapshot.forEach((doc) => {
    //     documentIdToDelete = doc.id;
    //   });
  
      if (documentIdToDelete) {
        try {
          // Lấy đường dẫn ảnh từ Firestore trước khi xoá document
          const postRef = doc(db, 'posts', documentIdToDelete);
          const postSnap = await getDoc(postRef);
          const postData = postSnap.data();
          const imagePaths = [];
  
          if (postData) {
            for (const section of postData.content) {
              for (const data of section.data) {
                if (data.type === 'image') {
                  // Kiểm tra xem có ảnh nào được lưu hay không
                  if (Array.isArray(data.text) && data.text.length > 0) {
                    imagePaths.push(...data.text);
                  }
                }
              }
            }
          }
  
          // Xoá document từ Firestore
          await deleteDoc(postRef);
  
          // Xoá ảnh từ Storage
          const storage = getStorage();
          // const storageRef = ref(storage, 'PostsImagesUpload');
  
          for (const imagePath of imagePaths) {
            const imageRef = ref(storage, imagePath);
            await deleteObject(imageRef);
          }
  
          console.log('Document and images successfully deleted!');
          navigate('/admin/dashboard/posts', { state: {username: username }});
          const newData = await getPosts();
          setData(newData);
        } catch (error) {
          console.error('Error deleting document: ', error);
        }
      } else {
        console.log('Invalid Document ID');
      }
    // }
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
          <h3>live search, filter by date, by category -- button Search</h3>
          <h3>tim cach xu ly username de khong phai dung location nua</h3>
          {data.length > 0 && 
            <DataTable data={data} fields={fields} onEdit={handleEdit} onDelete={handleDelete} onCreate={handleCreate}/>
          }
        </main>
      </div>    
    </>
  );
}

export default Dashboard