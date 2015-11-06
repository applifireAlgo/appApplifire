DROP TABLE IF EXISTS `ast_SurveyQueAnsBridge_B`;

CREATE TABLE `ast_SurveyQueAnsBridge_B` ( `surveyqueansbridgePkey` INT(11) NOT NULL AUTO_INCREMENT, `surveyQuestionId` VARCHAR(256) NOT NULL, `surveyAnswerId` VARCHAR(256) NOT NULL, PRIMARY KEY (`surveyqueansbridgePkey`));

