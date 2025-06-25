const ws = new WebSocket(`ws://${window.location.host}`);
const chat = document.getElementById('chat');
const messageInput = document.getElementById('message');
const usernameInput = document.getElementById('username');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const messageEl = document.createElement('div');
  messageEl.textContent = `[${data.timestamp}] ${data.username}: ${data.message}`;
  chat.appendChild(messageEl);
  chat.scrollTop = chat.scrollHeight;
};

document.getElementById("SendButton").addEventListener("click", sendMessage);

function sendMessage() {
  const message = messageInput.value;
  const username = usernameInput.value || 'Anonymous';
  if (message.trim()) {
    ws.send(JSON.stringify({ username, message }));
    messageInput.value = '';
  }
}

messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});