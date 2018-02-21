(function () {

    var todoItem = {
        templateUrl: '/js/components/item.component.html'
    };

    angular.module('todoApp')
        .component('todoItem', todoItem);

})();
