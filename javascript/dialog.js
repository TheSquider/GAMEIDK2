//
//for npc dialog go to npc.js
let glbtxt; //the textbox used by all scripts (and npc.js)
let appBool = true; //Wether the txtbox is open or closed
let menuBool = false; //Used only in basics.js, here only for ease
//DialogOption is in basics

let menuOptions = ['ST', 'QU', 'IT'];
let menuScreens = [
    "This is health", 
    "This is your quest", 
    "This is an item"
]

function setTXT(txt) {
    //console.time();
    glbtxt = txt;
    txt.remove();
    appBool = false;
    //console.timeEnd();
    //console.log('@ TXTBOX');
}

//MENU
//
//I don't know how in-options menus will work (like getting to specific item or quest)
function menu() {
    glbtxt.innerHTML = "<ul><li id='ST'>STATS</li><li id='QU'>QUESTS</li><li id='IT'>ITEMS</li></ul>";
    document.body.appendChild(glbtxt);
    document.getElementById('ST').style.color = 'red';
    
    dialogOption = 0;
    appBool = true;
}
function selectMenu(LoR) {
    dialogOption += LoR; if(dialogOption > menuOptions.length-1){dialogOption = menuOptions.length-1}if(dialogOption < 0){dialogOption = 0}
    
    document.getElementById(menuOptions[dialogOption]).style.color = 'red';
    for (let i = 0; i < menuOptions.length; i++) {
        if (menuOptions[i] != menuOptions[dialogOption]) {
            document.getElementById(menuOptions[i]).style.color = 'white';
        }
    }
    //rethink
}
function clickMenu(dOp) {
    glbtxt.innerHTML = menuScreens[dOp];
    //rethink
}