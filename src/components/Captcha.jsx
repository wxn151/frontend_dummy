import { useEffect, useState } from "react";
import { Box, Card, CardActionArea, Typography } from "@mui/material";

const getRandomNumbers = () => {
    const a = Math.floor(Math.random() * 99) + 1;
    const b = Math.floor(Math.random() * 99) + 1;
    const result = a + b;
    const options = new Set([result]);

    while (options.size < 3) {
        options.add(Math.floor(Math.random() * 198) + 2);
    }

    const shuffled = Array.from(options).sort(() => Math.random() - 0.5);
    return { a, b, result, options: shuffled };
};

const Captcha = ({ onValidate }) => {
    const [challenge, setChallenge] = useState(getRandomNumbers());
    const [correctValue, setCorrectValue] = useState(null); // solo si es correcta

    const handleClick = (value) => {
        const isValid = value === challenge.result;
        if (isValid) {
            setCorrectValue(value);
            onValidate(true);
        } else {
            setChallenge(getRandomNumbers());
            setCorrectValue(null);
            onValidate(false);
        }
    };

    useEffect(() => {
        setChallenge(getRandomNumbers());
    }, []);

    return (
        <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
                Please solve: {challenge.a} + {challenge.b}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                {challenge.options.map((num, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: 60,
                            border: correctValue === num ? "2px solid #7CFC00" : "none",
                            backgroundColor: correctValue === num ? "#inherit" : "inherit",
                            transition: "all 0.3s",
                            "&:hover": {
                                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                            },
                        }}
                    >
                        <CardActionArea
                            disabled={correctValue !== null}
                            onClick={() => handleClick(num)}
                        >
                            <Box p={1}>
                                <Typography variant="h6" align="center">
                                    {num}
                                </Typography>
                            </Box>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>

            {correctValue !== null && (
                <Typography variant="caption" color="success.main" sx={{ mt: 1 }}>
                    Completed!
                </Typography>
            )}
        </Box>
    );
};

export default Captcha;
