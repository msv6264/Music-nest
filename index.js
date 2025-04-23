function toggleMenu() {
  let navbar = document.querySelector(".nav-links");
  navbar.classList.toggle("active");
}

const curr_song = [-1,-1];

const songName_in_controls = document.querySelector(".sName");
const artistName_in_controls = document.querySelector(".aName");
let audioPlayer = document.getElementById("audioPlayer");

// Playlists Data
const playlists = [
  {
    name: "Devotional",
    songs: [
      {
        song_id: 1,
        song_img:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_M8n5OksF129EUP_kmu7NqiMqZxZTL_J_vA&s",
        song_name: "Shiva Tandava Stotram",
        artist_name: "Shankar Mahadevan",
        duration: "00:37",
        EmbedURL: "audio/p1s1.mp3",
      },
      {
        song_id: 2,
        song_img:
          "https://w0.peakpx.com/wallpaper/534/221/HD-wallpaper-lord-shiva-blue-and-pink-effect-lord-mahadev-god.jpg",
        song_name: "Om namah shivaya",
        artist_name: "Amit Trivedi",
        duration: "5:45",
        EmbedURL: "audio/p1s2.mp3",
      },
      {
        song_id: 3,
        song_img:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVCAls91XKfeFu6uZ_QEszX3k20WTaM4nAH3KUDjizm1Lg6P14DXHxk3daI_Y4R0M-4q8&usqp=CAU",
        song_name: "Deva deva",
        artist_name: "Arjit Singh",
        duration: "00:29",
        EmbedURL: "audio/p1s3.mp3",
      },
      {
        song_id: 4,
        song_img:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhCeKiG3Cxxmrd1sSEeBbPMqguirX09bYZVElji9SSqINd_UsAhezSh1vZYRedJeMkYYaOP9fV8RRro6Eask47pX8bXGzmF8X-DFdD0dzVQV_zEOuXHWyvw8r52NiGEaDRc_ydFk7ud56X0/s1600/lord-krishna-vibrant-dress-hd-wallpapers-free.jpg",
        song_name: "Mukunda Mukunda",
        artist_name: "Kamal Haasan",
        duration: "4:23",
        EmbedURL: "audio/p1s4.mp3",
      },
      {
        song_id: 5,
        song_img:
          "https://mrwallpaper.com/images/thumbnail/pink-lord-krishna-3d-yhbju47icvgdwdme.webp",
        song_name: "Rayini maatram",
        artist_name: "Himesh Reshammiya",
        duration: "00:29",
        EmbedURL: "audio/p1s5.mp3",
      },
    ],
  },
  {
    name: "Trendy",
    songs: [
      {
          song_id: 1,
          song_img: 'https://moises.ai/_next/image/?url=https%3A%2F%2Fstorage.googleapis.com%2Fmoises-cms%2Fhow_to_reading_sheet_music_image_338d99b137%2Fhow_to_reading_sheet_music_image_338d99b137.jpg&w=1920&q=75',
          song_name: 'audio1',
          artist_name: 'artist1',
          duration: '3:50',
          EmbedURL: 'audio/1.mp3',
      },
      {
          song_id: 2,
          song_img: 'https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg',
          song_name: 'audio2',
          artist_name: 'artist2',
          duration: '2:33',
          EmbedURL: 'audio/2.mp3',
      },
      {
          song_id: 3,
          song_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHIZOo6hPgfE3uPz4rR-W3p_eYgCX9WM0CMjhHwfFeqPMtt7pJC2dTwBkHnoClX9UGc-Y&usqp=CAU',
          song_name: 'audio3',
          artist_name: 'artist3',
          duration: '4:33',
          EmbedURL: 'audio/3.mp3',
      },
      {
          song_id: 4,
          song_img: 'https://www.euroschoolindia.com/wp-content/uploads/2024/10/The-Role-of-Music-in-Enhancing-Mood.webp',
          song_name: 'audio4',
          artist_name: 'artist4',
          duration: '4:27',
          EmbedURL: 'audio/4.mp3',
      },
      {
          song_id: 5,
          song_img: 'https://static.vecteezy.com/system/resources/thumbnails/043/193/741/small_2x/music-notes-with-dark-neon-light-effect-3d-rendering-video.jpg',
          song_name: 'audio5',
          artist_name: 'artist5',
          duration: '3:28',
          EmbedURL: 'audio/5.mp3',
      }
  ]
  }
];

const playListContainer = document.querySelector(".DevotionalList");
const Devotional = document.querySelector(".trndy1");
const Trendy = document.querySelector(".trndy2");
const Old_songs = document.querySelector(".trndy3");
const Podcasts = document.querySelector(".trndy4");
const playerBg = document.querySelector(".playerBg");

