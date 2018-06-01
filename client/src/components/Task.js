import React, { Component } from 'react';
import axios from 'axios';
import TaskDetail from './TaskDetails'

class Task extends Component {
	constructor() {
		super();
		this.state = {
			tasks: [],
			value: "",
			currentPage: 1,
      tasksPerPage: 3
		}
	}

	getAllTasks() {
		axios.get('/tasks')
		.then(response => {
			this.setState({tasks: response.data.tasks});
		})
		.catch(error => console.log(error));
	}

	componentDidMount() {
		this.getAllTasks();
	}

	handleClick(event) {
		this.setState({
			currentPage: Number(event.target.id)
		});
	}

	handleChange(e) {
		this.setState({
			value: e.target.value
		});
	}

	handleSearch(e) {
		e.preventDefault();
		if (this.state.value === "")
			return
		axios.get(`/tasks/${this.state.value}`)
			.then(response => this.setState({tasks: response.data.tasks}))
			.catch(error => console.log(error));
	}

	resetFilter() {
		this.setState({
			value: ""
		})
		this.getAllTasks();
	}
	render() {
		if (this.state.tasks.length > 0) {
			const {tasks, currentPage, tasksPerPage } = this.state;
			const indexOfLastTask = currentPage * tasksPerPage;
      const indexOfFirstTask = indexOfLastTask - tasksPerPage;
			const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
			
			const taskdetails = currentTasks.map(task => {
				return <TaskDetail key={task._id} tsk={task} />
			})

			const pageNumbers = [];
			for (let i = 1; i <= Math.ceil(tasks.length / tasksPerPage); i++) {
				pageNumbers.push(i);
			}
			const renderPageNumbers = pageNumbers.map(number => {
				return (
					<li className="page-item page-link"
						key={number}
						id={number}
						onClick={this.handleClick.bind(this)}
					>
						{number}
					</li>
				);
			});
			return (
				<div className="container">
					<div>
						<form method="get" className="form-inline" onSubmit={this.handleSearch.bind(this)}>
							<label htmlFor="query"> search </label>
							<input type="text" 
								className="form-control" 
								id="query" 
								name="query" 
								value={this.state.value} 
								onChange={this.handleChange.bind(this)} />
							<input type="submit" className="btn btn-primary" value="find" />
							<button className="btn btn-warning" onClick={this.resetFilter.bind(this)}>
							reset filter
							</button>
						</form>
					</div>
					<div >
						{ taskdetails }
					</div>
					<ul id="page-numbers" className="pagination">
              {renderPageNumbers}
            </ul>
				</div>
			)
		} else {
			return (
				<p> loading </p>
			)
		}
	}
}

export default Task;
