var contacts = document.getElementsByClassName("contacts");
var maxWidth = 0;

for (i = 0; i < contacts.length; ++i) {
    maxWidth = Math.max(maxWidth, contacts[i].offsetWidth)
};
for (i = 0; i < contacts.length; ++i) {
    contacts[i].style.width = maxWidth + "px";
};
