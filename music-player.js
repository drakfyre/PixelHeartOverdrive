const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");

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
        artist: "HappyJazzyDragon",
        start: 0
    },
    {
        name: "Breaking out onto the Scene",
        artist: "HappyJazzyDragon",
        start: 325.3
    },
    {
        name: "Hard Goin' Platformin'",
        artist: "HappyJazzyDragon",
        start: 560.2
    },
    {
        name: "We may yet make it After All",
        artist: "HappyJazzyDragon",
        start: 793.9
    },
    {
        name: "Aliased Horizon",
        artist: "HappyJazzyDragon",
        start: 977.5
    },
    {
        name: "Saturated Swing",
        artist: "HappyJazzyDragon",
        start: 1246.6
    },
    {
        name: "The Rival returns",
        artist: "HappyJazzyDragon",
        start: 1449.5
    },
    {
        name: "Metal Arctic Zone",
        artist: "HappyJazzyDragon",
        start: 1678
    },
    {
        name: "Drive by Wire",
        artist: "HappyJazzyDragon",
        start: 1883.53
    },
    {
        name: "Breakneck Approach",
        artist: "HappyJazzyDragon",
        start: 2141.4
    },
    {
        name: "Prismatic Funk",
        artist: "HappyJazzyDragon",
        start: 2318.5
    },
    {
        name: "Happiness is a Superpower",
        artist: "HappyJazzyDragon",
        start: 2572
    },
    {
        name: "Nostalgenosis",
        artist: "HappyJazzyDragon",
        start: 2779.5
    },
    {
        name: "Pixel Heart Overdrive",
        artist: "HappyJazzyDragon",
        start: 2993
    },
    {
        name: "The Rescued becomes the Rescuer",
        artist: "HappyJazzyDragon",
        start: 3261.7
    },
    {
        name: "Big Bad ain't so Bad",
        artist: "HappyJazzyDragon",
        start: 3491.7
    },
    {
        name: "Anthemic Epilogue",
        artist: "HappyJazzyDragon",
        start: 3706
    },
    {
        name: "(our) Players of the Evening",
        artist: "HappyJazzyDragon",
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

    songName.textContent = song.name;
    songArtist.textContent = song.artist;

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