import axios from 'axios';

const URL = 'https://yourdomain.com/api/';

export const getJobList = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
