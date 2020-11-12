import App from './lib/app';

const app = new App(); 
app.setup()
    .then(() => { 
        return app.init(); 
    }) 
    .then(() => { 
        console.log('ETB ToDo List Dapp loaded!'); 
    }) 
    .catch((error) => {
        console.error(`Ooops... something went wrong: ${error}`);
    });
