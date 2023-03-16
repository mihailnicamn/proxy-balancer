# Proxy Load Balancer

What's my problem ? : => fount nothing js based that can handle multiple websocket servers like "haproxy" or "nginx" 

What is this ? the nearest solution i fount was the 7years old [upstream-proxy](https://github.com/nodexo/upstream-proxy) that can handle 1 endpoint per hostname, just added array and filtering to it (+ ssl support 👌)

proxy constructor :
```
{

config  = {}, /* same as setConfig ({
			name: 'localhost-websocket',
			hostnames: ['localhost'],
			endpoint: [{ host: '127.0.0.1', port: port1 },
					   {host: '127.0.0.1', port: port2 }]
			}) */
callbacks  = {}, /* custom functions for status codes, same as upstream-proxy */

ssl  = {}, /* same config as tls.createServer */

scale  =  'linear' /* 'linear' or 'random'(buggy👀) */

}
```

upstream balancing just add more endpoints to the config entry :
```
{

name: 'localhost-websocket',

hostnames: ['localhost'],

endpoint: [{ host: '127.0.0.1', port: port1 },{ host: '127.0.0.1', port: port2 }]

}
```
check the tests
forked from : [upstream-proxy](https://github.com/nodexo/upstream-proxy)

