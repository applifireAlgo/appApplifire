DROP TABLE IF EXISTS `ast_SurveyResult_T`;

CREATE TABLE `ast_SurveyResult_T` ( `surveyResultId` VARCHAR(256) NOT NULL, `surveyQuestionId` VARCHAR(256) NOT NULL, `surveyAnswerId` VARCHAR(256) NOT NULL, `contactId` VARCHAR(64) NOT NULL, `surveyDate` DATE NOT NULL, `createdBy` VARCHAR(64) NULL DEFAULT '-1', `createdDate` DATETIME NULL DEFAULT '1900-01-01', `updatedBy` VARCHAR(64) NULL DEFAULT '-1', `updatedDate` DATETIME NULL DEFAULT '1900-01-01', `versionId` INT(11) NULL DEFAULT '-1', `activeStatus` INT(1) NULL DEFAULT '1', `txnAccessCode` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`surveyResultId`));

