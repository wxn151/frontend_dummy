export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return regex.test(password);
};


export const validateUsername = (username) => {
    return username.length >= 4 && username.length <= 30;
};
