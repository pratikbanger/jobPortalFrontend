import Cookies from "js-cookie";
import Axios from "axios";

export const saveAuthToken = (token, role) => {
    Cookies.set("authToken", token, {
        expires: 7, // Expires in 7 days
        secure: true, // Use secure cookies in production (HTTPS)
        sameSite: "Strict",
    });

    Cookies.set("userRole", role, {
        expires: 7, // Expires in 7 days
        secure: true, // Use secure cookies in production (HTTPS)
        sameSite: "Strict",
    });
};

export const getAuthToken = () => {
    const authToken = Cookies.get("authToken");
    const userRole = Cookies.get("userRole");
    return { authToken, userRole }
};

export const removeAuthToken = () => {
    Cookies.remove("authToken");
    Cookies.remove("userRole");
};



// const axiosInstance = Axios.create({
//     baseURL: "http://localhost:5000",
// });

// axiosInstance.interceptors.request.use(
//     (config) => {
//         config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export async function getAPI(endPoint) {
//     try {

//         const authToken = localStorage.getItem('token')

//         const headers = {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`,
//         }

//         await axiosInstance.get(endPoint, { headers })
//             .then((response) => {
//                 console.log("🚀 ~ getAPI ~ response:", response)
//                 return response
//             })

//     } catch (error) {
//         console.log("🚀 ~ getAPI ~ error:", error)
//     }

// }