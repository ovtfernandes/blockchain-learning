// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract ToDo {
  struct Task {
    uint id;
    uint date;
    string content;
    string author;
    bool done;
  }

  Task[] tasks;

  function createTask(string memory _content, string memory _author) public {
    tasks.push(Task(tasks.length, now, _content, _author, false));
  }

  function getTask(uint _id) public view
    returns (
      uint,
      uint,
      string memory,
      string memory,
      bool
    )
  {
    Task memory t = tasks[_id];

    return (
      _id,
      t.date,
      t.content,
      t.author,
      t.done
    );
  }

  function getTasks() public view returns (Task[] memory) {
    return tasks;
  }
}
