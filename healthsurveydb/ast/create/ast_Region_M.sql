DROP TABLE IF EXISTS `ast_Region_M`;

CREATE TABLE `ast_Region_M` ( `regionId` VARCHAR(64) NOT NULL, `countryId` VARCHAR(64) NOT NULL, `stateId` VARCHAR(64) NOT NULL, `regionName` VARCHAR(256) NOT NULL, `regionCode1` INT(3) NOT NULL, `regionCodeChar2` VARCHAR(32) NOT NULL, `regionDescription` VARCHAR(256) NULL DEFAULT NULL, `regionFlag` VARCHAR(128) NULL DEFAULT NULL, `regionLatitude` INT(11) NULL DEFAULT NULL, `regionLongitude` INT(11) NULL DEFAULT NULL, `createdBy` VARCHAR(64) NULL DEFAULT '-1', `createdDate` DATETIME NULL DEFAULT '1900-01-01', `updatedBy` VARCHAR(64) NULL DEFAULT '-1', `updatedDate` DATETIME NULL DEFAULT '1900-01-01', `versionId` INT(11) NULL DEFAULT '-1', `activeStatus` INT(1) NULL DEFAULT '1', `txnAccessCode` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`regionId`));

