// Get elements
const itemForm = document.getElementById('task-form');
const itemInput = document.getElementById('task');
const itemList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// let itemData = [];

let itemData = JSON.parse(localStorage.getItem('list')) || [];
if (itemData.length > 0) {
    itemData.forEach(function (singleItem) {
        itemList.insertAdjacentHTML('beforeend', `
                       <li class="collection-item">
                            <span class="title-item">${singleItem}</span>
                            <a href="#" class="secondary-content delete-icon"><i class="material-icons">delete</i></a>
                            <a href="#" class="secondary-content edit-icon"><i class="material-icons">edit</i></a>
                            <a href="#" class="secondary-content complete-icon"><i class="material-icons">check_box</i></a>
                       </li>`);
        handleItem(singleItem);
    });
}


// form submission
itemForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const textValue = itemInput.value;

    if (textValue === '') {
        showFeedback('Please enter valid value!', 'red');
    } else {
        // add item
        addItem(textValue);
        // reset form
        itemForm.reset();
        // add to item array
        itemData.push(textValue);
        // Local Storage
        localStorage.setItem('list', JSON.stringify(itemData));


        // add event listeners too icon;
        handleItem(textValue);

    }
});


// show Feedback function
function showFeedback(text, action = 'teal') {
    //feedback.classList.add('showItem', `alert-${action}`);
    M.toast({html: `${text}`, classes: `${action}`});
}

// add item function
function addItem(value) {
    const li = document.createElement('li');
    li.classList.add('collection-item');
    li.innerHTML = `<span class="title-item">${value}</span>
                        <a href="#" class="secondary-content delete-icon"><i class="material-icons">delete</i></a>
                        <a href="#" class="secondary-content edit-icon"><i class="material-icons">edit</i></a>
                        <a href="#" class="secondary-content complete-icon"><i class="material-icons">check_box</i></a>`;

    itemList.appendChild(li);
    showFeedback('Task Created!', 'green');
}


function handleItem(textValue) {
    const items = itemList.querySelectorAll('.collection-item');

    items.forEach(function (item) {
        if (item.querySelector('.title-item').textContent === textValue) {


            // complete event listener
            item.querySelector('.complete-icon').addEventListener('click', function () {
                item.querySelector('.title-item').classList.toggle('completed');
                this.classList.toggle('visibility')
            });

            // edit event listener
            item.querySelector('.edit-icon').addEventListener('click', function () {
                itemInput.value = textValue;
                itemList.removeChild(item);
                itemInput.focus();
                // filter array
                itemData = itemData.filter(function (item) {
                    return item !== textValue;
                });
                localStorage.setItem('list', JSON.stringify(itemData));
            });


            // delete event listener
            item.querySelector('.delete-icon').addEventListener('click', function () {
                itemList.removeChild(item);
                //filter array
                itemData = itemData.filter(function (item) {
                    return item !== textValue;
                });
                localStorage.setItem('list', JSON.stringify(itemData));
                showFeedback('Task Deleted!');
            });
        }
    })
}


clearBtn.addEventListener('click', function () {
    itemData = [];
    localStorage.removeItem('list');
    const items = itemList.querySelectorAll('.collection-item');
    if (items.length > 0) {
        items.forEach(function (item) {
            itemList.removeChild(item);
        })
    }
});


/*    const form = document.querySelector('#task-form');

    // Add task events
    form.addEventListener('submit', function (e) {

        e.preventDefault();

        const taskInput = document.querySelector('#task');
        if (taskInput.value === '') {
            alert('Add task');
        } else {
            // create li element
            const li = document.createElement('li');
            // add class
            li.className = 'collection-item';

            // create text Node and append to li
            li.appendChild(document.createTextNode(taskInput.value));

            // create link
            const link = document.createElement('a');

            // Add class
            link.className = 'delete-item secondary-content';

            link.style.cursor = 'pointer';

            // add icon
            link.innerHTML = '<i class="material-icons">delete</i>';

            // append the link to li
            li.appendChild(link);

            // append the il to ul
            const taskList = document.querySelector('.collection');
            taskList.appendChild(li);


            // clear input
            taskInput.value = '';
        }
    });

    // Remove Task
    const taskList = document.querySelector('.collection');
    taskList.addEventListener('click', removeTask);

    function removeTask(event) {
        //event.preventDefault();
        if (event.target.parentElement.classList.contains('delete-item')) {
            if (confirm('Are you sure ?')) {
                event.target.parentElement.parentElement.remove();
            }
        }
    }

    // Filter Task
    const filter = document.querySelector('#filter');

    filter.addEventListener('keyup', filterTask);

    function filterTask(event) {
        const text = event.target.value.toLowerCase();


        document.querySelectorAll('.collection-item').forEach(function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                console.log(task);
                task.style.display = 'block';
            } else {
                task.style.display = 'node';
            }
        })
    }


    // Clear Task
    const clearBtn = document.querySelector('.clear-tasks');
    clearBtn.addEventListener('click', clearTasks);

    function clearTasks() {
        taskList.innerHTML = '';
    }*/

