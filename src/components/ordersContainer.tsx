import { FaCalendarAlt, FaCheckCircle, FaMoneyCheckAlt } from 'react-icons/fa';
import { FaBowlFood, FaClipboardList, FaSackDollar } from 'react-icons/fa6';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { TbTruckDelivery } from 'react-icons/tb';
import { RootState } from '@/redux/store';
import { IFoodItem, IOrder } from '@/types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db, getUserOrders } from '../../firebase.config';

const OrdersContainer = () => {
    const [userOrders, setUserOrders] = useState<IOrder[]>([]);
    const uid = useSelector((state: RootState) => state.auth.user.uid);

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                const orders = await getUserOrders(db, uid);

                setUserOrders(orders);
            } catch (error) {
                console.error('~ Error fetching user orders:', error);
            }
        };

        if (uid) {
            fetchUserOrders();
        }
    }, [uid]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Мои заказы</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userOrders &&
                    userOrders.map((order) => (
                        <div
                            key={order.orderId}
                            className="bg-white rounded-lg overflow-hidden shadow-md p-6 flex flex-col justify-between"
                        >
                            <div>
                                <p className="text-lg font-semibold">Заказ №: {order.orderId}</p>

                                <p className="text-gray-600 flex">
                                    <FaSackDollar className="mr-2 mt-0.5" /> Итоговая цена: {order.totalPrice} ₸
                                </p>
                                <p className="text-gray-600 flex">
                                    <FaBowlFood className="mr-2 mt-0.5" /> Статус заказа:{' '}
                                    {order.orderStatus === 'pending' ? 'В обработке' : order.orderStatus}
                                </p>
                                <p className="text-gray-600 flex">
                                    <TbTruckDelivery className="mr-2 mt-0.5" />
                                    Статус доставки:{' '}
                                    {order.deliveryStatus === 'pending' ? 'В обработке' : order.orderStatus}
                                </p>
                                <p className="text-gray-600 flex">
                                    <FaClipboardList className="mr-2 mt-0.5" />
                                    Инструкции курьеру:{' '}
                                    {order.deliveryInstructions !== ''
                                        ? order.deliveryInstructions
                                        : 'Инструкций нет..'}
                                </p>
                                <p className="text-gray-600 flex">
                                    <RiSecurePaymentFill className="mr-2 mt-0.5" />
                                    Метод оплаты:{' '}
                                    {order.paymentMethod === 'cash'
                                        ? 'Наличными курьеру'
                                        : order.paymentMethod === 'card'
                                        ? 'Картой'
                                        : order.paymentMethod}
                                </p>
                                <p className="text-gray-600 flex">
                                    <FaCalendarAlt className="mr-2 mt-0.5" />
                                    Дата и время: {order.timestamp.toDate().toLocaleString()}
                                </p>
                                <h3 className="text-lg font-semibold mt-4">Позиции заказа:</h3>
                                <ul className="list-disc pl-4">
                                    {order.cartItems.map((item: IFoodItem) => (
                                        <li key={item.id} className="text-gray-600">
                                            <p>Название: {item.title}</p>
                                            <p>Цена: {item.price} ₸</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-gray-600 flex">
                                    <FaMoneyCheckAlt className="mr-2 mt-0.5" />
                                    Оплачено
                                </p>
                                <p className="text-green-500 flex">
                                    <FaCheckCircle className="mr-2 mt-0.5" />
                                    Успешно
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default OrdersContainer;
