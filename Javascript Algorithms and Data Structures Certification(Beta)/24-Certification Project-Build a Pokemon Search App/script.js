const form = document.getElementById("search-form");
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const pokName = document.getElementById("pokemon-name");
const pokId = document.getElementById("pokemon-id");
const pokWeight = document.getElementById("weight");
const pokHeight = document.getElementById("height");
const sprite = document.getElementById("sprite-container");
const typesList = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const containerLoad = document.getElementById("container-loading");

const URL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
const messages = [`Pokémon not found`];

const statsFn = (stats) => {
	stats.forEach(({ base_stat, stat }) => {
		if (stat.name === "hp") {
			hp.textContent = `${base_stat}`;
		}
		if (stat.name === "attack") {
			attack.textContent = `${base_stat}`;
		}
		if (stat.name === "defense") {
			defense.textContent = `${base_stat}`;
		}
		if (stat.name === "special-attack") {
			specialAttack.textContent = `${base_stat}`;
		}
		if (stat.name === "special-defense") {
			specialDefense.textContent = `${base_stat}`;
		}
		if (stat.name === "speed") {
			speed.textContent = `${base_stat}`;
		}
	});
	return;
};

const typesFn = (types) => {
	typesList.innerHTML = ``;
	types.forEach(({ type }) => {
		typesList.innerHTML += `<span class="type ${
			type.name
		}"> ${type.name.toUpperCase()}</span>`;
	});
};

const fetchData = async () => {
	try {
		searchBtn.disabled = true;
		searchBtn.style.opacity = 0.5;
		containerLoad.classList.remove("hidden");
		containerLoad.classList.add("show");

		console.log("URL>>", URL + searchInput.value.toLowerCase());
		const res = await fetch(URL + searchInput.value.toLowerCase(), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		const data = await res.json();
		const {
			name,
			id,
			weight,
			height,
			sprites: { front_default },
			types,
			stats,
		} = data;

		pokName.textContent = ` ${name.toUpperCase()}`;
		pokId.textContent = ` #${id}`;
		pokWeight.textContent = `Weight: ${weight}`;
		pokHeight.textContent = `Height: ${height}`;
		sprite.innerHTML = `<img id="sprite" src="${front_default}" alt="sprite">`;

		typesFn(types);
		statsFn(stats);
	} catch (error) {
		console.log("error", error);
		searchInput.value = "";
		alert(messages[0]);
	} finally {
		searchBtn.disabled = false;
		searchBtn.style.opacity = 1;
		containerLoad.classList.remove("show");
		containerLoad.classList.add("hidden");
	}
};

//console.log("fetchData>>>", fetchData());

form.addEventListener("submit", (e) => {
	e.preventDefault();
	fetchData();
});
