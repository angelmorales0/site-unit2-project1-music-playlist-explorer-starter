const modal = document.getElementById("first-modal")
const span = document.querySelector('.close')


function openModal(playlist) {
   document.getElementById('playlist-title').innerText = playlist.title;
   document.getElementById('playlist-owner').innerText= playlist.owner;
    // NEED TO PUPULATE MODAL HTML FIRST
    
   modal.style.display = "block";
   console.log(playlist)
   loadSongData(playlist.songs)

}
//Close modal 

 span.onclick = function(){
    modal.style.display = "none"
}

window.onClick = function(event){
    if (event.target == modal){
        modal.style.display="none"
    }
}


function loadPlaylistData(){
     const playlists = document.querySelector(".playlist-cards");
    
    fetch('data/data.json')
    .then((response) => {
     
        return response.json()} ) 
        
    .then ( response =>{
        let returnString = response.reduce((accumulator, lmnt) =>{
            return accumulator + makePlaylist(lmnt)    
        }, "");
        playlists.innerHTML =returnString
    } )
    
}

function makePlaylist(props){
    console.log(`${JSON.stringify(props.songs)}`)
    //CURRENT GOAL -> GET THESE PLAYLIST CARDS TO BE CREATED ON DEMAND BY JSON 
    return `<article
          onClick='openModal({owner:"${props.playlist_author}", title:"${props.playlist_name}",songs:${JSON.stringify(props.songs)}})'
          class="card">
          <img class="card-img" src="assets/img/playlist.png" />
          <div class="card-content" width="150px">
            <h3>${props.playlist_name}</h3>
            <p>${props.playlist_author}</p>
            <div id="likes">
            <i id="heart" class="fa-regular fa-heart"> Likes</i>
            </div>
          </div>
        </article>`
}
window.addEventListener('DOMContentLoaded', () =>{
    loadPlaylistData()
});

function loadSongData(songList){ // WHY IS IT A STRING 
    const songs = document.querySelector(".song-card")
    console.log(songList)

    let songData = songList.reduce((accumulator, song) =>{
        return accumulator + makeSongCard(song)
    },"")

    songs.innerHTML= songData

}



function makeSongCard(props){
    console.log(props)
    return `<img id="song-img" src="assets/img/song.png" />

            <div id="song-card-container">
              <div class="song-card-body">
                <h4 id="song-title">${props.title}</h4>
                <h4 id="artist">${props.artist}</h4>
                <h4 id="album">${props.album}</h4>
              </div>

              <div id="time">
                <p>0:00 / ${props.duration}</p>
              </div>
            </div>`
}

/**
 * TODOS 
 * Make row gap black to seperate songs within the playlists
 */