(function () {

    var todoList = {
        templateUrl: '/js/components/list.component.html',
        bindings: {
            "todos": "<"
        }
    };

    angular.module('todoApp')
        .component('todoList', todoList);

})();
