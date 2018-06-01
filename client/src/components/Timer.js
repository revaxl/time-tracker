import React, { Component } from 'react';
import axios from 'axios';
import secondsToTime from '../utils/timeFormatter';
class Timer extends Component {
	constructor(props) {
    super(props);
    this.state = { 
      count: 0,
      timerStatus: 'stopped',
      title: "",
      description: "",
      duration: ""
    };
  }
  
  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = undefined;
  }

  startTimer()  {
    console.log('timer on');
    this.timer = setInterval(() => {
      var newCount = this.state.count + 1;
      this.setState({
        count: newCount,
        timerStatus: 'started'
      });
    }, 1000);
  }

  stopTimer() {
    console.log('timer off');
    clearInterval(this.timer);
    this.setState({
      timerStatus: 'stopped'
    });
  }

  resetTimer() {
    console.log('timer reset');
    clearInterval(this.timer);
    this.setState({
      count: 0,
      timerStatus: 'stopped'
    });
  }

  
  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    });
  }

  handleDurationChange(e) {
    this.setState({
      duration: e.target.value
    });
  }

  bookTask(e) {
    e.preventDefault();
    let new_duration;
    this.state.duration === "" ? new_duration = this.state.count : new_duration = this.state.duration
    
    axios.post('/tasks', 
      {
        title: this.state.title,
        description: this.state.description,
        duration: new_duration
      })
      .then(response => {
				this.setState({
					count: 0,
					title: "",
					description: "",
					timerStatus: 'stopped'
				});
			})
      .catch(error => console.log(error));
	}
	render() {
		let button;
    let formattedTime = secondsToTime(this.state.count);
    if (this.state.timerStatus === 'started') 
      button = <button 
                className="btn btn-warning" 
                onClick={this.stopTimer.bind(this)} > Pause </button>
    else 
      button = <button 
                className="btn btn-success"
                onClick={this.startTimer.bind(this)} > Start </button>
            
    return (
			<div className="container">
        <div>
          <h1>{formattedTime.h}:{formattedTime.m}:{formattedTime.s}</h1>
        </div>
        <div>
          {button}
          <button 
            className="btn btn-info" 
            onClick={this.resetTimer.bind(this)} > Reset </button>
          </div>
          <form onSubmit={this.bookTask.bind(this)}>
          <div className="form-group">
            <label htmlFor="name"> name of the task </label>
            <input 
            type="text"
            value={this.state.title}
            id="title"
            className="form-control"
            onChange={this.handleTitleChange.bind(this)} />
          </div>
          <div className="form-group">
            <label htmlFor="description" > description </label>
            <textarea
            type="text"
            value={this.state.description}
            id="description"
            className="form-control"
            onChange={this.handleDescriptionChange.bind(this)} > </textarea>
          </div>
          <div className="form-group">
            <label htmlFor="duration" > 
            duration (optional: only fill this if you want to save the 
            task and you didn't start the timer before) 
            </label>
            <input
            type="text"
            value={this.state.duration}
            id="duration"
            placeholder="duration in seconds"
            className="form-control"
            onChange={this.handleDurationChange.bind(this)} />
          </div>  
            <input type="submit" className="btn btn-success" value="save" />
          </form>
			</div>
		);
	}
}

export default Timer;
