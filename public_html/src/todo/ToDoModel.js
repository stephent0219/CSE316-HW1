'use strict'

import ToDoList from './ToDoList.js'
import ToDoListItem from './ToDoListItem.js'
import jsTPS from '../common/jsTPS.js'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'


/**
 * ToDoModel
 * 
 * This class manages all the app data.
 */
export default class ToDoModel {
    constructor() {
        // THIS WILL STORE ALL OF OUR LISTS
        this.toDoLists = [];

        // THIS IS THE LIST CURRENTLY BEING EDITED
        this.currentList = null;

        // THIS WILL MANAGE OUR TRANSACTIONS
        this.tps = new jsTPS();

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST
        this.nextListId = 0;

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST ITEM
        this.nextListItemId = 0;


    }

    /**
     * addItemToCurrentList
     * 
     * This function adds the itemToAdd argument to the current list being edited.
     * 
     * @param {*} itemToAdd A instantiated item to add to the list.
     */
    addItemToCurrentList(itemToAdd) {
        this.currentList.push(itemToAdd);
    }

    /**
     * addNewItemToCurrentList
     * 
     * This function adds a brand new default item to the current list.
     */
    addNewItemToCurrentList() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.addNewItemToList(this.currentList, newItem);
       
        return newItem;
    }

    /**
     * addItemToList
     * 
     * Function for adding a new item to the list argument using the provided data arguments.
     */
    addNewItemToList(list, initDescription, initDueDate, initStatus) {
        let newItem = new ToDoListItem(this.nextListItemId++);
        newItem.setDescription(initDescription);
        newItem.setDueDate(initDueDate);
        newItem.setStatus(initStatus);
        list.addItem(newItem);
        if (this.currentList) {
            this.view.refreshList(list);
        }
    }










    /**
     * addNewItemTransaction
     * 
     * Creates a new transaction for adding an item and adds it to the transaction stack.
     */
    addNewItemTransaction() {
        let transaction = new AddNewItem_Transaction(this);
        this.tps.addTransaction(transaction);
    }

    /**
     * Adds a brand new default item to the current list's items list and refreshes the view.
     */
    addNewItem() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.currentList.items.push(newItem);
        this.view.viewList(this.currentList);
        return newItem;
    }







    /**
     * addNewList
     * 
     * This function makes a new list and adds it to the application. The list will
     * have initName as its name.
     * 
     * @param {*} initName The name of this to add.
     */
    addNewList(initName) {
        let newList = new ToDoList(this.nextListId++);
        if (initName)
            newList.setName(initName);
        this.toDoLists.push(newList);
        this.view.appendNewListToView(newList);
        return newList;
    }


    /**
     * Makes a new list item with the provided data and adds it to the list.
     */
    loadItemIntoList(list, description, due_date, assigned_to, completed) {
        let newItem = new ToDoListItem();
        newItem.setDescription(description);
        newItem.setDueDate(due_date);
        newItem.setAssignedTo(assigned_to);
        newItem.setCompleted(completed);
        this.addNewItemToList(list, newItem);
    }


    /**
     * Load the items for the listId list into the UI.
     */
    loadList(listId) {
        let listIndex = -1;
        for (let i = 0; (i < this.toDoLists.length) && (listIndex < 0); i++) {
            if (this.toDoLists[i].id === listId)
                listIndex = i;
        }
        if (listIndex >= 0) {
            let listToLoad = this.toDoLists[listIndex];
            this.currentList = listToLoad;
            this.view.viewList(this.currentList);
        }
    }

    /**
     * Redo the current transaction if there is one.
     */
    redo() {
        if (this.tps.hasTransactionToRedo()) {
            this.tps.doTransaction();
        }
    }   

    /**
     * Remove the itemToRemove from the current list and refresh.
     */
    removeItem(itemToRemove) {
        this.currentList.removeItem(itemToRemove);
        this.view.viewList(this.currentList);
    }

    /**
     * Finds and then removes the current list.
     */
    removeCurrentList() {
        let indexOfList = -1;
        for (let i = 0; (i < this.toDoLists.length) && (indexOfList < 0); i++) {
            if (this.toDoLists[i].id === this.currentList.id) {
                indexOfList = i;
            }
        }
        this.toDoLists.splice(indexOfList, 1);
        this.currentList = null;
        this.view.clearItemsList();
        this.view.refreshLists(this.toDoLists);
    }

    // WE NEED THE VIEW TO UPDATE WHEN DATA CHANGES.
    setView(initView) {
        this.view = initView;
    }

    /**
     * Undo the most recently done transaction if there is one.
     */
    undo() {
        if (this.tps.hasTransactionToUndo()) {
            this.tps.undoTransaction();
        }
    } 





    /////////////////////////////////////////////////////////////////////////////////////////////





    highlight(){
        var firstChild = document.getElementById("todo-lists-list").firstElementChild;
        firstChild.style.color = "#ffc819";
        firstChild.style.backgroundColor = '#40454e';
        // firstChild.style.backgroundColor = '#e9edf0';
    }

    unHighlight(){
        var firstChild = document.getElementById("todo-lists-list").firstElementChild;
        firstChild.style.color = "rgb(233,237,240)";
        firstChild.style.backgroundColor = '#353a44';
    }

    ////////////////////////////////////////////////
    /** 
     * When you select a list, this list will move to the top
     */
    selectListOnTop(){
        var index = 0;
        for(let i = 0; i <this.toDoLists.length; i++){
            if(this.toDoLists[i].id == this.currentList.id){
                index = i;
                break;
            }
        }
        this.toDoLists.splice(index,1);
        this.toDoLists.unshift(this.currentList);  
        this.view.refreshLists(this.toDoLists);
        this.highlight();
        this.visiblyLeftSideThreeButton();
        this.activeRightSideThreeButton();
    }

    closeCurrentList(){
        this.view.clearItemsList();
        this.unHighlight();
        this.currentList = null;

        this.visiblyLeftSideThreeButton();
        
        document.getElementById("add-list-button").style.color = "#ffc819";
        document.getElementById("add-list-button").style.pointerEvents = "auto";

        document.getElementById("add-item-button").style.color = "#322d2d";
        document.getElementById("add-item-button").style.pointerEvents = "none";
    
        document.getElementById("delete-list-button").style.color = "#322d2d";
        document.getElementById("delete-list-button").style.pointerEvents = "none";
        
        document.getElementById("close-list-button").style.color = "#322d2d";
        document.getElementById("close-list-button").style.pointerEvents = "none";
    }


    visiblyLeftSideThreeButton(){

       
        document.getElementById("undo-button").style.color = "#322d2d";
        document.getElementById("undo-button").style.pointerEvents = "none";
    
        document.getElementById("redo-button").style.color = "#322d2d";
        document.getElementById("redo-button").style.pointerEvents = "none";
        
        document.getElementById("add-list-button").style.color = "#322d2d";
        document.getElementById("add-list-button").style.pointerEvents = "none";
    }

    activeRightSideThreeButton(){
        document.getElementById("add-item-button").style.color = "#d9d6cc";
        document.getElementById("add-item-button").style.pointerEvents = "auto";
    
        document.getElementById("delete-list-button").style.color = "#d9d6cc";
        document.getElementById("delete-list-button").style.pointerEvents = "auto";
        
        document.getElementById("close-list-button").style.color = "#d9d6cc";
        document.getElementById("close-list-button").style.pointerEvents = "auto";
    }

 
}