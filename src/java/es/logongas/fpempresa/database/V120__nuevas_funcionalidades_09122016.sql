INSERT INTO `sec_ace` (`aceType`, `idPermission`, `ididentity`, `secureResourceRegExp`, `conditionalScript`, `conditionalExpression`, `priority`, `description`) VALUES ('Allow', '22', '33', '.*BusinessProcess.Titulado.importarTituladosCSV', NULL, NULL, '1', 'Permitir importador de usuarios');
INSERT INTO `sec_ace` (`aceType`, `idPermission`, `ididentity`, `secureResourceRegExp`, `conditionalScript`, `conditionalExpression`, `priority`, `description`) VALUES ('Allow', '2', '33', '/api/titulado/importar-csv', NULL, NULL, '1', 'Permitir importador de usuarios');