let dbgnmbr2 = 0;
let npcDialogOpt = [
    [0, 'ERROR NO VALID DIALOG, DO NOT ITERCACT FURTHER'],
    [1, 'I hate taxes', 'That is why I dont pay them', 'I will die', 'Oh well!'],
    [2, 'I have romantic feelings torwards NPCID#45 and I am going insane because of it!'],
    [45, 'I hate the fact that Im forced to look like §.'],
    [89, 'I', 'AM', 'so happy to see you!', 'AND ALSO ALIVE MUAHAHAHHA'],
    [666, 'lol']
];

//
//
//DIALOG
function npcDialog(id, ds) {
    dbgnmbr2 = dbgnmbr; //Ignore this
    if (dbgnmbr2 > 3) {npcDialogOpt[5][1] = dbgnmbr2 + ' ms, go make faster code'}
    if (dbgnmbr2 < 3 && dbgnmbr2 > 1) {npcDialogOpt[5][1] = dbgnmbr2 + ' ms, it is ok'}
    if (dbgnmbr2 < 1) {npcDialogOpt[5][1] = dbgnmbr2 + ' ms, damn that is fast'}

    if (InternalId == 0) { //check if an interal ID has be found
        for (let i = 0; i < npcDialogOpt.length; i++) {
            if (npcDialogOpt[i][0] == id) {
                InternalId = i;
                
                glbtxt.innerHTML = npcDialogOpt[i][ds];
            }
        }
    } else {
        glbtxt.innerHTML = npcDialogOpt[InternalId][ds];
    }
    
    if (ds == npcDialogOpt[InternalId].length && appBool == true) {
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
function randomMove() {
    //The air is quite, the birds are out, the clouds are hugging the eart. It's so nice today, I think I will go for a walk.


}