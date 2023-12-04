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

export interface INewItem {
    id: string;
    title: string;
    imageURL: string;
    category: string;
    calories: number;
    qty: number;
    price: number;
}

// const data = {
//     id: `${Date.now()}`,
//     title: title,
//     imageURL: imageAsset,
//     category: category,
//     calories: calories,
//     qty: 1,
//     price: price,
// };
