'use client';

import { Header, MainContainer } from '@/components';
import store from '@/redux/store';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Provider } from 'react-redux';

const HomePage = () => {
    return (
        <Provider store={store}>
            <AnimatePresence mode="wait">
                <div className="w-screen h-auto flex flex-col bg-primary">
                    <Header />

                    <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
                        <MainContainer />
                    </main>
                </div>
            </AnimatePresence>
        </Provider>
    );
};

export default HomePage;
