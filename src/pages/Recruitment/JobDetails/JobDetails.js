import React from 'react';
import { useParams } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Job Details</h1>
      <p>ID: {id}</p>
    </div>
  )
}

export default JobDetails