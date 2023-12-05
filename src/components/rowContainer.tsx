import { addItemsToCart } from '@/redux/slices/cartSlice';
import { IFoodItem } from '@/types';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { useDispatch } from 'react-redux';

interface RowContainerProps {
    flag: boolean;
    data: IFoodItem[];
    scrollValue?: number;
}

const RowContainer = ({ flag, data, scrollValue = 20 }: RowContainerProps) => {
    const rowContainer = useRef<HTMLDivElement>(null);
    const [cartItem, setCartItem] = useState<IFoodItem[]>([]);
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(addItemsToCart(cartItem));
    };

    useEffect(() => {
        if (rowContainer.current) {
            rowContainer.current.scrollLeft += scrollValue;
        }
    }, [scrollValue]);

    useEffect(() => {
        addToCart();
    }, [cartItem]);

    return (
        <div
            ref={rowContainer}
            className={`w-full flex items-center gap-3 my-12 scroll-smooth ${
                flag ? 'overflow-x-scroll no-scrollbar' : 'overflow-x-hidden flex-wrap justify-center'
            }`}
        >
            {data && data.length > 0 ? (
                data.map((item) => (
                    <div
                        key={item.id}
                        className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
                    >
                        <div className="w-full flex items-center justify-between">
                            <motion.div className="w-40 h-40 -mt-8 drop-shadow-2xl" whileHover={{ scale: 1.2 }}>
                                <img src={item?.imageURL} alt="fruit" className="w-full h-full object-contain" />
                            </motion.div>
                            <motion.div
                                whileTap={{ scale: 0.75 }}
                                className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                                onClick={() => setCartItem([item])}
                            >
                                <MdShoppingBasket className="text-white" />
                            </motion.div>
                        </div>

                        <div className="w-full flex flex-col items-end justify-end -mt-8">
                            <p className="text-textColor font-semibold text-base md:text-lg z-10">{item?.title}</p>
                            <p className="mt-1 text-sm texr-gray-500">{item?.calories} ккал</p>
                            <div className="flex items-center gap-8">
                                <p className="text-lg text-headingColor font-semibold">
                                    {item?.price} <span className="text-sm text-red-500">₸</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="w-full flex flex-col items-center justify-center">
                    <img src="/img/NotFound.svg" className="h-340" />
                    <p className="text-xl text-headingColor font-semibold my-2">Товары недоступны</p>
                </div>
            )}
        </div>
    );
};

export default RowContainer;
