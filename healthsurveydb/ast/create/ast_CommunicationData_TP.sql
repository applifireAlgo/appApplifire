DROP TABLE IF EXISTS `ast_CommunicationData_TP`;

CREATE TABLE `ast_CommunicationData_TP` ( `commDataId` VARCHAR(64) NOT NULL, `commGroupId` VARCHAR(64) NOT NULL, `commType` VARCHAR(64) NOT NULL, `commData` TEXT(64) NOT NULL, `createdBy` VARCHAR(64) NULL DEFAULT '-1', `createdDate` DATETIME NULL DEFAULT '1900-01-01', `updatedBy` VARCHAR(64) NULL DEFAULT '-1', `updatedDate` DATETIME NULL DEFAULT '1900-01-01', `versionId` INT(11) NULL DEFAULT '-1', `activeStatus` INT(1) NULL DEFAULT '1', `txnAccessCode` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`commDataId`));

