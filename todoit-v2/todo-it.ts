
// Creating the TodoItem class
// We are using encapsulation in order to protect the integrity of our data model (by making the different fields private), and we only create accessors for the fields that we want to expose to the outside. Notice that in the constructor of the class, we initialize a creation timestamp and an identifier (if it wasn't provided).

// Creating a TodoItem instance is easy: const todo: TodoItem = new TodoItem("Do the laundry");

class TodoItem {
    private readonly _creationTimestamp: number;
    private readonly _identifier: string;

    constructor(private _description: string, identifier?: string) {
        this._creationTimestamp = new Date().getTime();

        if (identifier) {
            this._identifier = identifier;
        } else {
            // this is just for the example; for any real project, use
            // UUIDs instead: https://www.npmjs.com/package/uuid
            this._identifier = Math.random().toString(36).substr(2, 9);
        }
    }

    get creationTimestamp(): number {
        return this._creationTimestamp;
    }

    get identifier(): string {
        return this._identifier;
    }

    get description(): string {
        return this._description;
    }
}

// If you implement the TodoItem class as we propose, instances of the class will be immutable: Once an instance has been created, you cannot modify it, whether from the inside or from the outside. This is guaranteed because the fields are private and only expose a getter that protects the field from external modifications. In addition, the fields are also read-only, which prevents internal modifications as well. This is a practice that we heavily recommend.


// Creating the TodoList class
// Now, you can also implement the TodoList class:

class TodoList {
    private _todoList: ReadonlyArray<TodoItem> = [];

    constructor(todoList?: TodoItem[]) {
        // first we make sure that we have received a valid array
        // reference: https://developer.mozilla.org/en-
        // US/docs/Web/JavaScript/Reference/Global_Objects
        // /Array/isArray
        if(Array.isArray(todoList) && todoList.length) {
            this._todoList = this._todoList.concat(todoList);
        }
    }

    get todoList(): ReadonlyArray<TodoItem> {
        return this._todoList
    }

    addTodo(todoItem: TodoItem) {
        if(todoItem) {
            // the value is "truthy":
            // not null, not undefined, not NaN, not an empty string,
            // not 0, not false
            this._todoList = this._todoList.concat(todoItem);
        }
    }

    removeTodo(itemId: string) {
        if(itemId) {
            this._todoList = this._todoList.filter(item => {
                if(item.identifier === itemId) {
                    return false; // drop
                } else {
                    return true; // keep
                }
            });
        }
    }
}

// Here, we again favor immutability to use a more functional approach.

// A note about TypeScript's ReadonlyArray
// Internally, the _todoList field is defined as ReadonlyArray<TodoItem>. Don't worry too much about the angle brackets for now; instead, focus on the type. This is a read-only array of the TodoItem objects. Using ReadonlyArray is very beneficial because it ensures that the array content cannot be changed directly. All mutating methods are gone; thus, for example, you cannot re-assign elements in the array or use methods such as push to add items to it.

// This might be counterintuitive for programmers with a strong OO background, but it will actually increase the safety of our code. For example, in the constructor, we accept an optional argument called todoList. If the given argument is defined and is a valid array, then we create a new internal representation by concatenating the existing array with the provided one. This creates a new array that we keep internally.

// Why does it add safety to the code? Because we are sure that we are the only ones with a reference toward the internal array. If we had instead directly assigned the array like this—this._todoList = todoList;—then the calling code would still have a valid reference towards that array and could modify it at will, breaking the encapsulation!

// This code is safe because the array items (the TodoItem instances) are also immutable, meaning that even if external code has a reference toward one of those, it will not be able to change things.

// To continue with this trail of thought, notice how we have implemented the addTodo and removeTodo methods: both create new instances instead of trying to mutate the existing array. We do this for the very same safety reasons.

// ReadonlyArray is not the only immutable type that you can use in TypeScript. TypeScript actually also provides Readonly<T>, which you can use to define a read-only type, based on another existing type. For example, if you have a mutable Person class, then you can simply create a read-only version of the type using Readonly<Person>. This is very useful for defensive programming.


// ******************  Implementing the view ******************
// Now that we have defined our domain model, let's implement the view layer.

// Creating the TodoListView interface
// We'll start with the TodoListView interface:

