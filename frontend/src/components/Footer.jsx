import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800/40 backdrop-blur-lg text-white flex flex-col justify-center items-center w-full fixed bottom-0 shadow-inner'>
            <div className="logo font-bold text-white text-2xl">
                <span className='text-blue-400'> &lt;</span>

                <span> Vault</span><span className='text-blue-400'>Keeper / &gt;</span>


            </div>
            <div className='flex justify-center items-center'> Created with <img className='w-7 mx-2' src="icons/heart.png" alt="" /> by Harsh Pd Singh </div>
        </div>
    )
}

export default Footer   