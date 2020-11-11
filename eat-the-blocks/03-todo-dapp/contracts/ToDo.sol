// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract ToDo {
  struct Task {
    uint id;
    uint date;
    string content;
    string author;
    bool done;
  }

  uint lastTaskId;
  mapping(uint => Task) tasks;

  event TaskCreated(uint, uint, string, string, bool);

  constructor() public {
    lastTaskId = 0;
  }

  function createTask(string memory _content, string memory _author) public {
    uint date = now;
    tasks[lastTaskId] = Task(lastTaskId, date, _content, _author, false);
    emit TaskCreated(lastTaskId, date, _content, _author, false);
    lastTaskId++;
  }

  function getTasksLength() public view returns (uint) {
    return lastTaskId;
  }

  function getTask(uint _id) public view taskExists(_id)
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

  modifier taskExists(uint _id) {
    if (_id >= lastTaskId) {
      revert();
    }
    _;
  }
}
