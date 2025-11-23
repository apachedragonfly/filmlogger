````markdown
# FilmLogger 🎬

FilmLogger is a gamified, "Tinder-style" web application designed for movie lovers and Letterboxd power users. It streamlines the process of discovering, logging, and curating films by turning data entry into a fast, engaging swipe interface.

## 🚀 Features

### Swipe Interface
* **Swipe Right:** Add to your current list (Watched, Custom Lists).
* **Swipe Left:** Skip the movie.
* **Swipe Up:** Instantly add to your generic Watchlist from any mode.

### Dual Modes
* **Online Mode:** Connects to the TMDB API for an infinite stream of movies based on real-time popularity, ratings, or release dates.
* **Offline Mode:** Includes a curated static deck of 30 masterpieces for testing without an API key.

### Custom Lists
* Create unlimited named lists with specific filters (e.g., "90s Horror", "Spielberg Movies", "2024 Catch-up").

### Smart Discovery
* **Advanced filtering:** Filter by Genre, Decade, and Director.
* **Director Mode:** Fetches a director's full filmography for comprehensive ranking.
* **Automatic deduplication:** Movies you've already sorted won't appear again.
* **"Smart Refill":** Logic automatically fetches new pages from the API when your hand runs low.

### Letterboxd Integration
* **One-click CSV Export:** Formatted specifically for the Letterboxd Importer.
* **Accurate Matching:** Includes `tmdbID` for 100% accurate matching.

> **Privacy First:** Your API key and lists are stored entirely in your browser's `localStorage`. No data is sent to any third-party server other than TMDB.

## 🛠 Tech Stack

* **Framework:** React 18 (Vite)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **State Management:** React Hooks + LocalStorage

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/film-logger.git](https://github.com/YOUR_USERNAME/film-logger.git)
   cd film-logger
````

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

4.  Open your browser to `http://localhost:5173` (or the port shown in your terminal).

## 🔑 Configuration (TMDB API)

To unlock the full potential of FilmLogger (infinite movies, specific director searches), you need a free TMDB API Key.

1.  Create an account at [TheMovieDB.org](https://www.themoviedb.org/).
2.  Go to **Settings \> API** in your profile.
3.  Click **Create** and select "Developer".
4.  Fill out the form (for the URL, you can use your GitHub profile or `http://localhost`).
5.  Copy your **API Key (v3 auth)**.
6.  In FilmLogger, click the **Key Icon 🔑** in the top right and paste your key.

## 📤 Importing to Letterboxd

FilmLogger is built to work seamlessly with Letterboxd's import tool.

1.  Build your list in the app.
2.  Click the **"Export & Summary"** button on the main menu (or the download icon on a specific list).
3.  Click **"Download CSV"**.
4.  Go to [Letterboxd Import](https://letterboxd.com/import/).
5.  Upload the generated CSV file.
6.  Letterboxd will automatically match the films using the TMDB IDs included in the file.

## 🤝 Contributing

Contributions are welcome\! Please feel free to submit a Pull Request.

1.  Fork the project.
2.  Create your feature branch:
    ```bash
    git checkout -b feature/AmazingFeature
    ```
3.  Commit your changes:
    ```bash
    git commit -m 'Add some AmazingFeature'
    ```
4.  Push to the branch:
    ```bash
    git push origin feature/AmazingFeature
    ```
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

```

***

**Next Step:** Would you like me to create a `LICENSE` file text or a `.gitignore` file tailored for a Vite/React project to go along with this README?
```
