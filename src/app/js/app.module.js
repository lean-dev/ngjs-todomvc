
angular.module('todoApp',['ui.router']);

document.addEventListener("DOMContentLoaded", function(event) {
    angular.bootstrap(document.body,['todoApp'], { strictDi: true });
});

