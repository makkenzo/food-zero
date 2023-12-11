import { setCard } from '@/redux/slices/cardSlice';
import { RootState } from '@/redux/store';
import { ICard } from '@/types';
import { Button, Card, CardBody, CardHeader, Input, Typography } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { FaCreditCard, FaLock, FaMoneyBillWave } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

interface PaymentFormProps {
    type: string;
    setType: Dispatch<SetStateAction<string>>;
}

const PaymentForm = ({ type, setType }: PaymentFormProps) => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpires, setCardExpires] = useState('');
    const [cardCvc, setCardCvc] = useState('');

    const dispatch = useDispatch();
    const card: ICard = useSelector((state: RootState) => state.card);

    const formatExpires = (value: string) => {
        return value
            .replace(/[^0-9]/g, '')
            .replace(/^([2-9])$/g, '0$1')
            .replace(/^(1{1})([3-9]{1})$/g, '0$1/$2')
            .replace(/^0{1,}/g, '0')
            .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, '$1/$2');
    };

    const formatCardNumber = (value: string) => {
        const val = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = val.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const handleSaveCard = () => {
        dispatch(setCard({ card: { cardNumber, cardExpirityDate: cardExpires, cardCvc } }));

        setType('');
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="w-full my-8">
                <CardHeader
                    color="gray"
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center px-4 py-8 text-center"
                >
                    <div className="mb-4 h-20 p-6 text-white">
                        {type === 'card' ? (
                            <FaCreditCard className="h-10 w-10 text-white" />
                        ) : (
                            <FaMoneyBillWave className="h-10 w-10 text-white" />
                        )}
                    </div>
                    <Typography variant="h5" color="white">
                        Введите данные
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form className="mt-3 flex flex-col gap-4">
                        <div className="my-3">
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium ">
                                Номер карты
                            </Typography>
                            <Input
                                crossOrigin
                                maxLength={19}
                                value={formatCardNumber(cardNumber)}
                                onChange={(event) => setCardNumber(event.target.value)}
                                icon={<FaCreditCard className="absolute left-0 h-4 w-4 text-blue-gray-300" />}
                                placeholder={card.card.cardNumber}
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: 'before:content-none after:content-none',
                                }}
                            />
                            <div className="my-4 flex items-center gap-4">
                                <div>
                                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                        Срок действия
                                    </Typography>
                                    <Input
                                        crossOrigin
                                        maxLength={5}
                                        value={formatExpires(cardExpires)}
                                        onChange={(event) => setCardExpires(event.target.value)}
                                        containerProps={{ className: 'min-w-[72px]' }}
                                        placeholder={card.card.cardExpirityDate}
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: 'before:content-none after:content-none',
                                        }}
                                    />
                                </div>
                                <div>
                                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                        CVC
                                    </Typography>
                                    <Input
                                        crossOrigin
                                        maxLength={4}
                                        value={cardCvc}
                                        onChange={(event) => setCardCvc(event.target.value)}
                                        containerProps={{ className: 'min-w-[72px]' }}
                                        placeholder={card.card.cardCvc}
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: 'before:content-none after:content-none',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <Button size="lg" onClick={handleSaveCard}>
                            Подтвердить
                        </Button>
                        <Typography
                            variant="small"
                            color="gray"
                            className="mt-2 flex items-center justify-center gap-2 font-medium opacity-60"
                        >
                            <FaLock className="-mt-0.5 h-4 w-4" /> Платежи безопасны и зашифрованы
                        </Typography>
                    </form>
                </CardBody>
            </Card>
        </motion.div>
    );
};

export default PaymentForm;
