'use client';

import { CreateItem, Header } from '@/components';
import store from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';

const CreateItemPage = () => {
    return (
        <Provider store={store}>
            <div className="w-screen h-auto flex flex-col bg-primary">
                <Header />

                <main className="mt-24 p-8 w-full">
                    <CreateItem />
                </main>
            </div>
            s
        </Provider>
    );
};

export default CreateItemPage;
