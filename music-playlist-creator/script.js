const modal = document.getElementById("first-modal");
const span = document.querySelector(".close");
let likes = 0;

let songsArray = [];
let playlistArray = [];

function openModal(playlist) {
  document.getElementById("playlist-title").innerText = playlist.title;
  document.getElementById("playlist-owner").innerText = playlist.owner;
  document.getElementById("modal_img").src = playlist.playlist_art;

  let songsArray = playlist.songs;

  modal.style.display = "block";
  loadSongData(songsArray);

  const shuffleBtn = document.getElementById("shuffle-btn");
  const deleteBtn = document.getElementById("delete-btn");

  shuffleBtn.onclick = () => {
    shuffleArray(songsArray);
    loadSongData(songsArray);
  };

  deleteBtn.onclick = () => {
    const playlists = document.querySelectorAll(".card");
    console.log(playlist.owner);
    console;
    playlists.forEach((currPlaylist) => {
      const owner = playlist.owner;
      if (currPlaylist.innerText.includes(owner)) {
        currPlaylist.style.display = "none";
      }
    });

    deleteBtn.parentElement.parentElement.parentElement.parentElement.style.display =
      "none";

    // Add hide playlist logic
  };
}
//Close modal

if (span) {
  span.onclick = function () {
    modal.style.display = "none";
  };
}

window.onClick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

async function loadPlaylistData() {
  const playlists = document.querySelector(".playlist-cards");

  fetch("data/data.json")
    .then((response) => {
      return response.json();
    })

    .then((response) => {
      let returnString = response.reduce((accumulator, lmnt) => {
        return accumulator + makePlaylist(lmnt);
      }, "");
      playlists.innerHTML = returnString;
      const hearts = document.querySelectorAll(".fa-regular.fa-heart");
      hearts.forEach((heart) => {
        heart.addEventListener("click", toggleLike);
      });

      function toggleLike(event) {
        const heart = event.target;
        isLiked = 1 == likes;

        if (isLiked) {
          likes--;
          heart.style.color = "black";
        } else {
          likes++;
          heart.style.color = "red";
        }
        heart.innerText = " " + likes + " likes";
      }
    });
}

function makePlaylist(props) {
  return `<article
     
          class="card">
<img onClick='openModal({owner:"${props.playlist_author}", title:"${
    props.playlist_name
  }", songs:${JSON.stringify(props.songs)}, playlist_art:"${
    props.playlist_art
  }"})' class="card-img" src="${
    props.playlist_art
  }" />          <div class="card-content" width="150px">
            <h3>${props.playlist_name}</h3>
            <p>${props.playlist_author}</p>
            <div id="likes">
            <i id="heart" class="fa-regular fa-heart"> ${likes} Likes</i>
            </div>
          </div>
        </article>`;
}
window.addEventListener("DOMContentLoaded", async () => {
  if (span) {
    await loadPlaylistData();
  }
  const featured = await getRandomPlaylist();
  displayFeaturedPlaylist(featured);
});

function loadSongData(songList) {
  const songs = document.querySelector(".song-card");

  let songData = songList.reduce((accumulator, song) => {
    return accumulator + makeSongCard(song);
  }, "");

  songs.innerHTML = songData;
}

function makeSongCard(props) {
  return `
            <div id="song-card-container">
            <img id="song-img" src="${props.img}" />
              <div class="song-card-body">
                <h4 id="song-title">Title: ${props.title}</h4>
                <h4 id="artist">Artist: ${props.artist}</h4>
                <h4 id="album">Album: ${props.album}</h4>
              </div>

              <div id="time">
                <p>0:00 / ${props.duration}</p>
              </div>
            </div>`;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomPlaylist() {
  return fetch("data/data.json")
    .then((response) => {
      return response.json();
    })
    .then((playlists) => {
      const randomIndex = Math.floor(Math.random() * playlists.length);
      const randomPlaylist = playlists[randomIndex];
      return randomPlaylist;
    });
}

function displayFeaturedPlaylist(playlist) {
  document.getElementById("featured-img").src = `${playlist.playlist_art}`;
  document.getElementById("featured-name").textContent = playlist.playlist_name;
  document.getElementById(
    "featured-author"
  ).textContent = `By ${playlist.playlist_author}`;
  const songList = document.getElementById("featured-songs");
  songList.innerHTML = "";
  playlist.songs.forEach((song) => {
    const songCard = makeSongCard(song);
    songList.innerHTML += songCard;
  });
}

function createPlaylist() {}
