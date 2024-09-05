//
//for npc dialog go to npc.js
let glbtxt; //the textbox used by all scripts (and npc.js)
let appBool = true; //Wether the txtbox is open or closed
let menuBool = false; //Used only in basics.js, here only for ease
//DialogOption is in basics

//MOVE TO FILE
let menuOptionsDefault = ['0', '1', '2'];
let menuTextDefault = ['STATISTICS', 'QUESTS', 'ITEMS']
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
function menu(menuOptions, menuText) {
    let txtToGive = "<ul>"
    for (let i = 0; i < menuOptions.length; i++) {
        const opt = menuOptions[i];
        const txt = menuText[i];
        txtToGive += "<li id='" + opt + "'>" + txt + "</li>";
    }
    txtToGive += "</ul>"
    glbtxt.innerHTML = txtToGive;
    
    document.body.appendChild(glbtxt);
    document.getElementById('0').style.color = 'red';
    
    dialogOption = 0;
    appBool = true;
}
function selectMenu(LoR, menuOptions) {
    console.log(menuOptions[dialogOption]);
    
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