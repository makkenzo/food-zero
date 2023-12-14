import { RootState } from '@/redux/store';
import { ICard, ICoupon, IDataState, StatusEnum } from '@/types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem, PaymentForm } from '.';
import { Card, List, ListItem, ListItemPrefix, Typography, Radio } from '@material-tailwind/react';
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import { clearCartReducer, setPriceReducer } from '@/redux/slices/cartSlice';
import { db, getCouponByCode, placeOrder } from '../../firebase.config';
import { redirect, useRouter } from 'next/navigation';
import { setStatus } from '@/redux/slices/statusSlice';

const CheckOutContainer = () => {
    const cart: IDataState = useSelector((state: RootState) => state.cart);
    const card: ICard = useSelector((state: RootState) => state.card);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const router = useRouter();

    const [couponCode, setCouponCode] = useState('');
    const [couponResponse, setCouponResponse] = useState<boolean | ICoupon>();
    const [totalAmount, setTotalAmount] = useState(0);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [paymentType, setPaymentType] = useState('');
    const [deliveryInstructions, setDeliveryInstructions] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [makeOrderErrorMessage, setMakeOrderErrorMessage] = useState('');

    const [flag, setFlag] = useState<number>(0);

    const handleCouponValidate = () => {
        const fetchData = async () => {
            try {
                const response = await getCouponByCode(db, couponCode);

                setCouponResponse(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    };

    useEffect(() => {
        let totalPrice = cart.items.reduce(function (accumulator, item) {
            return accumulator + item.qty * item.price;
        }, 0);

        if (cart.deliveryPrice !== undefined) {
            dispatch(setPriceReducer({ subTotal: totalPrice, deliveryPrice: cart.deliveryPrice }));
            setTotalAmount(totalPrice + cart.deliveryPrice);
            if (typeof couponResponse === 'object') {
                setTotalAmount((totalPrice + cart.deliveryPrice) * ((100 - couponResponse.discountPercentage) / 100));
                setCouponDiscount(
                    totalPrice +
                        cart.deliveryPrice -
                        (totalPrice + cart.deliveryPrice) * ((100 - couponResponse.discountPercentage) / 100)
                );
            }
        }
    }, [flag, cart.items, couponResponse]);

    const handleMakeOrder = async () => {
        if (!paymentType) {
            setMakeOrderErrorMessage('Выберите способ оплаты.');
            return;
        }
        if (paymentType === 'card' && !deliveryAddress) {
            setMakeOrderErrorMessage('Введите адрес доставки для оплаты картой.');
            return;
        }
        if (paymentType === 'cash' && !deliveryAddress) {
            setMakeOrderErrorMessage('Введите адрес доставки для наличной оплаты.');
            return;
        }
        setMakeOrderErrorMessage('');

        try {
            const response = await placeOrder(user.uid, cart.items, deliveryInstructions, paymentType, totalAmount);

            if (response) {
                console.log('Order placed successfully. OrderId:', response);
                dispatch(clearCartReducer(true));
                dispatch(setStatus({ status: StatusEnum.Success }));
                router.push('/status');
            } else {
                console.error('Failed to place order. Response:', response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="grid grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Ваш заказ</h2>
                {cart.items.map((item) => (
                    <CartItem key={item.id} item={item} setFlag={setFlag} flag={flag} isRouded={false} />
                ))}
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <fieldset>
                    <legend className="font-semibold mb-4">Способ оплаты</legend>

                    <Card className="shadow-xl">
                        <List>
                            <ListItem className="p-0" onClick={() => setPaymentType('card')}>
                                <label
                                    htmlFor="vertical-list-react"
                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                >
                                    <ListItemPrefix className="mr-3">
                                        <Radio
                                            crossOrigin
                                            name="vertical-list"
                                            id="vertical-list-react"
                                            ripple={false}
                                            className="hover:before:opacity-0"
                                            containerProps={{
                                                className: 'p-0',
                                            }}
                                        />
                                    </ListItemPrefix>
                                    <Typography
                                        color="blue-gray"
                                        className="font-medium text-blue-gray-400 flex items-center space-x-2 w-full"
                                    >
                                        <FaCreditCard size={25} color="#000" />
                                        <div className="flex justify-between w-full">
                                            <span>Картой</span>
                                            <span>{'*' + card.card.cardNumber.slice(-4)}</span>
                                        </div>
                                    </Typography>
                                </label>
                            </ListItem>
                            <ListItem className="p-0" onClick={() => setPaymentType('cash')}>
                                <label
                                    htmlFor="vertical-list-svelte"
                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                >
                                    <ListItemPrefix className="mr-3">
                                        <Radio
                                            crossOrigin
                                            name="vertical-list"
                                            id="vertical-list-svelte"
                                            ripple={false}
                                            className="hover:before:opacity-0"
                                            containerProps={{
                                                className: 'p-0',
                                            }}
                                        />
                                    </ListItemPrefix>
                                    <Typography
                                        color="blue-gray"
                                        className="font-medium text-blue-gray-400 flex items-center space-x-2"
                                    >
                                        <FaMoneyBillWave size={25} color="#86dc3d" />
                                        <span>Наличными курьеру</span>
                                    </Typography>
                                </label>
                            </ListItem>
                        </List>
                    </Card>
                </fieldset>
                {paymentType === 'card' ? (
                    <PaymentForm type={paymentType} setType={setPaymentType} />
                ) : (
                    <div className="my-4"></div>
                )}
                <div>
                    <h2 className="font-semibold mb-4">Цены и купон</h2>
                    <div className="mb-4">
                        <div className="flex justify-between w-full text-gray-500">
                            <p>Промежуточная сумма</p>
                            <p>{cart.subTotal} ₸</p>
                        </div>
                        <div className="flex justify-between w-full text-gray-500">
                            <p>Стоимость доставки</p>
                            <p>{cart.deliveryPrice} ₸</p>
                        </div>
                        <div className="flex justify-between w-full text-gray-500">
                            <p>
                                Скидка{' '}
                                {couponResponse && typeof couponResponse === 'object'
                                    ? `${couponResponse.discountPercentage}%`
                                    : '0%'}
                            </p>
                            <p>-{couponDiscount} ₸</p>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between w-full">
                            <p>Итого</p>
                            <p>{totalAmount} ₸</p>
                        </div>
                        <div>
                            <div className="flex justify-between w-full mt-2">
                                <input
                                    type="text"
                                    className=" p-2 border-l border-t border-b border-gray-300 outline-none w-full"
                                    placeholder="Введите купон"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <button
                                    onClick={handleCouponValidate}
                                    className="w-full md:w-auto bg-green-500 hover:bg-green-600 outline-none px-4 py-2 text-md text-white rounded-r-md border-t border-r border-b border-gray-300"
                                >
                                    Применить
                                </button>
                            </div>
                            {couponResponse && typeof couponResponse === 'object' ? (
                                <p className="text-sm text-green-500 mt-2">
                                    Поздравляем! С купоном {couponResponse.code} вы получили скидку в{' '}
                                    {couponResponse.discountPercentage}%!
                                </p>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Условия доставки</h2>
                <div className="mb-4">
                    <label htmlFor="delivery-address" className="block text-sm font-medium mb-2">
                        Адрес доставки
                    </label>
                    <input
                        type="text"
                        id="delivery-address"
                        className="border p-2 w-full rounded-md"
                        placeholder="Введите ваш адрес"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="delivery-instructions" className="block text-sm font-medium mb-2">
                        Инструкции к доставке
                    </label>
                    <textarea
                        id="delivery-instructions"
                        className="border p-2 w-full rounded-md resize-none"
                        placeholder="Особые инструкции или заметки к заказу"
                        value={deliveryInstructions}
                        onChange={(e) => setDeliveryInstructions(e.target.value)}
                    />
                </div>
                <div className="w-full mb-4">
                    <button
                        type="button"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                        onClick={handleMakeOrder}
                    >
                        Оформить заказ
                    </button>
                </div>
                <div className="mb-4">
                    <p className="text-sm text-red-500">{makeOrderErrorMessage}</p>
                </div>
            </div>
        </div>
    );
};

export default CheckOutContainer;
