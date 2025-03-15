document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date');
    const taskList = document.getElementById('task-list');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Load tasks from local storage or initialize an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    const renderTasks = () => {
        taskList.innerHTML = ''; // Clear the current task list
        tasks.forEach((task, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.className = `task ${task.completed ? 'completed' : ''}`;
            taskDiv.innerHTML = `
                <span>${task.name} - Due: ${task.dueDate}</span>
                <div>
                    <button class="complete-btn" data-index="${index}" title="Complete">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="delete-btn" data-index="${index}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            taskList.appendChild(taskDiv); // Append each task to the task list
        });

        // Add event listeners to the buttons after rendering
        document.querySelectorAll('.complete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').getAttribute('data-index');
                toggleComplete(index);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').getAttribute('data-index');
                deleteTask(index);
            });
        });
    };

    // Function to add a new task
    const addTask = (e) => {
        e.preventDefault();
        const newTask = {
            name: taskInput.value,
            dueDate: dueDateInput.value,
            completed: false
        };
        tasks.unshift(newTask); // Add the new task to the beginning of the array
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskForm.reset();
        renderTasks(); // Re-render the task list
    };

    // Function to toggle task completion
    const toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    // Function to delete a task
    const deleteTask = (index) => {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    // Function to update the theme icon
    const updateThemeIcon = () => {
        if (document.body.classList.contains('dark')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun'); // Change to moon icon in dark mode
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon'); // Change to sun icon in light mode
        }
    };

    // Event listener for form submission
    taskForm.addEventListener('submit', addTask);
    renderTasks(); // Initial render of tasks

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        updateThemeIcon(); // Update the icon when toggling the theme
    });

    // Initial update of the theme icon
    updateThemeIcon();
});