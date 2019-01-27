const cli = require('./cli');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const robot = require("kbm-robot");
robot.startJar();

const keys = {
  'green': 'a',
  'red': 's',
  'yellow': 'j',
  'blue': 'k',
  'orange': 'l'
}

io.on('connection', function(socket){
  console.log('Conta acessada.');
  socket.on('keypressed', dados => {
    let data = dados.data;
    console.log(data);
    if ( data['type'] == 'start' ) {
      console.log(keys[data['key']]);
      robot.press(keys[data['key']]).go();
    }
    if ( data['type'] == 'end' ) {
      console.log(keys[data['key']]);
      robot.release(keys[data['key']]).go();
    }
  });
});

http.listen(3000, function(){
  cli.info('listening on *:3000');
});

// End of file
