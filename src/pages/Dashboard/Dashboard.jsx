import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../config/firebase';
import { /*collection,*/ /*getDocs,*/ getDoc, /*addDoc,*/ doc, /*where, query,*/ deleteDoc } from 'firebase/firestore';
import { deleteObject, ref, getStorage } from 'firebase/storage';
import Sidebar from '../../components/Sidebar/Sidebar';
import DataTable from '../../components/DataTable/DataTable';
import { getUsers, getJobs, getPosts } from '../../api/api';
import { sendPasswordResetEmail } from 'firebase/auth';
import Cookies from 'js-cookie';

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


const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const WelcomeMessage = styled.h2`
  margin-bottom: 20px;
`;

const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;


const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);
  const [typeName, setTypeName] = useState('');
  const itemFields = {
    'Users': {id: 'ID', username: 'Username', email: 'Email'},
    'Jobs': {displayId: 'ID', jobTitle: 'Job Title', location: 'Location', salary: 'Salary', shortDescription: 'Short Description'},
    'Posts': {displayId: 'ID', date: 'Date', category: 'Category', title: 'Post Title'}
  };

  // -- get username from cookie -- //
  useEffect(() => {
    const usernameFromCookie = Cookies.get('username');
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    } else {
      navigate('/admin');
    }
  }, [navigate]);


  // Sidebar click item
  const handleItemClick = async (item) => {
    setTypeName(item);
    let data;
    switch (item) {
      case 'Users':
        data = await getUsers();
        navigate('/admin/dashboard/users');
        break;
      case 'Jobs':
        data = await getJobs();
        navigate('/admin/dashboard/jobs');
        break;
      case 'Posts':
        data = await getPosts();
        navigate('/admin/dashboard/posts');
        break;
      case 'Logout':
        data = [];
        await handleLogout();        
        break;
      default:
        console.log(`No handler for ${item}`);
    }
    setData(data);
    setFields(itemFields[item]);
  };

  // Create function
  const handleCreate = () => {
    try {
      switch (typeName) {
        case 'Users':
          navigate('/admin/dashboard/users/create');
          break;
        case 'Jobs':
          navigate('/admin/dashboard/jobs/create');
          break;
        case 'Posts':
          navigate('/admin/dashboard/posts/create');          
          break;      
        default:
          break;
      }
    } catch (error) {
      console.error('Error createing item: ', error);
    }
  };


  // Edit function
  const handleEdit = (post) => {
    try {
      switch (typeName) {
        case 'Users':
          navigate(`/admin/dashboard/users/edit/${post.id}`);
          break;
        case 'Jobs':
          navigate(`/admin/dashboard/jobs/edit/${post.displayId}`);
          break;
        case 'Posts':
          navigate(`/admin/dashboard/posts/edit/${post.displayId}`);
          break;      
        default:
          break;
      }
    } catch (error) {
      console.error('Error createing item: ', error);
    }    
  };


  // ------------------- start Delete function ------------------- //
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
      } catch (error) {
        console.error(`Error deleting ${item}: `, error);
      }
    }
  };


  const handleDeleteJob = async (job) => {
    const documentIdtoDelete = job.id;
    if(documentIdtoDelete) {
      try {
        const jobRef = doc(db, 'jobs', documentIdtoDelete);
        const jobSnap = await getDoc(jobRef);
        const jobData = jobSnap.data();

        await deleteDoc(jobRef);
        
        if(jobData && jobData.img) {
          const decodedUrl = decodeURIComponent(jobData.img);        
          const filename = decodedUrl.split('/').pop();
          const cleanFilename = filename.split('?alt=media')[0];
          const imagePaths = 'JobsImagesUpload/' + cleanFilename;
          const storage = getStorage();
          const imageRef = ref(storage, imagePaths);
          await deleteObject(imageRef);
        } else {
          console.log('This job has no image to delete');
        }
        
        const newData = await getJobs();
        setData(newData);

        navigate('/admin/dashboard');
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    } else {
      console.log('Invalid Document ID');
    }
  };


  const handleDeletePost = async (post) => {
    const documentIdToDelete = post.id;  
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
          const newData = await getPosts();
          setData(newData);
          navigate('/admin/dashboard');
        } catch (error) {
          console.error('Error deleting document: ', error);
        }
      } else {
        console.log('Invalid Document ID');
      }
  };
  // ------------------- end Delete function ------------------- //

  // Reset Password
  const handleResetPassword = async (user) => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      console.log(`Reset password email sent to ${user.email}`);
    } catch (error) {
      console.error('Error resetting password: ', error);
    }
  };

  // Logout
  const handleLogout = () => {
    // logout from Firebase
    auth.signOut().then(() => {
      Cookies.remove('username');
      setUsername(null);  
      navigate('/admin');
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };



  // ------------------- initial data ------------------- //
  // create data at beginning, called only one time
  // useEffect(() => {
  //   async function fetchData() {
  //     await initializeData();
  //   }
  //   fetchData();
  // })



  return (
    <>
      <Wrapper>
        <Sidebar items={['Users', 'Jobs', 'Posts', 'Logout']} onItemClick={handleItemClick} />
        <MainContent>
        <WelcomeMessage>Welcome, {username}</WelcomeMessage>
          {data.length > 0 ? (
            <ResponsiveContainer>
              <DataTable
                data={data}
                fields={fields}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCreate={handleCreate}
                onResetPassword={handleResetPassword}
                typeName={typeName}
              />
            </ResponsiveContainer>
          ) : (
            <MessageContainer>
              <h3>Please select an item from the Sidebar</h3>
            </MessageContainer>
          )}
        </MainContent>
      </Wrapper>
    </>
  );
}

export default Dashboard