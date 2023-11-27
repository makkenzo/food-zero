import { CreateItem, Header } from '@/components';
import React from 'react';

const CreateItemPage = () => {
    return (
        <div className="w-screen h-auto flex flex-col bg-primary">
            <Header />

            <main className="mt-24 p-8 w-full">
                <CreateItem />
            </main>
        </div>
    );
};

export default CreateItemPage;
