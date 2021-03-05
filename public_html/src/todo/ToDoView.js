'use strict'

import ChangeTaskText_Transaction from './transactions/ChangeTaskText_Transaction.js'
import ChangeDueDate_Transaction from './transactions/ChangeDueDate_Transaction.js'
import ChangeStatus_Transaction from './transactions/ChangeStatus_Transaction.js'
import MoveItemUp_Transaction from './transactions/MoveItemUp_Transaction.js'
import MoveItemDown_Transaction from './transactions/MoveItemDown_Transaction.js'
import DeleteItem_Transaction from './transactions/DeleteItem_Transaction.js'

/**
 * ToDoView
 * 
 * This class generates all HTML content for the UI.
 */
export default class ToDoView {
    constructor() {
    }

    // ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
    appendNewListToView(newList) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");

        // MAKE AND ADD THE NODE
        let newListId = "todo-list-" + newList.id;
        let listElement = document.createElement("div");
        listElement.setAttribute("id", newListId);
        listElement.setAttribute("class", "todo_button");
        listElement.appendChild(document.createTextNode(newList.name));
        listsElement.appendChild(listElement);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;
        listElement.onmousedown = function() {
            thisController.handleLoadList(newList.id);
        }
    }

    // REMOVES ALL THE LISTS FROM THE LEFT SIDEBAR
    clearItemsList() {
        let itemsListDiv = document.getElementById("todo-list-items-div");
        // BUT FIRST WE MUST CLEAR THE WORKSPACE OF ALL CARDS BUT THE FIRST, WHICH IS THE ITEMS TABLE HEADER
        let parent = itemsListDiv;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    // REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
    refreshLists(lists) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        listsElement.innerHTML = "";

        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendNewListToView(list);
        }
    }

    // LOADS THE list ARGUMENT'S ITEMS INTO THE VIEW
    viewList(list) {
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
        let itemsListDiv = document.getElementById("todo-list-items-div");

        // GET RID OF ALL THE ITEMS
        this.clearItemsList();


        for (let i = 0; i < list.items.length; i++) {
            // NOW BUILD ALL THE LIST ITEMS
            let listItem = list.items[i];
            let listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card'>"
                                + "<div class='task-col'>" + listItem.description + "</div>"
                                + "<input class = 'task-column-input' style = 'display:none'></input>"
                                + "<div class='due-date-col'>" + listItem.dueDate + "</div>"
                                + "<input type = 'date' class = 'due-date-column-input' style = 'display:none'></input>"
                                + "<div class='status-col'>" + listItem.status + "</div>"
                                + "<select name = 'status' class='status-select' style='display:none'><option value='complete'>complete</option><option value='incomplete'>incomplete</option></select>"
                                + "<div class='list-controls-col'>"
                                + " <div class='arrow-up list-item-control material-icons'>keyboard_arrow_up</div>"
                                + " <div class='arrow-down list-item-control material-icons'>keyboard_arrow_down</div>"
                                + " <div class='delete-item list-item-control material-icons'>close</div>"
                                + " <div class='list-item-control'></div>"
                                + " <div class='list-item-control'></div>"
                                + "</div>";
            itemsListDiv.innerHTML += listItemElement;
        }


        this.changeDataForTasks();
        this.changeDataForDueDate();
        this.changeDataForStatus();
        this.changeStatusColor();
        this.moveItemUpButton();
        this.moveItemDownButton();
        this.deleteItemButton();
        this.greyOutArrowButton();
    }


    highlightCurrentItem(){

        for(let i =1; i < tasks.length; i++){

        }
        var t

        for(let i =1; i < tasks.length; i++){
            tasks[i].addEventListener("mouseover",() => {
                var currentTask = document.getElementById("todo-list-item-"+(i-1));
                currentTask.style.backgroundColor = "#7e8084";
            });
        }

        for(let i =1; i < tasks.length; i++){
            tasks[i].addEventListener("mouseout",() => {
                var currentTask = document.getElementById("todo-list-item-"+(i-1));
                currentTask.style.backgroundColor = "#40454e";
            });
        }
    }


    changeDataForTasks(){

        var tasks = document.getElementsByClassName("task-col");
        var tasksInput = document.getElementsByClassName("task-column-input");
        let view = this;

        // for(let i =1; i < tasks.length; i++){
        //     tasks[i].addEventListener("mouseover",() => {
        //         var currentTask = document.getElementById("todo-list-item-"+(i-1));
        //         currentTask.style.backgroundColor = "#7e8084";
        //     });
        // }

        // for(let i =1; i < tasks.length; i++){
        //     tasks[i].addEventListener("mouseout",() => {
        //         var currentTask = document.getElementById("todo-list-item-"+(i-1));
        //         currentTask.style.backgroundColor = "#40454e";
        //     });
        // }

        for(let i =1; i < tasks.length; i++){
            tasks[i].addEventListener("click",() => {

                view.viewList(view.controller.model.currentList);

                tasksInput[i-1].style.display = "block";
                tasksInput[i-1].value = tasks[i].innerHTML;
                tasks[i].style.display = "none";

    
            });
        }
        
        for(let i =0; i < tasksInput.length; i++){

            tasksInput[i].addEventListener("focusout",() => {

                let transaction = new ChangeTaskText_Transaction(view.controller.model,tasks,tasksInput,i);
                view.controller.model.tps.addTransaction(transaction);

                view.viewList(view.controller.model.currentList);

                if(view.controller.model.tps.getUndoSize() != 0){
                    document.getElementById("undo-button").style.color = "rgb(233,237,240)";
                    document.getElementById("undo-button").style.pointerEvents = "auto";
                }
                
            });
        }

    }


    changeDataForDueDate(){
        var dueDate = document.getElementsByClassName("due-date-col");
        var duedateInput = document.getElementsByClassName("due-date-column-input");
        let view = this;

        for(let i =1; i < dueDate.length; i++){
            dueDate[i].addEventListener("click",() => {

                view.viewList(view.controller.model.currentList);

                duedateInput[i-1].style.display = "block";
                duedateInput[i-1].value = dueDate[i].innerHTML;
                dueDate[i].style.display = "none";

            });
        }
        
        for(let i =0; i < duedateInput.length; i++){

            duedateInput[i].addEventListener("focusout",() => {

                let transaction = new ChangeDueDate_Transaction(view.controller.model,dueDate,duedateInput,i);
                view.controller.model.tps.addTransaction(transaction);

                if(view.controller.model.tps.getUndoSize() != 0){
                    document.getElementById("undo-button").style.color = "rgb(233,237,240)";
                    document.getElementById("undo-button").style.pointerEvents = "auto";
                }
            });
        }
    }


    changeDataForStatus(){
        var status = document.getElementsByClassName("status-col");
        var statusSelect = document.getElementsByClassName("status-select");
        let view = this;

        for(let i =1; i < status.length; i++){
            status[i].addEventListener("click",() => {

                view.viewList(view.controller.model.currentList);

                statusSelect[i-1].style.display = "block";
                status[i].style.display = "none";

            });
        }
        
        for(let i =0; i < statusSelect.length; i++){

            statusSelect[i].addEventListener("focusout",() => {

                let transaction = new ChangeStatus_Transaction(view.controller.model,status,statusSelect,i);
                view.controller.model.tps.addTransaction(transaction);

                if(view.controller.model.tps.getUndoSize() != 0){
                    document.getElementById("undo-button").style.color = "rgb(233,237,240)";
                    document.getElementById("undo-button").style.pointerEvents = "auto";
                }
            });
        }
    }



    changeStatusColor(){
        var view = this;
        var status = document.getElementsByClassName("status-col");

        for(let i = 0; i < view.controller.model.currentList.items.length; i++){
            if(view.controller.model.currentList.items[i].getStatus() == "incomplete"){
                status[i+1].style.color = "#ffc819";
            }else{
                status[i+1].style.color = "#8ed4f8";
            }
        }
    }









    moveItemUpButton(){
        var controlButton = document.getElementsByClassName("list-item-control");
        var view = this;

        for(let i = 10; i < controlButton.length; i+=5){
            
            controlButton[i].addEventListener("click",() => {


                let transaction = new MoveItemUp_Transaction(view.controller.model,i,view);
                view.controller.model.tps.addTransaction(transaction);

                if(view.controller.model.tps.getUndoSize() != 0){
                    document.getElementById("undo-button").style.color = "rgb(233,237,240)";
                    document.getElementById("undo-button").style.pointerEvents = "auto";
                }
            });
        
        }
    }



    moveItemDownButton(){
        var controlButton = document.getElementsByClassName("list-item-control");
        var view = this;

        for(let i = 6; i < controlButton.length-5; i+=5){
            
            controlButton[i].addEventListener("click",() => {

                let transaction = new MoveItemDown_Transaction(view.controller.model,i,view);
                view.controller.model.tps.addTransaction(transaction);

                if(view.controller.model.tps.getUndoSize() != 0){
                    document.getElementById("undo-button").style.color = "rgb(233,237,240)";
                    document.getElementById("undo-button").style.pointerEvents = "auto";
                }
            });
        
        }
    }



    greyOutArrowButton(){
        var firstArrowUp = document.getElementsByClassName("list-item-control")[5];
        var lastArrowDown = document.getElementsByClassName("list-item-control");

        if(firstArrowUp != undefined){
            firstArrowUp.style.color = "#322d2d";
            firstArrowUp.style.pointerEvents = "none";
            lastArrowDown[lastArrowDown.length-4].style.color = "#322d2d";
            lastArrowDown[lastArrowDown.length-4].style.pointerEvents = "none";
        }
    }



    deleteItemButton(){
        var controlButton = document.getElementsByClassName("list-item-control");
        var view = this;

        for(let i = 7; i < controlButton.length; i+=5){
            
            controlButton[i].addEventListener("click",() => {

                let transaction = new DeleteItem_Transaction(view.controller.model,i,view);
                view.controller.model.tps.addTransaction(transaction);

                if(view.controller.model.tps.getUndoSize() != 0){
                    document.getElementById("undo-button").style.color = "rgb(233,237,240)";
                    document.getElementById("undo-button").style.pointerEvents = "auto";
                }
            });
        
        }
    }






    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
    }
}