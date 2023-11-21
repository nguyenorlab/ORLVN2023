import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../src/config/firebase';


export const PostsContext = createContext();
export const JobsContext = createContext();
export const UsersContext = createContext();


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