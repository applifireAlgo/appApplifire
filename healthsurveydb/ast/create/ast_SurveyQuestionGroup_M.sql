DROP TABLE IF EXISTS `ast_SurveyQuestionGroup_M`;

CREATE TABLE `ast_SurveyQuestionGroup_M` ( `surveyQuestionGroupId` INT(10) NOT NULL AUTO_INCREMENT, `surveyQuestionGroupName` VARCHAR(256) NOT NULL, `surveyQuestionGroupDesc` TEXT NOT NULL, `createdBy` VARCHAR(64) NULL DEFAULT '-1', `createdDate` DATETIME NULL DEFAULT '1900-01-01', `updatedBy` VARCHAR(64) NULL DEFAULT '-1', `updatedDate` DATETIME NULL DEFAULT '1900-01-01', `versionId` INT(11) NULL DEFAULT '-1', `activeStatus` INT(1) NULL DEFAULT '1', `txnAccessCode` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`surveyQuestionGroupId`));

