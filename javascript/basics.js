let pos = [0, 0]
let objsPos = []
let npcPos = [] 
let npcID = [] //1-1 with npcPos
let dialogStage = 1; //dialogStage = 0 is the id of the NPC
let InternalId = 0; //NPC ID used for dialog, it's its index in the array. I made it so npcID and InternalID are not the same for flexebility, less errors!
//DEBUG
let dbgnmbr = 0;

//
//
//PLAYER
function controls(plr, eve, margins, spd) {
    if(!spd){spd = 10;} if(!margins){margins = [0, 500]}
    let key = eve.code;

    //key input (yes all of it)
    switch (key) {
        case 'KeyD':
            pos[0] += spd;
            for (let i = 0; i < objsPos.length; i++) {
                if (pos.toString() === objsPos[i].toString()) {
                    pos[0] -= spd;
                }
            }
            plr.style.left = pos[0].toString() + 'px';
            break;
        case 'KeyA':
            pos[0] -= spd;
            for (let i = 0; i < objsPos.length; i++) {
                if (pos.toString() === objsPos[i].toString()) {
                    pos[0] += spd;
                }
            }
            plr.style.left = pos[0].toString() + 'px';
            break;
        case 'KeyS':
            pos[1] += spd;
            for (let i = 0; i < objsPos.length; i++) {
                if (pos.toString() === objsPos[i].toString()) {
                    pos[1] -= spd;
                }
            }
            plr.style.top = pos[1].toString() + 'px';
            plr.style.zIndex = '0'; //FIX THIS
            break;
        case 'KeyW':
            pos[1] -= spd;
            for (let i = 0; i < objsPos.length; i++) {
                if (pos.toString() === objsPos[i].toString()) {
                    pos[1] += spd;
                }
            }
            plr.style.top = pos[1].toString() + 'px';
            plr.style.zIndex = '2'; //FIX THIS
            break;
    
    //OTHER CONTROLS
        case 'KeyQ': //interact NPC
            for (let i = 0; i < npcPos.length; i++) { //yes it checks all NPCs, it's fast enough though
                if (pos.toString() === npcPos[i].toString()) {
                    npcDialog(npcID[i], dialogStage); //InternalID is not given as it can be used globaly, and it needs to be used globaly for KeyP to work
                    dialogStage++;
                }
            }
            break;
        case 'KeyP': //open menu (items, quests, stats) & close txtbox if open | ONLY SECOND WORKS
            if (appBool == true) {
                glbtxt.remove();
                appBool = false; //Varible from dialog.js

                dialogStage = 1;
                InternalId = 0; //Variable from npc.js
            } else {
                //MENU
            }
            break;
        //ADD MENU INTERACTIONS
    }

    //margins
    for (let i = 0; i < pos.length; i++) {
        const check = pos[i];
        
        if(check < margins[0]){
            pos[i] = margins[0];
            applypos(pos, plr);
        }
        if (check > margins[1]) {
            pos[i] = margins[1];
            applypos(pos, plr);
        }
    }

    //console.log('position[x,y]: ' + pos);
}
function applypos(newPos, obj) {
    obj.style.left = newPos[0].toString() + 'px';
    obj.style.top = newPos[1].toString() + 'px';
}


//
//
//OBJECTS
function setObj(obj) {
    let A = performance.now(); //ignore this
    for (let i = 0; i < obj.length; i++) {
        const cObj = obj[i];
        let Opos = cObj.innerHTML.split('#'); //In order [X cordinate, Y cordinate, NPC ID (if any)]
        
        if (Opos[0].length > 1) { //This is needed for objects with horizontal lenght (eg. walls)
            for (let i = 1; i < Opos[0].length; i++) {
                let intOposWall = [parseInt(Opos[1])+10*i, parseInt(Opos[2])];
                objsPos.push(intOposWall);
            }
        }

        cObj.innerHTML = Opos[0]; //Remove the cordinates
        Opos.splice(0, 1);

        let intOpos = [] //by default Opos is an array of strings
        for (let i = 0; i < Opos.length; i++) { //Needed for NPCs which have 3 # numbers (also makes the code flexible)
           intOpos.push(parseInt(Opos[i]));
        }
        
        if (cObj.innerHTML == '§') { //Adds to the npc list or object list (Yes NPCs must use the § symbol)
            npcPos.push(intOpos);
        }
        else {objsPos.push(intOpos);}
        
        applypos(intOpos, cObj); //The whole reason we did all that is so objects can be on a grid, otherwise it would be near imposible to do anything
    }
    for (let i = 0; i < npcPos.length; i++) { //IT IS NEEDED EXACTLY LIKE THAT FOR DIALOG, DO NOT MESS WITH THIS
        npcID[i] = npcPos[i].pop();
    }
    let B = performance.now();
    dbgnmbr = (B - A);
    console.log(dbgnmbr + ' @ OBJECTS');
}








//
//
//The grid(tm) is an imaginary set of cordinates where all objects, NPCs and the player operate in.
//Each "cell" in the grid is a 10x10 box of pixels, and it can also be considered as a step.
//When difanining something that isn't a player (which by default starts at [0,0]) after the innerHTML of the object you must add it's cordinates
//This can be done like this (O#80#120)
//The above object will look like "O" and be at the position [80,120]
//Longer objects, like walls, will look like this (WALL#80#120)
//The wall will start at the position [80,120] and end in the position [80, 120 + Number of characters minus the first * 10] (in this case [80, 150])
//Horizontal walls must be done manually (for now)
//NPCs need an extra #, which is their id (eg. §#200#10#89, this will make an NPC at the position [200,10] and with id 89)
//