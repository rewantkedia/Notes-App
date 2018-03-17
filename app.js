//console.log('Start app');

const os = require('os');//inbuilt
const _ = require('lodash');//npm installed
const yargs = require('yargs'); // yargs parses the commandline into key value pairs.'_' is the key for array of all the keys

const notes = require('./notes.js'); //user made file

//const args = yargs.argv;///argv = arguement vector

const args = yargs
    .command('add','Add a new note',{
        title:{
            describe: 'Title of the note . ',
            demand : true , //indicates that entering title is mandatory.//default value is false
            alias : 't' //creates a flag for title.not instead of --title we can write -t
        },
        body:{
            describe:'Body of the note',
            demand : true,
            alias: 'b'
        }
    })
    .command('list','List all the notes')
    .command('read','Read a node',{
        title:{
            describe: 'Title of the note . ',
            demand : true , //indicates that entering title is mandatory.//default value is false
            alias : 't' //creates a flag for title.not instead of --title we can write -t
        },
    })
    .command('delete','Delete a note',{
        title:{
            describe: 'Title of the note . ',
            demand : true , //indicates that entering title is mandatory.//default value is false
            alias : 't' //creates a flag for title.not instead of --title we can write -t
        },
    })
    .help()
    .argv;
console.log(args);
if(args._[0] == "add")
{
    console.log("Add node function called ");
    var note = notes.addNote(args.title,args.body);
    if(note)
    {
        console.log('Note has been added ');
       /* console.log('Title: ',note.title);
        console.log('Body: ',note.body);*/
       notes.logNote(note);
    }
    else
    {
        console.log('Sorry! The title has already been taken');
    }
}
else if(args._[0] == "list")
{
    var all_note = notes.getAll();
    if(all_note.length) {
        console.log("Printing notes. ");
        all_note.forEach((note) => {
            notes.logNote(note);
    })
    }
    else
    {
        console.log("NO NOTES PRESENT.");
    }


}
else if(args._[0] == "read")
{
    var note = notes.readNode(args.title);
    if(note)
    {
        console.log("Note found: ");
       /* console.log("Note title: ",note.title);
        console.log("Note body: ",note.body);*/
       notes.logNote(note);
    }
    else
    {
        console.log("Note not found. ");
    }
}
else if(args._[0] == "delete")
{
    if(notes.removeNode(args.title))
    {
        console.log("Node with title: ",args.title," has been removed. ");
    }
    else
    {
        console.log("No such title present in the notes. ");
    }
}
else
{
    console.log("Wrong command entered");
}