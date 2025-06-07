import React, { useRef, useState } from "react";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import dp from "../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaRegFileImage } from "react-icons/fa";
import { LuSendHorizontal } from "react-icons/lu";
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios'
import { serverUrl } from '../main'
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import { setMessages } from "../redux/messageSlice";

function MessageArea() {
  const { selectedUser, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let {messages} = useSelector(state => state.message)
  const [showPicker, setShowPicker] = useState(false);
  const [msgInput, setMsgInput] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  let image = useRef();

  const handleImage = (e) => {
    let file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }
 
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()
      formData.append('message', msgInput)
      if(backendImage){
        formData.append('image', backendImage)
      }
      const result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`, formData,{withCredentials:true})
      console.log('msg result :- ',result.data);
      dispatch(setMessages([...messages,result.data]))
      setMsgInput('')
      setFrontendImage(null)
      setBackendImage(null)
    } catch (error) {
      console.log(error);
    }
  }

  const onEmojiClick = (emojiData) => {
    setMsgInput(prevMsgInput => prevMsgInput + emojiData.emoji)
    setShowPicker(false)
  }

  

  return (
    <div
      className={`lg:w-[70%] ${
        selectedUser ? "flex" : "hidden"
      } md:block w-full h-full bg-slate-200 border-l-2 border-gray-300`}
    >
       {selectedUser && (
        <div className="w-full h-[100vh] flex flex-col">
          <div className="w-full h-[100px] bg-primary rounded-b-[30px] shadow-gray-400 shadow-lg gap-5 flex items-center px-5">
            <div
              className="cursor-pointer"
              onClick={() => dispatch(setSelectedUser(null))}
            >
              <LiaLongArrowAltLeftSolid className=" text-3xl text-white" />
            </div>

            <div className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-md bg-white">
              <img
                src={selectedUser?.image || dp}
                alt="dp"
                className="h-[100%]"
              />
            </div>

            <h1 className="text-white font-semibold text-xl">
              {selectedUser?.name || "user"}
            </h1>
          </div>

          {/* emoji picker */}
          <div className="w-full h-[calc(100vh-180px)] overflow-y-auto px-3 py-4">

            {
              showPicker && 
                 <div className="absolute bottom-28 pl-3 ">
                 <EmojiPicker width={300} height={350} className="shadow-md" onEmojiClick={onEmojiClick}/>
                 </div>
            }

            {
              messages?.map((msg)=>(msg.sender == userData._id ? <SenderMessage image={msg.image} message={msg.message}/> : <ReceiverMessage image={msg.image} message={msg.message}/>))
            }
            
          </div> 
        </div>
      )}

      {!selectedUser && (
        <div className="w-full h-full flex flex-col justify-center items-center gap-2">
          <h1 className="text-gray-800 font-bold text-5xl">
            Welcome to ChatterPop
          </h1>
          <span className="text-gray-600 font-semibold italic text-3xl">
            Pop in. Chat on.
          </span>
        </div>
      )}

      {selectedUser && (
        <div className="w-full lg:w-[70%] h-24 fixed bottom-5 flex items-center justify-center">
          
          <img src={frontendImage} alt="" className="absolute w-2xs bottom-16"/>

          <form className=" w-11/12 lg:w-[70%] h-14 bg-primary shadow-gray-400 shadow-md rounded-full flex items-center gap-2.5 px-5" onSubmit={handleSendMessage}>
            
            <div onClick={() => setShowPicker((prev) => !prev)}>
              <RiEmojiStickerLine className="w-6 h-6 text-white cursor-pointer" />
            </div>

            <input type="file" ref={image} accept="image/*" onChange={handleImage } hidden/>

            <input
              type="text"
              className="w-full h-full px-2.5 outline-none border-0 text-xl text-white placeholder-white"
              placeholder="Message"
              onChange={(e) => setMsgInput(e.target.value)}
              value={msgInput}
            />

           
            <div onClick={()=>image.current.click()}>
              <FaRegFileImage className="w-6 h-6 text-white cursor-pointer" />
            </div>

            <button>
              <LuSendHorizontal className="w-6 h-6 text-white cursor-pointer" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default MessageArea;
