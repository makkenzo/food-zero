'use client';

import { Header, MainContainer } from '@/components';
import React from 'react';
import { AnimatePresence } from 'framer-motion';

const HomePage = () => {
    return (
        <AnimatePresence>
            <div className="w-screen h-auto flex flex-col bg-primary">
                <Header />

                <main className="mt-24 p-8 w-full">
                    <MainContainer />
                </main>
            </div>
        </AnimatePresence>
    );
};

export default HomePage;
