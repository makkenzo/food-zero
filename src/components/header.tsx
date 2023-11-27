import Image from 'next/image';
import { MdShoppingBasket } from 'react-icons/md';

const Header = () => {
    return (
        <header className="w-screen fixed z-50 p-6 px-16">
            {/* desktop & tablet */}
            <div className="hidden md:flex w-full h-full items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image src="/img/logo.png" alt="logo" width={32} height={32} className="object-cover" />
                    <p className="text-headingColor text-xl font-bold"> FoodZero</p>
                </div>
                <div className="flex items-center gap-8">
                    <ul className="flex items-center gap-8">
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            Главная
                        </li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            Меню
                        </li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            О нас
                        </li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            Сервис
                        </li>
                    </ul>

                    <div className="relative flex items-center justify-center">
                        <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-xs text-white font-semibold">2</p>
                        </div>
                    </div>

                    <Image
                        src="/img/avatar.png"
                        alt="user_profile"
                        width={40}
                        height={40}
                        className="min-w-[40px] min-h-[40px] drop-shadow-xl"
                    />
                </div>
            </div>

            {/* mobile */}
            <div className="flex md:hidden w-full h-full">dsa</div>
        </header>
    );
};

export default Header;
