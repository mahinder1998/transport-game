let backgrounds = [
    "assets/images/Forest.png", 
    "assets/images/Desert.png", 
    "assets/images/River.png", 
    "assets/images/ZebraCrossing.png"
];
let validTransports = {
    "assets/images/Desert.png": "camel",
    "assets/images/ZebraCrossing.png": "boy",
    "assets/images/River.png": "boat",
    "assets/images/Forest.png": "elephant",
};
let currentIndex = 0;
let currentBackground = "";
let selectedTransport = "";

function showBackground() {
    if (currentIndex >= backgrounds.length) {
        document.getElementById("winPopup").classList.add("active-popup"); // Show win popup
        setTimeout(()=>{
            window.location.reload()
        }, 2000)
    }
    currentBackground = backgrounds[currentIndex];
    document.getElementById("gameScreen").style.background = `url(${currentBackground}) no-repeat center bottom/cover`;
    document.getElementById("guide").classList.remove("hidden");
    setTimeout(() => document.getElementById("guide").classList.add("hidden"), 5000);
}
function showPopup(type) {
    let popupId = type === "correct" ? "correctPopup" : "wrongPopup";
    document.getElementById(popupId).classList.add("active-popup");

    setTimeout(() => {
        closePopup(popupId);
        if (type === "correct") {
            startAnimation();
        }
    }, 4000);
}

function closePopup(id) {
    document.getElementById(id).classList.remove("active-popup");
}

function moveTransport(id) {
    if (validTransports[currentBackground] !== id) {
        showPopup("wrong");
        return;
    }
    selectedTransport = id;
    showPopup("correct");
}

function startAnimation() {
    closePopup("correctPopup");

    // Get the correct animation image
    let movingTransport = document.getElementById(`moving-${selectedTransport}`);
    movingTransport.classList.remove("hidden"); // Show the transport animation

    setTimeout(() => {
        movingTransport.classList.add("hidden"); // Hide after animation
        document.getElementById("guide").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("guide").classList.add("hidden");
            currentIndex++;
            showBackground();
        }, 5000);
    }, 17000);
}

function removeMovingTransport() {
    let movingTransport = document.getElementById("movingTransport");
    if (movingTransport) {
        movingTransport.remove();
    }
}

document.getElementById("elephant").addEventListener("click", function () {
    moveTransport("elephant");
});
document.getElementById("camel").addEventListener("click", function () {
    moveTransport("camel");
});
document.getElementById("boat").addEventListener("click", function () {
    moveTransport("boat");
});
document.getElementById("boy").addEventListener("click", function () {
    moveTransport("boy");
});

showBackground();
