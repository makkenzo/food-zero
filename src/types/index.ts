import firebase from 'firebase/compat/app';

export interface IUser {
    displayName: string;
    email: string;
    phoneNumber: string | null;
    photoURL: string;
    providerId: string;
    uid: string;
}

export interface IHeroData {
    id: number;
    name: string;
    description: string;
    price: number;
    imageSrc: string;
}

export interface ICategory {
    id: number;
    name: string;
    urlParamName: string;
}

export interface IFoodItem {
    id: string | null;
    title: string | null;
    imageURL: string | undefined;
    category: string | null;
    calories: number | null;
    qty: number;
    price: number;
}

export interface ICartItem {
    id: string;
    title: string;
    imageURL: string | undefined;
    category: string;
    calories: number;
    qty: number;
    price: number;
}

export interface IDataState {
    items: IFoodItem[];
    isCartShow: boolean;
    subTotal?: number;
    deliveryPrice?: number;
}

export interface ICoupon {
    code: string;
    discountPercentage: number;
    expiryDate: string;
}

export interface ICard {
    card: {
        cardNumber: string;
        cardExpirityDate: string;
        cardCvc: string;
    };
}

export interface IOrder {
    cartItems: IFoodItem[];
    deliveryInstructions: string;
    deliveryStatus: string;
    orderId: string;
    orderStatus: string;
    paymentMethod: string;
    timestamp: firebase.firestore.Timestamp;
    totalPrice: number;
    userUid: string;
}

export enum StatusEnum {
    Success = 'success',
    Pending = 'pending',
    Failure = 'failure',
}

export interface IStatus {
    status: StatusEnum;
}
