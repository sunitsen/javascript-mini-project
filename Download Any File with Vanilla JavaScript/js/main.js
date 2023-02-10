//selection
const fileInput = document.querySelector("input"),
downloadBtn = document.querySelector("button");
elements = document.getElementById("elements")


downloadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    downloadBtn.innerHTML = 'Download file...';
     fetchFile(fileInput.value);
});

function fetchFile(url){
    fetch(url).then(res => res.blob()).then(file => {
    
     let tempUrel = URL.createObjectURL(file);
     let aTag = document.createElement("a");
     aTag.href = tempUrel;
     aTag.download = url.replace(/.*[\\\/]/, '');
     elements.appendChild(aTag);
    aTag.click();
    aTag.remove();
    URL.revokeObjectURL(tempUrel);
    downloadBtn.innerHTML = 'Download file';

    }).catch(() => {
        downloadBtn.innerHTML = 'Download file';
        alert("Failed to download fiel");
    });
}

