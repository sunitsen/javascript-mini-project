






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




