import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../src/config/firebase';


export const PostsContext = createContext();
export const JobsContext = createContext();
export const UsersContext = createContext();
export const EditPostContext = createContext();

//--- Posts data ---//
export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, 'posts');
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map(doc => doc.data());
      setPosts(postsList);
    };
    fetchPosts();
  }, []);

  return (
    <PostsContext.Provider value={posts}>
      {children}
    </PostsContext.Provider>
  );
};


//--- Jobs data ---//
export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsCollection = collection(db, 'recruit');
      const jobsSnapshot = await getDocs(jobsCollection);
      const jobsList = jobsSnapshot.docs.map(doc => doc.data());
      setJobs(jobsList);
    };
    fetchJobs();
  },[]);  

  return (
    <JobsContext.Provider value={jobs}>
      {children}
    </JobsContext.Provider>    
  );
};


//--- Users data ---//
export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => doc.data());
      setUsers(usersList);
    };
    fetchUsers();
  },[]);

  return (
    <UsersContext.Provider value={users}>
      {children}
    </UsersContext.Provider>    
  );
};


// -- Edit Post Context -- // if not use Context API, dont need to this
export const EditPostProvider = ({ children }) => {
  const [editedId, setEditedId] = useState();
  const [editedContent, setEditedContent] = useState([]);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [editedDate, setEditedDate] = useState('');

  const setPostToEdit = (post) => {
    setEditedId(post.id);
    setEditedContent(post.content);
    setEditedTitle(post.title);
    setEditedCategory(post.category);
    setEditedDate(post.date);
  };

  const handleEdit = (sectionIndex, itemIndex, newText) => {
    const newContent = [...editedContent];
    newContent[sectionIndex].data[itemIndex].text = newText;
    setEditedContent(newContent);
  };

  return (
    <EditPostContext.Provider value={{ editedId, editedContent, editedTitle, editedCategory, editedDate, setEditedContent, setEditedTitle, setEditedCategory, setEditedDate, handleEdit, setPostToEdit }}>
      {children}
    </EditPostContext.Provider>
  );
};

// get all users from Firestore Database
export const getUsers = async () => {
  const usersCol = collection(db, 'users');
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map(doc => doc.data());

  userList.sort((a, b) => a.id - b.id);

  return userList;
};

// get all posts from Firestore Database
export const getPosts = async () => {
  const postsCol = collection(db, 'posts');
  const postSnapshot = await getDocs(postsCol);
  const postList = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  postList.sort((a, b) => a.displayId - b.displayId);

  return postList;
};

// get all jobs from Firestore Database
export const getJobs = async () => {
  const jobCol = collection(db, 'recruit');
  const jobSnapshot = await getDocs(jobCol);
  const jobList = jobSnapshot.docs.map(doc => doc.data());
  return jobList;
};