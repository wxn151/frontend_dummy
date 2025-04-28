import { useEffect, useState, useContext } from "react";
import {
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    CircularProgress,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from "@mui/material";
import { getArticles } from "../services/article";
import { useTheme } from '@mui/material';
import { useAuth } from "../context/AuthContext";

const ArticleTable = ({ handleCardClick }) => {
    const theme = useTheme();
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalArticles, setTotalArticles] = useState(0);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    // Fetch
    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            try {
                const { articles, total } = await getArticles(token);
                setArticles(articles);
                setTotalArticles(total);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, [token]);

    
    return (
        
        <Paper
            elevation={6}
            sx={{
                borderRadius: 4,
                backgroundColor: "#0a0a0a",
                p: 3,
                mt: 4,
            }}
        >
            {loading ? (
                <CircularProgress
                    sx={{ mt: 6, mb: 6, mx: "auto", color: "#FF69B4", display: "block" }}
                />
            ) : (
                <>
                    {/* Total count of articles */}
                    <Typography sx={{ fontWeight: "bold", color: "gray", mb: 2 }}>
                        Total Articles: {totalArticles}
                    </Typography>

                    {/* Card Display */}
                    <Grid container spacing={2}>
                        {articles
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((article) => (
                                <Grid item xs={12} sm={6} md={4} key={article.id}>
                                    <Card
                                        sx={{
                                            backgroundColor: "#1a1a1a",
                                            color: "gray",
                                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                            "&:hover": {
                                                transform: "scale(1.05)",
                                                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.7)", // Glow effect
                                            },
                                        }}
                                        onClick={() => handleCardClick(article.date)}
                                    >
                                        <CardContent>
                                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "gray" }}>
                                                {article.article}
                                            </Typography>
                                            <Typography sx={{ mt: 1 }}>Published: {article.date}</Typography>
                                            <Typography sx={{ mt: 1 }}>Author: {article.copyright}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>

                    {/* Cards per Page Selector */}
                    <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
                        <Grid item>
                            <FormControl sx={{ minWidth: 120 }} size="small">
                                <InputLabel>Cards per page</InputLabel>
                                <Select
                                    value={rowsPerPage}
                                    onChange={(e) => {
                                        setRowsPerPage(e.target.value);
                                        setPage(0); // Reset to the first page when rows per page change
                                    }}
                                    label="Cards per page"
                                >
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={25}>25</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Pagination */}
                    <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                        <Grid item>
                            <Button
                                variant="outlined"
                                onClick={() => setPage(page > 0 ? page - 1 : 0)}
                                disabled={page === 0}
                                sx={{ color: "#FF69B4", borderColor: "#FF69B4" }}
                            >
                                Previous
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                onClick={() => setPage(page < Math.ceil(totalArticles / rowsPerPage) - 1 ? page + 1 : page)}
                                disabled={page >= Math.ceil(totalArticles / rowsPerPage) - 1}
                                sx={{ color: "#FF69B4", borderColor: "#FF69B4" }}
                            >
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )}
        </Paper>


    );
};

export default ArticleTable;
