// Get references to the voice input elements
const voiceInput = document.getElementById('voiceInput');
const voiceButton = document.getElementById('voiceButton');

// Add event listener to the voice button
voiceButton.addEventListener('click', startVoiceRecognition);

// Function to start voice recognition
function startVoiceRecognition() {
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
      case 'ik':
        const commandWord = words[1];
        const todoItem = words.slice(2).join(' ');
  
        switch (commandWord) {
          case 'add':
            // Logic to add a new todo item
            console.log('Adding todo item:', todoItem);
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
  