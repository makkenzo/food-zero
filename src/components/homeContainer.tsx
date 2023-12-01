import Image from 'next/image';

const HomeContainer = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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

                <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
                    The fastest delivery in{' '}
                    <span className="text-orange-600 text-[3rem] lg:text-[5rem]">your city</span>
                </p>

                <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus quos quibusdam officiis maiores
                    sed odit placeat fugiat in mollitia, veniam saepe expedita magnam laudantium porro numquam nobis
                    dolore modi et?
                </p>

                <button
                    type="button"
                    className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
                >
                    Заказать сейчас
                </button>
            </div>
            <div className="p-4 bg-blue-400 flex-1"></div>
        </div>
    );
};

export default HomeContainer;