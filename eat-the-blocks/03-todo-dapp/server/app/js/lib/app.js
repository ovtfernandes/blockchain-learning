import Web3 from 'web3';
import TruffleContract from '@truffle/contract';

import artifact from '../../../../build/contracts/ToDo.json';

import { renderTasks } from './render';

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

        return new Promise((resolve, reject) => {
            Todo.at(address)
                .then((todo) => {
                    this.todo = todo;
                    resolve(todo);
                })
                .catch((error) => {
                    reject(error);
                });
        });  
    }

    init() {
        return new Promise((resolve, reject) => { 
            this.todo.getTask(0)
                .then((task) => { 
                    renderTasks(this.tasksElem, [task]);  
                }); 
        }); 
    }
}

export default App;
