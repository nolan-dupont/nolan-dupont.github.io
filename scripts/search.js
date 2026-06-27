const tags = document.getElementsByClassName("tag");
const projects = document.getElementById("projects");
const projectsHeader = document.getElementById("projects-header")

const selectedSkillsDiv = document.getElementById("selected-skills");
const availableSkillsDiv = document.getElementById("available-skills");
const selectedTagsDiv = document.getElementById("selected-tags");
const availableTagsDiv = document.getElementById("available-tags");

let projectsJson = [];


function refresh() {
	const tbody = projects.firstElementChild;
	for (const child of tbody.children) {
		if (child !== projectsHeader) {
			child.style.display = "none";
		}
	}

	const skillsFilter = [];
	for (const skill of selectedSkillsDiv.querySelectorAll(".tag")) {
		skillsFilter.push(skill.name);
	}
	const tagsFilter = [];
	for (const tag of selectedTagsDiv.querySelectorAll(".tag")) {
		tagsFilter.push(tag.name);
	}

	const filteredProjects = [];
	for (const project of projectsJson) {
		if (skillsFilter.every(skill => project.skills.includes(skill))) {
			filteredProjects.push(project);
		}
	}

	const finalProjects = [];
	for (const project of filteredProjects) {
		if (tagsFilter.every(tag => project.tags.includes(tag))) {
			finalProjects.push(project.id);
		}
	}

	for (const child of tbody.children) {
		if (child !== projectsHeader && finalProjects.includes(child.getAttribute("name"))) {
			child.style.display = "table-row";
		}
	}
}


function toggleFilter(id, oldList, newList, reverseFunction) {
	let tag = null;
	for (child of oldList.children) {
		if (child.id == id) {
			tag = child;
		}
	}

	if (tag === null) {
		return;
	}

	newList.appendChild(tag);
	tag.onclick = function() { reverseFunction(id) };
	refresh();
}


function addSkill(skillId) {
	toggleFilter(skillId, availableSkillsDiv, selectedSkillsDiv, removeSkill);
}


function removeSkill(skillId) {
	toggleFilter(skillId, selectedSkillsDiv, availableSkillsDiv, addSkill);
}


function addTag(tagId) {
	toggleFilter(tagId, availableTagsDiv, selectedTagsDiv, removeTag);
}


function removeTag(tagId) {
	toggleFilter(tagId, selectedTagsDiv, availableTagsDiv, addTag);
}


fetch("/api/projects.json").then(function (response) {
	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}

	response.json().then(function (json) {
		projectsJson = json;
	});
});

const ids = {};
const numberOfTags = availableTagsDiv.children.length;

for (let i = 0; i < numberOfTags; i++) {
	const tag = availableTagsDiv.children[i];
	ids[tag.innerText] = i;
	tag.id = i;
}

for (let i = 0; i < availableSkillsDiv.children.length; i++) {
	const skill = availableSkillsDiv.children[i];
	ids[skill.innerText] = numberOfTags + i;
	skill.id = numberOfTags + i;
}

for (const tag of tags) {
	tag.onclick = function() {
		const id = ids[this.innerText];
		if (id >= numberOfTags) {
			addSkill(id);
		} else {
			addTag(id);
		}
	}
	tag.href = "javascript: void(0)";
}
