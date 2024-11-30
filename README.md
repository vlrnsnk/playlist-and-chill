# Playlist & Chill

Playlist & Chill is a React web application that allows users to search for songs, create a custom playlist, and save it to their Spotify account. The app integrates with the Spotify API to fetch song data, build custom playlists, and export them directly to a user's Spotify profile.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Features

- **Search Songs**: Users can search for songs by song title, artist, genre, or album.
- **Song Information**: Displays information about each song, including title, artist, album, and album artwork.
- **Create Playlist**: Allows users to create a custom playlist by adding selected songs.
- **Export Playlist**: Users can export their custom playlists to their personal Spotify account.
- **Responsive Design**: Fully responsive UI for an optimal experience on all devices.

## Demo

Check out the live demo deployed to [Netlify](https://your-app-name.netlify.app).

## Technologies Used

- **React**: Bootstrapped with Create React App for fast and easy setup.
- **Bulma**: A modern CSS framework used for responsive styling and UI components.
- **Spotify API**: Integrated to search for songs and manage playlists on Spotify.
- **Axios**: Used for making HTTP requests to the Spotify API.
- **Jest**: Testing framework used to write and run unit tests for the app.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vlrnsnk/playlist-and-chill.git
   cd playlist-and-chill
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   This will start the app and open it in your default browser at `http://localhost:3000`.

4. **Build the project**:
   ```bash
   npm run build
   ```
   This will create an optimized production build in the `build` directory.

## Usage

- **Search for songs**: Use the search bar to look for songs by title, artist, or album.
- **Add to Playlist**: Select the songs you want to add to your custom playlist.
- **Save to Spotify**: Once your playlist is complete, export it to your Spotify account.
- **Responsive Design**: The app automatically adjusts its layout based on the screen size.

## Customization

- **Bulma**: Modify the look and feel of the app by adjusting the `bulma` classes used in the components. You can find the Bulma documentation [here](https://bulma.io/).
- **React Components**: Customize the components as needed. Each component is located in the `src/components` folder.
- **Spotify API**: If you want to use a different API or add more features, update the `spotify.js` utility functions.

## Running Tests

To run the tests using Jest, follow these steps:

1. **Run tests**:
   ```bash
   npm test
   ```
   This will run all the unit tests in the project.

2. **Watch test changes**:
   ```bash
   npm run test:watch
   ```
   This will keep Jest running and automatically rerun tests when files are modified.

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to fork the repository and submit a pull request.

1. **Fork the repository**.
2. **Create a new branch**: `git checkout -b feature/your-feature-name`
3. **Commit your changes**: `git commit -am 'Add your changes'`
4. **Push to your fork**: `git push origin feature/your-feature-name`
5. **Open a pull request** to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
- [Bulma CSS Framework](https://bulma.io/)
- [Spotify API](https://developer.spotify.com/documentation/web-api/)
- [Axios](https://axios-http.com/)
- [Jest](https://jestjs.io/)

## Contact

Feel free to reach out to me with any questions or for collaborations.

- **Email**: [vlrnsnk\@proton.me](mailto:vlrnsnk@proton.me?subject=PlaylistAndChill)
- **LinkedIn**: [https://linkedin.com/in/valeriy-a-a23833310/](https://linkedin.com/in/vlrnsnk/)
- **GitHub**: [https://github.com/vlrnsnk](https://github.com/vlrnsnk/)
