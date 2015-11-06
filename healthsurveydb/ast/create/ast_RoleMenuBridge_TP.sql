DROP TABLE IF EXISTS `ast_RoleMenuBridge_TP`;

CREATE TABLE `ast_RoleMenuBridge_TP` ( `roleMenuMapId` VARCHAR(64) NOT NULL, `roleId` VARCHAR(64) NOT NULL, `menuId` VARCHAR(64) NOT NULL, `isRead` TINYINT(1) NOT NULL, `isWrite` TINYINT(1) NOT NULL, `isExecute` TINYINT(1) NOT NULL, `createdBy` VARCHAR(64) NULL DEFAULT '-1', `createdDate` DATETIME NULL DEFAULT '1900-01-01', `updatedBy` VARCHAR(64) NULL DEFAULT '-1', `updatedDate` DATETIME NULL DEFAULT '1900-01-01', `versionId` INT(11) NULL DEFAULT '-1', `activeStatus` INT(1) NULL DEFAULT '1', `txnAccessCode` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`roleMenuMapId`));

