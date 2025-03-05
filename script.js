const form = document.querySelector("form");                
const todoInput = document.querySelector('#todo-input');     
const todoItemsDiv = document.querySelector('.to-do-items'); 

let toDoArray = [{ text: "example", isCompleted: false }];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text.length > 0) {                                  
        todoInput.value = "";
        addToDO(text);
    }
});

function addToDO(txt) {
    const obj = {
        text: txt,
        isCompleted: false
    };
    toDoArray.push(obj);
    updateUi();
}

function updateUi() {
    todoItemsDiv.innerHTML = "";  
    for (let i = 0; i < toDoArray.length; i++) {
        const item = createItem(toDoArray[i], i);
        todoItemsDiv.appendChild(item);
    }
}

function createItem(item, index) {
    const li = document.createElement('li');
    li.className = 'item';
    const html = `
        <input type="checkbox" id="todo-${index}" ${item.isCompleted ? "checked" : ""}>
        <label for="todo-${index}" class="custom-checkbox">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M400 480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zM400 480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48z"/>
            </svg>
        </label>
        <label for="todo-${index}" class="todo-text" style="text-decoration: ${item.isCompleted ? 'line-through' : 'none'};">
            ${item.text}
        </label>
        <button class="delete-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
            </svg>
        </button>
    `;

    li.innerHTML = html;

    // ✅ Event Listener for Checkbox
    const checkbox = li.querySelector(`input[type="checkbox"]`);
    checkbox.addEventListener('change', () => {
        toDoArray[index].isCompleted = !toDoArray[index].isCompleted;
        updateUi();
    });

    // ✅ Event Listener for Delete Button
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        toDoArray.splice(index, 1);
        updateUi();
    });

    return li;
}

updateUi();  // Initial call to render existing todos
