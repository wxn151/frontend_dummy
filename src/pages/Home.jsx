import { useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress, Grid } from "@mui/material";
import SearchBox from "../components/SearchBox";
import NasaArticle from "../components/NasaArticle";
import ProfileControls from "../components/ProfileMenu";
import MainLayout from "../layouts/MainLayout";
import { fetchNasaArticle } from "../services/nasa";
import { userInfo } from "../services/user_info";
import { useAuth } from "../context/AuthContext";


const Home = () => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);
    //const { token } = useAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadInitial = async () => {
            try {
                setLoading(true);
                const data = await fetchNasaArticle("?count=1");
                setArticle(data);
            } catch (err) {
                console.error("Initial fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        loadInitial();
    }, []);

    const handleSearchByDate = async (date) => {
        try {
            setLoading(true);
            const data = await fetchNasaArticle(`?date=${date}`);
            setArticle(data);
        } catch (err) {
            console.error("Search by date failed", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchRandom = async () => {
        try {
            setLoading(true);
            const data = await fetchNasaArticle("?count=1");
            setArticle(data);
        } catch (err) {
            console.error("Random search failed", err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const data = await userInfo(token);
                setUser(data);
            } catch (err) {
                console.error("Error loading user:", err);
            }
        };
        fetchUser();
    }, []);

    return (
        <MainLayout>
            <Paper
                elevation={4}
                sx={{
                    padding: 4,
                    borderRadius: 4,
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(190, 10, 110, 0.11)",
                    color: "inherit",
                }}
            >
                {/* profile menu */}
                <ProfileControls />

                <Typography variant="h4" align="center" mb={3} color="#6C6A61">
                    {/*add diferents messages*/}
                    Welcome back {user?.username}!
                </Typography>

                <Box mb={3}>
                    <SearchBox onSearchByDate={handleSearchByDate} onSearchRandom={handleSearchRandom} />
                </Box>

                {loading ? (
                    <Box textAlign="center" mt={5}>
                        <CircularProgress color="secondary" />
                    </Box>
                ) : article ? (
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <NasaArticle article={article} />
                        </Grid>

                        {/* IMAGE */}
                        <Grid item xs={12} md={8}>
                            {article.media_type === "image" && (
                                <Box
                                    component="img"
                                    src={article.url}
                                    alt={article.title}
                                    sx={{
                                        width: "100%",
                                        borderRadius: 3,
                                        opacity: 0.85,
                                        boxShadow: 5,
                                    }}
                                />
                            )}
                        </Grid>
                    </Grid>
                    ) : (
                        <Box textAlign="center" mt={5}>
                            <Box
                                component="img"
                                    src="/cassette.gif" // 👈 fallback
                                alt="Error fallback"
                                sx={{ width: 300, maxWidth: "100%" }}
                            />
                            <Typography variant="h6" color="#FF0080" mb={2}>
                                  NASA service not avaliable
                            </Typography>
                        </Box>
                    ) }
            </Paper>
        </MainLayout>
    );
};

export default Home;
