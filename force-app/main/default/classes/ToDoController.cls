public class ToDoController {
    @AuraEnabled
    public static String addTodo(String  payload){

        ToDo payloadObject = (ToDo). JSON.deserialized(payload, ToDo.class);
        
        SObject tsk = (SObject) Type.forName('ToDo__c').newInstance();
        tsk.put('Name', payloadObject.todoName);
        tsk.put('Done__', payloadObject.todoDone);

        insert tsk;

        return String.valueOf(tsk.Id);

    }

    public static void updateTodo(String  payload){

        ToDo payloadObject = (ToDo). JSON.deserialized(payload, ToDo.class);
        
        SObject tsk = (SObject) Type.forName('ToDo__c').newInstance();
        tsk.put('Id', payloadObject.todoName);
        tsk.put('Name', payloadObject.todoName);
        tsk.put('Done__', payloadObject.todoDone);

        update tsk;

    } 

    public static void deleteTodo(String  todoId){

        ToDo payloadObject = (ToDo). JSON.deserialized(payload, ToDo.class);
        
        SObject tsk = (SObject) Type.forName('ToDo__c').newInstance();
        tsk.put('Id', todoId);

        delete tsk;

    } 

    @AuraEnabled (cacheable=true) 
    public static List<ToDo> getAllTodos()
    {
        List<SObject> tsks = 
        Database.query('SELECT Id, Name, Done__C, CreatedDate FROM ToDo__c WHERE CreatedDate= LAST_N_DAYS:7 ORDER BY CreatedDate DESC');

        return getToDos(tsks);
    } 

    @AuraEnabled (cacheable=true) 
    public static List<ToDo> getCurrentTodos()
    {
        List<SObject> tsks = 
        Database.query('SELECT Id, Name, Done__C, CreatedDate FROM ToDo__c WHERE CreatedDate= TODAY ORDER BY CreatedDate DESC');

        return getToDos(tsks);
    }

    public static List<ToDo> getToDos (List<SObject> tsks)
    {
        List<ToDo> todos = new List<ToDo>();
        for (SObject t: tsks)
        {
            Todo todo = new Todo();
            todo.todoId = t.Id;
            todo.todoName = String.valueOf(t.get('Name'));
            todo.todoDate = Date.valueOf(t.get('CreatedDate'));
            todo.todoDone = Boolean.valueOf(t.get('Done__c'));

            todos.add(todo);
        }

        return todos;
    }


    class ToDo 
    {
        @AuraEnabled
        public String todoId;
        @AuraEnabled
        public String todoName;
        @AuraEnabled
        public Date todoDate;
        @AuraEnabled
        public Boolean todoDone;

    }
}
