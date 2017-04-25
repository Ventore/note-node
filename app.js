const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./note.js");

const argv = yargs
                .command('add', 'Add a new note', {
                    title: {
                        describe: 'Title of note',
                        demand: true,
                        alias: 't'
                    },
                    body: {
                        describe: 'The body of the note',
                        demand: true,
                        alias: 'b'
                    }
                })
                .command('list', 'List all notes').command('read', 'Read specific note', {
                    title: {
                        describe: 'Title of note',
                        demand: true,
                        alias: 't'
                    }
                })
                .command('remove', 'Remove specific note', {
                    title: {
                        describe: 'Title of note',
                        demand: true,
                        alias: 't'
                    }
                })
                .help()
                .argv;

var command = argv._[0];

if(command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created');
        notes.logNote(note);
    } else {
        console.log('Title is taken!');
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach((note) => notes.logNote(note));
} else if(command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        notes.logNote(note);
    } else {
        console.log('Note not found!');
    }
    console.log(message);
    
} else if(command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not Found!';
    console.log(message);
} else {
    console.log('Command not recognized');
}

