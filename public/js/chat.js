const socket = io();

const messageForm = document.getElementById('message-form');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const messagesContainer = document.getElementById('messages');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();
    if (username && message) {
        socket.emit('set username', username);
        socket.emit('chat message', message);
        messageInput.value = '';
    }
});

socket.on('chat message', (messageObject) => {
    const { username, message, timestamp } = messageObject;
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `
        <span class="username">${username}</span>
        <span class="timestamp">${timestamp}</span>
        <p>${message}</p>
    `;
    messagesContainer.appendChild(messageElement);
});