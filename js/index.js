const userInput = document.getElementById('userInput');
const searchBtn = document.getElementById('searchBtn');
const errorModal = document.getElementById('errorModal');
const errorPrompt = document.getElementById('errorPrompt');
const closeModalBtn = document.getElementById('closeModal');
const resultsContainer = document.getElementById('resultsContainer');
const form = document.querySelector('.searchField');

// Modal logic
function showModal(message) {
    errorPrompt.textContent = message;
    errorModal.classList.add('show');
}

function hideModal() {
    errorModal.classList.remove('show');
}

// Close when clicking the button
closeModalBtn.addEventListener('click', hideModal);

// Close when clicking outside modal content
window.addEventListener('click', (event) => {
    if (event.target === errorModal) {
        hideModal();
    }
});

// Form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = userInput.value.trim();

    if (query.length === 0) {
        showModal("Oops! Please enter the name of a show or movie.");
    } else {
        fetchMovie(query);
    }
});

// Fetch logic
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
            <section class="details">
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