import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.renderAction = this.renderAction.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction(track) {
    if(this.props.isRemoval) {
        return (<a onClick={this.addTrack} className="Track-action">+</a>)
      } else {
        return (<a onClick={this.removeTrack} className="Track-action">-</a>)
      }
  }

  removeTrack(track) {
    {this.props.onRemove(this.props.track)}
  }

  addTrack(track) {
    {this.props.onAdd(this.props.track)}
  }

  render() {
    return (
    <div className="Track">
        <div className="Track-information">
        <h3 onClick={this.renderAction}>{this.props.track.name}</h3>
        <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action">{this.renderAction()}</a>
    </div>
  )}
}

export default Track;
