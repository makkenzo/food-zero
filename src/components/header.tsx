'use client';

import { loginUser } from '@/redux/slices/authSlice';
import { RootState } from '@/redux/store';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdAdd, MdLogout, MdShoppingBasket } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { app } from '../../firebase.config';

const Header = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [userPhoto, setUserPhoto] = useState<string>('');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        setUserPhoto(user.photoURL);
    }, [user]);

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const dispatch = useDispatch();

    const login = async () => {
        if (!user.email) {
            const {
                user: { refreshToken, providerData },
            } = await signInWithPopup(firebaseAuth, provider);

            dispatch(loginUser({ actionType: 'SET_USER', user: providerData[0] }));
        } else {
            setIsMenuOpen(!isMenuOpen);
        }
    };

    const logout = () => {
        dispatch(
            loginUser({
                actionType: null,
                user: {
                    displayName: null,
                    email: null,
                    phoneNumber: null,
                    photoURL: null,
                    providerId: null,
                    uid: null,
                },
            })
        );

        // window.location.reload();
    };

    return (
        <header className="w-screen fixed z-50 md:p-6 md:px-16 p-3 px-4">
            {/* desktop & tablet */}
            <div className="hidden md:flex w-full h-full items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/img/logo.png" alt="logo" width={32} height={32} className="object-cover" />
                    <p className="text-headingColor text-xl font-bold"> FoodZero</p>
                </Link>
                <div className="flex items-center gap-8">
                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className="flex items-center gap-8"
                    >
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
                    </motion.ul>

                    <div className="relative flex items-center justify-center">
                        <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-xs text-white font-semibold">2</p>
                        </div>
                    </div>

                    {userPhoto ? (
                        <div className="relative">
                            <motion.img
                                whileTap={{ scale: 0.6 }}
                                src={userPhoto}
                                alt="user_profile"
                                className="min-w-[40px] w-10 min-h-[40px] h-10 drop-shadow-xl cursor-pointer rounded-full"
                                onClick={login}
                            />
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    className="w-44 bg-gray-50 shadow-xl rounded-lg absolute flex flex-col top-12 right-0"
                                >
                                    {user && user.email === 'nekgo2009@gmail.com' && (
                                        <Link href="/createItem">
                                            <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                                                Новый товар <MdAdd />
                                            </p>
                                        </Link>
                                    )}
                                    <p
                                        className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                                        onClick={logout}
                                    >
                                        Выйти <MdLogout />
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    ) : (
                        <div className="relative">
                            <motion.img
                                whileTap={{ scale: 0.6 }}
                                src="/img/avatar.png"
                                alt="user_profile"
                                className="min-w-[40px] w-10 min-h-[40px] h-10 drop-shadow-xl cursor-pointer rounded-full"
                                onClick={login}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* mobile */}
            <div className="flex items-center justify-between md:hidden w-full h-full">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/img/logo.png" alt="logo" width={32} height={32} className="object-cover" />
                    <p className="text-headingColor text-xl font-bold"> FoodZero</p>
                </Link>

                <div className="relative">
                    {userPhoto ? (
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            src={userPhoto}
                            alt="user_profile"
                            className="min-w-[40px] w-10 min-h-[40px] h-10 drop-shadow-xl cursor-pointer rounded-full"
                            onClick={login}
                        />
                    ) : (
                        <div className="relative">
                            <motion.img
                                whileTap={{ scale: 0.6 }}
                                src="/img/avatar.png"
                                alt="user_profile"
                                className="min-w-[40px] w-10 min-h-[40px] h-10 drop-shadow-xl cursor-pointer rounded-full"
                                onClick={login}
                            />
                        </div>
                    )}
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            className="w-48 bg-gray-50 shadow-xl rounded-lg absolute flex flex-col top-12 right-0"
                        >
                            {user && user.email === 'nekgo2009@gmail.com' && (
                                <Link href="/createItem">
                                    <p className="px-4 gap-3 py-2 flex items-center cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                                        Новый товар <MdAdd />
                                    </p>
                                </Link>
                            )}
                            <ul className="flex flex-col">
                                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2">
                                    Главная
                                </li>
                                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2">
                                    Меню
                                </li>
                                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2">
                                    О нас
                                </li>
                                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2">
                                    Сервис
                                </li>
                            </ul>
                            <p
                                className="m-2 p-2 rounded-md shadow-md flex items-center gap-3 cursor-pointer justify-center bg-gray-200 hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                                onClick={logout}
                            >
                                Выйти <MdLogout />
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
