"use strict";

(function () {

    GenericControllerCrudDetail.$inject = ['repositoryFactory', '$window', 'formValidator', '$location', 'metadataEntities', '$q', ];
    function GenericControllerCrudDetail(repositoryFactory, $window, formValidator, $location, metadataEntities, $q) {

        this.extendScope = function (scope, controllerParams) {
            scope.labelButtonOK = null;
            scope.labelButtonCancel = null;
            scope.model = {};
            scope.models = {};
            scope.businessMessages = null;
            angular.extend(scope, controllerParams);
            scope.repository = repositoryFactory.getRepository(scope.entity);
            scope.idName = metadataEntities.getMetadata(scope.entity).primaryKeyPropertyName;

            scope.doGet = function () {
                var defered = $q.defer();
                scope.repository.get(scope.id, scope.expand).then(function (data) {
                    if (data === null) {
                        //Si retornamos null, realmente lo transformamo en un objeto sin datos, pq sino fallan los select
                        scope.model = {};
                    } else {
                        scope.model = data;
                    }
                    scope.businessMessages = null;
                    defered.resolve(data);
                }, function (businessMessages) {
                    scope.businessMessages = businessMessages;
                    defered.reject(businessMessages);
                });

                return defered.promise;
            };

            scope.doCreate = function () {
                var defered = $q.defer();

                var parent = {};
                if ((scope.parentProperty) && (scope.parentId)) {
                    parent[scope.parentProperty] = scope.parentId;
                }

                scope.repository.create(scope.expand, parent).then(function (data) {
                    scope.model = data;
                    scope.businessMessages = null;
                    defered.resolve(data);
                }, function (businessMessages) {
                    scope.businessMessages = businessMessages;
                    defered.reject(businessMessages);
                });

                return defered.promise;
            };

            scope.doInsert = function () {
                var defered = $q.defer();

                scope.businessMessages = formValidator.validate(scope.mainForm, scope.customValidations);
                if (scope.businessMessages.length === 0) {
                    scope.repository.insert(scope.model, scope.expand).then(function (data) {
                        scope.model = data;
                        scope.businessMessages = null;
                        scope.controllerAction = "EDIT";
                        scope.id = scope.model[scope.idName];
                        defered.resolve(data);
                    }, function (businessMessages) {
                        scope.businessMessages = businessMessages;
                        defered.reject(businessMessages);
                    });
                } else {
                    defered.reject(scope.businessMessages);
                }
                return defered.promise;
            };

            scope.doUpdate = function () {
                var defered = $q.defer();
                scope.businessMessages = formValidator.validate(scope.mainForm, scope.customValidations);
                if (scope.businessMessages.length === 0) {
                    scope.repository.update(scope.id, scope.model, scope.expand).then(function (data) {
                        scope.model = data;
                        scope.businessMessages = null;
                        defered.resolve(data);
                    }, function (businessMessages) {
                        scope.businessMessages = businessMessages;
                        defered.reject(businessMessages);
                    });
                } else {
                    defered.reject(scope.businessMessages);
                }

                return defered.promise;
            };

            scope.doDelete = function () {
                var defered = $q.defer();
                scope.repository.delete(scope.id).then(function (data) {
                    scope.businessMessages = null;
                    defered.resolve(data);
                }, function (businessMessages) {
                    scope.businessMessages = businessMessages;
                    defered.reject(businessMessages);
                });

                return defered.promise;
            };

            scope.finishOK = function () {
                $window.history.back();
            };
            scope.finishCancel = function () {
                $window.history.back();
            };



            scope.buttonCancel = function () {
                scope.finishCancel();
            };
            scope.buttonOK = function () {
                switch (scope.controllerAction) {
                    case "NEW":
                        scope.doInsert().then(scope.finishOK);
                        break;
                    case "EDIT":
                        scope.doUpdate().then(scope.finishOK);
                        break;
                    case "VIEW":
                        scope.finishOK();
                        break;
                    case "DELETE":
                        scope.doDelete().then(scope.finishOK);
                        break;
                    default:
                        throw Error("scope.controllerAction desconocida:" + scope.controllerAction);
                }

            };

            scope.$watch("controllerAction", function (controllerAction) {
                switch (controllerAction) {
                    case "NEW":
                        scope.labelButtonOK = "Guardar";
                        scope.labelButtonCancel = "Salir";
                        break;
                    case "EDIT":
                        scope.labelButtonOK = "Actualizar";
                        scope.labelButtonCancel = "Salir";
                        break;
                    case "VIEW":
                        scope.labelButtonOK = "Salir";
                        scope.labelButtonCancel = "";
                        break;
                    case "DELETE":
                        scope.labelButtonOK = "Borrar";
                        scope.labelButtonCancel = "Salir";
                        break;
                    default:
                        throw Error("scope.controllerAction desconocida:" + scope.controllerAction);
                }
            });

            /**
             * Accion a realizar al iniciar el controlador
             */
            function init() {
                //
                switch (scope.controllerAction) {
                    case "NEW":
                        scope.doCreate();
                        break;
                    case "EDIT":
                        scope.doGet();
                        break;
                    case "VIEW":
                        scope.doGet();
                        break;
                    case "DELETE":
                        scope.doGet();
                        break;
                    default:
                        throw Error("scope.controllerAction desconocida:" + scope.controllerAction);
                }
            }

            /***************************************************/
            /************ METODOS REFERIDOS A CHILD ************/
            /*** BEGIN ***/


            scope.buttonDefaultChild = function (entity, pk, parentProperty, parentId) {
                var actionName;
                switch (scope.controllerAction) {
                    case "NEW":
                        actionName = "edit";
                        break;
                    case "EDIT":
                        actionName = "edit";
                        break;
                    case "VIEW":
                        actionName = "view";
                        break;
                    case "DELETE":
                        actionName = "view";
                        break;
                    default:
                        throw Error("scope.controllerAction desconocida:" + scope.controllerAction);
                }
                scope.childAction(actionName, entity, pk, parentProperty, parentId);
            };
            scope.buttonNewChild = function (entity, pk, parentProperty, parentId) {
                scope.childAction("new", entity, pk, parentProperty, parentId);
            };
            scope.buttonEditChild = function (entity, pk, parentProperty, parentId) {
                scope.childAction("edit", entity, pk, parentProperty, parentId);
            };
            scope.buttonDeleteChild = function (entity, pk, parentProperty, parentId) {
                scope.childAction("delete", entity, pk, parentProperty, parentId);
            };
            scope.buttonViewChild = function (entity, pk, parentProperty, parentId) {
                scope.childAction("view", entity, pk, parentProperty, parentId);
            };


            scope.childAction = function (actionName, entity, pk, parentProperty, parentId) {

                //comprobar si podemos hacer esa accion;
                if (!scope.allowChildAction(actionName)) {
                    scope.businessMessages = [{
                            propertyName: null,
                            message: "No es posible realizar un :'" + actionName + "'"
                        }];

                    return;
                }

                switch (scope.controllerAction) {
                    case "NEW":
                        //Antes de hacer cualquier accion hay que insertar la fila
                        scope.doInsert().then(function () {
                            //Tenemos OBLIGATORIAMENTE AQUI que calcular el valor del path pq al ser un INSERT
                            //aun no había clave primaria y aqui lo volvemos a calcular
                            $location.path(getPathChildAction(scope, actionName, entity, pk, parentProperty, parentId)).search({});
                        });
                        break;
                    case "EDIT":
                        //Antes de hacer cualquier accion hay que actualizar la fila
                        scope.doUpdate().then(function () {
                            $location.path(getPathChildAction(scope, actionName, entity, pk, parentProperty, parentId)).search({});
                        });
                        break;
                    case "VIEW":
                        $location.path(getPathChildAction(scope, actionName, entity, pk, parentProperty, parentId)).search({});
                        break;
                    case "DELETE":
                        $location.path(getPathChildAction(scope, actionName, entity, pk, parentProperty, parentId)).search({});
                        break;
                    default:
                        throw Error("scope.controllerAction desconocida:" + scope.controllerAction);
                }
            };

            /**
             * Obtiene el path a navegar para una acción "hija" de un formulario
             * @param {Scope} scope El scope para obtener los datos de la PK
             * @param {String} actionName La accion:"new","edit","delete" o "view". Corresponde a las parte del path de las rutas.
             * @param {String} entity El nombre de la entidad 
             * @param {Object} pk El valor de la clave primaria
             * @param {String} parentProperty El nombre de la propiedad padre que se asocia
             * @param {Object} parentId El valor de la propiedad 'parentProperty'
             * @returns {String} El Path a navegar. No se incluye la "#".
             */
            function getPathChildAction(scope, actionName, entity, pk, parentProperty, parentId) {
                var path = "/" + entity.toLowerCase() + "/" + actionName;
                if (pk) {
                    path = path + "/" + pk;
                }
                if ((parentProperty) && (parentId)) {
                    if (typeof (parentId) !== "string") {
                        throw Error("El tipo del argumento parentId debe ser un String pq es el nombre de una propiedad y no su valor");
                    }
                    path = path + "/" + parentProperty + "/" + scope.$eval(parentId);
                }
                return path;
            }

            scope.allowChildAction = function (actionName) {
                var allow;

                switch (scope.controllerAction) {
                    case "NEW":
                        allow = true;
                        break;
                    case "EDIT":
                        allow = true;
                        break;
                    case "VIEW":
                        //Solo se permite la accion view
                        if (actionName === "view") {
                            allow = true;
                        } else {
                            allow = false;
                        }
                        break;
                    case "DELETE":
                        //Solo se permite la accion view
                        if (actionName === "view") {
                            allow = true;
                        } else {
                            allow = false;
                        }
                        break;
                    default:
                        throw Error("scope.controllerAction desconocida:" + scope.controllerAction);
                }

                return allow;
            };

            /*** END ***/
            /***************************************************/
            /************ METODOS REFERIDOS A CHILD ************/


            init();

        };


    }

    angular.module('es.logongas.ix3').service("genericControllerCrudDetail", GenericControllerCrudDetail);

})();