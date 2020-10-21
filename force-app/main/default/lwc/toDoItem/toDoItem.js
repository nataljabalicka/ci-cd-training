import { LightningElement,api} from 'lwc';

export default class ToDoItem extends LightningElement {

    @api todoId;
    @api todoName;
    @api todoDone = false;

    get containerClass()
    {
        return this.todoDone ?  "todo completed" : "todo upcoming"; 

    }
}
}