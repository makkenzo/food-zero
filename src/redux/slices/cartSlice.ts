import { IDataState, IFoodItem } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IDataState = {
    items: [],
    isCartShow: false,
};

const findItemIndex = (cartItems: IFoodItem[], newItem: IFoodItem): number => {
    return cartItems.findIndex((item) => item.id === newItem.id);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemsToCart: (state, action: PayloadAction<IFoodItem[]>) => {
            const newItems = action.payload;

            for (const newItem of newItems) {
                const existingIndex = findItemIndex(state.items, newItem);

                if (existingIndex !== -1) {
                    // If the item already exists in the cart, update its quantity
                    state.items[existingIndex].qty = (state.items[existingIndex].qty || 1) + 1;
                } else {
                    // If the item is not in the cart, add it with a quantity of 1
                    state.items.push({ ...newItem, qty: 1 });
                }
            }
        },
        setCartItems: (state, action: PayloadAction<IFoodItem[]>) => {
            state.items = action.payload;
        },
        setIsCartShow: (state, action: PayloadAction<boolean>) => {
            state.isCartShow = action.payload;
        },
        clearCartReducer: (state, action: PayloadAction<boolean>) => {
            state.items = action.payload === true ? [] : [...state.items];
        },
    },
});

export const { addItemsToCart, setIsCartShow, clearCartReducer, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
