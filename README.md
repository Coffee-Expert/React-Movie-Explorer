 
# React Movie Explorer

A sleek React application that lets you search for movies via [TheMovieDB API](https://www.themoviedb.org/documentation/api) and manage your personal favourites list. Your favourites are saved and persist between sessions.

## Features

- **Movie Search:** Search through thousands of movies using TheMovieDB API.
- **Favourites Management:** Easily add or remove movies to your favourites list.
- **Persistent Storage:** Favourites persist across sessions thanks to local storage.
- **Responsive UI:** A modern design built with React for a seamless experience on any device.

## Demo

*If you have a live demo available, include the link below:*

[Live Demo](https://your-demo-link.com)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/react-movie-explorer.git
   cd react-movie-explorer
    

2. **Install dependencies:**

   ```bash
   npm install
    

## Usage

1. **Set up your TheMovieDB API key:**

   - Register or sign in at [TheMovieDB](https://www.themoviedb.org/).
   - Visit the [API section](https://www.themoviedb.org/documentation/api) to get your API key.
   - Create a `.env` file in the root of your project with the following content:

     ```env
     REACT_APP_TMDB_API_KEY=your_api_key_here
     ```

2. **Start the development server:**

   ```bash
   npm start
   ```

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser to start exploring movies.

## Favourites Feature

- **Add to Favourites:** Click the favourite (heart) icon on a movie card to add it to your favourites list.
- **Remove from Favourites:** Click the favourite icon again to remove the movie from your list.
- **Persistent Favourites:** This feature uses [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to ensure your favourites remain saved even after closing the browser.

## Built With

- [React](https://reactjs.org/)
- [TheMovieDB API](https://www.themoviedb.org/documentation/api)
- HTML5 & CSS3
- JavaScript (ES6+)

## Contributing

Contributions are highly appreciated! If you have any improvements or bug fixes, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - your_email@example.com

Project Link: [https://github.com/yourusername/react-movie-explorer](https://github.com/yourusername/react-movie-explorer)
```

This README includes sections for project description, features, installation, usage instructions (including API key setup), information about the persistent favourites feature, and other typical sections needed for an open source project. Adjust the placeholders with your actual details as needed.
