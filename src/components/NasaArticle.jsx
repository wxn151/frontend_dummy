import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Grid } from "@mui/material";
import FavoriteButton from "./FavoriteButton";

const MotionBox = motion(Box);

const NasaArticle = ({ article }) => {
    if (!article) return null;

    const title = article.title;
    const published = article.date;
    const copyright = article.copyright?.trim() ? article.copyright : "NASA";
    const hash = article.date.replaceAll("-", "");

    return (
        <>
            {/* Article Title */}
            <MotionBox
                initial={{ opacity: 0.4, x: 13, y: -.1 }}
                animate={{ opacity: 0.99, x: 0, y: 0 }}
                transition={{ duration: .05, ease: "easeOut", delay: 0 }}
                sx={{ marginLeft: "50px" }}
            >
                <Typography variant="h4" gutterBottom color="#6C6A61">
                    {title} 
                    &nbsp;&nbsp;&nbsp;
                    {/* Favorite Button */}
                    <FavoriteButton
                        title={title}
                        published={published}
                        copyright={copyright}
                        hash={hash}
                    />
                </Typography>

                
            </MotionBox>

            
            {/* Article Meta Information */}
            <MotionBox
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 0.77, x: 0 }}
                transition={{ duration: 0.1, ease: "easeOut", delay: 0.76 }}
                sx={{ marginLeft: "50px" }}
            >
                <Typography variant="body2" fontSize="1.5rem" color="#6C6A61">
                    Published:&nbsp;{published}
                    <br />
                    By:&nbsp;{copyright}
                    <br />
                </Typography>
            </MotionBox>

            {/* Flexbox container for Image and Text */}
            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "row", gap: "30px", padding: "20px" }}>
                {/* Left Side: Image */}
                <Box
                    sx={{
                        display: "flex",
                        position: "relative",
                        width: "40%",  // Take up less width for a more balanced look
                    }}
                >
                    {article.media_type === "image" && article.url?.startsWith("http") && (
                        <MotionBox
                            initial={{ opacity: 0, x: 3 }}
                            animate={{ opacity: 0.8, x: 0 }}
                            transition={{ duration: 0.07, ease: "easeOut", delay: 0.76 }}
                            sx={{
                                width: "100%",
                                objectFit: "cover", // Makes the image responsive
                                borderRadius: 3,
                                opacity: 0.85,
                                boxShadow: 5,
                            }}
                        >
                            <Box
                                component="img"
                                src={article.url}
                                alt={article.title}
                                sx={{
                                    width: "100%",
                                    borderRadius: 5,
                                }}
                            />
                        </MotionBox>
                    )}
                </Box>

                {/* Right Side: Text */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        width: "55%", // Text takes up more space
                        paddingLeft: "30px", // Padding for spacing
                    }}
                >
                    <Typography variant="body1" fontSize="1.3rem" color="#BDC3CB">
                        {article.explanation}
                    </Typography>
                </Box>
            </Box>

        </>
    );
};


export default NasaArticle;
