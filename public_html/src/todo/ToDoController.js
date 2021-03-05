'use strict'

/**
 * ToDoController
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {    
    constructor() {}

    setModel(initModel) {
        this.model = initModel;
        let appModel = this.model;

        var dialog = document.getElementById("delete-confirm-dialog");
        var closeButton = document.getElementsByClassName("close")[0];
        var confirmButton = document.getElementById("confirm-button");
        var cancelButton = document.getElementById("cancel-button");
        var closeCurrentList = document.getElementsByClassName("list-item-control")[4];

        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL




        document.getElementById("todo-lists-list").onmousedown = function(){
            appModel.selectListOnTop();
            appModel.tps.clearAllTransactions();
        }


        document.getElementById("add-list-button").onmousedown = function() {
            
            appModel.addNewList();
            appModel.tps.clearAllTransactions();
            
            
        }

        document.getElementById("undo-button").onmousedown = function() {
            appModel.undo();
            if(appModel.tps.getUndoSize() == 0){
                document.getElementById("undo-button").style.color = "#322d2d";
                document.getElementById("undo-button").style.pointerEvents = "none";
            }
            if(appModel.tps.getRedoSize() != 0){
                document.getElementById("redo-button").style.color = "rgb(233,237,240)";
                document.getElementById("redo-button").style.pointerEvents = "auto";
            }







            
            console.log(appModel.tps.getUndoSize());






        }

        document.getElementById("redo-button").onmousedown = function() {
            appModel.redo();
            if(appModel.tps.getRedoSize() == 0){
                document.getElementById("redo-button").style.color = "#322d2d";
                document.getElementById("redo-button").style.pointerEvents = "none";
            }
            if(appModel.tps.getUndoSize() != 0){
                document.getElementById("undo-button").style.color = "rgb(233,237,240)";
                document.getElementById("undo-button").style.pointerEvents = "auto";
            }
        }

        document.getElementById("add-item-button").onmousedown = function() {
            appModel.addNewItemTransaction();
            if(appModel.tps.getUndoSize() != 0){
                document.getElementById("undo-button").style.color = "rgb(233,237,240)";
                document.getElementById("undo-button").style.pointerEvents = "auto";
            }
        }  


        document.getElementById("delete-list-button").onmousedown = function() {
            dialog.style.display="block";
        }

        closeButton.onmousedown = function(){
            dialog.style.display = "none";
        }

        confirmButton.onmousedown = function(){
            dialog.style.display = "none";
            appModel.removeCurrentList();
            appModel.closeCurrentList();
        }

        cancelButton.onmousedown = function(){
            dialog.style.display = "none";
        }        

        
        closeCurrentList.onmousedown = function(){
            appModel.closeCurrentList();
        }

    }

    
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        this.model.loadList(listId);
    }
}