'use client';

import { Footer, Header, StatusContainer } from '@/components';
import store from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';

const StatusPage = () => {
    return (
        <Provider store={store}>
            <div className="w-screen h-auto flex flex-col bg-primary">
                <Header />

                <div className="main mt-24 p-8 w-full min-h-[90vh]">
                    <StatusContainer />
                </div>

                <Footer />
            </div>
        </Provider>
    );
};

export default StatusPage;
