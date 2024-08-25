let dbgnmbr2 = 0; //DEBUG
let npcDialogOpt = [
    [0, 'ERROR NO VALID DIALOG, VAR InternalID RETURNED 0 AT npc.js'],
    [1, 'I hate taxes', 'That is why I dont pay them', 'I will die', 'Oh well!'],
    [2, 'I have romantic feelings torwards NPCID#45 and I am going insane because of it!'],
    [45, 
        'I hate the fact that Im forced to look like §.',
        'Actually I dont have to be § anymore',
        'The dude updated the code!',
        '*CHANGES FORM*',
        "CMD#npcElement[InternalId-2].innerHTML='R';CMD#(move please)",
        "CMD#npcElement[InternalId-2].innerHTML='§';CMD#Cool huh?",
    ],
    [89, 'I', 'AM', 'so happy to see you!', "CMD#document.body.style.background = 'red'CMD#AND ALSO ALIVE MUAHAHAHHA", '...', "CMD#document.body.style.background = '#ffdead'CMD#Ok I'm sorry..."],
    [666, 'lol'],
    [4, 'Its a tree.'],

    [99, 'Controls are: WASD to move, Q to interact, P to open the menu, [ and ] to navigate, and O to select.'],
    [100, "Everything you see in changable. You can work within the guidelines I've given you or colour outside the page. Full documentatiion comes with the free download.", "See this more of a jumping board for ideas, not a limitation. I've tried to make this engine simple to work with while still letting people mess with the code itself."],
    [101, "Art and software should be free, and above all human. If you end up making anything with this engine please don't monitise it and above all share it.", "I will be hearing feedback and the GitHub link is on the itch.io page.", "Email me at frechsquid.headcanon@gmail.com"],
    [102, "If you press Q again you will go to a test game to see more of the capabilities of the engine, press P to quit.", "CMD#window.location.href = './index.html'CMD#"],
    [103, "Hey you found the obligatory secret in the wellcome page, how neet!"]
];


//
//
//DIALOG
function npcDialog(id, ds) {
    dbgnmbr2 = dbgnmbr; //Ignore this DEBUG
    if (dbgnmbr2 > 3) {npcDialogOpt[5][1] = dbgnmbr2 + ' ms, go make faster code'}
    if (dbgnmbr2 < 3 && dbgnmbr2 > 1) {npcDialogOpt[5][1] = dbgnmbr2 + ' ms, it is ok'}
    if (dbgnmbr2 < 1) {npcDialogOpt[5][1] = dbgnmbr2 + ' ms, damn that is fast'}

    let output = 'ERROR';

    if (appBool == false) { //Checks if an interal ID has be found
        for (let i = 0; i < npcDialogOpt.length; i++) { //Finds internal ID
            if (id == npcDialogOpt[i][0]) {InternalId = i}
        }
    }
    
    if (ds !== npcDialogOpt[InternalId].length) { //This exists for scripts run through dialog
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
function randomMove(npcMargins, id) {
    //The air is quite, the birds are out, the clouds are hugging the eart. It's so nice today, I think I'll go for a walk.

    let A2 = performance.now(); //ignore this DEBUG
    if(!id && id !== 0){return null;}

    let spd = 10;
    let time = 0;

    function MV(spd, xy) {
        npcPos[id][xy] += spd;
            for (let i = 0; i < objsPos.length; i++) {
                if (npcPos[id].toString() === objsPos[i].toString()) {
                    npcPos[id][xy] -= spd*2;
                }
            }
    }

    while (time < 999) {
        let rand = Math.abs((Math.floor(Math.random()*10)-5));
        time += rand;

        setTimeout(() => {
        let rand2 = (Math.floor(Math.random()*10));
        //The problem is the fact that rand2 and rand can only really be bigger or smaller than 2, meaning that there are only 4 case, which all do diffrent things. If I could get the minus and the plus to merge (*-1?) then there would be only 2
        if (rand2 > 2) {
            if (rand < 2) {
                MV(spd, 0);
            } else {
                MV(spd*-1, 0)
            }
        } else {
            if (rand < 2) {
                MV(spd, 1);
            } else {
                MV(spd*-1, 1);
            }
        }

        for (let i = 0; i < npcPos[id].length; i++) {
            const check = npcPos[id][i];
            
            if(check < npcMargins[0]){
                npcPos[id][i] += spd;
            }
            if (check > npcMargins[1]) {
                npcPos[id][i] -= spd;
            }
        }
        applypos(npcPos[id], npcElement[id]);}, time * 500);
    }

    let B2 = performance.now();
    dbgnmbr2 = (B2 - A2);
    console.log(dbgnmbr2 + ' ms @ ' + 1 + ' MOVING NPCs');
}