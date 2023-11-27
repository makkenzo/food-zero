'use client';

import { Header, MainContainer } from '@/components';
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux';
import store from '@/redux/store';

const HomePage = () => {
    return (
        <Provider store={store}>
            <AnimatePresence>
                <div className="w-screen h-auto flex flex-col bg-primary">
                    <Header />

                    <main className="mt-24 p-8 w-full">
                        <MainContainer />
                    </main>
                </div>
            </AnimatePresence>
        </Provider>
    );
};

export default HomePage;
