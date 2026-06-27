const mainBurgerButton = document.getElementById("main-burger-button");
const mainMenu = document.getElementById("main-menu");
const hideMainMenuButton = document.getElementById("hide-main-menu");
const mainMenuSeparator = document.getElementById("main-menu-separator");

const navBurgerButton = document.getElementById("nav-burger-button");
const navMenu = document.getElementById("nav-menu");
const tableOfContents = document.getElementById("table-of-contents");

const searchBar = document.getElementById("searchbar");
const searchField = document.getElementById("search-field");
const searchResults = document.getElementById("search-results");
const noResults = document.getElementById("no-results");


function goto(id) {
	window.location.assign(
		window.location.href.replace(location.hash,"") + "#" + id
	);
}


function showMainMenu() {
	mainBurgerButton.style.display = "none";
	mainMenu.style.display = "flex";
	mainMenuSeparator.style.display = "unset";
	hideMainMenuButton.style.display = "unset";
	tableOfContents.style.display = "unset";
}


function hideMainMenu() {
	mainBurgerButton.style.display = "unset";
	mainMenu.style.display = "none";
	mainMenuSeparator.style.display = "none";
	hideMainMenuButton.style.display = "none";
	tableOfContents.style.display = "none";
}


function showNavMenu() {
	navBurgerButton.style.display = "none";
	tableOfContents.style.display = "unset";
}


function hideNavMenu() {
	navBurgerButton.style.display = "unset";
	tableOfContents.style.display = "none";
}


function gainSearchBarFocus() {
	const searchBarRect = searchField.getBoundingClientRect();
	searchResults.style.display = "flex";
	searchResults.style.left = searchBarRect.x + "px";
	searchResults.style.top = searchBarRect.y + searchBarRect.height + "px";
	const computedSearchBar = window.getComputedStyle(searchField);
	const computedSearchResults = window.getComputedStyle(searchField);
	const padding = computedSearchResults.getPropertyValue("padding-left") + computedSearchResults.getPropertyValue("padding-right");
	searchResults.style.width = computedSearchBar.getPropertyValue("width") - padding + "px";
}


function projectResult(project) {
	const a = document.createElement("a");
	a.classList.add("search-result");
	a.href = "projects/" + project.id + ".html";

	const cover = document.createElement("img");
	if (project.cover !== null) {
		cover.src = project.cover;
	}
	cover.width = 50;
	cover.height = 50;
	cover.alt = "";

	const text = document.createElement("p");
	text.innerText = project.name;

	a.appendChild(cover);
	a.appendChild(text);
	return a;
}


function search(projects) {
	const search = searchField.value.toLowerCase();
	if (search.trim() === "") {
		searchResults.innerHTML = "";
		searchResults.appendChild(noResults);
		return;
	}

	const matching = [];
	for (const project of projects) {
		if (project.name.toLowerCase().match(search) || project.description.toLowerCase().match(search)) {
			matching.push(project);
		}
	}

	if (matching.length == 0) {
		searchResults.innerHTML = "";
		searchResults.appendChild(noResults);
	} else {
		searchResults.innerHTML = "";
		for (const project of matching) {
			searchResults.appendChild(projectResult(project));
		}
	}
}


let focusGained = false;
let searchBarHovered = false;
let searchFieldFocus = false;


function loseSearchBarFocus() {
	searchResults.style.display = "none";
}


function updateSearchBar(bar, field) {
	if (bar !== null) {
		searchBarHovered = bar;
	}
	if (field !== null) {
		searchFieldFocus = field;
	}

	if (searchFieldFocus || searchBarHovered) {
		if (!focusGained) {
			gainSearchBarFocus();
			focusGained = true;
		}
	} else {
		loseSearchBarFocus();
		focusGained = false;
	}
}


fetch("/api/projects.json").then(function (response) {
	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}
	response.json().then(json => { searchField.onkeyup = function () { search(json); } });
	searchBar.onmouseover = function () { updateSearchBar(true, null) };
	searchBar.onmouseout = function () { updateSearchBar(false, null) };
	searchField.onfocus = function () { updateSearchBar(null, true) };
	searchField.onblur = function () { updateSearchBar(null, false) };
});

