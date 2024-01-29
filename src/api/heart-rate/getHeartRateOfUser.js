
export const getHeartRateOfUser = async (idProduct) => {
    const user = await fetch(`https://dummyjson.com/products/${idProduct}`);
    if (!user) {
        throw new Error("User not found");
    }

    return user;
}
