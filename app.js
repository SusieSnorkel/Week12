async function addTask(name) {
    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    });
    if (response.ok) {
        getTasks();  // Refresh the task list after adding
    }
}
// API endpoint where tasks are stored using json-server
const API_URL = 'http://localhost:3000/tasks';

// Fetch all tasks from the server and display them
async function getTasks() {
    // Send a GET request to the API to retrieve all tasks
    const response = await fetch(API_URL);
    // Convert the response data to JSON format (array of tasks)
    const tasks = await response.json();

    // Get the element where the tasks will be listed
    const taskList = document.getElementById('taskList');
    // Clear any existing tasks in the list to avoid duplication
    taskList.innerHTML = ''; 

    // Loop through the tasks and display each task in the UI
    tasks.forEach(task => {
        // Create a list item (li) for each task
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center'; 
        li.textContent = task.name; // Set the task name as the content

        // Create a delete button for each task
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Delete';
        // Attach a click event to the delete button to handle deletion
        deleteButton.onclick = () => deleteTask(task.id);

        // Append the delete button to the list item (task)
        li.appendChild(deleteButton);
        // Append the list item to the task list in the DOM
        taskList.appendChild(li);
    });
}

// Function to add a new task by sending a POST request to the server
async function addTask(name) {
    // Send a POST request to the API with the new task's name in the request body
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specify that the request body is JSON
        },
        body: JSON.stringify({ name }) // Convert the task name to JSON format
    });

    // If the POST request is successful, refresh the task list
    if (response.ok) {
        getTasks();  // Re-fetch tasks to include the new task
    }
}

// Function to delete a task by sending a DELETE request to the server
async function deleteTask(id) {
    // Send a DELETE request to the API to remove the task with the specified ID
    const response = await fetch(`${http://localhost:3000}/${id}`, {
        method: 'DELETE'
    });

    // If the DELETE request is successful, refresh the task list
    if (response.ok) {
        getTasks();  // Re-fetch tasks to exclude the deleted task
    }
}

// Event listener for the form submission to handle adding new tasks
document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    const taskName = document.getElementById('taskName').value; // Get the task name from the input field

    // If the task name is not empty, call the addTask function to add the task
    if (taskName) {
        await addTask(taskName); // Add the task to the server
        document.getElementById('taskName').value = '';  // Clear the input field after adding the task
    }
});

// Call the getTasks function to display tasks when the page loads
getTasks();
