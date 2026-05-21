const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");

const songSlider = document.getElementById("slider-song");

const playpauseButton = document.getElementById("playpause-song");
const prevSongButton = document.getElementById("prev-song");
const nextSongButton = document.getElementById("next-song");

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
        artist: "HappyJazzyDragon",
        audio: "MP3/Pixel Heart Overdrive.mp3"
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
// MUSIC PLAYER
// --------------------------------------------------

let currentSongIndex = 0;
let isPlaying = false;

const audioPlayer = new Audio();

// Optional placeholder image if you don't have album art
const defaultCover = "albumart.jpeg";

function loadSong(index) {
    const song = songs[index];

    audioPlayer.src = song.audio;

    songName.textContent = song.name;
    songArtist.textContent = song.artist;

    // If you add image fields later this will work automatically
    if (song.image) {
        songImage.src = song.image;
    } else {
        songImage.src = defaultCover;
    }

    updateMediaSession();
}

function playSong() {
    audioPlayer.play();

    isPlaying = true;

    playpauseButton.textContent = "Pause";

    if ("mediaSession" in navigator) {
        navigator.mediaSession.playbackState = "playing";
    }
}

function pauseSong() {
    audioPlayer.pause();

    isPlaying = false;

    playpauseButton.textContent = "Play";

    if ("mediaSession" in navigator) {
        navigator.mediaSession.playbackState = "paused";
    }
}

function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function nextSong() {
    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);
    playSong();
}

function prevSong() {
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    loadSong(currentSongIndex);
    playSong();
}

// --------------------------------------------------
// SONG SLIDER
// --------------------------------------------------

audioPlayer.addEventListener("timeupdate", () => {
    if (audioPlayer.duration) {
        songSlider.value =
            (audioPlayer.currentTime / audioPlayer.duration) * 100;
    }
});

songSlider.addEventListener("input", () => {
    if (audioPlayer.duration) {
        audioPlayer.currentTime =
            (songSlider.value / 100) * audioPlayer.duration;
    }
});

// --------------------------------------------------
// AUTO NEXT TRACK
// --------------------------------------------------

audioPlayer.addEventListener("ended", () => {
    nextSong();
});

// --------------------------------------------------
// BUTTON EVENTS
// --------------------------------------------------

playpauseButton.addEventListener("click", togglePlayPause);
nextSongButton.addEventListener("click", nextSong);
prevSongButton.addEventListener("click", prevSong);

// --------------------------------------------------
// MEDIA SESSION
// --------------------------------------------------

function updateMediaSession() {
    if (!("mediaSession" in navigator)) {
        return;
    }

    const song = songs[currentSongIndex];

    navigator.mediaSession.metadata = new MediaMetadata({
        title: song.name,
        artist: song.artist,
        album: "Pixel Heart Overdrve",
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

    navigator.mediaSession.setActionHandler("previoustrack", () => {
        prevSong();
    });

    navigator.mediaSession.setActionHandler("nexttrack", () => {
        nextSong();
    });
}

// --------------------------------------------------
// INITIALIZE
// --------------------------------------------------

loadSong(currentSongIndex);