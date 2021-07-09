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
    var linebreak = document.createTextNode(' - ')
    var timestamp = document.createTextNode(note.timestamp)

    
    noteElement.appendChild(text)
    noteElement.appendChild(linebreak)
    noteElement.appendChild(timestamp)
    document.getElementById("notes").appendChild(noteElement)

}

