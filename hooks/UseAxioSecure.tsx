import axios from "axios";
import { useMemo } from "react";

const UseAxiosSecure = () => {
  const branch = "shia";
  const role = "1";
  const axiosSecure = useMemo(
    () =>
      axios.create({
        baseURL: `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/`,
      }),
    []
  );

  return axiosSecure;
};

export default UseAxiosSecure;

// import axios from "axios";
// import { useMemo } from "react";

// const UseAxiosSecure = () => {
//   const branch = "shia";
//   const role = "1";

//   // Create axios instance using useMemo
//   const axiosSecure = useMemo(() => {
//     const instance = axios.create({
//       baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/`,
//     });

//     // Add request interceptor to append branch and role to every request
//     instance.interceptors.request.use((config) => {
//       // Append the query parameters to the request URL
//       const url = new URL(config.url, instance.defaults.baseURL);
//       url.searchParams.set("branch", branch);
//       url.searchParams.set("role", role);

//       // Set the new URL with appended query parameters
//       config.url = url.toString();

//       return config;
//     }, (error) => {
//       return Promise.reject(error);
//     });

//     return instance;
//   }, [branch, role]);

//   return axiosSecure;
// };

// export default UseAxiosSecure;
