const jsConfetti = new JSConfetti();
let count = 0;
document.getElementById("messageButton").addEventListener("click", function() {
    let message = document.getElementById("message");
    document.getElementById('last-message').innerHTML = `“${message.value}”`;
    count++;
    document.getElementById('counter').innerHTML = `${count}`;
    jsConfetti.addConfetti({
        emojis: ['🌈', '⚡️', '✨', '💫', '🌸'],
        emojiSize: 100,
        emojiSize: 75,
        confettiNumber: 60,
    })
});