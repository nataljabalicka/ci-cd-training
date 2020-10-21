import { LightningElement, track} from 'lwc';
//import addToDo from ("@salesforce/apex/ToDoController.addToDo");

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
        const inputBox = this.template.querySelector("lightning-input");
        console.log("inputBox = " + inputBox.value);

        const todo =
        {
            todoName: inputBox.value,
            todoDone: false,
       
        };

        addToDo({payload: JSON.stringify(todo)}).then(response => {
            console.log('Item inserted successfully!');
        }).catch(error => {
            console.error ('Error during insert' + error);
        });
        //this.todos.push(todo);
        inputBox.value = "";
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