const defaultPlayerImage = "Images/playerBackground2.png";
const playerImg = document.querySelector(".pbg img");

// Converts seconds to mm : ss format
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// Converts total time to seconds
function timeToSeconds(timeString) {
  const [minutes, seconds] = timeString.split(":").map(Number);
  return minutes * 60 + seconds;
}

// It is function for all times and updates progress bar when some song plays.
function updateProgress(){
  const totalTime = document.querySelector('.timeLeft');
  const timeOver = document.querySelector('.timeOver');
  const progressBar = document.querySelector('.SongProgress');

  const currentPlaylist = curr_song[0];
  const currentSong = curr_song[1];

  if (currentPlaylist === -1 || currentSong === -1) return;

  const totTime = timeToSeconds(playlists[currentPlaylist].songs[currentSong].duration);

  if (!audioPlayer.paused){
    const currentTime = audioPlayer.currentTime;
    progressBar.style.width = `${(currentTime / totTime) * 100}%`;

    if (timeOver) {
      timeOver.textContent = formatTime(currentTime);
    }
    if (totalTime && !isNaN(totTime)) {
      totalTime.textContent = formatTime(totTime);
    }

    const progressContainer = document.querySelector('.songProgressBar');
    progressContainer.addEventListener('click', (e) => {
      if (curr_song[0] === -1 || curr_song[1] === -1) return; 
      const percent = (e.offsetX / progressContainer.clientWidth) * 100;
      progressBar.style.width = `${percent}%`;
      let songTime = (percent / 100) * totTime;
      audioPlayer.currentTime = songTime;

      // if(timeOver == totalTime){
      //   const currentPlaylist = Number(curr_song[0]);
      //   let currentSong = Number(curr_song[1]);
      //   console.log('passing pl: ' + currentPlaylist + " and " + currentSong);
      //   nextBtn(currentPlaylist, Number(currentSong));
      // }
    });
  }
  
  if (progressBar.style.width === "100%") {
    nextBtn(currentPlaylist, Number(currentSong));
    console.log('next song plays');
  }
  
}

// It updates song images bg image and song icon and plays updated song.
function playSong(playlistIndex, songIndex) {
  const song = playlists[playlistIndex].songs[songIndex];
  const songIcon = document.getElementsByClassName('songIcon1');
  if (song) {
    audioPlayer.src = song.EmbedURL;
    audioPlayer.play();
    songName_in_controls.innerHTML = song.song_name;
    artistName_in_controls.innerHTML = song.artist_name;
    playerImg.src = song.song_img;
    songIcon.src = song.song_img;

    curr_song[0] = playlistIndex;
    curr_song[1] = songIndex;
  }
}
setInterval(updateProgress, 1000);

// It will show playlist of that pic, and if user clicks on song image or song name the big image and song icon changes to that song image.
function renderList(songs, listIdx) {
  playListContainer.innerHTML = songs
    .map(
      (song, index) =>
        `
        <div class="dlSong">
            <div class="songImages">
                <img class="ImgURL" src="${song.song_img}" alt="img" data-index="${index}">
            </div>
            <div class="names">
                <div class="song_name" data-index="${index}">${song.song_name}</div>
                <div class="artist_name">${song.artist_name}</div>
            </div>
            <div class="duration">${song.duration}</div>
            <a class="EmbedURL" href="${song.EmbedURL}" target="_blank">Listen</a>
        </div>
    `
    )
    .join("");

  const songPics = document.querySelectorAll(".ImgURL");
  const songImage_in_controls = document.querySelector(".songIcon img");

  songPics.forEach((img) => {
    img.addEventListener("click", function () {
      const songIdx = this.dataset.index;

      if (songs[songIdx]) {
        // Update the player image and audio source
        playerImg.src = songs[songIdx].song_img;
        audioPlayer.src = songs[songIdx].EmbedURL; // Set the audio source
        audioPlayer.play(); // Play the audio
        playSong(listIdx, songIdx);
        songName_in_controls.innerHTML = songs[songIdx].song_name;
        artistName_in_controls.innerHTML = songs[songIdx].artist_name;
        songImage_in_controls.src = songs[songIdx].song_img;

        playerBg.classList.remove("pbg");
        playerBg.classList.add("pbg2");

        curr_song[0] = listIdx;
        curr_song[1] = songIdx;
      }
    });
  });

  const songNames = document.querySelectorAll(".song_name");

  songNames.forEach((song) => {
    song.addEventListener("click", function () {
      const songIdx = this.dataset.index;
      playSong(listIdx, songIdx);
      if (songs[songIdx]) {
        playerImg.src = songs[songIdx].song_img;
        audioPlayer.src = songs[songIdx].EmbedURL; // Set the audio source
        audioPlayer.play(); // Play the audio
        curr_song;
        playSong(listIdx, songIdx);
        songName_in_controls.innerHTML = songs[songIdx].song_name;
        artistName_in_controls.innerHTML = songs[songIdx].artist_name;
        songImage_in_controls.src = songs[songIdx].song_img;

        playerBg.classList.remove("pbg");
        playerBg.classList.add("pbg2");

        curr_song[0] = listIdx;
        curr_song[1] = songIdx;
      }
    });
  });
}

