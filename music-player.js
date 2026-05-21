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

const audio = document.createElement("audio");
let currentSongIndex = 0;

updateSong();

prevSongButton.addEventListener("click", function() {
    playPreviousTrack();
});

nextSongButton.addEventListener("click", function() {
    playNextTrack();
});

audio.addEventListener('ended', () => {
    playNextTrack(); // Your function to change src and play
});

audio.addEventListener('stalled', () => {
  console.warn('Network connection is stalled. Buffering...');
  // Optional: show a "Buffering" indicator in your UI
});

audio.addEventListener('error', (e) => {
  console.error('Audio playback error:', audio.error);
  // Attempt a soft reconnect by reloading the source
  const currentSource = audio.src;
  setTimeout(() => {
    audio.src = currentSource;
    audio.currentTime = songSlider.value;
    audio.play().catch(err => console.log('Reconnection failed', err));
  }, 3000); // Wait 3 seconds before retrying
});

playpauseButton.addEventListener("click", function() {
    if (!audio.paused)
    {
        pauseAudio();
    }
    else
    {
        playAudio();
    }
});

function updateSong()
{
    const song = songs[currentSongIndex];

    if('mediaSession' in navigator)
    {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: song.name,
            artist: song.artist,
            album: 'Pixel Heart Overdrive',
            artwork: [{ src: 'albumart.jpeg', sizes: '512x512', type: 'image/jpeg' }]
        });

        navigator.mediaSession.setActionHandler('nexttrack', () => {
            playNextTrack();
        });

        navigator.mediaSession.setActionHandler('previoustrack', () => {
            playPreviousTrack();
        });

        navigator.mediaSession.setActionHandler('play', () =>
        {
            playAudio();
        });
        navigator.mediaSession.setActionHandler('pause', () =>
        {
            pauseAudio();
        });
    }

    //songImage.src = song.image;
    songName.innerText = song.name;
    songArtist.innerText = song.artist;

    audio.src = song.audio;
    audio.onloadedmetadata = function()
    {
        songSlider.value = 0;
        songSlider.max = audio.duration;
    };

    if(playpauseButton.classList.contains('fa-circle-pause'))
    {
        playAudio();
    }
}

songSlider.addEventListener("change", function() {
    audio.currentTime = songSlider.value;
})

function playNextTrack()
{
    if (currentSongIndex == songs.length - 1) {
        return;
    }
    currentSongIndex++;
    updateSong();
}

function playPreviousTrack()
{
    if (currentSongIndex == 0) {
        return;
    }
    currentSongIndex--;
    updateSong();
}

async function playAudio() {
  try {
    playpauseButton.classList.replace('fa-circle-play', 'fa-circle-pause');
    audio.play();
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = "playing";
    }
  } catch (err) {
    console.error("Playback prevented:", err);
  }
}

function pauseAudio() {
    playpauseButton.classList.replace('fa-circle-pause', 'fa-circle-play');
  audio.pause();
  if ('mediaSession' in navigator) {
    navigator.mediaSession.playbackState = "paused";
  }
}

function moveSlider() {
    songSlider.value = audio.currentTime;
};

setInterval(moveSlider, 1000);



