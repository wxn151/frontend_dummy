import { useState, useEffect } from "react";
import { createArticle, unlikeArticle } from "../services/article";
import { useAuth } from "../context/AuthContext";

// In-memory cache for liked articles
const articleCache = new Map();

const useToggleLike = (title, copyright, published, hash) => {
    const { token } = useAuth();
    const [liked, setLiked] = useState(false);
    const [hashId, setHashId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const cached = articleCache.get(hash);
        if (cached) {
            setLiked(cached.liked);
            setHashId(cached.id);
        }
    }, [hash]);

    const toggleLike = async () => {
        setLoading(true);

        try {
            if (!liked && !hashId) {
                const data = await createArticle(
                    {
                        hash: hash,
                        article: title,
                        date: published,
                        copyright: copyright,
                    },
                    token
                );
                setHashId(data.id);
                setLiked(true);

                articleCache.set(hash, { id: data.id, liked: true }); // save in memory
            } else {
                await unlikeArticle(hashId, !liked, token);
                setLiked(!liked);
                articleCache.set(hash, { id: hashId, liked: !liked }); // refresh in memory
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        } finally {
            setLoading(false);
        }
    };

    return { liked, loading, toggleLike };
};


export default useToggleLike;
