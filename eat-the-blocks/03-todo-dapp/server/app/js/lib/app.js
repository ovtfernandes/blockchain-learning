import Web3 from 'web3';
import TruffleContract from '@truffle/contract';

import artifact from '../../../../build/contracts/ToDo.json';

import { renderTasks } from './render';
import { getAccount, getTasks } from './actions';

class App {
    setup() {
        const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));

        const Todo = TruffleContract(artifact);
        Todo.setProvider(web3.currentProvider);

        const networks = Object.keys(artifact.networks);
        const network = networks[networks.length - 1];
        const address = artifact.networks[network].address;

        this.web3 = web3;
        this.address = address;
        this.Todo = Todo;
        this.tasksElem = document.getElementById('tasks');
        this.newTaskForm = document.getElementById('new-task');
        this.taskContentInput = document.getElementById('task-content');
        this.taskAuthorInput = document.getElementById('task-author');

        return new Promise((resolve, reject) => {
            getAccount(this.web3)
                .then((account) => {
                    this.account = account;
                    return Todo.at(address);
                })
                .then((todo) => {
                    this.todo = todo;
                    resolve(todo);
                })
                .catch((error) => {
                    reject(error);
                });
        });  
    }

    getAndRenderTasks() {
        return getTasks(this.todo)
            .then((tasks) => { 
                renderTasks(this.tasksElem, tasks);  
            }); 
    }

    init() {
        this.newTaskForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.todo.createTask(
                this.taskContentInput.value,
                this.taskAuthorInput.value,
                { from: this.account, gas: 1000000 },
            )
                .then(() => {
                    this.taskContentInput.value = '';
                    this.taskAuthorInput.value = '';
                    this.getAndRenderTasks();
                });
        });

        this.tasksElem.addEventListener('click', (event) => {
            if(event.target.tagName.toLowerCase() === 'input') {
                const [,id] = event.target.id.split('-');
                this.todo.toggleDone(id, { from: this.account, gas: 1000000 })
                    .then(() => {
                        this.getAndRenderTasks();
                    });
            }
        });
        
        return this.getAndRenderTasks();
    }
}

export default App;
