import { ICategory, IFoodItem } from '@/types';
import React, { useEffect, useState } from 'react';
import { db, getCategories } from '../../firebase.config';
import { motion } from 'framer-motion';
import { IoFastFood } from 'react-icons/io5';
import { RowContainer } from '.';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const MenuContainer = () => {
    const [searchFilter, setSearchFilter] = useState('pizza-pasta');
    const [categories, setCategories] = useState<ICategory[]>();
    const data = useSelector((state: RootState) => state.data.items);

    useEffect(() => {
        const fetchCategories = async () =>
            await getCategories(db).then((data) => {
                setCategories(data);
            });

        fetchCategories();
    }, []);

    return (
        <section className="w-full my-6" id="menu">
            <div className="w-full flex flex-col items-center justify-center">
                <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
                    Наши горячие блюда
                </p>

                <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll no-scrollbar">
                    {categories &&
                        categories.map((category) => (
                            <motion.div
                                whileTap={{ scale: 0.75 }}
                                key={category.id}
                                className={`group ${
                                    searchFilter === category.urlParamName ? ' bg-cartNumBg' : 'bg-card'
                                } w-28 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg`}
                                onClick={() => setSearchFilter(category.urlParamName)}
                            >
                                <div
                                    className={`w-10 h-10 rounded-full shadow-lg ${
                                        searchFilter === category.urlParamName ? 'bg-white' : 'bg-cartNumBg'
                                    } group-hover:bg-white flex items-center justify-center`}
                                >
                                    <IoFastFood
                                        className={`${
                                            searchFilter === category.urlParamName ? 'text-textColor' : 'text-white'
                                        } group-hover:text-textColor text-lg`}
                                    />
                                </div>
                                <p
                                    className={`text-sm ${
                                        searchFilter === category.urlParamName ? 'text-white' : 'text-textColor'
                                    } text-center group-hover:text-white`}
                                >
                                    {category.name}
                                </p>
                            </motion.div>
                        ))}
                </div>

                <div className="w-full">
                    <RowContainer flag={false} data={data?.filter((n: IFoodItem) => n.category == searchFilter)} />
                </div>
            </div>
        </section>
    );
};

export default MenuContainer;
