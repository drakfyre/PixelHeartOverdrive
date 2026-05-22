const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");

const songSlider = document.getElementById("slider-song");

const playpauseButton = document.getElementById("playpause-song");
const prevSongButton = document.getElementById("prev-song");
const nextSongButton = document.getElementById("next-song");

// --------------------------------------------------
// SONG LIST
// --------------------------------------------------

const songs = [
    {
        name: "Example of the Hero",
        artist: "HappyJazzyDragon",
        audio: "MP3/Example of the Hero.mp3"
    },
    {
        name: "Breaking out onto the Scene",
        artist: "HappyJazzyDragon",
        audio: "MP3/Breaking out onto the Scene.mp3"
    },
    {
        name: "Hard Goin' Platformin'",
        artist: "HappyJazzyDragon",
        audio: "MP3/Hard Goin' Platformin'.mp3"
    },
    {
        name: "We may yet make it After All",
        artist: "HappyJazzyDragon",
        audio: "MP3/We may yet make it After All.mp3"
    },
    {
        name: "Aliased Horizon",
        artist: "HappyJazzyDragon",
        audio: "MP3/Aliased Horizon.mp3"
    },
    {
        name: "Saturated Swing",
        artist: "HappyJazzyDragon",
        audio: "MP3/Saturated Swing.mp3"
    },
    {
        name: "The Rival returns",
        artist: "HappyJazzyDragon",
        audio: "MP3/The Rival returns.mp3"
    },
    {
        name: "Metal Arctic Zone",
        artist: "HappyJazzyDragon",
        audio: "MP3/Metal Arctic Zone.mp3"
    },
    {
        name: "Drive by Wire",
        artist: "HappyJazzyDragon",
        audio: "MP3/Drive by Wire.mp3"
    },
    {
        name: "Breakneck Approach",
        artist: "HappyJazzyDragon",
        audio: "MP3/Breakneck Approach.mp3"
    },
    {
        name: "Prismatic Funk",
        artist: "HappyJazzyDragon",
        audio: "MP3/Prismatic Funk.mp3"
    },
    {
        name: "Happiness is a Superpower",
        artist: "HappyJazzyDragon",
        audio: "MP3/Happiness is a Superpower.mp3"
    },
    {
        name: "Nostalgenosis",
        artist: "HappyJazzyDragon",
        audio: "MP3/Nostalgenosis.mp3"
    },
    {
        name: "Pixel Heart Overdrive",
        artist: "MP3/Pixel Heart Overdrive.mp3"
    },
    {
        name: "The Rescued becomes the Rescuer",
        artist: "HappyJazzyDragon",
        audio: "MP3/The Rescued becomes the Rescuer.mp3"
    },
    {
        name: "Big Bad ain't so Bad",
        artist: "HappyJazzyDragon",
        audio: "MP3/Big Bad ain't so Bad.mp3"
    },
    {
        name: "Anthemic Epilogue",
        artist: "HappyJazzyDragon",
        audio: "MP3/Anthemic Epilogue.mp3"
    },
    {
        name: "(our) Players of the Evening",
        artist: "HappyJazzyDragon",
        audio: "MP3/(our) Players of the Evening.mp3"
    },
];

// --------------------------------------------------
// PLAYER STATE
// --------------------------------------------------

let currentSongIndex = 0;
let isPlaying = false;

// --------------------------------------------------
// DUAL AUDIO PLAYERS
// --------------------------------------------------

const playerA = new Audio();
const playerB = new Audio();

let currentPlayer = playerA;
let preloadPlayer = playerB;

// --------------------------------------------------
// MOBILE RELIABILITY SETTINGS
// --------------------------------------------------

[playerA, playerB].forEach(player => {
    player.preload = "auto";
    player.crossOrigin = "anonymous";

    player.setAttribute("playsinline", "true");
    player.setAttribute("webkit-playsinline", "true");
});

// --------------------------------------------------
// DEFAULT COVER
// --------------------------------------------------

const defaultCover = "albumart.jpeg";

// --------------------------------------------------
// LOAD CURRENT SONG
// --------------------------------------------------

function loadSong(index) {
    const song = songs[index];

    currentPlayer.src = song.audio;
    currentPlayer.load();

    updateSongUI(song);
    updateMediaSession(song);

    preloadNextSong();
}

// --------------------------------------------------
// PRELOAD NEXT SONG
// --------------------------------------------------

function preloadNextSong() {
    let nextIndex = currentSongIndex + 1;

    if (nextIndex >= songs.length) {
        nextIndex = 0;
    }

    preloadPlayer.src = songs[nextIndex].audio;
    preloadPlayer.load();
}

// --------------------------------------------------
// UPDATE UI
// --------------------------------------------------

