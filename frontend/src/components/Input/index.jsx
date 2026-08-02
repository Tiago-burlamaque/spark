import React from 'react'

function Input({ label, placeholder, type = "text", value, onchange }) {
    return (
        <div className='flex flex-col gap-2 '>

            {label && (
                <label className='text-white text-sm poppins-bold'>
                    {label}
                </label>
            )}

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onchange}
                className='
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                outline-none
                focus:ring-2
                focus:ring-violet-500
                transition-all 
                duration-300
                poppins-extralight
                '
            />
        </div>
    )
}

export default Input
