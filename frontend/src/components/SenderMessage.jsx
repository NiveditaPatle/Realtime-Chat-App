import React, { useEffect, useRef } from "react";
import dp from "../assets/dp.webp";
import { useSelector } from "react-redux";

function SenderMessage({ image, message }) {
  let scroll = useRef();
  let { userData } = useSelector(state=>state.user)

  useEffect(() => {
    scroll?.current.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);

  const handleImageScroll = () => {
    scroll?.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="flex items-start gap-3">
      <div className="w-fit max-w-[500px] bg-primary px-5 py-1 text-white text-xl rounded-tr-none rounded-2xl relative right-0 ml-auto shadow-gray-400 shadow-md gap-2.5 flex flex-col mb-2">
        <div ref={scroll}>
          {image && (
            <img
              src={image}
              alt=""
              className=" w-32 rounded-lg"
              onLoad={handleImageScroll}
            />
          )}

          {message && <span>{message}</span>}
        </div>
      </div>

      <div className="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-md bg-white">
        <img src={userData.image || dp} alt="dp" className="h-[100%]" />
      </div>
    </div>
  );
}

export default SenderMessage;
