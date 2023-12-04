import { ICategory } from '@/types';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { motion } from 'framer-motion';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FaTenge } from 'react-icons/fa';
import { MdCloudUpload, MdDelete, MdFastfood, MdFoodBank } from 'react-icons/md';
import { Loader } from '.';
import { db, getCategories, saveNewItem, storage } from '../../firebase.config';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { redirect } from 'next/navigation';

const CreateItem = () => {
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState<ICategory[]>();
    const [price, setPrice] = useState<number>();
    const [category, setCategory] = useState('');
    const [fields, setFields] = useState(false);
    const [alertStatus, setAlertStatus] = useState('danger');
    const [message, setMessage] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageAsset, setImageAsset] = useState<undefined | string>('');
    const [calories, setCalories] = useState<number>();

    const user = useSelector((state: RootState) => state.auth.user);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchCategories = async () =>
            await getCategories(db).then((data) => {
                setCategories(data);
            });

        fetchCategories();
    }, []);

    useEffect(() => {
        if (user.email === 'nekgo2009@gmail.com') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
            redirect('/');
        }
    }, [user]);

    const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);

        const imageFile = e.target.files?.[0];

        if (imageFile) {
            const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    console.log(error);
                    setFields(true);
                    setMessage('Произошла ошибка при попытке загрузить изображение');
                    setAlertStatus('danger');
                    setTimeout(() => {
                        setFields(false);
                        setIsLoading(false);
                    }, 4000);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageAsset(downloadURL);
                        setIsLoading(false);
                        setFields(true);
                        setMessage('Изображение загрузилось успешно');
                        setAlertStatus('success');
                        setTimeout(() => {
                            setFields(false);
                        }, 4000);
                    });
                }
            );
        }
    };

    const deleteImage = () => {
        setIsLoading(true);

        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then(() => {
            setImageAsset(undefined);
            setIsLoading(false);
            setFields(true);
            setMessage('Изображение успешно удалено');
            setAlertStatus('success');
            setTimeout(() => {
                setFields(false);
            }, 4000);
        });
    };

    const saveDetails = () => {
        setIsLoading(true);

        try {
            if (!title || !calories || !imageAsset || !price || !category) {
                setFields(true);
                setMessage('Заполните все данные!');
                setAlertStatus('danger');
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 4000);
            } else {
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    imageURL: imageAsset,
                    category: category,
                    calories: calories,
                    qty: 1,
                    price: price,
                };

                saveNewItem(data);
                setIsLoading(false);
                setFields(true);
                setMessage('Данные успешно загружены');
                setAlertStatus('success');
                setTimeout(() => {
                    setFields(false);
                }, 4000);
                clearData();
            }
        } catch (error) {
            console.log(error);
            setFields(true);
            setMessage('Произошла ошибка при сохранении');
            setAlertStatus('danger');
            setTimeout(() => {
                setFields(false);
                setIsLoading(false);
            }, 4000);
        }
    };

    const clearData = () => {
        setTitle('');
        setImageAsset(undefined);
        setCalories(0);
        setPrice(0);
        setCategory('other');
    };

    return (
        <div className="w-full min-h-[83vh] flex items-center justify-center">
            <div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
                {fields && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
                            alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'
                        }`}
                    >
                        {message}
                    </motion.p>
                )}

                <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                    <MdFastfood />
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Введите название.."
                        className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                    />
                </div>

                <div className="w-full">
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursour-pointer"
                    >
                        <option value="other" className="bg-white">
                            Выберите категорию
                        </option>
                        {categories &&
                            categories.map((item) => (
                                <option
                                    key={item.id}
                                    value={item.urlParamName}
                                    className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                                >
                                    {item.name}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            {!imageAsset ? (
                                <>
                                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                            <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                                            <p className="text-gray-500 hover:text-gray-700">
                                                Нажмите сюда чтобы загрузить
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            name="uploadimage"
                                            accept="image/*"
                                            onChange={uploadImage}
                                            className="w-0 h-0"
                                        />
                                    </label>
                                </>
                            ) : (
                                <>
                                    <div className="relative h-full">
                                        <img
                                            src={imageAsset}
                                            alt="uploaded image"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                                            onClick={deleteImage}
                                        >
                                            <MdDelete className="text-white" />
                                        </button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>

                <div className="w-full flex flex-col md:flex-row items-center gap-3">
                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                        <MdFoodBank className="text-gray-700 text-2xl" />
                        <input
                            type="number"
                            required
                            value={calories}
                            onChange={(e) => setCalories(parseFloat(e.target.value))}
                            placeholder="Калории"
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                        />
                    </div>

                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                        <FaTenge className="text-gray-700 text-xl" />
                        <input
                            type="number"
                            required
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                            placeholder="Цена"
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                        />
                    </div>
                </div>

                <div className="flex items-center w-full">
                    <button
                        type="button"
                        className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
                        onClick={saveDetails}
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateItem;
