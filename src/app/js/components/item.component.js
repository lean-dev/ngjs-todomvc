(function () {

    var todoItem = {
        templateUrl: '/js/components/item.component.html',
        bindings: {
            todo: '<'
        }
    };

    angular.module('todoApp')
        .component('todoItem', todoItem);

})();
