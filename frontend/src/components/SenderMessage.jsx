import React from 'react'
import dp from '../assets/dp.webp'

function SenderMessage({ image, message }) {
  return (
    <div className='w-fit max-w-[500px] bg-primary px-5 py-1 text-white text-xl rounded-tr-none rounded-2xl relative right-0 ml-auto shadow-gray-400 shadow-md gap-2.5 flex flex-col mb-2'>
       {image && <img src={image} alt='' className=' w-32 rounded-lg'/>}
      
       { message && <span>{message}</span>}
    </div>
  )
}

export default SenderMessage
