const MAX_ATTEMPTS = 3;
const STORAGE_KEY = "forgotPasswordAttempts";

export const getAttempts = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
};

export const incrementAttempts = () => {
    const current = getAttempts();
    localStorage.setItem(STORAGE_KEY, current + 1);
};

export const resetAttempts = () => {
    localStorage.setItem(STORAGE_KEY, "0");
};

export const shouldShowCaptcha = () => {
    return getAttempts() >= MAX_ATTEMPTS;
};
