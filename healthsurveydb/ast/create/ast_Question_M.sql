DROP TABLE IF EXISTS `ast_Question_M`;

CREATE TABLE `ast_Question_M` ( `questionId` VARCHAR(64) NOT NULL, `levelid` INT(11) NOT NULL, `question` VARCHAR(256) NOT NULL, `questionDetails` TEXT(1024) NULL DEFAULT NULL, `questionIcon` VARCHAR(64) NULL DEFAULT NULL, `createdBy` VARCHAR(64) NULL DEFAULT '-1', `createdDate` DATETIME NULL DEFAULT '1900-01-01', `updatedBy` VARCHAR(64) NULL DEFAULT '-1', `updatedDate` DATETIME NULL DEFAULT '1900-01-01', `versionId` INT(11) NULL DEFAULT '-1', `activeStatus` INT(1) NULL DEFAULT '1', `txnAccessCode` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`questionId`));