let currentPlaylistIndex = -1;

const pause = document.querySelector(".pauseBtn");
const play = document.querySelector(".playBtn");
const next = document.querySelector(".nextBtn");
const prev = document.querySelector(".prevBtn");

pause.addEventListener("click", function () {
  if (!audioPlayer.paused) {
    audioPlayer.pause(); // Pause the audio
    pause.style.display = "none";
    play.style.display = "block"; // Show play button
  }
});

play.addEventListener("click", function () {
  if (audioPlayer.paused) {
    audioPlayer.play(); // Play the audio
    play.style.display = "none";
    pause.style.display = "block"; // Show pause button
  }
});

// Previous button functionality
prev.addEventListener("click", function () {
  const currentPlaylist = curr_song[0];
  let currentSong = curr_song[1];

  if (currentPlaylist === -1 || currentSong === -1) return; 

  let prevSongIndex = currentSong - 1;
  if (prevSongIndex < 0) {
    prevSongIndex = playlists[currentPlaylist].songs.length - 1;
  }

  playSong(currentPlaylist, prevSongIndex);

  const songImage_in_controls = document.querySelector(".songIcon img");
  const songData = playlists[currentPlaylist].songs[prevSongIndex];
  if (songImage_in_controls && songData) {
    songImage_in_controls.src = songData.song_img;
  }
});

function nextBtn(currentPlaylist, currentSong){
  if (currentPlaylist === -1 || currentSong === -1) return; 

  let nextSongIndex = Number(currentSong) + 1;
  // In js arrays are considered as objects so typeof currentSong is object it would be 0 : "-1" where -1 is string so curr_song[1] is string so we need to convert it into number or else next won't work properly
  if (nextSongIndex > playlists[currentPlaylist].songs.length - 1) {
    nextSongIndex = 0;
  }

  playSong(currentPlaylist, nextSongIndex);

  const songImage_in_controls = document.querySelector(".songIcon img");
  const songData = playlists[currentPlaylist].songs[nextSongIndex];
  if (songImage_in_controls && songData) {
    songImage_in_controls.src = songData.song_img;
  }
}

// Next button functionality
next.addEventListener("click", function () {
  const currentPlaylist = curr_song[0];
  let currentSong = curr_song[1];
  nextBtn(currentPlaylist, currentSong)
});

// Automatically play the next song when the current song ends
audioPlayer.addEventListener("ended", function () {
  const currentPlaylist = curr_song[0];
  const currentSong = curr_song[1];
  const playlistSongs = playlists[currentPlaylist].songs;

  nextBtn(currentPlaylist, Number(currentSong));
  // if (currentSong + 1 < playlistSongs.length) {
  //   playSong(currentPlaylist, currentSong + 1);
  // } else {
  //   // Loop back to the first song
  //   playSong(currentPlaylist, 0);
  // }
});

// play pause buttons changes when clicked
audioPlayer.addEventListener("play", function () {
  play.style.display = "none";
  pause.style.display = "block";
});

audioPlayer.addEventListener("pause", function () {
  play.style.display = "block";
  pause.style.display = "none";
});

audioPlayer.addEventListener("timeupdate", updateProgress);

// It is for rendering list one or more lists
function main(element, playlistIndex) {
  element.addEventListener("click", function () {
    if (currentPlaylistIndex === playlistIndex) {
      playListContainer.innerHTML = "";
      playerImg.src = defaultPlayerImage;
      audioPlayer.pause();
      audioPlayer.src = "";
      currentPlaylistIndex = -1; 
    } else {
      playListContainer.innerHTML = "";
      renderList(playlists[playlistIndex].songs, playlistIndex);
      currentPlaylistIndex = playlistIndex;
    }
  });
}

main(Devotional, 0);
main(Trendy, 1);
main(Old_songs, 1);
main(Podcasts, 1);