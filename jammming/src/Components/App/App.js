import React from 'react';
import './App.css'
import SearchBar from './../SearchBar/SearchBar.js';
import SearchResults from './../SearchResults/SearchResults.js';
import Playlist from './../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "Alex",
      playlistTracks:
      [],
      test: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
       let tracks = this.state.playlistTracks;
       if (tracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
       }
       tracks.push(track);
       this.setState({playlistTracks: tracks});
  }

  removeTrack(track) {
      let tracks = this.state.playlistTracks;
      let index = tracks.findIndex(savedTrack => savedTrack.id === track.id);
      tracks.splice(index, 1)
      this.setState({playlistTracks: tracks});
      return;
  }

  updatePlaylistName(newPlaylistName) {
    this.setState({
      playlistName: newPlaylistName
    })
  }

  savePlaylist() {
    let tracks = this.state.playlistTracks.map(tracks => {
      return tracks.uri
    })
    Spotify.savePlaylist(this.state.playlistName, tracks);
  }

  search(term) {
    Spotify.search(term).then((tracks)=>{
      this.setState({searchResults : tracks})
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
