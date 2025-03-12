import Cookies from "js-cookie";

export const saveAuthToken = (token, role) => {
    Cookies.set("authToken", token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
    });

    Cookies.set("userRole", role, {
        expires: 7,
        secure: true,
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