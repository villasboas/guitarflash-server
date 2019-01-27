const cli = require('./cli');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
  console.info('a user connected');
  socket.on('keypressed', data => {
    console.log(data);
  });
});

http.listen(3000, function(){
  cli.info('listening on *:3000');
});

// End of file
