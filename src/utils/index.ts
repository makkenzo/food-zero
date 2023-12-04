export const formatNumber = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
};
