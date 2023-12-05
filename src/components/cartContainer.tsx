import { clearCartReducer, setIsCartShow } from '@/redux/slices/cartSlice';
import { RootState } from '@/redux/store';
import { IFoodItem } from '@/types';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { RiRefreshFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '.';

const CartContainer = () => {
    const boolCartShow = useSelector((state: RootState) => state.cart.isCartShow);
    const cartItems: IFoodItem[] = useSelector((state: RootState) => state.cart.items);
    const user = useSelector((state: RootState) => state.auth.user);

    const [flag, setFlag] = useState(1);
    const [subTotal, setSubTotal] = useState(0);
    const [deliveryPrice, setDeliveryPrice] = useState(890);

    const dispatch = useDispatch();

    const showCart = () => {
        dispatch(setIsCartShow(!boolCartShow));
    };

    const clearCart = () => {
        dispatch(clearCartReducer(true));
    };

    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
            return accumulator + item.qty * item.price;
        }, 0);
        setSubTotal(totalPrice);
    }, [subTotal, flag, cartItems]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
        >
            <div className="w-full flex items-center justify-between p-4">
                <motion.div whileTap={{ scale: 0.75 }} onClick={showCart} className="cursor-pointer">
                    <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
                </motion.div>
                <p className="text-textColor text-lg font-semibold">Корзина</p>

                <motion.p
                    whileTap={{ scale: 0.75 }}
                    onClick={clearCart}
                    className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
                >
                    Очистить <RiRefreshFill />
                </motion.p>
            </div>

            {/* bottom section */}
            {cartItems && cartItems.length > 0 ? (
                <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col no-scrollbar">
                    <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll no-scrollbar">
                        {cartItems.map((item) => (
                            <CartItem key={item.id} item={item} setFlag={setFlag} flag={flag} />
                        ))}
                    </div>

                    {/* cart total section */}
                    <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-400 text-lg">Промежуточный итог</p>
                            <p className="text-gray-400 text-lg">{subTotal} ₸</p>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-400 text-lg">Стоимость доставки</p>
                            <p className="text-gray-400 text-lg">{deliveryPrice} ₸</p>
                        </div>

                        <div className="w-full border-b border-gray-600 my-2"></div>

                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-400 text-lg">Итого</p>
                            <p className="text-gray-400 text-lg">{deliveryPrice + subTotal} ₸</p>
                        </div>

                        {!user.displayName === null ? (
                            <motion.button
                                whileTap={{ scale: 0.8 }}
                                type="button"
                                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                            >
                                Оформить заказ
                            </motion.button>
                        ) : (
                            <motion.button
                                whileTap={{ scale: 0.8 }}
                                type="button"
                                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                            >
                                Войдите чтобы продолжить
                            </motion.button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                    <img src="/img/emptyCart.svg" alt="emptyCart" className="w-300" />
                    <p className="text-xl text-textColor font-semibold">Добавьте товары в корзину</p>
                </div>
            )}
        </motion.div>
    );
};

export default CartContainer;
