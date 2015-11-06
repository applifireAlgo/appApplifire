DROP TABLE IF EXISTS `ast_AppCustomerType_M`;

CREATE TABLE `ast_AppCustomerType_M` ( `appcustTypeId` VARCHAR(64) NOT NULL, `customerType` VARCHAR(256) NOT NULL, `defaults` INT(10) NULL DEFAULT NULL, `sequenceId` INT(10) NULL DEFAULT NULL, `createdBy` VARCHAR(64) NULL DEFAULT '-1', `createdDate` DATETIME NULL DEFAULT '1900-01-01', `updatedBy` VARCHAR(64) NULL DEFAULT '-1', `updatedDate` DATETIME NULL DEFAULT '1900-01-01', `versionId` INT(11) NULL DEFAULT '-1', `activeStatus` INT(1) NULL DEFAULT '1', `txnAccessCode` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`appcustTypeId`));

