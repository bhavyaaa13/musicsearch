// Curated Movie Database
const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", year: 2010, rating: "8.8", runtime: "148 min", icon: "🌀", desc: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O." },
  { id: 2, title: "The Dark Knight", genre: "Action", year: 2008, rating: "9.0", runtime: "152 min", icon: "🦇", desc: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests." },
  { id: 3, title: "Interstellar", genre: "Sci-Fi", year: 2014, rating: "8.7", runtime: "169 min", icon: "🚀", desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth faces ecological collapse." },
  { id: 4, title: "Spider-Man: Into the Spider-Verse", genre: "Animation", year: 2018, rating: "8.4", runtime: "117 min", icon: "🕷️", desc: "Teenager Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered counterparts from other dimensions to stop a threat." },
  { id: 5, title: "The Shawshank Redemption", genre: "Drama", year: 1994, rating: "9.3", runtime: "142 min", icon: "🗝️", desc: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion." },
  { id: 6, title: "Mad Max: Fury Road", genre: "Action", year: 2015, rating: "8.1", runtime: "120 min", icon: "🏎️", desc: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the help of a group of female prisoners." },
  { id: 7, title: " Spirited Away", genre: "Animation", year: 2001, rating: "8.6", runtime: "125 min", icon: "🏮", desc: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts." },
  { id: 8, title: "Parasite", genre: "Drama", year: 2019, rating: "8.5", runtime: "132 min", icon: "🏠", desc: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan." }
];

// DOM Elements
const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const filterBtns = document.querySelectorAll(".filter-btn");
const movieModal = document.getElementById("movieModal");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModalBtn");

let activeGenre = "All";
let searchQuery = "";

// Render Movies
function renderMovies() {
  movieGrid.innerHTML = "";

  const filtered = movies.filter(movie => {
    const matchesGenre = activeGenre === "All" || movie.genre === activeGenre;
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  if (filtered.length === 0) {
    movieGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px;">No movies found.</p>`;
    return;
  }

  filtered.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <div class="movie-poster">
        ${movie.icon}
        <div class="movie-rating">★ ${movie.rating}</div>
      </div>
      <div class="movie-info">
        <div>
          <h3 class="movie-title">${movie.title}</h3>
        </div>
        <div class="movie-meta">
          <span>${movie.year}</span>
          <span>${movie.genre}</span>
        </div>
      </div>
    `;
    card.addEventListener("click", () => openModal(movie));
    movieGrid.appendChild(card);
  });
}

// Open Modal with Details
function openModal(movie) {
  modalBody.innerHTML = `
    <h2>${movie.icon} ${movie.title}</h2>
    <div class="modal-details">
      <span>📅 ${movie.year}</span>
      <span>⭐ Rating: ${movie.rating}/10</span>
      <span>⏱️ ${movie.runtime}</span>
      <span>🏷️ ${movie.genre}</span>
    </div>
    <p class="modal-desc">${movie.desc}</p>
    <button class="watch-btn" onclick="alert('Streaming simulation started for ${movie.title}!')">Stream Trailer</button>
  `;
  movieModal.classList.remove("hidden");
}

// Close Modal
closeModalBtn.addEventListener("click", () => movieModal.classList.add("hidden"));
movieModal.addEventListener("click", (e) => {
  if (e.target === movieModal) movieModal.classList.add("hidden");
});

// Event Listeners for Search & Filter
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.trim();
  renderMovies();
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeGenre = btn.dataset.genre;
    renderMovies();
  });
});

// Initial Render
renderMovies();