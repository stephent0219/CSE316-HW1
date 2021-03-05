'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class MoveItemDown_Transaction extends jsTPS_Transaction {
    constructor(initModel,index,view) {
        super();
        this.model = initModel;
        this.index = index;
        this.view = view;
    }

    doTransaction() {
        var temp;
        temp = this.model.currentList.items[((this.index-1)/5)];
        this.model.currentList.items[((this.index-1)/5)] = this.model.currentList.items[((this.index-1)/5)-1];
        this.model.currentList.items[((this.index-1)/5)-1] = temp;

        this.view.viewList(this.model.currentList);
    }

    undoTransaction() {
        var temp;
        temp = this.model.currentList.items[((this.index-1)/5)];
        this.model.currentList.items[((this.index-1)/5)] = this.model.currentList.items[((this.index-1)/5)-1];
        this.model.currentList.items[((this.index-1)/5)-1] = temp;

        this.view.viewList(this.model.currentList);
    }
}
