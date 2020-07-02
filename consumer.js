var amqp = require('amqplib');
amqp.connect('amqp://localhost:5672')
    .then((conn)=> conn.createChannel())
    .then((ch)=> {
            // Define a quantidade de informações o meu consumidor pode buscar por vez
            ch.prefetch(1)
            // PEga tudo que está na fila e consome
            setInterval(()=>{
                ch.consume('fila',(msg)=>{
                    console.log('%s mensagem recebida',new Date ,msg.content.toString())
                    // Devolver resposta para o servidor que a msg foi recebida e pode tirar ela da fila
                    ch.ack(msg)
                    // Devolve resposta dizendo que algo deu errado, devolvendo para a fila
                    // ch.nack(msg)
                })
            },3000)
    })
