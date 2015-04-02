"use strict";
app.config(['crudRoutesProvider', function (crudRoutesProvider) {
        crudRoutesProvider.addAllRoutes({
            entity: "Oferta",
            expand: "municipio,municipio.provincia,familia,empresa,ciclos,ciclos"
        });
    }]);

app.controller("OfertaSearchController", ['$scope', 'genericControllerCrudList', 'controllerParams', 'dialog', function ($scope, genericControllerCrudList, controllerParams, dialog) {
        genericControllerCrudList.extendScope($scope, controllerParams);
        $scope.page.pageSize = 20;

        $scope.filters.$eq['empresa.centro.idCentro'] = $scope.user.centro.idCentro;

        $scope.search();
    }]);


app.controller("OfertaNewEditController", ['$scope', 'genericControllerCrudDetail', 'controllerParams', 'dialog', 'metadataEntities', 'serviceFactory', function ($scope, genericControllerCrudDetail, controllerParams, dialog, metadataEntities, serviceFactory) {
        genericControllerCrudDetail.extendScope($scope, controllerParams);

        $scope.tiposOferta = metadataEntities.getMetadataProperty('Oferta.tipoOferta').values;

        $scope.buscarEmpresa = function () {

            var params = {
                filters: {
                    'centro.idCentro': $scope.user.centro.idCentro
                },
                initialSearch: true
            };

            dialog.create('buscarEmpresas', params).then(function (empresa) {
                if (empresa) {
                    $scope.model.empresa = empresa;
                }
            });
        };


        $scope.checkTodosCiclos=function(todosCiclos) {
            
            if (todosCiclos) {
                $scope.model.ciclos=angular.copy($scope.ciclos);
            } else {
               $scope.model.ciclos=[]; 
            }
            
        };

        $scope.$watch("model.familia", function (newFamilia, oldFamilia) {
            
            if (newFamilia===oldFamilia) {
                return;
            }
            
            if (oldFamilia) {
                $scope.model.ciclos=[];
            }
            if (newFamilia) {
                var serviceCiclo = serviceFactory.getService("Ciclo");
                var filters = {
                    'familia.idFamilia': newFamilia.idFamilia
                };
                var orderby = [
                    {fieldName:"grado",orderDirection:"DESC"},
                    {fieldName:"leyEducativa",orderDirection:"ASC"},
                    {fieldName:"descripcion",orderDirection:"ASC"}
                ];                

                serviceCiclo.search(filters,orderby).then(function (ciclos) {
                    $scope.ciclos = ciclos;
                }, function (businessMessages) {
                    $scope.businessMessages = businessMessages;
                });

            } else {
                $scope.ciclos = [];
            }
        });
        
        $scope.compareCiclo=function(cicloA,cicloB) {
            if (cicloA && cicloB) {
                return (cicloA.idCiclo===cicloB.idCiclo);
            } else {
                return false;
            }
        }

    }]);

app.controller("OfertaViewController", ['$scope', 'genericControllerCrudDetail', 'controllerParams', 'dialog', 'metadataEntities', 'serviceFactory', function ($scope, genericControllerCrudDetail, controllerParams, dialog, metadataEntities, serviceFactory) {
        genericControllerCrudDetail.extendScope($scope, controllerParams);
        $scope.tiposOferta = metadataEntities.getMetadataProperty('Oferta.tipoOferta').values;

        $scope.$watch("model.familia", function (newFamilia, oldFamilia) {
            
            if (newFamilia===oldFamilia) {
                return;
            }
            
            if (oldFamilia) {
                $scope.model.ciclos=[];
            }
            if (newFamilia) {
                var serviceCiclo = serviceFactory.getService("Ciclo");
                var filters = {
                    'familia.idFamilia': newFamilia.idFamilia
                };
                var orderby = [
                    {fieldName:"grado",orderDirection:"DESC"},
                    {fieldName:"leyEducativa",orderDirection:"ASC"},
                    {fieldName:"descripcion",orderDirection:"ASC"}
                ];                

                serviceCiclo.search(filters,orderby).then(function (ciclos) {
                    $scope.ciclos = ciclos;
                }, function (businessMessages) {
                    $scope.businessMessages = businessMessages;
                });

            } else {
                $scope.ciclos = [];
            }
        });
        
        $scope.compareCiclo=function(cicloA,cicloB) {
            if (cicloA && cicloB) {
                return (cicloA.idCiclo===cicloB.idCiclo);
            } else {
                return false;
            }
        }

    }]);

app.controller("OfertaDeleteController", ['$scope', 'genericControllerCrudDetail', 'controllerParams', 'dialog', 'metadataEntities', 'serviceFactory', function ($scope, genericControllerCrudDetail, controllerParams, dialog, metadataEntities, serviceFactory) {
        genericControllerCrudDetail.extendScope($scope, controllerParams);
        $scope.tiposOferta = metadataEntities.getMetadataProperty('Oferta.tipoOferta').values;



        $scope.$watch("model.familia", function (newFamilia, oldFamilia) {
            
            if (newFamilia===oldFamilia) {
                return;
            }
            
            if (oldFamilia) {
                $scope.model.ciclos=[];
            }
            if (newFamilia) {
                var serviceCiclo = serviceFactory.getService("Ciclo");
                var filters = {
                    'familia.idFamilia': newFamilia.idFamilia
                };
                var orderby = [
                    {fieldName:"grado",orderDirection:"DESC"},
                    {fieldName:"leyEducativa",orderDirection:"ASC"},
                    {fieldName:"descripcion",orderDirection:"ASC"}
                ];                

                serviceCiclo.search(filters,orderby).then(function (ciclos) {
                    $scope.ciclos = ciclos;
                }, function (businessMessages) {
                    $scope.businessMessages = businessMessages;
                });

            } else {
                $scope.ciclos = [];
            }
        });
        
        $scope.compareCiclo=function(cicloA,cicloB) {
            if (cicloA && cicloB) {
                return (cicloA.idCiclo===cicloB.idCiclo);
            } else {
                return false;
            }
        }

    }]);