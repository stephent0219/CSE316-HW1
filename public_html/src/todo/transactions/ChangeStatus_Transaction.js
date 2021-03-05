'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeStatus_Transaction extends jsTPS_Transaction {
    constructor(initModel,status,statusSelect,index) {
        super();
        this.model = initModel;
        this.status = status;
        this.statusSelect = statusSelect;
        this.index = index;
        this.original = this.status[this.index+1].innerHTML;
        this.newValue = this.statusSelect[this.index].value;
    }

    doTransaction() {
        this.status[this.index+1].style.display = "block";
        this.statusSelect[this.index].style.display = "none";
        this.status[this.index+1].innerHTML = this.newValue;
        this.model.currentList.items[this.index].setStatus(this.newValue);

        console.log(this.model.currentList.items[this.index].getStatus());
        if(this.model.currentList.items[this.index].getStatus() == "incomplete"){
            this.status[this.index+1].style.color = "#ffc819";
        }else{
            this.status[this.index+1].style.color = "#8ed4f8";
        }
    }

    undoTransaction() {
        this.status[this.index+1].style.display = "block";
        this.statusSelect[this.index].style.display = "none";
        this.status[this.index+1].innerHTML = this.original;
        this.model.currentList.items[this.index].setStatus(this.original);

        console.log(this.model.currentList.items[this.index].getStatus());
        if(this.model.currentList.items[this.index].getStatus() == "incomplete"){
            this.status[this.index+1].style.color = "#ffc819";
        }else{
            this.status[this.index+1].style.color = "#8ed4f8";
        }
    }



    // doTransaction() {
    //     this.status[this.index+1].style.display = "block";
    //     this.statusSelect[this.index].style.display = "none";
    //     this.status[this.index+1].innerHTML = this.statusSelect[this.index].value;
    //     this.model.currentList.items[this.index].setStatus(this.statusSelect[this.index].value);

    //     if(this.statusSelect[this.index].value == "incomplete"){
    //         this.status[this.index+1].style.color = "#ffc819";
    //     }else{
    //         this.status[this.index+1].style.color = "#8ed4f8";
    //     }
    // }

    // undoTransaction() {
    //     this.status[this.index+1].style.display = "block";
    //     this.statusSelect[this.index].style.display = "none";
    //     this.status[this.index+1].innerHTML = this.original;
    //     this.model.currentList.items[this.index].setStatus(this.original);

    //     if(this.statusSelect[this.index].value == "complete"){
    //         this.status[this.index+1].style.color = "#ffc819";
    //     }else{
    //         this.status[this.index+1].style.color = "#8ed4f8";
    //     }
    // }
}