//text area resize application
const textarea = document.querySelector("textarea");

textarea.addEventListener("keyup", e => {
    textarea.style.height = "59px";
    let scHeight = e.target.scrollHeight;
    textarea.style.height = `${scHeight}px`;

})
