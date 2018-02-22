(function () {

    var todoInput = {
        templateUrl: '/js/components/input.component.html',
        controller: InputController
    };

    function InputController(eventBus) {
        
        var vm = this;

        vm.txt = "";

        vm.create = function() {
            if (vm.txt.length > 0) {
                eventBus.publishSync('store.create', vm.txt);
            }
            vm.txt = "";
        };
    }

    angular.module('todoApp')
        .component('todoInput', todoInput);

})();
