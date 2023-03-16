
const connect = () => {
    const ws = new (require('ws'))('ws://localhost');
    ws.on('open', () => {
        console.log('Connected');
    });
    ws.on('message', (data) => {
        console.log(data);
    });
    setTimeout(() => {
        ws.close();
    }, 1000);
}

setInterval(() => connect() , 1000);
