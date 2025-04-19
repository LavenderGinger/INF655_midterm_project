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
      const name = task.taskName || "";
      return name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
    });

    if (this.state.isSorted) {
      filteredTasks = [...filteredTasks].sort((a, b) => {
        const aName = a.taskName || "";
        const bName = b.taskName || "";
        return aName.localeCompare(bName);
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
          {this.state.isSorted ? "Unsort" : "Sort by Name"}
        </button>
        <ul>
          {filteredTasks.length === 0 ? (
            <li>No tasks yet!</li>
        ) : (
            filteredTasks.map((task, index) => (
              <li key={task.id ?? index}>
                <strong>{task.taskName}</strong>
                {task.taskDescription && <>: {task.taskDescription}</>}
                {task.id && (
                  <button onClick={() => onDeleteTask(task.id)}>DELETE!</button>
                )}
              </li>
            ))
          )} 
        </ul>
      </div>
    );
  }
}

export default Task;