'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeTaskText_Transaction extends jsTPS_Transaction {
    constructor(initModel,tasks,tasksInput,index) {
        super();
        this.model = initModel;
        this.tasks = tasks;
        this.tasksInput = tasksInput;
        this.index = index;
        this.original = this.tasks[this.index+1].innerHTML;
        this.newValue = this.tasksInput[this.index].value;
    }

    doTransaction() {

        this.tasks[this.index+1].style.display = "block";
        this.tasksInput[this.index].style.display = "none";
        this.tasks[this.index+1].innerHTML = this.newValue;
        this.model.currentList.items[this.index].setDescription(this.newValue);

    }

    undoTransaction() {
        this.tasks[this.index+1].style.display = "block";
        this.tasksInput[this.index].style.display = "none";
        this.tasks[this.index+1].innerHTML = this.original;
        this.model.currentList.items[this.index].setDescription(this.original);
    }
}