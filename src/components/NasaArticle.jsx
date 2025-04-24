import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Grid } from "@mui/material";


const MotionBox = motion(Box);
const NasaArticle = ({ article }) => {
    if (!article) return null;

    return (
        <>
            <Typography variant="h3" gutterBottom color="#6C6A61">{article.title}</Typography>
            <Typography variant="body2" fontSize="1.5rem" color="#6C6A61">
                &nbsp;&nbsp;published:&nbsp;{article.date} <br />&nbsp;&nbsp;by:&nbsp; {article.copyright?.trim() ? article.copyright : "NASA"}
                <br /><br />
            </Typography>
            <Typography variant="body1" fontSize="1.4rem" color="#BDC3CB">
                &nbsp;&nbsp;&nbsp;&nbsp;{article.explanation}
                <br /><br />
            </Typography>

            {/* IMAGE */}                        
            <Grid item xs={12} md={8}>
              {article.media_type === "image" && (
                <MotionBox
                  component="img"
                  src={article.url}
                  alt={article.title}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  sx={{
                    width: "100%",
                    borderRadius: 3,
                    opacity: 0.85,
                    boxShadow: 5,
                  }}
                />
              )}
            </Grid>

        </>
    );
};

export default NasaArticle;
