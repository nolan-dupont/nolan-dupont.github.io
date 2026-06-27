const darkThemeClass = "dark-theme";
const darkThemeButton = document.getElementById("dark-theme-toggle");
const lightThemeButton = document.getElementById("light-theme-toggle");
const themeButtons = document.getElementsByClassName("theme-toggle");
const icons = document.getElementsByClassName("icon");
const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");


function getTheme() {
	try {
		let start = document.cookie.indexOf("=");
		let end = document.cookie.indexOf(";");
		if (end < 0) {
			end = document.cookie.length;
		}
		return document.cookie.substring(start + 1, end);
	} catch (e) {
		return "dark";
	}
}


function setDarkTheme() {
	darkThemeButton.style.display = "";
	lightThemeButton.style.display = "none";
	for (let i = 0; i < icons.length; i++) {
		icons.item(i).src = icons.item(i).src.replace("light", "dark");
	}
	document.body.classList.add(darkThemeClass);
	document.cookie = "theme=dark;path=/;";
}


function setLightTheme() {
	darkThemeButton.style.display = "none";
	lightThemeButton.style.display = "";
	for (let i = 0; i < icons.length; i++) {
		icons.item(i).src = icons.item(i).src.replace("dark", "light");
	}
	document.body.classList.remove(darkThemeClass);
	document.cookie = "theme=light;path=/;";
}


if (getTheme() == "light") {
	setLightTheme();
} else if (getTheme() == "dark") {
	setDarkTheme();
} else if (prefersDarkTheme.matches) {
	setDarkTheme();
} else {
	setLightTheme();
}


darkThemeButton.addEventListener("click", () => setLightTheme())
lightThemeButton.addEventListener("click", () => setDarkTheme())
