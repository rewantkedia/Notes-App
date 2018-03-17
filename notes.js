//console.log('Starting notes:  ');

/*module.exports.addNote = () => {
    console.log('adding note');
    return 'new note';
}*/
const fs = require('fs');


var fetch_notes = () =>{
    try {
        var note_string = fs.readFileSync("notes.json");
        var notes = JSON.parse(note_string);
        return notes;
    }
    catch(e)
    {
        return [];
    }
}
var writeNotes = (notes) =>{
    fs.writeFileSync('notes.json',JSON.stringify(notes));
}
var addNote = (title,body) =>{
   // console.log("Adding node : ",title,":  ",body);
    var nodes = fetch_notes();
    var node = {
        title:title,
        body:body
    };
    /*try {
        var nodestring = fs.readFileSync("notes.json");
        nodes = JSON.parse(nodestring);

    }
    catch(e)
    {

    }*/
    var repeatedNotes = nodes.filter((node)=>{
        return node.title == title;
    })
    if(repeatedNotes.length == 0)
    {
            nodes.push(node);
       //     fs.writeFileSync("notes.json",JSON.stringify(nodes));
            writeNotes(nodes);
            return node;
    }


};
var getAll = () =>{
  //  console.log("Listing the nodes: ");
    return fetch_notes();
}
var removeNode = (title) =>{
    console.log("Removing node:  ",title);
    var notes = fetch_notes();
    var new_notes = notes.filter((note) => note.title !== title);
    writeNotes(new_notes);
    return notes.length!=new_notes.length;
}
var readNode = (title) =>{
    console.log("Reading node:  ",title);
    var notes = fetch_notes();
    var filtered_notes = notes.filter((note) => note.title === title);
    //console.log("Note title: ",filtered_notes[0].title);
    //console.log("Note body: ",filtered_notes[0].body);
    return filtered_notes[0];
}
var logNote = (note) =>{
    debugger;
    console.log();
    console.log("Note title: ",note.title);
    console.log("Note body: ",note.body);
    console.log();
}
module.exports = {
    addNote,
    getAll,
    removeNode,
    readNode,
    logNote
};
