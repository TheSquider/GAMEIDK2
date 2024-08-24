//
//for npc dialog go to npc.js
let glbtxt; //the textbox used by all scripts (and npc.js)
let appBool = true; //Wether the txtbox is open or closed

function setTXT(txt) {
    //console.time();
    glbtxt = txt;
    txt.remove();
    appBool = false;
    //console.timeEnd();
    //console.log('@ TXTBOX');
}