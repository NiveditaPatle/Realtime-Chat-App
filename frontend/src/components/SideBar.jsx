import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../main";
import dp from "../assets/dp.webp";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import {
  setOtherUsers,
  setSearchData,
  setSelectedUser,
  setUserData,
} from "../redux/userSlice";

function SideBar() {
  const { userData, otherUsers, selectedUser, onlineUsers, searchData } =
    useSelector((state) => state.user);
  const [search, setSearch] = useState(false);
  let [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      let result = await axios.get(
        `${serverUrl}/api/user/search?query=${input}`,
        {
          withCredentials: true,
        }
      );
      dispatch(setSearchData(result.data));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (input) {
      handleSearch();
    }
  }, [input]);

  return (
    <div
      className={`lg:w-[30%] overflow-hidden w-full h-full lg:block relative bg-slate-200 ${
        !selectedUser ? "block" : "hidden"
      }`}
    >
      <div
        className=" w-14 h-14 rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-md bg-primary cursor-pointer fixed bottom-5 left-2.5"
        // onClick={() => setSearch(true)}
        onClick={handleLogOut}
      >
        <TbLogout2 className=" text-2xl text-gray-800" />
      </div>

      {input.length > 0 && (
        <div className="flex w-full h-full bg-white absolute overflow-y-auto flex-col items-center gap-2.5 top-64 z-50 py-3">
          {searchData?.map((user) => (
            <div
              className="w-[95%] h-16 flex justify-start items-center gap-5 bg-white border-b-2 border-gray-400 hover:bg-primary cursor-pointer"
              onClick={() => {
                dispatch(setSelectedUser(user))
                setInput('')
                setSearch(false)
              }}
            >
              <div className="relative rounded-full shadow-gray-500 shadow-md bg-white flex justify-center items-center m-2.5">
                <div className="w-14 h-14 rounded-full overflow-hidden flex justify-center items-center ">
                  <img src={user.image || dp} alt="dp" className="h-[100%]" />
                </div>

                {onlineUsers?.includes(user._id) && (
                  <span className=" w-3 h-3 rounded-full absolute bottom-1.5 -right-0.5 bg-green-300 shadow-gray-500 shadow-xs"></span>
                )}
              </div>
              <h1 className="text-gray-700 font-semibold text-xl">
                {user.name || user.userName}
              </h1>
            </div>
          ))}
        </div>
      )}

      <div className="w-full h-[250px] bg-primary rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-5">
        <h1 className="text-white font-bold text-2xl">ChatterPop</h1>
        <div className="w-full flex justify-between items-center">
          <h1 className="text-gray-700 font-bold text-2xl">
            Hii, {userData.name || "user"}
          </h1>
          <div
            className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-md bg-white cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <img src={userData.image || dp} alt="dp" className="h-[100%]" />
          </div>
        </div>

        <div className="w-full flex items-center gap-5 overflow-y-auto py-1.5 relative">
          {!search && (
            <div
              className=" w-14 h-14 rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-md bg-white cursor-pointer mt-2.5"
              onClick={() => setSearch(true)}
            >
              <IoIosSearch className=" text-2xl text-gray-600" />
            </div>
          )}

          {search && (
            <form className="w-full h-14 bg-white shadow-gray-400 shadow-md flex items-center gap-2.5 mt-2.5 rounded-full overflow-hidden px-5">
              <IoIosSearch className=" text-3xl text-gray-600" />
              <input
                type="text"
                placeholder="search users..."
                className="w-full h-full p-2.5 outline-0 border-0 text-gray-700 text-[17px]"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <IoIosClose
                className=" text-4xl text-gray-600 cursor-pointer"
                onClick={() => setSearch(false)}
              />
            </form>
          )}

          {!search &&
            otherUsers?.map(
              (user) =>
                onlineUsers?.includes(user._id) && (
                  <div
                    className="relative rounded-full shadow-gray-500 shadow-md bg-white flex justify-center items-center mt-2.5 cursor-pointer"
                    onClick={() => dispatch(setSelectedUser(user))}
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden flex justify-center items-center ">
                      <img
                        src={user.image || dp}
                        alt="dp"
                        className="h-[100%]"
                      />
                    </div>

                    <span className=" w-3 h-3 rounded-full absolute bottom-1.5 -right-0.5 bg-green-300 shadow-gray-500 shadow-xs"></span>
                  </div>
                )
            )}
        </div>
      </div>

      <div className="w-full h-[53%] md:h-[46%] overflow-auto flex flex-col gap-5 items-center mt-5">
        {otherUsers?.map((user) => (
          <div
            className="w-[95%] h-14 flex justify-start items-center gap-5 shadow-gray-500 bg-white shadow-md rounded-full hover:bg-primary cursor-pointer"
            onClick={() => dispatch(setSelectedUser(user))}
          >
            {/* <div className="w-14 h-14 rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-md bg-white">
              <img src={user.image || dp} alt="dp" className="h-[100%]" />
            </div> */}
            <div className="relative rounded-full shadow-gray-500 shadow-md bg-white flex justify-center items-center mt-2.5">
              <div className="w-14 h-14 rounded-full overflow-hidden flex justify-center items-center ">
                <img src={user.image || dp} alt="dp" className="h-[100%]" />
              </div>

              {onlineUsers?.includes(user._id) && (
                <span className=" w-3 h-3 rounded-full absolute bottom-1.5 -right-0.5 bg-green-300 shadow-gray-500 shadow-xs"></span>
              )}
            </div>
            <h1 className="text-gray-700 font-semibold text-xl">
              {user.name || user.userName}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
