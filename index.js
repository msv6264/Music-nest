function toggleMenu() {
    let navbar = document.querySelector('.nav-links');
    navbar.classList.toggle('active');
}

const songName_in_controls = document.querySelector('.sName');
const artistName_in_controls = document.querySelector('.aName');
let audioPlayer = document.getElementById("audioPlayer");

// Playlists Data
const playlists = [
    {
        name: 'Devotional',
        songs: [
            {
                song_id: 1,
                song_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_M8n5OksF129EUP_kmu7NqiMqZxZTL_J_vA&s',
                song_name: 'Shiva Tandava Stotram',
                artist_name: 'Shankar Mahadevan',
                duration: '3:50',
                EmbedURL: 'audio/1.mp3',
            },
            {
                song_id: 2,
                song_img: 'https://w0.peakpx.com/wallpaper/534/221/HD-wallpaper-lord-shiva-blue-and-pink-effect-lord-mahadev-god.jpg',
                song_name: 'Namo Namo ji shankara',
                artist_name: 'Amit Trivedi',
                duration: '2:33',
                EmbedURL: 'audio/2.mp3',
            },
            {
                song_id: 3,
                song_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVCAls91XKfeFu6uZ_QEszX3k20WTaM4nAH3KUDjizm1Lg6P14DXHxk3daI_Y4R0M-4q8&usqp=CAU',
                song_name: 'Deva deva',
                artist_name: 'Arjit Singh',
                duration: '4:33',
                EmbedURL: 'audio/3.mp3',
            },
            {
                song_id: 4,
                song_img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhCeKiG3Cxxmrd1sSEeBbPMqguirX09bYZVElji9SSqINd_UsAhezSh1vZYRedJeMkYYaOP9fV8RRro6Eask47pX8bXGzmF8X-DFdD0dzVQV_zEOuXHWyvw8r52NiGEaDRc_ydFk7ud56X0/s1600/lord-krishna-vibrant-dress-hd-wallpapers-free.jpg',
                song_name: 'Mukunda Mukunda',
                artist_name: 'Kamal Haasan',
                duration: '4:27',
                EmbedURL: 'audio/4.mp3',
            },
            {
                song_id: 5,
                song_img: 'https://mrwallpaper.com/images/thumbnail/pink-lord-krishna-3d-yhbju47icvgdwdme.webp',
                song_name: 'Rayini maatram',
                artist_name: 'Himesh Reshammiya',
                duration: '3:28',
                EmbedURL: 'audio/5.mp3',
            }
        ]
    }
];

const playListContainer = document.querySelector('.DevotionalList');
const Devotional = document.querySelector('.trndy1');
const playerBg = document.querySelector('.playerBg');

const defaultPlayerImage = "Images/playerBackground2.png"; // Store the default image path
const playerImg = document.querySelector('.pbg img');

function renderList(songs) {
    playListContainer.innerHTML = songs.map((song, index) =>
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
    `).join('');

    const songPics = document.querySelectorAll('.ImgURL');
    const songImage_in_controls = document.querySelector('.songIcon img');

    songPics.forEach((img) => {
        img.addEventListener('click', function () {
            const songIdx = this.dataset.index;

            if (songs[songIdx]) {
                // Update the player image and audio source
                playerImg.src = songs[songIdx].song_img;
                audioPlayer.src = songs[songIdx].EmbedURL; // Set the audio source
                audioPlayer.play(); // Play the audio
                songName_in_controls.innerHTML = songs[songIdx].song_name;
                artistName_in_controls.innerHTML = songs[songIdx].artist_name;
                songImage_in_controls.src = songs[songIdx].song_img;

                playerBg.classList.remove('pbg');
                playerBg.classList.add('pbg2');
            }
        });
    });

    const songNames = document.querySelectorAll('.song_name');

    songNames.forEach((song) => {
        song.addEventListener('click', function () {
            const songIdx = this.dataset.index;
            if (songs[songIdx]) {
                playerImg.src = songs[songIdx].song_img;
                audioPlayer.src = songs[songIdx].EmbedURL; // Set the audio source
                audioPlayer.play(); // Play the audio
                songName_in_controls.innerHTML = songs[songIdx].song_name;
                artistName_in_controls.innerHTML = songs[songIdx].artist_name;
                songImage_in_controls.src = songs[songIdx].song_img;

                playerBg.classList.remove('pbg');
                playerBg.classList.add('pbg2');
            }
        });
    });
}

// Initial Click Event for Devotional Button
function togglePlaylist(element, playlistIndex) {
    element.addEventListener('click', function () {
        if (playListContainer.innerHTML.trim() === '') {
            renderList(playlists[playlistIndex].songs);
        } else {
            playListContainer.innerHTML = ''; // Clear the playlist
            playerImg.src = defaultPlayerImage; // Reset to default image when playlist is removed
            audioPlayer.pause(); // Pause the audio when clearing the playlist
            audioPlayer.src = ''; // Clear the audio source
        }
    });
}

togglePlaylist(Devotional, 0);

const pause = document.querySelector('.pauseBtn');
const play = document.querySelector('.playBtn');
const next = document.querySelector('.nextBtn');
const prev = document.querySelector('.prevBtn');

pause.addEventListener('click', function () {
    if (!audioPlayer.paused) {
        audioPlayer.pause(); // Pause the audio
        pause.style.display = 'none';
        play.style.display = 'block'; // Show play button
    }
});

play.addEventListener('click', function () {
    if (audioPlayer.paused) {
        audioPlayer.play(); // Play the audio
        play.style.display = 'none';
        pause.style.display = 'block'; // Show pause button
    }
});

next.addEventListener('click', function () {
    let currentPlaylist = -1;
    let currentSong = -1;

    // Fetch current song index
    //forEach => (value_of_curr_ele, idx_of_curr_ele)
    playlists.forEach((playlist, pIdx) => {
        playlist.songs.forEach((song, sIdx) => {
            if (song.EmbedURL === audioPlayer.src) {
                currentPlaylist = pIdx;
                currentSong = sIdx;
            }
        });
    });

    // If the song is not found
    if (currentPlaylist === -1 || currentSong === -1) {
        alert('Song not found in the playlist');
        return;
    }

    let playlistSongs = playlists[currentPlaylist].songs;
    let nextSong = playlistSongs[currentSong + 1];

    if (nextSong) {
        audioPlayer.src = nextSong.EmbedURL;
        audioPlayer.play();
        songName_in_controls.innerHTML = nextSong.song_name;
        artistName_in_controls.innerHTML = nextSong.artist_name;
        playerImg.src = nextSong.song_img;
    } else {
        alert("No more songs in the playlist !!");
    }
});

// Updating play/pause button visibility based on audio state
audioPlayer.addEventListener('play', function () {
    play.style.display = 'none';
    pause.style.display = 'block';
});

audioPlayer.addEventListener('pause', function () {
    play.style.display = 'block';
    pause.style.display = 'none';
});