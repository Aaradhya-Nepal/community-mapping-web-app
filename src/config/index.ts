const config = {
    GOOGLE_API_URL: process.env.NEXT_PUBLIC_GOOGLE_API_URL as string,
    GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    OPEN_WEATHER_API_URL: process.env.NEXT_PUBLIC_OPEN_WEATHER_API_URL as string,
    OPEN_WEATHER_API_KEY: process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY as string,
    OPEN_METEO_API_URL: process.env.NEXT_PUBLIC_OPEN_METEO_API_URL as string,
    OPEN_METEO_FLOOD_API_URL: process.env.NEXT_PUBLIC_OPEN_METEO_FLOOD_API_URL as string,
    NEWS_API_KEY: process.env.NEXT_PUBLIC_NEWS_API_KEY as string,
    YOUTUBE_API_KEY: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
}

export default config;
