import { useDispatch } from "react-redux";
import { logout, setUser } from "./authSlice";
import axios from "@/common/axios";
import { API } from "@/common/APIs";

export function useAuth() {

    const dispatch = useDispatch();

    const getAuthentication = async () => {
        if (!localStorage.getItem('jwt')) return
        try {
            const data = (await axios.get(API.AUTHENTICATION)).data;
            dispatch(setUser(data));
        } catch (error: any) {
            console.error(error);
        }
    }

    const logoutUser = () => {
        dispatch(logout());
    }

    return { logoutUser, getAuthentication };

}
