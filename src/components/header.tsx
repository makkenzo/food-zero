'use client';

import { loginUser } from '@/redux/slices/authSlice';
import { RootState } from '@/redux/store';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MdShoppingBasket } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { app } from '../../firebase.config';

const Header = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const dispatch = useDispatch();

    const login = async () => {
        const {
            user: { refreshToken, providerData },
        } = await signInWithPopup(firebaseAuth, provider);

        dispatch(loginUser({ actionType: 'SET_USER', user: providerData[0] }));
    };

    return (
        <header className="w-screen fixed z-50 p-6 px-16">
            {/* desktop & tablet */}
            <div className="hidden md:flex w-full h-full items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/img/logo.png" alt="logo" width={32} height={32} className="object-cover" />
                    <p className="text-headingColor text-xl font-bold"> FoodZero</p>
                </Link>
                <div className="flex items-center gap-8">
                    <ul className="flex items-center gap-8">
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            Главная
                        </li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            Меню
                        </li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            О нас
                        </li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            Сервис
                        </li>
                    </ul>

                    <div className="relative flex items-center justify-center">
                        <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-xs text-white font-semibold">2</p>
                        </div>
                    </div>

                    <div className="relative">
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            src={user.photoURL ? user.photoURL : '/img/avatar.png'}
                            alt="user_profile"
                            className="min-w-[40px] w-10 min-h-[40px] h-10 drop-shadow-xl cursor-pointer"
                            onClick={login}
                        />
                    </div>
                </div>
            </div>

            {/* mobile */}
            <div className="flex md:hidden w-full h-full">dsa</div>
        </header>
    );
};

export default Header;
