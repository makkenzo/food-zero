'use client';

import { Footer, Header } from '@/components';
import CheckOutContainer from '@/components/checkOutContainer';
import store from '@/redux/store';
import { Provider } from 'react-redux';

const CheckOutPage = () => {
    return (
        <Provider store={store}>
            <div className="w-screen h-auto flex flex-col bg-primary">
                <Header />

                <div className="main mt-24 p-8 w-full min-h-[90vh]">
                    <CheckOutContainer />
                </div>

                <Footer />
            </div>
        </Provider>
    );
};

export default CheckOutPage;
