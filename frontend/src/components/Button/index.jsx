import React from 'react'

function Button({ children, type = "button", loading = false, onclick }) {
    return (
        <button
            type={type}
            onClick={onclick}
            disabled={loading}
            className='
           w-full
        py-3
        rounded-xl
        bg-violet-600
        text-white
        font-semibold
        hover:bg-violet-700
        disabled:opacity-50
        cursor-pointer
        transition-all
        duration-300
        shadow-xl
        hover:shadow-violet-700
        poppins-extrabold
      '>

            {loading
                ? "Carregando..."
                : children

            }
        </button>
    )
}

export default Button
