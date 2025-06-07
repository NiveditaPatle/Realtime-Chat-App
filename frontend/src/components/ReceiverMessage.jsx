import React from 'react'
import dp from '../assets/dp.webp'

function ReceiverMessage({ image, message }) {
  return (
    <div className='w-fit max-w-[500px] bg-gray-400 px-5 py-1 text-white text-xl rounded-tr-none rounded-2xl relative left-0 shadow-gray-400 shadow-md gap-2.5 flex flex-col mb-1'>
      {image && <img src={image} alt='' className=' w-32 rounded-lg'/>}
      
      { message && <span>{message}</span>}
    </div>
  )
}

export default ReceiverMessage
