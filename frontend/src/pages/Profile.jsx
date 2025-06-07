import React, { useRef, useState } from "react";
import dp from "../assets/dp.webp";
import { IoCameraOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../main";

function Profile() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(userData.name || "");
  const [frontendImage, setFrontendImage] = useState(userData.image || dp);
  const [backendImage, setBackendImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  let image = useRef();

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let formData = new FormData();
      formData.append("name", name);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      let result = await axios.put(`${serverUrl}/api/user/profile`, formData, {
        withCredentials: true,
      });
      dispatch(setUserData(result.data));
      // console.log('image', result.data);
      navigate('/');
      setSaving(false);
    } catch (error) {
      console.log(error);
      setSaving(false);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center gap-6">
      <div
        className=" bg-white rounded-full border-4 border-primary shadow-gray-400 shadow-md relative"
        onClick={() => image.current.click()}
      >
        <div className="fixed top-6 left-6" onClick={() => navigate("/")}>
          <LiaLongArrowAltLeftSolid className=" text-4xl text-gray-600" />
        </div>
        <div className="w-[200px] h-[200px] rounded-full overflow-hidden flex justify-center items-center">
          <img src={frontendImage} alt="dp" className="h-[100%]" />
        </div>
        <div className="absolute bottom-4 text-gray-600 right-4 w-8 h-8 rounded-full bg-primary flex justify-center items-center shadow-gray-300 shadow-md">
          <IoCameraOutline className=" text-gray-600 text-2xl" />
        </div>
      </div>
      <form
        className="w-[95%] max-w-[500px] flex flex-col gap-5 items-center justify-center"
        onSubmit={handleProfile}
      >
        <input
          type="file"
          accept="image/*"
          ref={image}
          hidden
          onChange={handleImage}
        />
        <input
          type="text"
          placeholder="Enter your name"
          className="w-[90%] h-[50px] outline-none border-2 border-primary px-[20px] py-[10px] bg-white rounded-lg shadow-gray-300 shadow-md text-gray-700 text-[19px]"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          readOnly
          className="w-[90%] h-[50px] outline-none border-2 border-primary px-[20px] py-[10px] bg-white rounded-lg shadow-gray-300 shadow-md text-gray-500 text-[19px]"
          value={userData?.userName}
        />
        <input
          type="text"
          readOnly
          className="w-[90%] h-[50px] outline-none border-2 border-primary px-[20px] py-[10px] bg-white rounded-lg shadow-gray-300 shadow-md text-gray-500 text-[19px]"
          value={userData?.email}
        />
        <button
          className="px-[20px] py-[10px] bg-primary rounded-2xl shadow-gray-400 shadow-md text-[20px] w-[200px] mt-[20px] font-semibold text-gray-800 hover:shadow-inner"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
