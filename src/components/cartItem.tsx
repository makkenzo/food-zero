import { setCartItems } from '@/redux/slices/cartSlice';
import { RootState } from '@/redux/store';
import { ICartItem, IFoodItem } from '@/types';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiMinus, BiPlus } from 'react-icons/bi';

interface CartItemProps {
    item: IFoodItem;
    setFlag: Dispatch<SetStateAction<number>>;
    flag: number;
}

const CartItem = ({ item, setFlag, flag }: CartItemProps) => {
    let items: ICartItem[] = [];

    const cartItems: ICartItem[] = useSelector((state: RootState) => state.cart.items);
    const [qty, setQty] = useState<number>(item.qty || 1);

    const dispatch = useDispatch();

    const cartDispatch = () => {
        dispatch(setCartItems(items));
    };

    const updateQty = (newQty: number) => {
        // Ensure the new quantity is within a valid range (e.g., not negative)
        newQty = Math.max(1, newQty);

        // Find the index of the item in the cart
        const itemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

        // Create a copy of the cartItems array to avoid mutating state directly
        const updatedCartItems = [...cartItems];

        // If the item is already in the cart, update its quantity
        if (itemIndex !== -1) {
            updatedCartItems[itemIndex] = {
                ...updatedCartItems[itemIndex],
                qty: newQty,
            };
        }

        // Dispatch the updated cart items to the Redux store
        dispatch(setCartItems(updatedCartItems));

        // Update local state to trigger re-render
        setQty(newQty);
        setFlag((prevFlag) => prevFlag + 1); // Update flag to trigger re-render in CartContainer
    };

    useEffect(() => {
        items = cartItems;
    }, [qty, items]);

    useEffect(() => {
        // Update local state when cartItems changes to reflect the current quantity
        const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
        if (cartItem) {
            setQty(cartItem.qty || 1);
        }
    }, [cartItems, item.id]);

    return (
        <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
            <img src={item?.imageURL} alt="itemImage" className="w-20 h-20 max-w-[60px] object-contain" />

            {/* name section */}
            <div className="flex flex-col gap-2">
                <p className="text-base text-gray-50">{item?.title}</p>
                {item.price && qty && <p className="text-sm block text-gray-300 font-semibold">{item.price * qty}</p>}
            </div>

            <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateQty(qty - 1)}>
                    <BiMinus className="text-gray-50" />
                </motion.div>

                <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">{qty}</p>

                <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateQty(qty + 1)}>
                    <BiPlus className="text-gray-50" />
                </motion.div>
            </div>
        </div>
    );
};

export default CartItem;
