import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-orange-500 text-white p-8">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="mb-4 lg:mb-0">
                        <h1 className="text-2xl font-semibold">FoodZero</h1>
                        <p className="text-sm">Вкусная еда. Удобная доставка. Прямо к вам.</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Контакты</h2>
                        <p className="text-sm">Телефон: +7 (123) 456-7890</p>
                        <p className="text-sm">Email: info@foodzero.com</p>
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t border-white opacity-75"></div>
            <div className="mt-4 text-sm text-center">
                &copy; {new Date().getFullYear()} FoodZero Express Services. Все права защищены.
            </div>
        </footer>
    );
};

export default Footer;
