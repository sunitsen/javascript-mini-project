//crud application
var selectedRow = null;
//showing Alearts
function showAlert(message, clasName){
    const div = document.createElement("div");
    div.classList = `alert alert-${clasName}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div,main);
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}



var selectedRowTwo = null;
//showing alearts
function showAlertTwo(message, clasName){
    const div2 = document.createElement("div");
    
}

//Clear all Fields
function clearFields() {
    document.querySelector("#firstName").value ="";
    document.querySelector("#lastName").value ="";
    document.querySelector("#rollNo").value ="";
}
// Add data
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();
    //get form value
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rollNo = document.querySelector("#rollNo").value;
    //validation
    if(firstName == "" || lastName == "" || rollNo == ""){
        showAlert("Please fill in all fields", "danger");
    }else{
         if(selectedRow == null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${rollNo}</td>
            <td>
            <a href="#" class="btn btn-warning edit">Edit</a>
            <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Student Added", "success");
         }else{
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rollNo;
            showAlert("Student Info Edited", "info");
         }
       clearFields();
    };
});


//Edit Data
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollNo").value = selectedRow.children[2].textContent;

    }
});

//Delete Data
document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted...!", "danger");
    }
});












//todo application
const notesWrapper = document.getElementById("nots-wrapper");
const title = document.getElementById("title");
const content = document.getElementById("content");
const error = document.getElementById("form-error");
let notesData = [];



//creating nots
const creatNote = (uid, title, text, date) => {
    const note = document.createElement("div");
    note.id = uid;
    note.innerHTML =
    
    `
    <div class="note-title">${title}</div>
    <div class="note-controls">
        <button class="note-edit" onclick="editNote(${uid})">Edit</button>
        <button class="note-save" style="display:none" onclick="saveNote(${uid})">Save</button>
        <button class="note-delete" onclick="deleteNote(${uid})">Delete</button>
    </div>

    <div class="note-text">${text}</div>
    <div class="note-date">${date}</div>

    `;
     notesWrapper.insertBefore(note, notesWrapper.firstChild);

};

//note add
const addNote = () => {
    if(title.value.trim().length == 0 && content.value.trim().length == 0){
        error.innerHTML = "Note can,t be empty";
        return;
   
    }
    
   const uid = Date.now().toString();;
 

   const noteObj = {
    uid: uid,
    title: title.value,
    text: content.value,
    date: new Date().toLocaleDateString(),
    
   }
   
 
notesData.push(noteObj);
localStorage.setItem("notes", JSON.stringify(notesData));
  
creatNote(noteObj.uid, noteObj.title, noteObj.text,noteObj.date);

error.innerHTML = "";
content.value = "";
title.value = "";
     
};

//edit notes
const editNote = (uid) => {
  const note = document.getElementById(uid);

  const noteTitle = note.querySelector(".note-title");
  const noteText = note.querySelector(".note-text");
  const noteSave = note.querySelector(".note-save");
  const noteEdit = note.querySelector(".note-edit");

  noteTitle.contentEditable = 'true';
  noteText.contentEditable = 'true';
  noteEdit.style.display  = 'none';
  noteSave.style.display = 'block';
  noteText.focus();
}

//save note
const saveNote = (uid) => {
    const note = document.getElementById(uid);
 
    const noteTitle =  document.querySelector(".note-title");
    const noteText =  document.querySelector(".note-text");
    const noteSave =  document.querySelector(".note-save");
    const noteEdit =  document.querySelector(".note-edit");
    
    if(noteTitle.innerHTML.trim().length == 0 && noteText.value.trim().length == 0){
        error.innerHTML =  "Note can,t be empty";
        return;
    }
    notesData.forEach((note) => {
        if(note.uid == uid){
            note.title =  noteTitle.innerHTML;
            note.text =  noteText.innerHTML;
        }
    });

localStorage.setItem("notes", JSON.stringify(notesData));

noteTitle.contentEditable = 'false';
noteText.contentEditable = 'false';
noteEdit.style.display = 'block';
noteSave.style.display = 'none';
error.innerHTML = '';
};

const deleteNote = (uid) => {
    let confirmDelete =  confirm("Are tou sure wants to delete..");
    if(!confirmDelete){
        return;
    }

    const note = document.getElementById(uid);
    note.parentNode.removeChild(note);
    notesData = notesData.filter((note) => {
        return note.uid != uid;
    });
    localStorage.setItem("notes", JSON.stringify(notesData));
};

window.addEventListener("load", () => {
    notesData = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
    notesData.forEach((note) => {
        creatNote(note.uid, note.title, note.text, note.data);
    })
});




