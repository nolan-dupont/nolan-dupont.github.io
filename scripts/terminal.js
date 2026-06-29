const terminals = document.getElementsByClassName("terminal");


function showTerminal(id) {
	const terminal = document.getElementById(id);
	const titlebar = terminal.children.item(0);
	const control = titlebar.children.item(1);
	terminal.classList.remove("closed");
	control.innerHTML = "<img src='images/icons/dark/xmark.svg' width='18' height='18'>";
}


function toggleTerminal(id) {
	const terminal = document.getElementById(id);
	if (terminal.classList.contains("closed")) {
		showTerminal(id);
	} else {
		hideTerminal(id);
	}
}


function hideTerminal(id) {
	const terminal = document.getElementById(id);
	const titlebar = terminal.children.item(0);
	const control = titlebar.children.item(1);
	terminal.classList.add("closed");
	control.innerHTML = "<img src='images/icons/expand.svg' width='12' height='12'>";
}


if (window.innerWidth <= 768) {
	for (let i = 0; i < terminals.length; i++) {
		toggleTerminal(terminals.item(i).id);
	}
}
