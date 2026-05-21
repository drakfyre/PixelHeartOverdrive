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

let currentIndex = 0;
const audio = new Audio();

// 2. Initialize Track Player
function loadTrack(index) {
  if (index < 0 || index >= playlist.length) return;
  currentIndex = index;
  const track = songs[currentIndex];
  
  audio.src = track.audio;
  updateMediaSession(track);
}

// 3. Sync Browser/OS UI (MediaSession API)
function updateMediaSession(track) {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.name,
      artist: track.artist,
      album: "Pixel Heart Overdrive",
      artwork: [{ src: "albumart.jpeg", sizes: '512x512', type: 'image/jpeg' }]
    });
    setupHardwareControls();
  }
}

// 4. Map Hardware Keys & Headphone Buttons
function setupHardwareControls() {
  const ms = navigator.mediaSession;
  
  ms.setActionHandler('play', () => togglePlay(true));
  ms.setActionHandler('pause', () => togglePlay(false));
  ms.setActionHandler('previoustrack', () => playPrevious());
  ms.setActionHandler('nexttrack', () => playNext());
}

// 5. Playback Control Logic
function togglePlay(forcePlay) {
  const shouldPlay = forcePlay !== undefined ? forcePlay : audio.paused;
  
  if (shouldPlay) {
    audio.play().catch(err => console.log("Playback blocked. Await user interaction.", err));
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = "playing";
  } else {
    audio.pause();
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = "paused";
  }
}

function playNext() {
  if (currentIndex < playlist.length - 1) {
    loadTrack(currentIndex + 1);
    togglePlay(true);
  }
}

function playPrevious() {
  if (currentIndex > 0) {
    loadTrack(currentIndex - 1);
    togglePlay(true);
  }
}

// 6. Automation & DOM Event Listeners
audio.addEventListener('ended', () => playNext());

document.getElementById('playpause-song').addEventListener('click', () => togglePlay());
document.getElementById('prev-song').addEventListener('click', () => playPrevious());
document.getElementById('next-song').addEventListener('click', () => playNext());

// Start by loading the first track
loadTrack(0);