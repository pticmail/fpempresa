"use strict";
app.config(['crudRoutesProvider', function(crudRoutesProvider) {
        crudRoutesProvider.addAllRoutes({
            entity:"Centro",
            expand:"direccion.municipio,direccion.municipio.provincia"
        });
    }]);

app.controller("CentroSearchController", ['$scope', 'genericControllerCrudList','controllerParams', function($scope, genericControllerCrudList,controllerParams) {
        genericControllerCrudList.extendScope($scope, controllerParams);      
        $scope.page.pageSize=10;
        
        $scope.filter={
            idCentro__NE__:-1
        };
        
        $scope.search();
    }]);


app.controller("CentroNewEditController", ['$scope', 'genericControllerCrudDetail', 'controllerParams','repositoryFactory', function($scope, genericControllerCrudDetail, controllerParams,repositoryFactory) {
        genericControllerCrudDetail.extendScope($scope, controllerParams);
    }]);

app.controller("CentroViewController", ['$scope', 'genericControllerCrudDetail', 'controllerParams','repositoryFactory', function($scope, genericControllerCrudDetail, controllerParams,repositoryFactory) {
        genericControllerCrudDetail.extendScope($scope, controllerParams);
    }]);

app.controller("CentroDeleteController", ['$scope', 'genericControllerCrudDetail', 'controllerParams','repositoryFactory', function($scope, genericControllerCrudDetail, controllerParams,repositoryFactory) {
        genericControllerCrudDetail.extendScope($scope, controllerParams);
    }]);