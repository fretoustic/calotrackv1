import axios from "axios";
export const fetchUserProfile = async () => {
  const response = await axios.get('http://localhost:8080/api/getuser');
  return response.data;
};