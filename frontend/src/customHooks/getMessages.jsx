import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { serverUrl } from "../main";
import { setMessages } from "../redux/messageSlice";

const getMessages=()=>{
    const dispatch = useDispatch();
    const { userData, selectedUser } = useSelector(state => state.user)
    console.log('selectedUser', selectedUser);
    console.log('userData', userData);
    
    
    useEffect(()=>{
        const fetchMessages = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`,{withCredentials:true})
                dispatch(setMessages(result.data))
                console.log('message get',result.data);
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();
    },[selectedUser, userData])
}

export default getMessages