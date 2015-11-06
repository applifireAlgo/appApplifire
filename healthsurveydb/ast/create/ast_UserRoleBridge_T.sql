DROP TABLE IF EXISTS `ast_UserRoleBridge_T`;

CREATE TABLE `ast_UserRoleBridge_T` ( `roleUserMapId` VARCHAR(64) NOT NULL, `roleId` VARCHAR(64) NOT NULL, `userId` VARCHAR(64) NOT NULL, `createdBy` VARCHAR(64) NULL DEFAULT '-1', `createdDate` DATETIME NULL DEFAULT '1900-01-01', `updatedBy` VARCHAR(64) NULL DEFAULT '-1', `updatedDate` DATETIME NULL DEFAULT '1900-01-01', `versionId` INT(11) NULL DEFAULT '-1', `activeStatus` INT(1) NULL DEFAULT '1', `txnAccessCode` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`roleUserMapId`));

