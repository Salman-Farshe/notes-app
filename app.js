// import modules/packages
const yargs = require('yargs')
const chalk = require('chalk-v2')
const fs = require('fs-extra')
const { argv } = require('process')
// custom modules
const notes = require('./notes')

// ======================== Add Command ===================
// pass an object
yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title: {
            describe: 'Title of a Notes',
            demandOption: true,     // required
            type: 'string'          // input type
        },
        body: {
            describe: 'Body of a Notes',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        // this function going to run, when someone uses that (add) command.
        // argv = contains all of the argumants provided into the builder
        notes.addNote(argv.title, argv.body)
    }
})

// ======================= Remove Command ===================
yargs.command({
    command: 'remove',
    describe: 'Remove a Note',
    builder: {
        title: {
            describe: 'Title of a Notes',
            demandOption: true,
            type: 'string'
        }
    },
    // argument vector
    handler: (argv) => {
        notes.removeNote(argv.title)
    }
})


console.log(yargs.argv)