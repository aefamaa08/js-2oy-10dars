import pokemons from "./pokemon.js";
const pokemonContainer = document.getElementById("huu");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const sortBy = document.getElementById("sortBy");

// Helper function to extract numeric weight from a string
function getWeight(pokemon) {
    return parseFloat(pokemon.weight.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
}

// Generator function to display pokemon cards
function generator(pokemons) {
    pokemonContainer.innerHTML = "";  // Clear the container before displaying new cards
    pokemons.forEach(pokemon => {
        const card = document.createElement("div");
        card.classList.add("pokemon-card");
        card.innerHTML = `
            <div class="header">
                <h2 class="bull">${pokemon.name}</h2>
                <div class="id-badge">${pokemon.id}</div>
            </div>
            <img src="${pokemon.img}" alt="${pokemon.name}" class="pokemon-image">
            <div class="type">${pokemon.type.join(" ")}</div>
            <div class="details">
                <p>Candy count: ${pokemon.candy}</p>
                <p>${pokemon.weight}</p>
            </div>
            <div class="weaknesses">
                <p>${pokemon.weaknesses.join(", ")}</p>
            </div>
            <div class="footer">
                <span>${pokemon.time}</span>
            </div>
        `;
        pokemonContainer.appendChild(card);
    });
}

// Sorting function
function sortPokemons(pokemons) {
    let sortedPokemons = [...pokemons];  // Create a copy of the array to avoid mutation

    // Sorting based on selected criteria
    if (sortBy.value === "alphabeticalAsc") {
        sortedPokemons.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy.value === "alphabeticalDesc") {
        sortedPokemons.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy.value === "weightAsc") {
        sortedPokemons.sort((a, b) => getWeight(a) - getWeight(b)); // Sort by numeric weight
    } else if (sortBy.value === "weightDesc") {
        sortedPokemons.sort((a, b) => getWeight(b) - getWeight(a)); // Sort by numeric weight
    }

    return sortedPokemons;
}

// Apply filters by search input and selected type
function applyFilters() {
    const selectedType = document.getElementById("filterType").value.toLowerCase();
    const searchValue = searchInput.value.toLowerCase().trim();

    // Filter by type and name
    let filteredPokemons = pokemons.filter(pokemon => {
        const matchesType = selectedType === "all" || pokemon.type.some(type => type.toLowerCase() === selectedType);
        const matchesSearch = pokemon.name.toLowerCase().includes(searchValue);
        return matchesType && matchesSearch;  // Both conditions must be true
    });

    // Sort the filtered results
    filteredPokemons = sortPokemons(filteredPokemons);

    // Display filtered and sorted pokemons
    generator(filteredPokemons);
}

// Event listener for searching and filtering
searchButton.addEventListener('click', applyFilters);
searchInput.addEventListener('keyup', applyFilters);

// Event listener for changing filter type
document.getElementById("filterType").addEventListener("change", applyFilters);

// Initial rendering of all pokemons
generator(pokemons);
