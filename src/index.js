import React from "react";
import { render } from "react-dom";
// import Hello from "./Hello";
import AddTodo from "./addTodo";
import Search from "./search";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class ToDoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      todoList: [
        { text: "walk dog", completed: false },
        { text: "walk cat", completed: true },
        { text: "talk bird", completed: false }
      ],
      filter: "ALL"
    };
    this.addButtonClick = this.addButtonClick.bind(this);
  }

  addButtonClick(todo) {
    this.setState({
      todoList: [...this.state.todoList, { text: todo, completed: false }]
    });
  }

  completeCheck = todoitem => {
    if (todoitem.completed === true) {
      return {
        textDecorationLine: "line-through"
      };
    } else {
      return {
        textDecorationLine: "none"
        // fontWeight: "bold"
      };
    }
  };

  listClickHandler = index => {
    //I needed to use inner function not to invoke function immediately
    //and also needed to copy the todoList array to change the inner data
    return () => {
      const newTodoList = this.state.todoList.slice();
      newTodoList[index].completed = !this.state.todoList[index].completed;

      this.setState({
        todoList: newTodoList
      });
    };
  };

  deleteHandler = () => {
    this.setState({
      todoList: this.state.todoList.filter(item => {
        return item.completed === false;
      })
    });
  };

  filterTodo = input => {
    return () => {
      this.setState({
        filter: input
      });
    };
  };

  render() {
    const filteredList = this.state.todoList.slice().filter(item => {
      if (this.state.filter === "ALL") {
        return item;
      } else if (this.state.filter === "COMPLETED") {
        return item.completed === true;
      } else if (this.state.filter === "ONGOING") {
        return item.completed === false;
      }
    });

    return (
      <div style={styles}>
        <h3>ToDo List</h3>
        <div>
          <button onClick={this.filterTodo("ALL")}>All</button>
          <button onClick={this.filterTodo("COMPLETED")}>Completed</button>
          <button onClick={this.filterTodo("ONGOING")}>Ongoing</button>
        </div>

        <AddTodo addButtonClick={this.addButtonClick} />
        <button onClick={this.deleteHandler}>delete todo</button>

        {filteredList.map((item, index) => {
          return (
            <li
              key={index}
              onClick={this.listClickHandler(index)}
              style={this.completeCheck(item)}
            >
              {item.text}
            </li>
          );
        })}

        <Search list={this.state.todoList} />
      </div>
    );
  }
}

render(<ToDoList />, document.getElementById("root"));
