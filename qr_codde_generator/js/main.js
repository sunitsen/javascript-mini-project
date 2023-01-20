//selection

const container = document.querySelector(".container");
qrInput = container.querySelector(".form input");
generateBtn = container.querySelector(".form button");
qrImg = container.querySelector(".qr-code img");

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value;
    if(!qrValue){
        return;
    }
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example`;
});