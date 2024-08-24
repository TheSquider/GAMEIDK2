let npcDialogOpt = [
    ['I hate taxes', 'That is why I dont pay them', 'I will die', 'Oh well!'],
    [],
    ['I have romantic feelings torwards NPCID#45 and I am going insane because of it!'],
];

function npcDialog(id, ds) {
    glbtxt.innerHTML = npcDialogOpt[id][ds];
    
    if (appBool == false) {
        document.body.appendChild(glbtxt);
        appBool = true;
    } else if (ds == npcDialogOpt[id].length && appBool == true) {
        dialogStage = -1;
        ds = dialogStage;
        glbtxt.remove();
        appBool = false;
    }
}   