DROP TABLE IF EXISTS `ast_SurveyScore_M`;

CREATE TABLE `ast_SurveyScore_M` ( `surveyScoreId` VARCHAR(256) NOT NULL, `userId` VARCHAR(64) NOT NULL, `groupType` INT(10) NOT NULL, `score` INT(10) NOT NULL, `points` INT(10) NOT NULL, `surveyDate` DATE NOT NULL, `createdBy` VARCHAR(64) NULL DEFAULT '-1', `createdDate` DATETIME NULL DEFAULT '1900-01-01', `updatedBy` VARCHAR(64) NULL DEFAULT '-1', `updatedDate` DATETIME NULL DEFAULT '1900-01-01', `versionId` INT(11) NULL DEFAULT '-1', `activeStatus` INT(1) NULL DEFAULT '1', `txnAccessCode` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`surveyScoreId`));

