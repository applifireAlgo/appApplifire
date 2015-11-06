DROP TABLE IF EXISTS `ast_District_M`;

CREATE TABLE `ast_District_M` ( `districtId` VARCHAR(64) NOT NULL, `countryId` VARCHAR(64) NOT NULL, `stateId` VARCHAR(64) NOT NULL, `regionId` VARCHAR(64) NOT NULL, `Name` VARCHAR(256) NOT NULL, `code2` VARCHAR(32) NOT NULL, `districtDescription` VARCHAR(128) NULL DEFAULT NULL, `districtFlag` VARCHAR(128) NULL DEFAULT NULL, `districtLatitude` INT(11) NULL DEFAULT NULL, `districtLongitude` INT(11) NULL DEFAULT NULL, `createdBy` VARCHAR(64) NULL DEFAULT '-1', `createdDate` DATETIME NULL DEFAULT '1900-01-01', `updatedBy` VARCHAR(64) NULL DEFAULT '-1', `updatedDate` DATETIME NULL DEFAULT '1900-01-01', `versionId` INT(11) NULL DEFAULT '-1', `activeStatus` INT(1) NULL DEFAULT '1', `txnAccessCode` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`districtId`));

