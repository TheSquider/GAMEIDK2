let glbtxt; //the textbox used by all scripts (and npc.js)
let appBool = true;

function setTXT(txt) {
    console.time();
    glbtxt = txt;
    txt.remove();
    appBool = false;
    console.timeEnd();
    console.log('@ TXTBOX');
}