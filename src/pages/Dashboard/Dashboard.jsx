import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../config/firebase';
import { /*collection,*/ /*getDocs,*/ getDoc, /*addDoc,*/ doc, /*where, query,*/ deleteDoc } from 'firebase/firestore';
import { deleteObject, ref, getStorage } from 'firebase/storage';
import Sidebar from '../../components/Sidebar/Sidebar';
import DataTable from '../../components/DataTable/DataTable';
import { getUsers, getJobs, getPosts, getGallery, getTimekeeping, getRequest } from '../../api/api';
import { sendPasswordResetEmail } from 'firebase/auth';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';


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
  // align-items: center;
  justify-content: center;
  height: 100%;
`;

const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  color: black;
  padding: 6px 7px;
  border-radius: 5px;
  border-color: #d9d9d9;
  border-style: solid;
  border-width: 1px;
  margin: 30px 0px;
`;

const Title = styled.h3`
  font-size: 30px;
  line-height: 1.1;
  color: rgb(0, 94, 141);
  text-transform: uppercase;
  margin-top: 30px;
`;


const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);
  const [typeName, setTypeName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const typeNameRef = useRef(typeName);

  const itemFields = {
    'Users': {id: 'ID', username: 'Username', email: 'Email'},
    'Jobs': {displayId: 'ID', jobTitle: 'Job Title', location: 'Location', salary: 'Salary', shortDescription: 'Short Description'},
    'Posts': {displayId: 'ID', date: 'Date', category: 'Category', title: 'Post Title'},
    'Gallery': {displayId: 'ID', pathImg: 'Image'},
    'Timekeeping': {id: 'Employee Name'},
    'Request': {id: 'Employee Name', max_days: 'Remaining Days', used_days: 'Used Days'}
  };

  // -- get username from cookie -- //
  useEffect(() => {
    const usernameFromCookie = Cookies.get('username');
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    } else {
      toast.info('Login session has expired!');
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
      case 'Gallery':
        data = await getGallery();
        navigate('/admin/dashboard/gallery');
        break;
      case 'Timekeeping':
        data = await getTimekeeping();
        navigate('/admin/dashboard/timekeeping');
        break;
      case 'Request':
        data = await getRequest();
        navigate('/admin/dashboard/leave-request');
        break;
      case 'Logout':
        data = [];
        handleLogout();        
        break;
      default:
        toast.info(`No handler for ${item}`);
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
        case 'Gallery':
          navigate('/admin/dashboard/gallery/upload');
          break;    
        default:
          break;
      }
    } catch (error) {
      console.error('Error creating item: ', error);
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
          case 'Gallery':
            await handleDeleteGallery(item);
            break;
          default:
            toast.info(`No handler for ${item}`);
            // console.log(`No handler for ${item}`);
        }
  
        // console.log(`${item.typeName}-${item.displayId} successfully deleted!`);
        toast.success(`${item.typeName}-${item.displayId} successfully deleted!`);
      } catch (error) {
        console.error(`Error deleting ${item}: `, error);
        toast.error(`Error deleting ${item.typeName}-${item.displayId}`);
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
          toast.info('This job has no image to delete');
          // console.log('This job has no image to delete');
        }
        
        const newData = await getJobs();
        setData(newData);

        navigate('/admin/dashboard');
      } catch (error) {
        toast.error('Error deleting document, please try again.')
        console.error('Error deleting document: ', error);
      }
    } else {
      toast.error('Invali document ID');
      // console.log('Invalid Document ID');
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
          // delete thumbnail
          const decodedUrl = decodeURIComponent(postData.image);        
          const filename = decodedUrl.split('/').pop();
          const cleanFilename = filename.split('?alt=media')[0];
          const thumbImagePaths = 'PostsThumbnailImage/' + cleanFilename;
          const storage = getStorage();
          const imageRef = ref(storage, thumbImagePaths);
          await deleteObject(imageRef);

          // delete type image in content
          for (const imagePath of imagePaths) {
            const imageRef = ref(storage, imagePath);
            await deleteObject(imageRef);
          }
  
          toast.success('Document and images successfully deleted!');
          // console.log('Document and images successfully deleted!');
          const newData = await getPosts();
          setData(newData);
          navigate('/admin/dashboard');
        } catch (error) {
          toast.error('Error deleting document, please try again');
          console.error('Error deleting document: ', error);
        }
      } else {
        toast.error('Invalid document ID');
        // console.log('Invalid Document ID');
      }
  };


  const handleDeleteGallery = async (img) => {
    const documentIdtoDelete = img.id;
    if(documentIdtoDelete) {
      try {
        const galleryRef = doc(db, 'gallery', documentIdtoDelete);
        const gallerySnap = await getDoc(galleryRef);
        const galleryData = gallerySnap.data();

        await deleteDoc(galleryRef);
        
        if(galleryData && galleryData.pathImg) {
          const decodedUrl = decodeURIComponent(galleryData.pathImg);        
          const filename = decodedUrl.split('/').pop();
          const cleanFilename = filename.split('?alt=media')[0];
          const imagePaths = 'Gallery/' + cleanFilename;
          const storage = getStorage();
          const imageRef = ref(storage, imagePaths);
          await deleteObject(imageRef);
        } else {
          toast.info('This img has no image to delete');
          // console.log('This img has no image to delete');
        }
        
        const newData = await getGallery();
        setData(newData);

        navigate('/admin/dashboard');
      } catch (error) {
        toast.error('Error deleting document, please try again.')
        console.error('Error deleting document: ', error);
      }
    } else {
      toast.error('Invali document ID');
      // console.log('Invalid Document ID');
    }
  };
  // ------------------- end Delete function ------------------- //

  // Reset Password
  const handleResetPassword = async (user) => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success(`Reset password email sent to ${user.email}`);
      // console.log(`Reset password email sent to ${user.email}`);
    } catch (error) {
      toast.error('Error resetting password, please try again');
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

  // Search function
  useEffect(() => {
    typeNameRef.current = typeName;
    if(typeName === 'Timekeeping') {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
      const filtered = data.filter(item => {
        const lowerCaseId = typeof item.id === 'string' ? item.id?.toLowerCase() : '';
  
        const datetimeMatch = Array.isArray(item.datetime) &&  item.datetime.some(entry => {
          const checkinMatch = entry.checkin?.toLowerCase()?.includes(lowerCaseSearchTerm) || false;
          const checkoutMatch = entry.checkout?.toLowerCase()?.includes(lowerCaseSearchTerm) || false;
          const dateMatch = entry.date?.toLowerCase()?.includes(lowerCaseSearchTerm) || false;          
  
          return checkinMatch || checkoutMatch || dateMatch;
        });
  
        return lowerCaseId.includes(lowerCaseSearchTerm) || datetimeMatch;
      });
      
      setFilteredData(filtered);
    } else if(typeName === 'Request') {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
      const filtered = data.filter(item => {
        const lowerCaseId = typeof item.id === 'string' ? item.id?.toLowerCase() : '';
  
        const requestMatch = Array.isArray(item.requests) &&  item.requests.some(entry => {
          const createdAtMatch = entry.createdAt?.toLowerCase()?.includes(lowerCaseSearchTerm) || false;
          
          let datetimeMatch = false;
          if (Array.isArray(entry.datetime)) {
            datetimeMatch = entry.datetime.some(dt => typeof dt === 'string' && dt.toLowerCase()?.includes(lowerCaseSearchTerm));
          } else if (typeof entry.datetime === 'string') {
            datetimeMatch = entry.datetime.toLowerCase()?.includes(lowerCaseSearchTerm);
          }
          
          const otherReasonMatch = entry.other_reason?.toLowerCase()?.includes(lowerCaseSearchTerm) || false;          
          const typeMatch = entry.type?.toLowerCase()?.includes(lowerCaseSearchTerm) || false;          
  
          return createdAtMatch || datetimeMatch || otherReasonMatch || typeMatch;
        });
  
        return lowerCaseId.includes(lowerCaseSearchTerm) || requestMatch;
      });
      
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data, searchTerm, typeName]);
  

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
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
        <Sidebar items={['Users', 'Jobs', 'Posts', 'Gallery', 'Timekeeping', 'Request', 'Logout']} username={username} onItemClick={handleItemClick} />
        <MainContent>
          {data.length > 0 ? (
            <ResponsiveContainer>
              {typeName === 'Timekeeping' && (
                <>
                  <Title>Time sheet of all employees</Title>
                  <Input
                    type='text'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={handleChange}
                  />                
                </>
              )}

              {typeName === 'Request' && (
                <>
                  <Title>Request holiday of all employees</Title>
                  <Input
                    type='text'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={handleChange}
                  />                
                </>
              )}
              <DataTable
                data={filteredData.length > 0 ? filteredData : data}
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
              <Title>Please select an item from the Sidebar</Title>
            </MessageContainer>
          )}
        </MainContent>
      </Wrapper>
    </>
  );
}

export default Dashboard