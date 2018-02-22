(function () {

    var todoActions = {
        templateUrl: '/js/components/actions.component.html',
        bindings: {
            todos: "<"
        },
        controller: ActionsController
    };

    function ActionsController(eventBus, $routeParams) {

       

        var vm = this;
        vm.filter = $routeParams.state || 'all';
        
        Object.defineProperty(vm,'remainingCount', {
            enumerable: true,
            configurable: true,
            get: function() {
                return vm.todos.reduce( function (count, todo) {
                    if (!todo.done) {
                        ++count;
                    } 
                    return count;
                }, 0)
            }
        });

        Object.defineProperty(vm,'hasDoneItems', {
            enumerable: true,
            configurable: true,
            get: function() {
                return vm.remainingCount < vm.todos.length;
            }
        });

        vm.removeCompleted = function() {
            eventBus.publishSync('store.removeCompleted');
            
        };
    }

    angular.module('todoApp')
        .component('todoActions', todoActions);

})();
