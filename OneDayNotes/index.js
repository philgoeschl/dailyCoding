const notes = []
console.log(notes)

function saveNote(){
    let input = document.getElementById("note-input").value

    var note = {
        text: input,
        timestamp: new Date().toLocaleTimeString()
    }

    notes.push(note)
    console.log(notes)

    //var notesDiv = document.getElementById("notes")
    //notesDiv.append(note.text + note.timestamp)

    var noteElement = document.createElement("div")
    var text = document.createTextNode(note.text)
    noteElement.appendChild(text)
    document.getElementById("notes").appendChild(noteElement)

}

