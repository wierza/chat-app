
const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName = '';

const login = event => {
  event.preventDefault();

  if (userNameInput.value.trim() === '') {
    alert('Username field cannot be empty.');
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
};

const sendMessage = event => {
  event.preventDefault();

  const messageContent = messageContentInput.value;

  if (!messageContent.trim()) {
    alert('Message content cannot be empty. Please enter a message.');
  } else {
    addMessage(userName, messageContent);
    messageContentInput.value = '';
  }
};

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
  }
  
loginForm.addEventListener('submit', (event) => login(event));
addMessageForm.addEventListener('submit', (event) => sendMessage(event))