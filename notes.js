const chalk = require('chalk-v2')
const fs = require('fs-extra')

// ============================ Re-Usable code ===========================
// save notes
const saveNote = (note) => {
    const dataJSON = JSON.stringify(note)   // convert Object to JSON
    fs.writeFileSync('notes.json', dataJSON)
}

// load notes
const loadNote = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')    // binary data
        const dataJSON = dataBuffer.toString()         // binary to String data
        return JSON.parse(dataJSON)                   // JSON to Object
    } catch(e){
        return []       // empty array list
    }
}


// ========================= add notes =====================
const addNote = (title, body) => {
    const note = loadNote()
    // check duplication of input data
    const duplicate = note.filter(notes => {
        return notes.title === title
    })

    if(duplicate.length == 0){
        // push into array
        note.push({
            title: title,
            body: body
        })
        // save newly created data
        saveNote(note)
        console.log(chalk.green('Notes Added Successfully..'))
    } else{
        console.log(chalk.red('Notes Already Taken.. Please Try Another'))
    }
}

// ======================= remove notes =====================
const removeNote = (title) => {
    const notes = loadNote()
    const notesToKeep = notes.filter(note => {
        return note.title !== title
    })

    if(notesToKeep.length < notes.length){
        saveNote(notesToKeep)
        console.log(chalk.green('Removed Note Successfully..'))
    } else{
        console.log(chalk.red('Notes Not Found.. Please Check Again..'))
    }
}


// exports module into the app.js file
module.exports = {
    addNote: addNote,
    removeNote: removeNote
}