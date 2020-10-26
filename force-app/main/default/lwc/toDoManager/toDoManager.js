import { LightningElement, track, api } from "lwc";
import getCurrentTodos from "@salesforce/apex/ToDoController.getCurrentTodos";
import addTodo from "@salesforce/apex/ToDoController.addTodo";

export default class ToDoManager extends LightningElement {

    @track time = "8:15 PM";
    @track greeting = "Good evening";

    @track todos = [];

    connectedCallback()
    {
        this.getTime();
        this.populateTodos();
 
        setInterval(() => {
            this.getTime();
            console.log("set interval called");

        },1000 * 60);
    }

    getTime(){

        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();

        this.time = `${this.getHour(hour)}:${this.getGoubleDigit(minute)} ${this.getMidDay(hour)}`;
        this.setGreeting(hour);
    }

    getHour(hour)
    {
        return hour === 0 ? 12 : hour > 12 ? (hour - 12) : 12;
    }

    getMidDay(hour)
    {
        return hour >= 12 ? "PM": "AM";
    }

    getGoubleDigit(digit)
    {
        return digit< 10 ? "0" + digit: digit;       
    }

    setGreeting(hour){

        if (hour < 12)
        {
            this.greeting = "Good morning!";
        }else if (hour >= 12 && hour <17)
        {
            this.greeting = "Good Afternoon!";
        }else
        {
            this.greeting = "Good Eevening!";
        } 
    }

    addToDoHandler()
    {
    
        //get input box html element
        const inputBox = this.template.querySelector("lightning-input");
        //create a new todo object based on input box value
        const todo = { todoName: inputBox.value, done: false };
        //call addtodo server method to add new todo object
        //serialize todo object before sending to server
        addTodo({ payload: JSON.stringify(todo) })
        .then(result => {
            if (result) {
            //fetch fresh list of todos
            this.fetchTodos();
            }
        })
        .catch(error => {
            console.error("Error in adding todo" + error);
        });

        inputBox.value = "";

    } 

      /**
   * Fetch todos from server
   * This method only retrives todos for today
   */
  fetchTodos() {
    getCurrentTodos()
      .then(result => {
        if (result) {
          //update todos property with result
          this.todos = result;
        }
      })
      .catch(error => {
        console.error("Error in fetching todo" + error);
      });
  }

  /**
   * Fetch fresh list of todos once todo is updated
   * This method is called on update event
   * @param {*} event
   */
  updateTodoHandler(event) {
    if (event) {
      this.fetchTodos();
    }
  }

  /**
   * Fetch fresh list of todos once todo is deleted
   * This method is called on delete event
   * @param {*} event
   */
  deleteTodoHandler(event) {
    if (event) {
      this.fetchTodos();
    }
  }

    get upcomingTasks()
    {
        return this.todos && this.todos.length ? this.todos.filter( todo => !todo.todoDone): [];
    }

    get completedTasks()
    {
        return this.todos && this.todos.length ? this.todos.filter( todo => todo.todoDone): [];
    }

    populateTodos()
    {
        const todos = [
        {
            todoId: 0,
            todoName: "Wash my car",
            todoDone: false,
            todoDate: new Date()
        },
        {
            todoId: 1,
            todoName: "Feed the cat",
            todoDone: false,
            todoDate: new Date()
        },
        {
            todoId: 2,
            todoName: "Call mom",
            todoDone: true,
            todoDate: new Date()
        }
        ];

        this.todos = todos;

    }
}