var amqp = require('amqplib');
const email = {to: "valmir.php@gmail.com", body: "test msg", uuid: "54564654-45464"}
const headers = {
    'Content-Type':'application/json'
}
amqp.connect('amqp://localhost:5672')
    .then((conn)=> conn.createChannel())
    .then((ch)=> {
        setInterval(()=>{
            // primeiro parametro é o binding key
            ch.sendToQueue('fila', new Buffer(JSON.stringify(email)),{headers:headers})
            console.log('Enviando mensagem para a fila %s',new Date())
        },1000)
    })
