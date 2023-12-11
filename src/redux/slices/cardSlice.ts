import { ICard } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ICard = {
    card: {
        cardNumber: '',
        cardExpirityDate: '',
        cardCvc: '',
    },
};

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setCard: (state, action: PayloadAction<ICard>) => {
            state.card.cardNumber = action.payload.card.cardNumber;
            state.card.cardExpirityDate = action.payload.card.cardExpirityDate;
            state.card.cardCvc = action.payload.card.cardCvc;
        },
    },
});

export const { setCard } = cardSlice.actions;
export default cardSlice.reducer;
