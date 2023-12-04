import { IDataState, IFoodItem } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// const initialState: IDataState = {
//     items: [
//         {
//             id: '',
//             title: '',
//             imageURL: '',
//             category: '',
//             calories: 0,
//             qty: 1,
//             price: 0,
//         },
//     ],
// };

const initialState: IDataState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemsToCart: (state, action: PayloadAction<IFoodItem[]>) => {
            state.items = [...state.items, ...action.payload];
        },
    },
});

export const { addItemsToCart } = cartSlice.actions;
export default cartSlice.reducer;
