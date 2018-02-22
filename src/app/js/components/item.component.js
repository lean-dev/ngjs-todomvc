(function () {

    var todoItem = {
        templateUrl: '/js/components/item.component.html',
        bindings: {
            todo: '<'
        },
        controller: ItemController
    };

    function ItemController(eventBus) {
        var vm = this;

        vm.remove = function() {
            eventBus.publishSync('store.delete', vm.todo );
        }

        vm.update = function() {
            eventBus.publishSync('store.update', vm.todo);
        }
    }

    angular.module('todoApp')
        .component('todoItem', todoItem);

})();