interface TodoListView {
    render(todoList: ReadonlyArray<TodoItem>): void;
    getInput(): TodoItem;
    getFilter(): string;
    clearInput(): void;
    filter(): void;
}


// Implementing the TodoListView interface

class HTMLTodoListView implements TodoListView {
    private readonly todoInput: HTMLInputElement;
    private readonly todoListDiv: HTMLDivElement;
    private readonly todoListFilter: HTMLInputElement;

  constructor() {
    this.todoInput = document.getElementById('todoInput') as HTMLInputElement;
    this.todoListDiv = document.getElementById('todoListContainer') as HTMLDivElement;
    this.todoListFilter = document.getElementById('todoFilter') as HTMLInputElement;

        // defensive checks
        if(!this.todoInput) {
            throw new Error("Could not find the todoInput HTML input element. Is the HTML correct?");
        }

        if(!this.todoListDiv) {
            throw new Error("Could not find the todoListContainer HTML div. Is the HTML correct?");
        }

        if(!this.todoListFilter) {
            throw new Error("Could not find the todoFilter HTML input element. Is the HTML correct?");
        }
    }


    clearInput(): void {
       this.todoInput.value = '';
    }

    getFilter(): string {
        return this.todoListFilter.value.toUpperCase();
    }

    getInput(): TodoItem {
        const todoInputValue: string = this.todoInput.value.trim();
        const retVal: TodoItem = new TodoItem(todoInputValue);
        return retVal;
    }

    render(todoList: ReadonlyArray<TodoItem>): void {
        console.log("Updating the rendered todo list");
        this.todoListDiv.innerHTML = '';
        this.todoListDiv.textContent = ''; // Edge, ...

        const ul = document.createElement('ul');
        ul.setAttribute('id', 'todoList');
        this.todoListDiv.appendChild(ul);

        todoList.forEach(item => {
        const li = document.createElement('li');
        li.setAttribute('class','todo-list-item');
        li.innerHTML = `<a href='#'onclick='todoIt.removeTodo("${item.identifier}")'>${item.description}</a>`;
        ul.appendChild(li);
        });
    }

   filter(): void {
        console.log("Filtering the rendered todo list");
        const todoListHtml: HTMLUListElement = document.getElementById('todoList') as HTMLUListElement
        if (todoListHtml == null) {
            console.log("Nothing to filter");
            return;
        }

        const todoListFilterText = this.getFilter();
        todoListHtml.childNodes.forEach((item) => {
            let itemText: string | null = item.textContent;
            if (itemText !== null) {
                itemText = itemText.toUpperCase();

                if (itemText.startsWith(todoListFilterText)) {
                    (item as HTMLLIElement).style.display = "list-item";
                } else {
                    (item as HTMLLIElement).style.display = "none";
                }
            }
        });
    }
}

// With this, we know that when the class is instantiated, it will retrieve the necessary HTML elements from the DOM. If that fails, then errors will be thrown to help us identify what went wrong.

// With this, we know that when the class is instantiated, it will retrieve the necessary HTML elements from the DOM. If that fails, then errors will be thrown to help us identify what went wrong.

// Such validations are usually referred to as defensive programming checks. Oftentimes, defensive checks incur wasted CPU cycles checking elements that should be invariants, but in practice, those checks actually help avoid a lot of troubleshooting to identify where bugs have been introduced.

// In our case, if the HTML template gets modified in a way that prevents our code from getting the elements that we expected to be available, then errors will be thrown right away.


// *************** Creating the TodoListController interface ******************

interface TodoListController {
    addTodo(): void;
    filterTodoList(): void;
    removeTodo(identifier: string): void;
}

const view = new HTMLTodoListView();

const todoIt = new TodoIt(view);


class EventUtils {
    static isEnter(event: KeyboardEvent): boolean {
        let isEnterResult = false;

        if(event !== undefined && event.defaultPrevented) {
            return false;
        }

        if (event == undefined) {
            isEnterResult = false;
        } else if (event.key !== undefined) {
            isEnterResult = event.key === 'Enter';
        } else if (event.keyCode !== undefined) {
            isEnterResult = event.keyCode === 13;
        }

        return isEnterResult;
    }
}
