// Dependencias
const express = require('express');
const app = express();
const Redis = require('ioredis');

// Configuración REDIS
var redis_subscribers = {};

app.get('/', (request, response) => {

    var message;
    const redis_client = new Redis({
        host: "cluster-redis-tecguru.nbyqmz.0001.use2.cache.amazonaws.com", // Cambiar a tu direccion redis
        port: "6379",
        // username: "",
        password: "auth"
    });

    redis_client.set("foo", "bar");

    redis_client.get("foo").then(function (result) {
        message = result;
    }).catch(error => {
        message = error;
    });

    return response.status(200).send({ response: "All good!", result: message })
})


app.listen(3000, () => {
    console.log('Server running on port 3000')
})

module.exports = app;