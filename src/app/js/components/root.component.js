(function () {

    var appRoor = {
        templateUrl: '/js/components/root.component.html',
        controller: RootController,
        bindings: {
            todos: "="
        }
    };

    RootController.$inject = ['socketStore','eventBus','$routeParams','$route'];
    function RootController(localStore, eventBus, $routeParams, $route) {

        console.log($route.current.scope.$resolve.todos);
        
        var vm = this;

        vm.filteredTodos = [];
        var filter = $routeParams.state || 'all';

        this.$onInit = function() {
            vm.filteredTodos = vm.todos.filter(function (t){
                if (filter === 'all') {
                    return true;
                } else {
                    return t.done === (filter === 'completed');
                }
            });
        }
        
        eventBus.subscribe('todo.deleted', function(id) {

            var ix = vm.todos.findIndex(function(t) { return t.id == id});
            vm.todos.splice(ix,1);

        });

        eventBus.subscribe('todo.updated', function(todo) {

            var ix = vm.todos.findIndex(function(t) { return t.id == todo.id});
            vm.todos[ix] = todo;

        });

        eventBus.subscribe('todo.created', function(todo) {

            vm.todos.push(todo);

        });

        eventBus.subscribe('store.create', function(txt) {

            localStore.create(txt);

        });

        eventBus.subscribe('store.delete', function(todo) {

            localStore.remove(todo.id);
            
        });

        eventBus.subscribe('store.update', function(todo) {

            localStore.update(todo);
        });

        eventBus.subscribe('store.removeCompleted', function(todo) {

            localStore.removeCompleted();
        });
    };

    angular.module('todoApp')
        .component('appRoot', appRoor);

})();
