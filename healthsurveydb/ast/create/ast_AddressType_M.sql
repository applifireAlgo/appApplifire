DROP TABLE IF EXISTS `ast_AddressType_M`;

CREATE TABLE `ast_AddressType_M` ( `addressTypeId` VARCHAR(64) NOT NULL, `addressType` VARCHAR(128) NOT NULL, `addressTypeDesc` VARCHAR(256) NULL DEFAULT NULL, `addressTypeIcon` VARCHAR(128) NULL DEFAULT NULL, `createdBy` VARCHAR(64) NULL DEFAULT '-1', `createdDate` DATETIME NULL DEFAULT '1900-01-01', `updatedBy` VARCHAR(64) NULL DEFAULT '-1', `updatedDate` DATETIME NULL DEFAULT '1900-01-01', `versionId` INT(11) NULL DEFAULT '-1', `activeStatus` INT(1) NULL DEFAULT '1', `txnAccessCode` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`addressTypeId`));

