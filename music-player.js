const songAlbum = document.getElementById("song-album");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songMP3 = document.getElementById("MP3-Download");
const songWAV = document.getElementById("WAV-Download")

const songSlider = document.getElementById("slider-song");

const playpauseButton = document.getElementById("playpause-song");
const prevSongButton = document.getElementById("prev-song");
const nextSongButton = document.getElementById("next-song");
const songTimeDisplay = document.getElementById("song-time");

const audioPlayer = document.getElementById("audio-player");

// --------------------------------------------------
// SINGLE ALBUM FILE
// --------------------------------------------------

//audioPlayer.src = "MP3/FullAlbum.mp3";

// --------------------------------------------------
// TRACK METADATA
// start = seconds into FullAlbum.mp3
// --------------------------------------------------

const songs = [
    {
        name: "Example of the Hero",
        mp3link: "MP3/01 - Example of the Hero.mp3",
        wavlink: "WAV/01 - Example of the Hero.wav",
        start: 0
    },
    {
        name: "Breaking out onto the Scene",
        mp3link: "MP3/02 - Breaking out onto the Scene.mp3",
        wavlink: "WAV/02 - Breaking out onto the Scene.wav",
        start: 325.3
    },
    {
        name: "Hard Goin' Platformin'",
        mp3link: "MP3/03 - Hard Goin' Platformin'.mp3",
        wavlink: "WAV/03 - Hard Goin' Platformin'.wav",
        start: 560.2
    },
    {
        name: "We may yet make it After All",
        mp3link: "MP3/04 - We may yet make it After All.mp3",
        wavlink: "WAV/04 - We may yet make it After All.wav",
        start: 793.9
    },
    {
        name: "Aliased Horizon",
        mp3link: "MP3/02 - Breaking out onto the Scene.mp3",
        wavlink: "WAV/02 - Breaking out onto the Scene.wav",
        start: 977.5
    },
    {
        name: "Saturated Swing",
        mp3link: "MP3/06 - Saturated Swing.mp3",
        wavlink: "WAV/06 - Saturated Swing.wav",
        start: 1246.6
    },
    {
        name: "The Rival returns",
        mp3link: "MP3/07 - The Rival returns.mp3",
        wavlink: "WAV/07 - The Rival returns.wav",
        start: 1449.5
    },
    {
        name: "Metal Arctic Zone",
        mp3link: "MP3/08 - Metal Arctic Zone.mp3",
        wavlink: "WAV/08 - Metal Arctic Zone.wav",
        start: 1678
    },
    {
        name: "Drive by Wire",
        mp3link: "MP3/09 - Drive by Wire.mp3",
        wavlink: "WAV/09 - Drive by Wire.wav",
        start: 1883.53
    },
    {
        name: "Breakneck Approach",
        mp3link: "MP3/10 - Breakneck Approach.mp3",
        wavlink: "WAV/10 - Breakneck Approach.wav",
        start: 2141.4
    },
    {
        name: "Prismatic Funk",
        mp3link: "MP3/11 - Prismatic Funk.mp3",
        wavlink: "WAV/11 - Prismatic Funk.wav",
        start: 2318.5
    },
    {
        name: "Happiness is a Superpower",
        mp3link: "MP3/12 - Happiness is a Superpower.mp3",
        wavlink: "WAV/12 - Happiness is a Superpower.wav",
        start: 2572
    },
    {
        name: "Nostalgenosis",
        mp3link: "MP3/13 - Nostalgenosis.mp3",
        wavlink: "WAV/13 - Nostalgenosis.wav",
        start: 2779.5
    },
    {
        name: "Pixel Heart Overdrive",
        mp3link: "MP3/14 - Pixel Heart Overdrive.mp3",
        wavlink: "WAV/14 - Pixel Heart Overdrive.wav",
        start: 2993
    },
    {
        name: "The Rescued becomes the Rescuer",
        mp3link: "MP3/15 - The Rescued becomes the Rescuer.mp3",
        wavlink: "WAV/15 - The Rescued becomes the Rescuer.wav",
        start: 3261.7
    },
    {
        name: "Big Bad ain't so Bad",
        mp3link: "MP3/16 - Big Bad ain't so Bad.mp3",
        wavlink: "WAV/16 - Big Bad ain't so Bad.wav",
        start: 3491.7
    },
    {
        name: "Anthemic Epilogue",
        mp3link: "MP3/17 - Anthemic Epilogue.mp3",
        wavlink: "WAV/17 - Anthemic Epilogue.wav",
        start: 3706
    },
    {
        name: "(our) Players of the Evening",
        mp3link: "MP3/18 - (our) Players of the Evening.mp3",
        wavlink: "WAV/18 - (our) Players of the Evening.wav",
        start: 3907.5
    }
];

