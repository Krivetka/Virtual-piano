document.querySelector(".openfullscreen").addEventListener("click", () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
});

document.querySelector(".btn-letters").addEventListener("click", () => {
    document.querySelector(".btn-letters").classList.add("btn-active");
    document.querySelector(".btn-notes").classList.remove("btn-active");
    document.querySelectorAll(".piano-key").forEach((elem)=>{
        elem.classList.add("letter");
    })
});

document.querySelector(".btn-notes").addEventListener("click", () => {
    document.querySelector(".btn-notes").classList.add("btn-active");
    document.querySelector(".btn-letters").classList.remove("btn-active");
    document.querySelectorAll(".piano-key").forEach((elem)=>{
        elem.classList.remove("letter");
    })
});

const playAudio = (src) => {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
};

const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");
const startActive = (event) =>{
    event.target.classList.add("piano-key-active");
    const note = event.target.dataset.note;
    playAudio(`assets/audio/${note}.mp3`);
};
const stopActive = (event) =>{
    event.target.classList.remove("piano-key-active");
};
const startCorrespondOver = (event) => {
    if(event.target.classList.contains("piano-key")){
        event.target.classList.add("piano-key-active");
        const note = event.target.dataset.note;
        playAudio(`assets/audio/${note}.mp3`);
    }
    pianoKeys.forEach((elem) => {
        elem.addEventListener("mouseover", startActive);
        elem.addEventListener("mouseout", stopActive)
    });
};
const stopCorrespondOver = () => {
    pianoKeys.forEach((elem) => {
        elem.classList.remove("piano-key-active");
        elem.removeEventListener("mouseover", startActive);
        elem.removeEventListener("mouseout", stopActive)
    });
};

piano.addEventListener("mousedown", startCorrespondOver);
document.querySelector("html").addEventListener("mouseup", stopCorrespondOver);

const playSound = (event) =>{
    const letter= event.code;
    if (letter.length<5){
        const key = document.querySelector(`div[data-letter="${letter[3]}"]`);
        if (!key.classList.contains('piano-key-active')){
            key.classList.add('piano-key-active');
            const note = key.dataset.note;
            playAudio(`assets/audio/${note}.mp3`);
        }
    }
};
const stopSound = (event) =>{
    const letter = event.code;
    const key = document.querySelector(`div[data-letter="${letter[3]}"]`);
    key.classList.remove('piano-key-active');
};

document.addEventListener('keydown', playSound);
document.addEventListener('keyup', stopSound);
