import * as React from 'react';

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md ${props.className ?? ''}`}></button>
    )
}

export default Button