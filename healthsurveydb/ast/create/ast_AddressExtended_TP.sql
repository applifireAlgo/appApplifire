DROP TABLE IF EXISTS `ast_AddressExtended_TP`;

CREATE TABLE `ast_AddressExtended_TP` ( `addExtId` VARCHAR(64) NOT NULL, `addressId` VARCHAR(64) NOT NULL, `villageId` VARCHAR(64) NOT NULL, `talukaId` VARCHAR(64) NOT NULL, `districtId` VARCHAR(64) NOT NULL, `regionId` VARCHAR(64) NOT NULL, `villageName` VARCHAR(128) NOT NULL, `talukaName` VARCHAR(128) NOT NULL, `createdBy` VARCHAR(64) NULL DEFAULT '-1', `createdDate` DATETIME NULL DEFAULT '1900-01-01', `updatedBy` VARCHAR(64) NULL DEFAULT '-1', `updatedDate` DATETIME NULL DEFAULT '1900-01-01', `versionId` INT(11) NULL DEFAULT '-1', `activeStatus` INT(1) NULL DEFAULT '1', `txnAccessCode` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`addExtId`));

