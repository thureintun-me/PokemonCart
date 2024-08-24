import axios from "axios";
import Toast from "react-native-toast-message";

// const axiosInstance = axios.create({
//     baseURL: process.env.EXPO_PUBLIC_API_URL,
//     timeout: 1000,
//     // headers: {'X-Custom-Header': 'foobar'},
//     //  timeoutErrorMessage: "Request Time Out.Please Try Again"
// });

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['x-api-key'] = process.env.EXPO_PUBLIC_API_KEY;
    return config;

}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    Toast.show({
        type: 'success',
        text1: 'Success',
        text2: response.status
    });
    
    return response;
}, function (error) {
    console.log("err", error)
    Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message
    });
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export const getRequest = async (URI) => await axios.get(URI);
export const postRequest = async (URI, payload) =>
    await axios.post(URI, payload);
export const putRequest = async (URI, payload) => await axios.put(URI, payload);
export const patchRequest = async (URI, payload) =>
    await axios.patch(URI, payload);
export const deleteRequest = async (URI) => await axios.delete(URI);
