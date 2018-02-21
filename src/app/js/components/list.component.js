(function () {

    var todoList = {
        templateUrl: '/js/components/list.component.html'
    };

    angular.module('todoApp')
        .component('todoList', todoList);

})();
