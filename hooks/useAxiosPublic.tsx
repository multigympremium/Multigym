import axios from "axios";
//
const axiosPublic = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/`,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
