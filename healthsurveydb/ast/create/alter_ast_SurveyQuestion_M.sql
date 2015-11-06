

ALTER TABLE `ast_SurveyQuestion_M` ADD CONSTRAINT FOREIGN KEY (`surveyQuestionGroupId`) REFERENCES `ast_SurveyQuestionGroup_M`(`surveyQuestionGroupId`);

