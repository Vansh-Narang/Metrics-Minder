import React from 'react';

const Button = ({ children, variant = 'primary', size = 'medium', onClick, className }) => {
    let baseClasses = ' items-center justify-center rounded-md font-medium';

    const variantClasses = {
        primary: 'bg-blackBG text-white',
        secondary: 'bg-blackBG text-white',
        danger: 'bg-blackBG text-white',
    };

    const sizeClasses = {
        small: 'px-2 py-1 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
    };

    const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    return (
        <button className={buttonClasses} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
