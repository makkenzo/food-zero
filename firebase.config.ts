import { ICartItem, ICategory, ICoupon, IFoodItem, IOrder } from '@/types';
import { initializeApp, getApp, getApps } from 'firebase/app';
import {
    FieldValue,
    Firestore,
    Timestamp,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    orderBy,
    query,
    setDoc,
    where,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyDa-71Ta2Vf9J2_d9g9G7P-Sk412U_x3ow',
    authDomain: 'food-zero-5d31b.firebaseapp.com',
    databaseURL: 'https://food-zero-5d31b-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'food-zero-5d31b',
    storageBucket: 'food-zero-5d31b.appspot.com',
    messagingSenderId: '722974549576',
    appId: '1:722974549576:web:774d5ee6dd3338694c5a7d',
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

const getCategories = async (db: Firestore): Promise<ICategory[]> => {
    const categoriesCol = collection(db, 'categories');
    const categorySnapshot = await getDocs(categoriesCol);
    const categoryList: ICategory[] = categorySnapshot.docs.map((doc) => doc.data() as ICategory);
    return categoryList;
};

const saveNewItem = async (data: IFoodItem) => {
    await setDoc(doc(db, 'foodItems', `${Date.now()}`), data, {
        merge: true,
    });
};

const getItems = async (): Promise<IFoodItem[]> => {
    const itemsSnapshot = await getDocs(query(collection(db, 'foodItems'), orderBy('id', 'desc')));
    const itemsList: IFoodItem[] = itemsSnapshot.docs.map((doc) => doc.data() as IFoodItem);

    return itemsList;
};

const getCouponByCode = async (db: Firestore, couponCode: string) => {
    try {
        const couponCol = collection(db, 'coupons');
        const couponQuery = query(couponCol, where('code', '==', couponCode));
        const couponSnapshot = await getDocs(couponQuery);

        if (couponSnapshot.size > 0) {
            return couponSnapshot.docs[0].data() as ICoupon;
        } else {
            return false;
        }
    } catch (error) {
        console.error('~ Error retrieving coupon:', error);
        throw error;
    }
};

const getUserOrders = async (db: Firestore, uid: string) => {
    try {
        const ordersCol = collection(db, 'orders');
        const orderQuery = query(ordersCol, where('userUid', '==', uid));
        const orderSnapshot = await getDocs(orderQuery);

        if (orderSnapshot.size > 0) {
            // Map the array of orders
            return orderSnapshot.docs.map((doc) => doc.data() as IOrder);
        } else {
            return []; // Return an empty array if no orders found
        }
    } catch (error) {
        console.error('~ Error retrieving user orders:', error);
        throw error;
    }
};

const placeOrder = async (
    uid: string,
    items: IFoodItem[],
    deliveryInstructions: string,
    paymentMethod: string,
    totalPrice: number
) => {
    try {
        const ordersCol = collection(db, 'orders');
        const orderId = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;

        const orderData: IOrder = {
            userUid: uid,
            cartItems: items,
            deliveryInstructions,
            deliveryStatus: 'pending',
            orderId,
            orderStatus: 'pending',
            paymentMethod,
            timestamp: Timestamp.fromDate(new Date()),
            totalPrice,
        };

        await setDoc(doc(ordersCol, orderId), orderData);

        return orderId;
    } catch (error) {
        console.error('~ Error placing order:', error);
        throw error;
    }
};

export { app, db, storage, getCategories, saveNewItem, getItems, getCouponByCode, getUserOrders, placeOrder };
