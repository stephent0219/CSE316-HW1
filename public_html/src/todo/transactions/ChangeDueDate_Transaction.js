'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeDueDate_Transaction extends jsTPS_Transaction {
    constructor(initModel,dueData,dueDataInput,index) {
        super();
        this.model = initModel;
        this.dueData = dueData;
        this.dueDataInput = dueDataInput;
        this.index = index;
        this.original = this.dueData[this.index+1].innerHTML;
        this.newValue = this.dueDataInput[this.index].value;
    }

    doTransaction() {
        this.dueData[this.index+1].style.display = "block";
        this.dueDataInput[this.index].style.display = "none";
        this.dueData[this.index+1].innerHTML = this.newValue;
        this.model.currentList.items[this.index].setDueDate(this.newValue);
    }

    undoTransaction() {
        this.dueData[this.index+1].style.display = "block";
        this.dueDataInput[this.index].style.display = "none";
        this.dueData[this.index+1].innerHTML = this.original;
        this.model.currentList.items[this.index].setDueDate(this.original);
    }
}