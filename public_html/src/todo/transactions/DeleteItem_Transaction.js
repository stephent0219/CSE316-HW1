'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class DeleteItem_Transaction extends jsTPS_Transaction {
    constructor(initModel,index,view) {
        super();
        this.model = initModel;
        this.index = index;
        this.view = view;
        this.item = this.model.currentList.items[((this.index-2)/5)-1];
    }

    doTransaction() {
        this.model.currentList.removeItem(this.model.currentList.items[((this.index-2)/5)-1]);
        
        this.view.viewList(this.model.currentList);
    }

    undoTransaction() {
        this.model.currentList.items.splice(((this.index-2)/5)-1,0,this.item);
        
        this.view.viewList(this.model.currentList);
    }
}