
  function verificarAccesoChatbot() {
    const usuarioLogueado = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!usuarioLogueado) {
        alert("Acceso denegado. Debes iniciar sesión.");
        window.location.href = "Login.html"; 
        return false; 
    }
    return true; 
}


document.addEventListener("DOMContentLoaded", function() {
    if (verificarAccesoChatbot()) {
        const usuarioLogueado = JSON.parse(localStorage.getItem('loggedInUser'));
        const botMessage = document.getElementById('botMessage');
        botMessage.innerHTML = `<strong>Bot:</strong> ¡Hola, ${usuarioLogueado.nombre}! ¿Cómo estás?`;
    }
});


document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    if (userInput) {
        const chatbox = document.getElementById('chatbox');
        chatbox.innerHTML += `<p><strong>Tú:</strong> ${userInput}</p>`;
        document.getElementById('userInput').value = ''; 
    }
});