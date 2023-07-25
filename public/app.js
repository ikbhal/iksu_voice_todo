// Get references to the voice input elements
const voiceInput = document.getElementById('voiceInput');
const voiceButton = document.getElementById('voiceButton');

// Todo list array
let todos = [];
let idCounter = 0;
let recognition = null;

// Add event listener to the voice button
voiceButton.addEventListener('click', startVoiceRecognitionOld);

// Add event listeners to the voice button and stop button
// const stopListeningButton = document.getElementById('stopListeningButton');
// stopListeningButton.addEventListener('click', stopVoiceRecognition);

// // Function to stop voice recognition
// function stopVoiceRecognition() {
//   recognition.stop();
// }



function continuousSpeechRecognition() {
    
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  
    // Set language to the user's default language (optional)
    recognition.lang = navigator.language || 'en-US';
  
    // Start listening for speech
    recognition.start();
  
    // Event listener for when the recognition service returns a result
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      voiceInput.value = transcript;
  
      // Call the function to handle the voice command
      handleVoiceInput(transcript);
  
      // Restart the recognition loop
      continuousSpeechRecognition();
    };
  
    // Event listener for errors
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
  
      // Restart the recognition loop after an error
      continuousSpeechRecognition();
    };
  }

  // Function to start voice recognition
function startVoiceRecognitionNew() {
    // Check if the browser supports speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      continuousSpeechRecognition();
    } else {
      // Speech recognition is not supported in this browser
      console.error('Speech recognition is not supported in this browser.');
    }
  }
  
// Function to start voice recognition
function startVoiceRecognitionOld() {
  // Check if the browser supports speech recognition
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    // Set language to the user's default language (optional)
    recognition.lang = navigator.language || 'en-US';

    // Start listening for speech
    recognition.start();

    // Event listener for when the recognition service returns a result
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      voiceInput.value = transcript;

      // Call the function to handle the voice command
      handleVoiceInput(transcript);
    };

    // Event listener for errors
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  } else {
    // Speech recognition is not supported in this browser
    console.error('Speech recognition is not supported in this browser.');
  }
}

// Function to handle the voice commands and update the todo list accordingly
function handleVoiceInput(command) {
    const words = command.trim().toLowerCase().split(' ');
    const action = words[0];
  
    switch (action) {
      case 'cat':
      case 'cad':
      case 'iqsu':
      case 'ik':
      case 'add':
      case 'ikbal': case 'ikbhal': case 'sumiya': case 'su': case 'iksu':case 'ola':
        const commandWord = words[1];
        const todoItem = words.slice(2).join(' ');
  
        switch (commandWord) {
          case 'add':
            // Logic to add a new todo item
            console.log('Adding todo item:', todoItem);
            const todoText = words.slice(2).join(' ');
            addTodoItem(todoText);
            break;
  
          case 'delete':
            // Logic to delete a todo item
            console.log('Deleting todo item:', todoItem);
            break;
  
          case 'done':
            // Logic to mark a todo item as done
            console.log('Marking todo item as done:', todoItem);
            break;
  
          case 'undone':
            // Logic to mark a todo item as undone
            console.log('Marking todo item as undone:', todoItem);
            break;
  
          case 'move':
            const position = parseInt(words[words.length - 2]);
            // Logic to change the order of a todo item
            console.log('Moving todo item:', todoItem, 'to position:', position);
            break;
  
          case 'show':
            const showCommand = words[2];
  
            switch (showCommand) {
              case 'todos':
                // Logic to display all todo items
                console.log('Displaying all todo items');
                break;
  
              case 'current':
                // Logic to display the current (active) todo item
                console.log('Displaying current todo item');
                break;
  
              case 'next':
                // Logic to display the next todo item
                console.log('Displaying next todo item');
                break;
  
              default:
                console.error('Unknown show command:', showCommand);
            }
            break;
  
          case 'save':
            const saveCommand = words[2];
  
            switch (saveCommand) {
              case 'locally':
                // Logic to save the todo list locally
                console.log('Saving todo list locally');
                break;
  
              case 'server':
                // Logic to send the todo list to the server via HTTP API
                console.log('Sending todo list to server via HTTP API');
                break;
  
              case 'socket':
                // Logic to send the todo list to the server using socket communication
                console.log('Sending todo list to server using socket communication');
                break;
  
              default:
                console.error('Unknown save command:', saveCommand);
            }
            break;
  
          default:
            console.error('Unknown command word:', commandWord);
        }
        break;
  
      default:
        console.error('Unknown action:', action);
    }
  }
  
