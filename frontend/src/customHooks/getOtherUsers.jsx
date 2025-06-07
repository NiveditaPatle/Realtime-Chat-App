import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers } from "../redux/userSlice";
import { serverUrl } from "../main";

const getOtherUsers=()=>{
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user)
    useEffect(()=>{
        const fetchUser = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/others`,{withCredentials:true})
                dispatch(setOtherUsers(result.data))
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    },[userData])
}

export default getOtherUsers