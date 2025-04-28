import {
    useEffect, useState, useContext
} from "react";
import {
    Box,
    Typography,
    Paper,
    CircularProgress,
    Grid
} from "@mui/material";
import SearchBox from "../components/SearchBox";
import NasaArticle from "../components/NasaArticle";
import ProfileControls from "../components/ProfileMenu";
import { fetchNasaArticle } from "../services/nasa";
import LayoutMenu from "../layouts/LayoutMenu";
import ArticleTable from "../components/ArticleTable";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const [currentTab, setCurrentTab] = useState("Articles");
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    
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
            //redirect
            setCurrentTab("Articles");
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

    return (
            <Paper
                elevation={4}
                sx={{
                    padding: 4,
                    borderRadius: 4,
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(0, 10, 110, 0.11)",
                    color: "inherit",
                }}
            >
                <ProfileControls />

                <Box sx={{ p: 4 }}>
                    <Typography variant="h4" align="center" mb={2} color="#6C6A61">
                        Welcome back {user?.username}!
                    </Typography>

                    <LayoutMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />

                    {currentTab === "Articles"}
                    {currentTab === "Favorites"}
                </Box>


                {currentTab == "Articles" ? (
                    <Box mb={3}>
                        <SearchBox
                            onSearchByDate={handleSearchByDate}
                            onSearchRandom={handleSearchRandom}
                        />
                    </Box>
                ) : (
                    <Box mb={3}></Box>
                )}

                {loading ? (
                    <Box textAlign="center" mt={5}>
                        <CircularProgress color="secondary" />
                    </Box>
                ) : article ? (
                    currentTab == "Articles" ? (
                            <Grid container spacing={4} alignItems="center">
                                <Grid item xs={12} md={6}>
                                    <NasaArticle article={article} />
                                </Grid>
                            </Grid>
                        ) : (
                                <ArticleTable handleCardClick={handleSearchByDate} />
                            )
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
    );
};

export default Home;
