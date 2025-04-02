const userInput = document.getElementById('userInput');
const searchBtn = document.getElementById('searchBtn');
// const modal = document.getElementById('modal');
// const modalMessage = document.getElementById('modalMessage');
// const closeModal = document.getElementById('closeModal');
const resultsContainer = document.getElementById('resultsContainer');

// function showModal(message) {
//     modalMessage.textContent = message;
//     modal.style.display = "block";
// }

// Ensure button does not trigger form submission
const form = document.querySelector('.searchField');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload
    const query = userInput.value.trim();
    if (query === "") {
        showModal("Oops! Please ensure to fill out the input field before searching.")
    } {
        fetchMovie(query);
    }
});

// closeModal.addEventListener("click", () => {
//     modal.style.display = "none";
// });

async function fetchMovie(query) {
    const API_KEY = '8b30258'; 
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
        <aside class="posterAndTitle">
            <h2>${data.Title} (${data.Year})</h2>
            <img class="poster" src="${data.Poster !== 'N/A' ? data.Poster : './assets/placeholder.jpg'}" alt="${data.Title} Poster">
        </aside>
        <aside class="movieDetails">
            <section class"details">
                <p><strong>Genre:</strong> ${data.Genre}</p>
                <p><strong>Actors:</strong> ${data.Actors}</p>
                <p><strong>Plot:</strong> ${data.Plot}</p>
                <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
                <p><strong>Box Office:</strong> ${data.BoxOffice}</p>
                <p><strong>Runtime:</strong> ${data.Runtime}</p>
            </section>
        </aside>
    </section>
    `;
}
