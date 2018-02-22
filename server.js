var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(9001);

function handler (req, res) {
    fs.readFile(__dirname + '/.tmp/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
  
      res.writeHead(200);
      res.end(data);
    });
  }

  var lastId =1;
var todos = [ {id: 1, txt: 'Et voila!', done: false }];

io.on('connection', function (socket) {
    console.log('Client connected ...');

  socket.on('getAll', function (data) {
    socket.emit('getAllResponse', todos);
  });

  socket.on('create', function (todo) {
    todo.id = ++lastId;
    todos.push(todo);
    io.sockets.emit('createResponse', todo);
  });

  socket.on('update', function (todo) {
    
    var ix = todos.findIndex(function(t) { return t.id === todo.id; });
    todos[ix] = todo;

    io.sockets.emit('updateResponse', todo);
  });

});