function updateSongUI(song) {
    songName.textContent = song.name;
    songArtist.textContent = song.artist;

    if (song.image) {
        songImage.src = song.image;
    } else {
        songImage.src = defaultCover;
    }
}

// --------------------------------------------------
// PLAY SONG
// --------------------------------------------------

async function playSong() {
    try {
        await currentPlayer.play();

        isPlaying = true;

        playpauseButton.classList.replace("fa-circle-play","fa-circle-pause");

        if ("mediaSession" in navigator) {
            navigator.mediaSession.playbackState = "playing";
        }

    } catch (err) {
        console.warn("Playback failed:", err);
    }
}

// --------------------------------------------------
// PAUSE SONG
// --------------------------------------------------

function pauseSong() {
    currentPlayer.pause();

    isPlaying = false;

    playpauseButton.classList.replace("fa-circle-pause","fa-circle-play");

    if ("mediaSession" in navigator) {
        navigator.mediaSession.playbackState = "paused";
    }
}

// --------------------------------------------------
// TOGGLE PLAY/PAUSE
// --------------------------------------------------

function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

// --------------------------------------------------
// SWAP PLAYERS
// --------------------------------------------------

function swapPlayers() {
    const temp = currentPlayer;

    currentPlayer = preloadPlayer;
    preloadPlayer = temp;
}

// --------------------------------------------------
// NEXT SONG
// --------------------------------------------------

async function nextSong() {

    currentPlayer.pause();

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    swapPlayers();

    const song = songs[currentSongIndex];

    updateSongUI(song);
    updateMediaSession(song);

    preloadNextSong();

    if (isPlaying) {
        try {
            await currentPlayer.play();
        } catch (err) {
            console.warn("Next song failed:", err);
        }
    }
}

// --------------------------------------------------
// PREVIOUS SONG
// --------------------------------------------------

async function prevSong() {

    currentPlayer.pause();

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    currentPlayer.src = songs[currentSongIndex].audio;
    currentPlayer.load();

    updateSongUI(songs[currentSongIndex]);
    updateMediaSession(songs[currentSongIndex]);

    preloadNextSong();

    if (isPlaying) {
        try {
            await currentPlayer.play();
        } catch (err) {
            console.warn("Previous song failed:", err);
        }
    }
}

// --------------------------------------------------
// SLIDER UPDATE
// --------------------------------------------------

setInterval(() => {

    if (currentPlayer.duration) {

        songSlider.value =
            (currentPlayer.currentTime / currentPlayer.duration) * 100;

        // NEAR-END DETECTION
        // Much more reliable than "ended" on mobile

        const remaining =
            currentPlayer.duration - currentPlayer.currentTime;

        if (
            remaining <= 0.35 &&
            !currentPlayer.__advancing
        ) {

            currentPlayer.__advancing = true;

            nextSong();

            setTimeout(() => {
                currentPlayer.__advancing = false;
            }, 1000);
        }
    }

}, 250);

// --------------------------------------------------
// SEEK BAR
// --------------------------------------------------

songSlider.addEventListener("input", () => {

    if (currentPlayer.duration) {

        currentPlayer.currentTime =
            (songSlider.value / 100) * currentPlayer.duration;
    }
});

// --------------------------------------------------
// VISIBILITY RECOVERY
// --------------------------------------------------

document.addEventListener("visibilitychange", () => {

    if (
        !document.hidden &&
        isPlaying &&
        currentPlayer.paused
    ) {

        currentPlayer.play().catch(() => {});
    }
});

// --------------------------------------------------
// MEDIA SESSION
// --------------------------------------------------

function updateMediaSession(song) {

    if (!("mediaSession" in navigator)) {
        return;
    }

    navigator.mediaSession.metadata = new MediaMetadata({
        title: song.name,
        artist: song.artist,
        album: "Pixel Heart Overdrive",
        artwork: [
            {
                src: song.image || defaultCover,
                sizes: "512x512",
                type: "image/png"
            }
        ]
    });

    navigator.mediaSession.setActionHandler("play", () => {
        playSong();
    });

    navigator.mediaSession.setActionHandler("pause", () => {
        pauseSong();
    });

    navigator.mediaSession.setActionHandler("nexttrack", () => {
        nextSong();
    });

    navigator.mediaSession.setActionHandler("previoustrack", () => {
        prevSong();
    });
}

// --------------------------------------------------
// BUTTON EVENTS
// --------------------------------------------------

playpauseButton.addEventListener("click", togglePlayPause);
nextSongButton.addEventListener("click", nextSong);
prevSongButton.addEventListener("click", prevSong);

// --------------------------------------------------
// INITIALIZE
// --------------------------------------------------

loadSong(currentSongIndex);