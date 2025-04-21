/**
 * Fetch APOD article from NASA API
 * Params (like `?count=1` or `?date=YYYY-MM-DD`)
 * Retrive the article (or first in array)
 */


const BASE_URL = "https://api.nasa.gov/planetary/apod";
const API_KEY = import.meta.env.VITE_NASA_API_KEY;


export const fetchNasaArticle = async (endpoint = "?count=1") => {
    const url = `${BASE_URL}${endpoint}&api_key=${API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch article");
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
};
