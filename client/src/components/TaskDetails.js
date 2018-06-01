import React from 'react';
import Moment from 'react-moment'
import secondsToTime from '../utils/timeFormatter';

const TaskDetail = (props) => {
	const formattedTime = secondsToTime(props.tsk.duration)
		return (
			<div className="alert alert-success" role="alert">
				<h3> {props.tsk.title} 
					<small className="float-right" > 
						duration: {formattedTime.h}:{formattedTime.m}:{formattedTime.s}
					</small>
				</h3>
				finished: <Moment date={props.tsk.created} />
				<p> {props.tsk.description} </p>
			</div>
		)
}

export default TaskDetail;
