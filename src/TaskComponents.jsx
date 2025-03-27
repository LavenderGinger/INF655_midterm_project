import React from "react";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      isSorted: false,
    };
  }

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  sortTasks = () => {
    this.setState((prevState) => ({
      isSorted: !prevState.isSorted,
    }));
  };

  render() {
    const { tasks, onDeleteTask } = this.props;
    let filteredTasks = tasks.filter((task) => {
      const taskString = typeof task === 'string' ? task : task.name || '';
      return taskString.toLowerCase().includes(this.state.searchTerm.toLowerCase());
    });

    if (this.state.isSorted) {
      filteredTasks = [...filteredTasks].sort((a, b) => {
        const aString = typeof a === 'string' ? a : a.name || '';
        const bString = typeof b === 'string' ? b : b.name || '';
        return aString.localeCompare(bString);
      });
    }

    return (
      <div>
        <h1>Task List</h1>
        <input
          type="text"
          placeholder="Search Tasks"
          value={this.state.searchTerm}
          onChange={this.handleSearch}
        />
        <button onClick={this.sortTasks}>
          {this.state.isSorted ? "Unsort" : "Sort by the Name"}
        </button>
        <ul>
          {filteredTasks.map((task, index) => (
            <li key={index}>
              {typeof task === 'string' ? task : task.name} 
              <button onClick={() => onDeleteTask(index)}>DELETE!</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Task;