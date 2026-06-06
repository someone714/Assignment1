
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    document.getElementById("clock").textContent = time;
}

// update every second
setInterval(updateClock, 1000);

// run immediately
updateClock();

const message = "Welcome to Our Website";
let index = 0;

function typeWriter() {
    if (index < message.length) {
        document.getElementById("welcome").textContent += message.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // speed (ms)
    }
}

// start typing when page loads
typeWriter();
