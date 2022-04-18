import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/api/v1/cats`;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const catService = {
  getAll,
};

export default catService;
