//selection
const display = document.querySelector("input");
    button = document.querySelector("button");
    copyBtn = document.getElementById("copyBtn");
    editBtn = document.querySelector("editBtn");

    let chars = "mvdfdfidfldkmjbf,bfgfgge;ffsdcsddbghmnghnmlngmpgho";
    


button.onclick = (e) => {
    let i;
    randomPassword = "";
    for(i = 0; i< 16; i++){
        randomPassword = randomPassword + chars.charAt(
            Math.floor(Math.random() * chars.length)
            );
    };
   display.value = randomPassword;
};
//copy generated password
function copy(){
    
    display.select();
    document.execCommand("copy");
}