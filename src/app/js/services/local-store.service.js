(function () {

    function LocalStore(storeImplementation, $q, eventBus) {
        
        if ( storeImplementation.getItem('nextId') === null || storeImplementation.getItem('todos') === null) {
            storeImplementation.clear();

            storeImplementation.nextId = 1;
            storeImplementation.todos = '[]';
        }

        var todos; 

        this.getAll = function(){
            return $q(function (resolve, reject) {
                todos = JSON.parse(storeImplementation.todos);
                resolve(todos.slice());
            });
        };

        this.create = function(txt){
                
            var nextId = JSON.parse(storeImplementation.nextId);
            var todo = { id: nextId++, txt: txt, done: false };

            todos.push(todo);

            storeImplementation.nextId = nextId;
            storeImplementation.todos = JSON.stringify(todos);

            eventBus.publishSync('todo.created', todo);

        };
        this.update = function(todo){
                
            // TODO: load todos, exchange update todo and store back
            var ix = todos.findIndex(function(t) { return t.id === todo.id; });
            todos[ix] = todo;

            storeImplementation.todos = JSON.stringify(todos);
        };
        this.remove = function(id){
               
                var ix = -1;
                todos.forEach(function(t,currentIx) {
                    if( t.id === id ) {
                        ix = currentIx;
                    }
                });

                if (ix !== -1) {
                    todos.splice(ix,1);
                    storeImplementation.todos = JSON.stringify(todos);

                    eventBus.publishSync('todo.deleted', id);
                };

        };

        this.removeCompleted = function() {
            var store = this;
            var doneItems = todos.filter(function (t) { return t.done === true});
            doneItems.forEach(function (t) {
                store.remove(t.id);
            });
        }
    };

    angular.module('todoApp')
        .service('localStore', LocalStore)
        .value('storeImplementation', localStorage);
        
})();