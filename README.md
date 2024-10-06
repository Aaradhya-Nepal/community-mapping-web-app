Here is a step-by-step guide for setting up your Next.js project for flood prediction, which includes steps to clone the repository, set up environment variables, and configure API keys:

---

# Project Setup: Flood Prediction using Next.js

## Prerequisites:
Before cloning the project repository, ensure that you have the following tools installed on your system:
1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/en/download/)
2. **Yarn** - [Download here](https://classic.yarnpkg.com/en/docs/install/)
3. **Git** - [Download here](https://git-scm.com/downloads)

Once these tools are installed, proceed with the following steps:

---

## Step 1: Clone the Repository

Clone the Next.js project repository to your local machine using the following Git command:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd <project-directory>
```

---

## Step 2: Set Up Environment Variables

The project requires several API keys for external services like Google Maps, OpenWeather, OpenMeteo, and more. To configure these, follow the steps below:

1. **Create the `.env.local` file**:
   Inside the project root directory, create a file named `.env.local`. This file will store all your environment variables.

   ```bash
   touch .env.local
   ```

2. **Copy Example Variables**:
   In the `.env.local` file, copy the following environment variable template:

   ```bash
   NEXT_PUBLIC_GOOGLE_API_URL=<YOUR_GOOGLE_API_URL>
   NEXT_PUBLIC_GOOGLE_API_KEY=<YOUR_GOOGLE_API_KEY>

   NEXT_PUBLIC_OPEN_WEATHER_API_URL=<YOUR_OPEN_WEATHER_API_URL>
   NEXT_PUBLIC_OPEN_WEATHER_API_KEY=<YOUR_OPEN_WEATHER_API_KEY>

   NEXT_PUBLIC_OPEN_METEO_API_URL=<YOUR_OPEN_METEO_API_URL>
   NEXT_PUBLIC_OPEN_METEO_FLOOD_API_URL=<YOUR_OPEN_METEO_FLOOD_API_URL>

   NEXT_PUBLIC_NEWS_API_KEY=<YOUR_NEWS_API_KEY>

   NEXT_PUBLIC_YOUTUBE_API_KEY=<YOUR_YOUTUBE_API_KEY>
   ```

---

## Step 3: Obtain API Keys

To obtain the necessary API keys, follow the links and instructions below:

### 1. **Google API (Places API)**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a project and enable the **Google Places API**.
   - Create an API key and add it to the `.env.local` file under `NEXT_PUBLIC_GOOGLE_API_KEY`.
   - Use the base URL `https://maps.googleapis.com/maps/api` for `NEXT_PUBLIC_GOOGLE_API_URL`.

   **Google Cloud Console Link**: [Google Cloud Console](https://console.cloud.google.com/)

### 2. **OpenWeather API**:
   - Visit the [OpenWeather API website](https://home.openweathermap.org/users/sign_up).
   - Sign up and generate an API key.
   - Add this key to your `.env.local` file under `NEXT_PUBLIC_OPEN_WEATHER_API_KEY`.
   - Use the base URL `https://api.openweathermap.org` for `NEXT_PUBLIC_OPEN_WEATHER_API_URL`.

   **OpenWeather API Link**: [OpenWeather API](https://openweathermap.org/)

### 3. **OpenMeteo API**:
   - Visit the [OpenMeteo API documentation](https://open-meteo.com/).
   - Sign up if needed and configure the API.
   - Use the appropriate URL for the flood-related data under `NEXT_PUBLIC_OPEN_METEO_FLOOD_API_URL` and add the base URL for `NEXT_PUBLIC_OPEN_METEO_API_URL`.

   **OpenMeteo API Link**: [OpenMeteo API](https://open-meteo.com/)

### 4. **News API**:
   - Go to [News API](https://newsapi.org/register) and sign up to get an API key.
   - Add this key to your `.env.local` file under `NEXT_PUBLIC_NEWS_API_KEY`.

   **News API Link**: [News API](https://newsapi.org/)

### 5. **YouTube API**:
   - Visit the [Google Cloud Console](https://console.cloud.google.com/), create a new project, and enable the **YouTube Data API v3**.
   - Generate an API key and add it to your `.env.local` file under `NEXT_PUBLIC_YOUTUBE_API_KEY`.

   **YouTube API Link**: [Google Cloud Console - YouTube API](https://console.cloud.google.com/)

---

## Step 4: Install Dependencies

Once your `.env.local` file is set up with the required API keys, install the project dependencies:

```bash
yarn install
```

---

## Step 5: Run the Project

To start the development server, run:

```bash
yarn dev
```

This will launch the Next.js application on `http://localhost:3000`. Open the browser and navigate to the URL to view the project.

---

## Additional Notes

- **Google Cloud Setup**: Ensure that you have enabled the **Google Places API** in your Google Cloud project, as it is necessary for location-based flood prediction.
- **API Limits**: Be aware of the rate limits and usage policies of the APIs you've integrated. Each service may have different restrictions based on your plan.

---

With these steps completed, your project should be set up and running. If you encounter any issues, consult the respective API documentation or check your `.env.local` file for any missing or incorrect values.

