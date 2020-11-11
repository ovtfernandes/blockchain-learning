import { formatDate } from './utils'; 

const renderTasks = (tasksElem, tasks = []) => {
    if(tasks.length == 0) {
        tasksElem.innerHTML = '<tr><td scope="row">No task created yet...</td></tr>';
        return;
    }
    const html = tasks.map((task) => {
        return(`<tr>
            <td>${task[0]}</td>
            <td>${formatDate(task[1])}</td>
            <td>${task[2]}</td>
            <td>${task[3]}</td>
            <td>${task[4]}</td>
        </tr>`);
    });
    tasksElem.innerHTML += html.join('');
};
  
export {
    renderTasks
};
