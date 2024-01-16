import { axiosInstance } from "@/lib/axiosInstance"
interface user {
    password: string;
    email: string;
  }

export async function Login(loginData: user) {
    const { data } = await axiosInstance.post('/auth/login', loginData);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refershToken", data.refreshToken);
    localStorage.setItem("auth", "true");
    return {
        userData: {accessToken:data.accessToken,refreshToken:data.refreshToken},
        isAuthenticated: true
    }
}

export async function Register(registerData: user) {
    const { data } = await axiosInstance.post('/auth/register', registerData);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refershToken", data.refreshToken);
    localStorage.setItem("auth", "true");
    return {
        userData: {accessToken:data.accessToken,refreshToken:data.refreshToken},
        isAuthenticated: true
    }
}

export async function Logout() {
    return {
        userData: {},
        isAuthenticated: false
    }
}