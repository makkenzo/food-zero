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
    qty: number | null;
    price: number | null;
}

export interface IDataState {
    items: IFoodItem[];
}
