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
    if (currentSongIndex == 0) {
        return;
    }
    currentSongIndex--;
    updateSong();
});

nextSongButton.addEventListener("click", function() {
    if (currentSongIndex == songs.length - 1) {
        return;
    }
    currentSongIndex++;
    updateSong();
});

playpauseButton.addEventListener("click", function() {
    if (!audio.paused)
    {
        audio.pause();
        playpauseButton.classList.replace('fa-circle-pause', 'fa-circle-play');
    }
    else
    {
        audio.play();
        playpauseButton.classList.replace('fa-circle-play', 'fa-circle-pause');
    }
});

function updateSong()
{
    const song = songs[currentSongIndex];
    //songImage.src = song.image;
    songName.innerText = song.name;
    songArtist.innerText = song.artist;

    audio.src = song.audio;
    audio.onloadedmetadata = function()
    {
        songSlider.value = 0;
        songSlider.max = audio.duration;
    };

    audio.load(); 
    audio.play
}

songSlider.addEventListener("change", function() {
    audio.currentTime = songSlider.value;
})

function moveSlider() {
    songSlider.value = audio.currentTime;
    if(audio.currentTime >= audio.duration)
    {
        if (currentSongIndex == songs.length - 1)
        {
            return;
        }
        currentSongIndex++;
        updateSong();
    }
};

setInterval(moveSlider, 1000);



