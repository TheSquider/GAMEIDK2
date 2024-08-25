let dbgnmbr2 = 0;
let npcDialogOpt = [
    //[0, 'ERROR NO VALID DIALOG, DO NOT ITERCACT FURTHER'],
    [1, 'I hate taxes', 'That is why I dont pay them', 'I will die', 'Oh well!'],
    [2, 'I have romantic feelings torwards NPCID#45 and I am going insane because of it!'],
    [45, 
        'I hate the fact that Im forced to look like §.',
        'Actually I dont have to be § anymore',
        'The dude updated the code!',
        '*CHANGES FORM*',
        "CMD#npcElement[InternalId].innerHTML='R';CMD#(move please)",
        "CMD#npcElement[InternalId].innerHTML='§';CMD#Cool huh?",
    ],
    [89, 'I', 'AM', 'so happy to see you!', "CMD#document.body.style.background = 'red'CMD#AND ALSO ALIVE MUAHAHAHHA", '...', "CMD#document.body.style.background = '#ffdead'CMD#Ok I'm sorry..."],
    [666, 'lol'],
    [4, 'Its a tree.'],
];

//
//
//DIALOG
function npcDialog(id, ds) {
    dbgnmbr2 = dbgnmbr; //Ignore this DEBUG
    if (dbgnmbr2 > 3) {npcDialogOpt[4][1] = dbgnmbr2 + ' ms, go make faster code'}
    if (dbgnmbr2 < 3 && dbgnmbr2 > 1) {npcDialogOpt[4][1] = dbgnmbr2 + ' ms, it is ok'}
    if (dbgnmbr2 < 1) {npcDialogOpt[4][1] = dbgnmbr2 + ' ms, damn that is fast'}

    let output = 'ERROR';

    if (appBool == false) { //Checks if an interal ID has be found
        for (let i = 0; i < npcDialogOpt.length; i++) { //Finds internal ID
            if (npcDialogOpt[i][0] == id) {InternalId = i;}
        }
    }
    if (ds !== npcDialogOpt[InternalId].length) { //This exists for script run through dialog
        let cmd = npcDialogOpt[InternalId][ds].split('CMD#');

        if (cmd.length > 1) {cmd.shift(); eval(cmd[0]); output=cmd[1];} else {
        output = cmd[0];}
    }
    glbtxt.innerHTML = output;
    
    if (appBool == true && ds == npcDialogOpt[InternalId].length ) {
        dialogStage = 0;
        InternalId = 0;
        appBool = false;

        glbtxt.remove();
    } else if (appBool == false) { //I could just use else here, but else if makes it easier to read
        appBool = true;

        document.body.appendChild(glbtxt);
    }
}

//
//
//MOVEMENT
/*function randomMove(Pos, Id) {
    //The air is quite, the birds are out, the clouds are hugging the eart. It's so nice today, I think I'll go for a walk.


}*/