import { IHeroData } from '@/types';
import Image from 'next/image';

const heroData: IHeroData[] = [
    {
        id: 1,
        name: 'Мороженое',
        description: 'Шоколад и ваниль',
        price: 3430,
        imageSrc: '/img/i1.png',
    },
    {
        id: 2,
        name: 'Клубника',
        description: 'Свежая клубника',
        price: 700,
        imageSrc: '/img/f1.png',
    },
    {
        id: 3,
        name: 'Куриный шашлык',
        description: 'Тарелка смешанного кебаба',
        price: 3100,
        imageSrc: '/img/c3.png',
    },
    {
        id: 4,
        name: 'Рыбный шашлык',
        description: 'Смешанный рыбный шашлык',
        price: 3790,
        imageSrc: '/img/fi1.png',
    },
];

const HomeContainer = () => {
    const formatNumber = (price: number) => {
        return new Intl.NumberFormat('ru-RU').format(price);
    };

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-[88vh]" id="home">
            <div className="py-2 flex-1 flex flex-col items-center md:items-start justify-center gap-6">
                <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
                    <p className="text-base text-orange-500 font-semibold">Доставка курьером</p>
                    <div className="rounded-full overflow-hidden bg-white drop-shadow-xl">
                        <Image
                            src="/img/delivery2.png"
                            alt="delivery"
                            width={32}
                            height={32}
                            className="w-full h-full object-contain p-1"
                        />
                    </div>
                </div>

                <p className="text-[2.5rem] lg:text-[5.5rem] font-bold tracking-wide text-headingColor">
                    Быстрейшая доставка в <span className="text-orange-600">твоем городе</span>
                </p>

                <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
                    Оптимальная доставка, которая сочетает в себе скорость и надежность. Наши курьеры оперативно
                    доставляют заказы прямо к твоему порогу. Мы заботимся о твоем времени и гарантируем высший уровень
                    сервиса.
                </p>

                <button
                    type="button"
                    className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
                >
                    Заказать сейчас
                </button>
            </div>
            <div className="p-4 flex-1 flex items-center relative">
                <Image
                    src="/img/heroBg.png"
                    alt="heroBg"
                    className="ml-auto w-full lg:w-auto lg:h-650"
                    width={520}
                    height={815}
                />

                <div className="w-full h-full absolute top-0 left-28 flex items-center justify-center px-32 py-4 gap-8 flex-wrap">
                    {heroData && heroData.length > 0 ? (
                        heroData.map((item, index) => (
                            <div
                                key={item.id}
                                className="lg:w-[210px] p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                            >
                                <Image
                                    src={item.imageSrc}
                                    className="w-20 lg:w-40 -mt-20"
                                    alt="i1"
                                    width={805}
                                    height={837}
                                />
                                <p className="text-xl font-semibold text-textColor mt-4">{item.name}</p>
                                <p className="text-sm text-lighttextGray font-semibold my-4">{item.description}</p>
                                <p className="text-sm font-semibold text-headingColor">
                                    {formatNumber(item.price)} <span className="text-xs text-red-600">₸</span>
                                </p>
                            </div>
                        ))
                    ) : (
                        <h1>No data</h1>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HomeContainer;
