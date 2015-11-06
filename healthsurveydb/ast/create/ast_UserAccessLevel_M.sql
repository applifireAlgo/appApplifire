DROP TABLE IF EXISTS `ast_UserAccessLevel_M`;

CREATE TABLE `ast_UserAccessLevel_M` ( `userAccessLevelId` VARCHAR(64) NOT NULL, `userAccessLevel` INT(11) NOT NULL, `levelName` VARCHAR(256) NOT NULL, `levelDescription` VARCHAR(256) NOT NULL, `levelHelp` VARCHAR(2048) NULL DEFAULT NULL, `levelIcon` VARCHAR(256) NULL DEFAULT NULL, `createdBy` VARCHAR(64) NULL DEFAULT '-1', `createdDate` DATETIME NULL DEFAULT '1900-01-01', `updatedBy` VARCHAR(64) NULL DEFAULT '-1', `updatedDate` DATETIME NULL DEFAULT '1900-01-01', `versionId` INT(11) NULL DEFAULT '-1', `activeStatus` INT(1) NULL DEFAULT '1', `txnAccessCode` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`userAccessLevelId`), UNIQUE KEY (`userAccessLevel`));

