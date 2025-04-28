import { motion } from "framer-motion";
import { IconButton } from "@mui/material";
export const MotionIconButton = motion(IconButton);
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import useToggleLike from "../hooks/useToggleLike";

const FavoriteButton = ({ title, copyright, published, hash }) => {
    const { liked, loading, toggleLike } = useToggleLike(title, copyright, published, hash);

    return (
        <MotionIconButton
            onClick={toggleLike}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            sx={{
                borderRadius: "50%",
                color: "text.secondary",
                backgroundColor: "background.paper",
                boxShadow: 1,
            }}
            disabled={loading} // Disable button while loading
        >
            {loading ? <CircularProgress size={24} color="primary" /> : liked ? <Favorite /> : <FavoriteBorder />}
        </MotionIconButton>
    );
};

export default FavoriteButton;