// --------------------------------------------------
// PLAYER STATE
// --------------------------------------------------

let currentSongIndex = 0;
let isPlaying = false;
let showQR = false;

// --------------------------------------------------
// OPTIONAL DEFAULT COVER
// --------------------------------------------------

const defaultCover = "albumart.jpeg";

// --------------------------------------------------
// LOAD TRACK METADATA
// (does NOT change audio source)
// --------------------------------------------------

function loadTrack(index) {

    currentSongIndex = index;

    const song = songs[index];

    songAlbum.textContent = "Pixel Heart Overdrive";
    songName.textContent = song.name;
    songMP3.textContent = "Download " + song.mp3link;
    songMP3.href = song.mp3link;
    songWAV.textContent = "Download " + song.mp3link;
    songWAV.href = song.wavlink;

    if (song.image) {
        songImage.src = song.image;
    } else {
        songImage.src = defaultCover;
    }

    updateMediaSession(song);
}

// --------------------------------------------------
// SEEK TO TRACK
// --------------------------------------------------

async function seekToTrack(index) {

    if (index < 0) {
        index = songs.length - 1;
    }

    if (index >= songs.length) {
        index = 0;
    }

    loadTrack(index);

    audioPlayer.currentTime = songs[index].start;

    if (isPlaying) {

        try {
            await audioPlayer.play();
        } catch (err) {
            console.warn("Playback failed:", err);
        }
    }
}

// --------------------------------------------------
// PLAY
// --------------------------------------------------

async function playSong() {

    try {

        await audioPlayer.play();

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
// PAUSE
// --------------------------------------------------

function pauseSong() {

    audioPlayer.pause();

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
// NEXT TRACK
// --------------------------------------------------

function nextSong() {
    updatePlayerUI();
    seekToTrack(currentSongIndex + 1);
}

// --------------------------------------------------
// PREVIOUS TRACK
// --------------------------------------------------

function prevSong() {
    updatePlayerUI();
    seekToTrack(currentSongIndex - 1);
}

// --------------------------------------------------
// AUTO TRACK DETECTION
// --------------------------------------------------

function updatePlayerUI() {

    const currentTime = audioPlayer.currentTime;

    // Precise time display
    songTimeDisplay.textContent =
        currentTime.toFixed(3);

    // Slider update
    if (audioPlayer.duration) {

        songSlider.value =
            (currentTime / audioPlayer.duration) * 100;
    }

    // Track detection
    for (let i = songs.length - 1; i >= 0; i--) {

        if (currentTime >= songs[i].start) {

            if (currentSongIndex !== i) {

                loadTrack(i);
            }

            break;
        }
    }

    requestAnimationFrame(updatePlayerUI);
}

requestAnimationFrame(updatePlayerUI);

// --------------------------------------------------
// SEEK BAR
// --------------------------------------------------

songSlider.addEventListener("input", () => {

    if (audioPlayer.duration) {

        audioPlayer.currentTime =
            (songSlider.value / 100) * audioPlayer.duration;
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

function toggleQR()
{
    showQR = !showQR;
    if(showQR)
    {
        songImage.src = "PixelHeartQR.png"
    }
    else
    {
        songImage.src = "albumart.jpeg"
    }
}

// --------------------------------------------------
// BUTTON EVENTS
// --------------------------------------------------

playpauseButton.addEventListener("click", togglePlayPause);
nextSongButton.addEventListener("click", nextSong);
prevSongButton.addEventListener("click", prevSong);

songImage.addEventListener("click", toggleQR)

// --------------------------------------------------
// INITIALIZE
// --------------------------------------------------

loadTrack(0);