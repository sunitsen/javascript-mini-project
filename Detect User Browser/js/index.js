let userAgent = navigator.userAgent;

let browser;

if(userAgent.match(/crome/i)){
    browser = "crome";
}else if(userAgent.match(/mozila/i)){
    browser = "mozila"
}else if(userAgent.match(/edg/i)){
    browser = "edg"
}else if(userAgent.match(/opera/i)){
    browser = "opera"
}else if(userAgent.match(/Safari/i)){
    browser = "Safari"
}else{
    alert("other browser");
}
const logo = document.querySelector(`.logos .${browser}`);

if(logo  != ""){
    logo.style.opacity = "1";
}