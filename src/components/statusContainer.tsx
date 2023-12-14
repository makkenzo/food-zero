import { RootState } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoCheckmarkDoneCircle, IoTime, IoCloseCircle } from 'react-icons/io5';
import { Button } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';

const StatusContainer = () => {
    const status = useSelector((state: RootState) => state.status.status);

    const [statusMessage, setStatusMessage] = useState('');
    const [statusIcon, setStatusIcon] = useState<JSX.Element | null>(null);

    const router = useRouter();

    useEffect(() => {
        switch (status) {
            case 'success':
                setStatusMessage('Успех');
                setStatusIcon(<IoCheckmarkDoneCircle size={80} className="-mr-8 opacity-10" />);
                break;
            case 'pending':
                setStatusMessage('В процессе');
                setStatusIcon(<IoTime size={80} className="-mr-8 opacity-10" />);
                break;
            case 'failure':
                setStatusMessage('Отказано');
                setStatusIcon(<IoCloseCircle size={80} className="-mr-8 opacity-10" />);
                break;
            default:
                setStatusMessage('Произошла ошибка..');
                break;
        }
    }, []);

    return (
        <div className="w-1/4 h-full mx-auto my-64 bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col space-y-4">
                <div className="flex justify-center items-center">
                    {statusIcon}
                    <h1 className="text-xl pt-1 z-10 bg-black text-white rounded-lg px-2 bg-opacity-60">
                        {statusMessage}
                    </h1>
                </div>
                <div className="flex w-full space-x-2">
                    {status === 'success' && (
                        <Button className="w-full" onClick={() => router.push('/orders')}>
                            Мои заказы
                        </Button>
                    )}
                    <Button className="w-full" onClick={() => router.push('/')}>
                        На главную
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StatusContainer;
