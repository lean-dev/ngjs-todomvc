(function () {

    function SocketStore(eventBus, $q, $log,$rootScope) {
        
        var socket = io('http://localhost:9001');

        var getAllPromise = $q.defer();

        socket.on('getAllResponse', function(data) {
            getAllPromise.resolve(data);
        })
      
        socket.on('createResponse', function(data) {
            
            $rootScope.$apply(function() {
                eventBus.publishSync('todo.created', data);
            });

        });

        socket.on('updateResponse', function(todo) {
            
            $rootScope.$apply(function() {
                eventBus.publishSync('todo.updated', todo);
            });

        })
      
        var todos; 

        this.getAll = function(){
            
            socket.emit('getAll');
            return getAllPromise.promise;   
        };

        this.create = function(txt){
                
            var todo = { txt: txt, done: false };
            socket.emit('create', todo);
        };
        this.update = function(todo){
                
            socket.emit('update', todo);

        };
        this.remove = function(id){

            //ws.send({action: 'update', payload: id});
            
            // eventBus.publishSync('todo.deleted', id);
     
        };

        this.removeCompleted = function() {

           
        }
    };

    angular.module('todoApp')
        .service('socketStore', SocketStore);
        
})();
