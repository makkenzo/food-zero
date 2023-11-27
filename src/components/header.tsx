import React from 'react';

const Header = () => {
    return (
        <div className="w-screen fixed z-50 bg-slate-300 p-6 px-16">
            {/* desktop & tablet */}
            <div className="hidden md:flex w-full h-full"></div>

            {/* mobile */}
            <div className="flex md:hidden w-full h-full">dsa</div>
        </div>
    );
};

export default Header;
