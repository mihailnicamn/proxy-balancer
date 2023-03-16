const ports = [
    8080,
    8081,
    8082,
    8083,
    8084,
    8085,
    8086,
    8087,
    8088,
    8089,
    8090,
]
const workers = [];
ports.map(port => {
    workers.push(require('child_process').fork(__dirname + '/worker.js', [port]))
});

const upstreamProxy = require('..');

const proxy = new upstreamProxy({
    scale : 'random',
});

proxy.listen(80);
const config = [{
    name: 'localhost-websocket',
    hostnames: ['localhost'],
    endpoint: ports.map((port) => ({ host: '127.0.0.1', port: port })),
}];
proxy.setConfig(config);
proxy.start();


process.on('SIGINT', () => {
    workers.map((worker) => worker.kill());
    process.exit(0);
});
process.on('exit', () => {
    workers.map((worker) => worker.kill());
    process.exit(0);
});
process.on('SIGTERM', () => {
    workers.map((worker) => worker.kill());
    process.exit(0);
});
process.on('uncaughtException', (err) => {
    console.error(err);
});
process.on('unhandledRejection', (err) => {
    console.error(err);
});