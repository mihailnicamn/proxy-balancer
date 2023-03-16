const server = require('ws').Server;
const port = parseInt(process.argv[2]);
console.log(`Starting server on port ${port}`);
const wss = new server({ port });
let connections = [];
wss.on('connection', (ws) => {
    console.log(`New connection on port ${port}`);
    connections.push(ws);
    ws.on('close', () => {
        console.log(`Connection closed on port ${port}`);
        connections = connections.filter((connection) => connection !== ws);
    });
});

setInterval(() => connections.map((ws) => ws.send(`Ping from process.pid(${process.pid}) & port(${port})`)), 1000);

process.on('exit', () => console.log(`Worker process.pid(${process.pid}) & port(${port}) is exiting`));
process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));
process.on('uncaughtException', (err) => {
    console.error(err);
});
process.on('unhandledRejection', (err) => {
    console.error(err);
});