// Function to add a new todo item to the list
function addTodoItem(text) {
    const newTodo = {
      text: text,
      checked: false,
      notes: '',
      id: idCounter,
    };
  
    todos.push(newTodo);
    idCounter++;
  
    // Save the updated todo list in localStorage
    saveToLocalStorage();
  
    // Call a function to update the user interface and show the updated todo list
    updateTodoListUI();
  
    console.log('Todo item added:', newTodo);
  }

  

  // Function to update the user interface and display the todo list
function updateTodoListUI() {
    const todoListDiv = document.getElementById('todoList');
  
    // Clear the previous list
    todoListDiv.innerHTML = '';
  
    // Create and append HTML elements for each todo item
    todos.forEach((todo) => {
      const todoItemDiv = document.createElement('div');
      todoItemDiv.innerHTML = `
        <input type="checkbox" ${todo.checked ? 'checked' : ''}>
        <span>${todo.text}</span>
        <button onclick="deleteTodoItem(${todo.id})">Delete</button>
      `;
      todoListDiv.appendChild(todoItemDiv);
    });
  }

// Function to delete a todo item from the list
function deleteTodoItem(id) {
    todos = todos.filter((todo) => todo.id !== id);
    // Save the updated todo list in localStorage
    saveToLocalStorage();
    updateTodoListUI();
    console.log('Todo item deleted:', id);
  }
  // Function to toggle the completion status of a todo item
function toggleTodoCompletion(id, completed) {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      todo.checked = completed;
      // Save the updated todo list in localStorage
      saveToLocalStorage();
      console.log('Todo item completion status changed:', id, 'Completed:', completed);
    }
  }

//   // Function to mark a todo item as done
//   function markTodoAsDone(id) {
//     const todo = todos.find((todo) => todo.id === id);
//     if (todo) {
//       todo.checked = true;
//       updateTodoListUI();
//       console.log('Todo item marked as done:', id);
//     }
//   }
  
//   // Function to mark a todo item as undone
//   function markTodoAsUndone(id) {
//     const todo = todos.find((todo) => todo.id === id);
//     if (todo) {
//       todo.checked = false;
//       updateTodoListUI();
//       console.log('Todo item marked as undone:', id);
//     }
//   }
// Function to add notes to a todo item
function addNotesToTodoItem(id, notes) {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      todo.notes = notes;
      // Save the updated todo list in localStorage
      saveToLocalStorage();
      updateTodoListUI();
      console.log('Notes added to todo item:', id);
    }
  }
  
  
// Function to change the order of a todo item
function moveTodoItem(id, position) {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      const todo = todos.splice(index, 1)[0];
      todos.splice(position, 0, todo);
      // Save the updated todo list in localStorage
      saveToLocalStorage();
      updateTodoListUI();
      console.log('Todo item moved:', id, 'to position:', position);
    }
  }
  
// Function to display all todo items
function showAllTodos() {
    console.log('Showing all todo items:');
    console.log(todos);
  }
  

  // Function to save the todo list in localStorage
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // Function to load the todo list from localStorage when the app starts
function loadFromLocalStorage() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      todos = JSON.parse(storedTodos);
      // Update the idCounter based on the maximum id in the todos array
      idCounter = todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;
      // Call a function to update the user interface and show the loaded todo list
      updateTodoListUI();
    }
  }

  // Call the function to load the todo list from localStorage when the app starts
loadFromLocalStorage();