import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../main";

const getCurrentUser=()=>{
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user)
    useEffect(()=>{
        const fetchUser = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    },[])
}

export default getCurrentUser