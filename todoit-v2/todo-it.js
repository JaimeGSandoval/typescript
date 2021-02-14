"use strict";
// Creating the TodoItem class
// We are using encapsulation in order to protect the integrity of our data model (by making the different fields private), and we only create accessors for the fields that we want to expose to the outside. Notice that in the constructor of the class, we initialize a creation timestamp and an identifier (if it wasn't provided).
// Creating a TodoItem instance is easy: const todo: TodoItem = new TodoItem("Do the laundry");
var TodoItem = /** @class */ (function () {
    function TodoItem(_description, identifier) {
        this._description = _description;
        this._creationTimestamp = new Date().getTime();
        if (identifier) {
            this._identifier = identifier;
        }
        else {
            // this is just for the example; for any real project, use
            // UUIDs instead: https://www.npmjs.com/package/uuid
            this._identifier = Math.random().toString(36).substr(2, 9);
        }
    }
    Object.defineProperty(TodoItem.prototype, "creationTimestamp", {
        get: function () {
            return this._creationTimestamp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TodoItem.prototype, "identifier", {
        get: function () {
            return this._identifier;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TodoItem.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: false,
        configurable: true
    });
    return TodoItem;
}());
// If you implement the TodoItem class as we propose, instances of the class will be immutable: Once an instance has been created, you cannot modify it, whether from the inside or from the outside. This is guaranteed because the fields are private and only expose a getter that protects the field from external modifications. In addition, the fields are also read-only, which prevents internal modifications as well. This is a practice that we heavily recommend.
// Creating the TodoList class.
// Now, you can also implement the TodoList class:
// *********** MODEL *************
// The model is an array of TodoItems
var TodoList = /** @class */ (function () {
    function TodoList(todoList) {
        this._todoList = []; // Model
        // first we make sure that we have received a valid array
        // reference: https://developer.mozilla.org/en-
        // US/docs/Web/JavaScript/Reference/Global_Objects
        // /Array/isArray
        if (Array.isArray(todoList) && todoList.length) {
            this._todoList = this._todoList.concat(todoList); // concat creates a new array
        }
    }
    Object.defineProperty(TodoList.prototype, "todoList", {
        get: function () {
            return this._todoList;
        },
        enumerable: false,
        configurable: true
    });
    TodoList.prototype.addTodo = function (todoItem) {
        if (todoItem) {
            // the value is "truthy":
            // not null, not undefined, not NaN, not an empty string,
            // not 0, not false
            // add todoItem to array model
            this._todoList = this._todoList.concat(todoItem); // concat creates a new array
        }
    };
    TodoList.prototype.removeTodo = function (itemId) {
        if (itemId) {
            this._todoList = this._todoList.filter(function (item) {
                if (item.identifier === itemId) {
                    return false; // drop
                }
                else {
                    return true; // keep
                }
            });
        }
    };
    return TodoList;
}());
// Implementing the TodoListView interface
//********** VIEW **********
// This gets sent to the controller as an argument
var HTMLTodoListView = /** @class */ (function () {
    function HTMLTodoListView() {
        this.todoInput = document.getElementById('todoInput');
        this.todoListDiv = document.getElementById('todoListContainer');
        this.todoListFilter = document.getElementById('todoFilter');
        // defensive checks
        // With this, we know that when the class is instantiated, it will retrieve the necessary HTML elements from the DOM. If that fails, then errors will be thrown to help us identify what went wrong.
        if (!this.todoInput) {
            throw new Error("Could not find the todoInput HTML input element. Is the HTML correct?");
        }
        if (!this.todoListDiv) {
            throw new Error("Could not find the todoListContainer HTML div. Is the HTML correct?");
        }
        if (!this.todoListFilter) {
            throw new Error("Could not find the todoFilter HTML input element. Is the HTML correct?");
        }
    }
    // Such validations are usually referred to as defensive programming checks. Oftentimes, defensive checks incur wasted CPU cycles checking elements that should be invariants, but in practice, those checks actually help avoid a lot of troubleshooting to identify where bugs have been introduced.
    // In our case, if the HTML template gets modified in a way that prevents our code from getting the elements that we expected to be available, then errors will be thrown right away.
    HTMLTodoListView.prototype.clearInput = function () {
        this.todoInput.value = '';
    };
    HTMLTodoListView.prototype.getFilter = function () {
        return this.todoListFilter.value.toUpperCase();
    };
    // gets text from input value and makes new TodoItem with it
    HTMLTodoListView.prototype.getInput = function () {
        var todoInputValue = this.todoInput.value.trim();
        var retVal = new TodoItem(todoInputValue);
        return retVal;
    };
    HTMLTodoListView.prototype.render = function (todoList) {
        console.log("Updating the rendered todo list");
        this.todoListDiv.innerHTML = '';
        this.todoListDiv.textContent = ''; // Edge, ...
        var ul = document.createElement('ul');
        ul.setAttribute('id', 'todoList');
        this.todoListDiv.appendChild(ul);
        todoList.forEach(function (item) {
            var li = document.createElement('li');
            li.setAttribute('class', 'todo-list-item');
            li.innerHTML = "<a href='#'onclick='todoIt.removeTodo(\"" + item.identifier + "\")'>" + item.description + "</a>";
            ul.appendChild(li);
        });
    };
    HTMLTodoListView.prototype.filter = function () {
        console.log("Filtering the rendered todo list");
        var todoListHtml = document.getElementById('todoList');
        if (todoListHtml == null) {
            console.log("Nothing to filter");
            return;
        }
        var todoListFilterText = this.getFilter();
        todoListHtml.childNodes.forEach(function (item) {
            var itemText = item.textContent;
            if (itemText !== null) {
                itemText = itemText.toUpperCase();
                if (itemText.startsWith(todoListFilterText)) {
                    item.style.display = "list-item";
                }
                else {
                    item.style.display = "none";
                }
            }
        });
    };
    return HTMLTodoListView;
}());
// This interface might surprise you because, apart from the removeTodo method, the methods don't accept parameters. The reason for this is that our view will interact with the controller layer by passing signals to it.
// To give you an example, when you click on the Add button or press Enter to add an item to the list, then it will simply invoke the addTodo method on the controller. Then, the controller's implementation will ask its view to get the input value from the DOM. Once it has the value, the controller will update the model and then it will ask the view to update itself. As you can see, the controller is the orchestrator of the whole process.
// Implementing the TodoIt controller class
// Now, start with the base skeleton of the controller implementation:
// As you can see earlier, our controller implementation requires TodoListView to be provided, but it does not care about which specific implementation. This is how you usually want to work with interfaces: by programming against them rather than against implementations. This decouples your code.
// view gets input from the dom, passes it to the controller, controller makes a record in the model
// ************ CONTROLLER **************
var TodoIt = /** @class */ (function () {
    function TodoIt(_todoListView) {
        this._todoListView = _todoListView;
        this._todoList = new TodoList(); // Model
        console.log("TodoIt");
        // Again, we have added a defensive check in the constructor.
        if (!_todoListView) {
            throw new Error("The todo list view implementation is required to properly initialize TodoIt!");
        }
    }
    // This is where the code begins to get interesting. As you can see, our controller retrieves information from the view and does not care about its exact subtype; all it cares about is the interface.
    TodoIt.prototype.addTodo = function () {
        // get the value from the view
        // this._todoListView is the VIEW obj passed as an argument
        var newTodo = this._todoListView.getInput(); // get value from VIEW obj argument
        // verify that there is something to add
        if ('' !== newTodo.description) {
            console.log("Adding todo: ", newTodo);
            // add the new item to the list (i.e., update the model)
            this._todoList.addTodo(newTodo); // add todo to Model
            console.log("New todo list: ", this._todoList.todoList);
            // clear the input
            this._todoListView.clearInput();
            // update the rendered todo list
            this._todoListView.render(this._todoList.todoList); // call method to reset the View w/ new todo added
            // filter the list if needed
            this.filterTodoList();
        }
    };
    // Filtering the todo list on screen is now just a matter of giving the order to the view; we do not need to know how it gets done.
    TodoIt.prototype.filterTodoList = function () {
        this._todoListView.filter();
    };
    // Finally, add the removeTodo method:
    // Again, the implementation is straightforward. The controller receives the identifier of the item to remove, asks the model to remove that entry, and requests a view update.
    TodoIt.prototype.removeTodo = function (identifier) {
        if (identifier) {
            console.log("item to remove: ", identifier);
            this._todoList.removeTodo(identifier);
            this._todoListView.render(this._todoList.todoList); // reset view with todos
            this.filterTodoList();
        }
    };
    return TodoIt;
}());
// Also, our controller is responsible for the orchestration:
// Performing the necessary validations
// Updating the model
// Asking the view to clear the input field
// Asking the view to render the updated todo list
// Now that we have created our implementations, we need to leverage those.
// We first need to instantiate the view:
// const view = new HTMLTodoListView();
// Then, we also need to create an instance of our controller, TodoIt:
// Here, we pass a concrete implementation of the view interface, but our controller doesn't know and doesn't care. All it cares about is that it gets something that is compatible with the interface.
// const todoIt = new TodoIt(view);
// We can invoke it as easily as before, using EventUtils.isEnter(...​). This doesn't change much, but is cleaner and conveys more meaning. One important rule, whenever you develop software, is to keep in mind that your code will be read many more times than it is written or changed.
var EventUtils = /** @class */ (function () {
    function EventUtils() {
    }
    EventUtils.isEnter = function (event) {
        var isEnterResult = false;
        if (event !== undefined && event.defaultPrevented) {
            return false;
        }
        if (event == undefined) {
            isEnterResult = false;
        }
        else if (event.key !== undefined) {
            isEnterResult = event.key === 'Enter';
        }
        else if (event.keyCode !== undefined) {
            isEnterResult = event.keyCode === 13;
        }
        return isEnterResult;
    };
    return EventUtils;
}());
// However, do also consider how easy it will be to test the code. Generally speaking, static elements are harder to test.
// All the function calls that we had previously are now replaced by method calls on our instance of TodoIt (our controller). This is lighter and much clearer.
// *************** Wrap Up ****************
// At this point, your refactoring of TodoIt should be fully functional. Go ahead and give it a try.
// Also, take some time to observe the console output and explore the objects.
// If we look at the application from a functional point of view, we haven't changed anything. But we have actually drastically improved the code quality, even if it has doubled the number of lines of code:
// We now have a solid domain model that uses encapsulation.
// We have applied the SRP to isolate responsibilities and avoid mixing concerns.
// We have applied the MVC design pattern to isolate parts of our code, which has helped us respect the LoD.
// We have applied composition (for example, coding the controller against the view interface).
// With this structure in place, it actually becomes very easy to modify or extend our application. For instance, if you later decide to add new fields to TodoItem, then you know where to start: adapt the domain model. Then, you can adapt the view and the controller layer. Most importantly, those changes won't require you to change everything again because the structure is SOLID!
//# sourceMappingURL=todo-it.js.map