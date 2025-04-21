import { Box, Typography } from "@mui/material";

const NasaArticle = ({ article }) => {
    if (!article) return null;

    return (
        <>
            <Box
                sx={{
                    backgroundColor: "rgba(190, 80, 110, 0.14)",
                    padding: 2,
                    borderRadius: 2,
                    backdropFilter: "blur(6px)",
                    mt: 2,
                }}
            >
            <Typography variant="h3" gutterBottom color="#6C6A61">{article.title}</Typography>
            <Typography variant="body2" fontSize="1.5rem" color="#6C6A61">
                    &nbsp;&nbsp;published at:&nbsp;{article.date} <br />&nbsp;&nbsp;by:&nbsp; {article.copyright?.trim() ? article.copyright : "NASA"}
                    <br /><br />
            </Typography>
                <Typography variant="body1" fontSize="1.7rem" color="#BDC3CB">
                &nbsp;&nbsp;&nbsp;&nbsp;{article.explanation}
            </Typography>

            </Box>
        </>
    );
};

export default NasaArticle;
