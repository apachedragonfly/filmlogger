FilmLogger 🎬 (filmlogger.vercel.app)

FilmLogger is a gamified, "Tinder-style" web application designed for movie lovers and Letterboxd power users. It streamlines the process of discovering, logging, and curating films by turning data entry into a fast, engaging swipe interface.

🚀 Features

Swipe Interface:

Swipe Right: Add to your current list (Watched, Liked, or Custom).

Swipe Left: Skip the movie.

Swipe Up: Instantly add to your generic Watchlist from any mode.

Dual Modes:

Online Mode: Connects to the TMDB API for an infinite stream of movies based on real-time popularity, ratings, or release dates.

Offline Mode: Includes a curated static deck of 30 masterpieces for testing without an API key.

Custom Lists: Create unlimited named lists with specific filters (e.g., "90s Horror", "Spielberg Movies", "2024 Catch-up").

Smart Discovery:

Advanced filtering by Genre, Decade, and Director.

Automatic deduplication (movies you've already sorted won't appear again).

"Smart Refill" logic automatically fetches new pages from the API when your hand runs low.

Letterboxd Integration:

One-click CSV Export formatted specifically for Letterboxd Importer.

Includes tmdbID for 100% accurate matching.

Privacy First: Your API key and lists are stored entirely in your browser's localStorage. No data is sent to any third-party server other than TMDB.

🛠 Tech Stack

Framework: React 18 (Vite)

Styling: Tailwind CSS

Icons: Lucide React

State Management: React Hooks + LocalStorage

📦 Installation

Clone the repository:

git clone [https://github.com/YOUR_USERNAME/film-logger.git](https://github.com/YOUR_USERNAME/film-logger.git)
cd film-logger


Install dependencies:

npm install


Start the development server:

npm run dev


Open your browser to http://localhost:5173 (or the port shown in your terminal).

🔑 Configuration (TMDB API)

To unlock the full potential of FilmLogger (infinite movies, specific director searches), you need a free TMDB API Key.

Create an account at TheMovieDB.org.

Go to Settings > API in your profile.

Click Create and select "Developer".

Fill out the form (for the URL, you can use your GitHub profile or http://localhost).

Copy your API Key (v3 auth).

In FilmLogger, click the Key Icon 🔑 in the top right and paste your key.

📤 Importing to Letterboxd

FilmLogger is built to work seamlessly with Letterboxd's import tool.

Build your list in the app.

Click the "Export & Summary" button on the main menu (or the download icon on a specific list).

Click "Download CSV".

Go to Letterboxd Import.

Upload the generated CSV file.

Letterboxd will automatically match the films using the TMDB IDs included in the file.

🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.

📄 License

Distributed under the MIT License. See LICENSE for more information.
