import { useState } from "react";

const useAttemptCounter = () => {
    const [attempts, setAttempts] = useState(0);

    const increment = () => setAttempts((prev) => prev + 1);
    const reset = () => setAttempts(0);

    return { attempts, increment, reset };
};

export default useAttemptCounter;
