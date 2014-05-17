app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'main.html',
            controller: 'MainController'
        });
    }]);

app.controller('MainController', ['$scope', 'daoFactory', '$filter', 'session', '$window', function($scope, daoFactory, $filter, session, $window) {
        $scope.businessMessages=null;
        session.logged().then(function(user) {
            if (user) {
                $scope.user = user;
                $scope.id = $scope.user.idIdentity;
                $scope.expand = "titulosIdiomas,experienciasLaborales,formacionesAcademicas.centro,usuario";
                $scope.entity = "Titulado";
                $scope.dao = daoFactory.getDAO($scope.entity);
                $scope.metadata = {};
                $scope.businessMessages=null;

                $scope.dao.get($scope.id, function(data) {
                    $scope.model = data;
                    $scope.businessMessages = null;
                }, function(error) {
                    if (error.status === 400) {
                        $scope.businessMessages = error.data;
                    } else {
                        $scope.businessMessages = [{
                                propertyName: null,
                                message: "Estado HTTP:" + error.status + "\n" + error.data
                            }];
                    }
                }, $scope.expand);

                $scope.dao.metadata(function(data) {
                    $scope.metadata[$scope.entity] = data;
                    $scope.businessMessages = null;
                }, function(error) {
                    if (error.status === 400) {
                        $scope.businessMessages = error.data;
                    } else {
                        $scope.businessMessages = [{
                                propertyName: null,
                                message: "Estado HTTP:" + error.status + "\n" + error.data
                            }];
                    }
                }, $scope.expand);

                $scope.getTipoTitulo = function(formacionAcademica) {
                    if (!$scope.metadata.Titulado) {
                        return "";
                    }
                    var values = $filter('filter')($scope.metadata.Titulado.properties.formacionesAcademicas.properties.tipoFormacionAcademica.values, {key: formacionAcademica.tipoFormacionAcademica});
                    return values[0].description;
                };

                $scope.getNombreCentro = function(formacionAcademica) {
                    if (formacionAcademica.tipoFormacionAcademica === "CICLO_FORMATIVO") {
                        if (formacionAcademica.centro.idCentro < 0) {
                            return formacionAcademica.otroCentro;
                        } else {
                            return formacionAcademica.centro.toString;
                        }
                    } else {
                        return formacionAcademica.otroCentro;
                    }
                };
                $scope.getNombreTitulo = function(formacionAcademica) {
                    if (formacionAcademica.tipoFormacionAcademica === "CICLO_FORMATIVO") {
                        return formacionAcademica.ciclo.toString;
                    } else {
                        return formacionAcademica.otroTitulo;
                    }
                };

            } else {
                alert("No has iniciado sesión o tu sesión ha caducado");
                $window.location.href = getContextPath() + "/site/index.html";
            }
        }, function() {
            alert("Fallo al cargar los datos");
        });





    }]);