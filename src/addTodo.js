import React, { Component } from "react";

class AddTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };

    this.inputHandler = this.inputHandler.bind(this);
    this.addButtonClick = this.addButtonClick.bind(this);
  }

  inputHandler(event) {
    this.setState({
      input: event.target.value
    });
  }

  addButtonClick() {
    if (this.state.input === "") {
      return false;
    }

    this.props.addButtonClick(this.state.input);

    this.setState(
      {
        input: ""
      },
      () => {
        this.inputNode.focus();
      }
    );
  }

  render() {
    return (
      <div>
        <input
          ref={node => {
            this.inputNode = node;
          }}
          onChange={this.inputHandler}
          value={this.state.input}
        />

        <div>
          <button onClick={this.addButtonClick}>add todo</button>
        </div>
      </div>
    );
  }
}

export default AddTodo;
