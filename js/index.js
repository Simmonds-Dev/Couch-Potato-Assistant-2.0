let API_KEY = '8b30258'; // OMDb API key
const userInput = document.getElementById('userInput');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('results');

// Ensure button does not trigger form submission
const form = document.querySelector('.searchField');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload
    const query = userInput.value.trim();
    if (query) {
        fetchMovie(query);
    }
});

async function fetchMovie(query) {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'True') {
            displayMovie(data);
        } else {
            resultsContainer.innerHTML = `<p>No results found for "${query}".</p>`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        resultsContainer.innerHTML = `<p>Error fetching data. Please try again.</p>`;
    }
}

function displayMovie(data) {
    resultsContainer.innerHTML = `
    <section class="results">
        <h2>${data.Title} (${data.Year})</h2>
        <img class="poster" src="${data.Poster !== 'N/A' ? data.Poster : './assets/placeholder.jpg'}" alt="${data.Title} Poster">
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
            <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
        </section>
    `;
}
