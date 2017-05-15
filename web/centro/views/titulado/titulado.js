"use strict";

app.controller("TituladoSearchController", ['$scope', '$http', 'genericControllerCrudList', 'controllerParams', 'ix3Configuration', 'dialog', function ($scope, $http, genericControllerCrudList, controllerParams, ix3Configuration, dialog) {
        $scope.businessMessages = [];
        genericControllerCrudList.extendScope($scope, controllerParams);
        $scope.page.pageSize = 20;
        $scope.distinct = true;
        $scope.filters.tipoUsuario = "TITULADO";
        $scope.filters['titulado.formacionesAcademicas.centro.idCentro'] = $scope.user.centro.idCentro;
        $scope.preSearch = function (filters) {
            if (filters['ciclo.familia.idFamilia']) {
                filters['titulado.formacionesAcademicas.ciclo.familia.idFamilia'] = filters['ciclo.familia.idFamilia'].idFamilia;
            }
            if (filters['ciclo.idCiclo']) {
                filters['titulado.formacionesAcademicas.ciclo.idCiclo'] = filters['ciclo.idCiclo'].idCiclo;
            }
            if(filters['titulado.formacionesAcademicas.fecha']){
                filters['titulado.formacionesAcademicas.fecha'] = new Date(filters['titulado.formacionesAcademicas.fecha']);
            }
        }
        $scope.search();
        $scope.fail = {};
        $scope.apiUrl = ix3Configuration.server.api;
        $scope.mostrarCodigosMunicipio = function () {
            dialog.create('mostrarCodigosMunicipio');
        };
        $scope.failImportJson = function (data) {
            if (data && data.jqXHR && data.jqXHR.responseText)
                $scope.businessMessages = JSON.parse(data.jqXHR.responseText);
        };
        $scope.updateList = function () {
            alert("El listado de Titulados se importó correctamente");
            $scope.search();
        };


    }]);



app.controller("TituladoViewController", ['$scope', 'genericControllerCrudDetail', 'controllerParams', 'ix3Configuration', 'ageCalculator', function ($scope, genericControllerCrudDetail, controllerParams, ix3Configuration, ageCalculator) {
        genericControllerCrudDetail.extendScope($scope, controllerParams);
        $scope.ix3Configuration = ix3Configuration;
        $scope.ageCalculator = ageCalculator;
    }]);

