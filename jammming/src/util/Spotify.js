let accessToken;
let expirationTime;
let clientId = "b94ca64663704b07b556d263c24a5b33";
let secret = "ea3fe0f08702431dae8a2d0cec0d6492";
let scope = "playlist-modify-public"
let uri = "http://myspotifyreactapp.surge.sh/";

const Spotify = {
  assignToken() {
    accessToken = window.location.href.match(/access_token=([^&]*)/);
    accessToken = accessToken[1];
    expirationTime = window.location.href.match(/expires_in=([^&]*)/);
    expirationTime = expirationTime[1];
  },

  getAccessToken() {
    if(accessToken === undefined) {
      if(!window.location.href.match(/access_token=([^&]*)/)) {
        window.location.assign(`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${uri}&response_type=token`);
      }
      Spotify.assignToken();
    }
    window.setTimeout(() => accessToken = '', expirationTime * 1000);
    window.history.pushState('Access Token', null, '/');
  },

  search(term) {
    Spotify.getAccessToken();
    return new Promise(resolve => {
       resolve(
         fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
           headers: {Authorization: "Bearer " + accessToken}
         }).then(response => {
              return response.json();
         }).then( jsonResponse => {
              if(jsonResponse.tracks.items) {
                  return jsonResponse.tracks.items.map(track => ({
                      id: track.id,
                      name: track.name,
                      artist: track.artists[0].name,
                      album: track.album.name,
                      uri: track.uri
                 }));
             }
        }));
     })
  },

  savePlaylist(playlistName, trackURIs) {
    let userId = "";
    let playListId ="";

    return new Promise(resolve => {
       resolve(
           fetch(`https://api.spotify.com/v1/me`, {
           headers: {Authorization: "Bearer " + accessToken}
            }).then(response => {
                return response.json();
            }).then(jsonResponse => {
                userId = jsonResponse.id;
                return userId;
            }).then(() => {
              fetch("https://api.spotify.com/v1/users/" + userId +  "/playlists", {
                headers: {
                  Authorization: "Bearer " + accessToken,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({name: `${playlistName}`}),
                method: 'POST'
              }).then(response => {
                 return response.json();
              }).then(jsonResponse => {
                 playListId = jsonResponse.id;
                 return playListId;
              }).then(() => {
                  fetch("https://api.spotify.com/v1/users/" + userId + "/playlists/" + playListId + "/tracks" , {
                    headers: {
                      Authorization: "Bearer " + accessToken,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({"uris": trackURIs}),
                    method: 'POST'
                  }).then(response => {
                      return response.json();
                  })
               })
            }));
        })
    }
}

export default Spotify;
