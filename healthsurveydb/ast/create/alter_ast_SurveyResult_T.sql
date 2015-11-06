

ALTER TABLE `ast_SurveyResult_T` ADD CONSTRAINT FOREIGN KEY (`surveyAnswerId`) REFERENCES `ast_SurveyAnswer_M`(`surveyAnswerId`);



ALTER TABLE `ast_SurveyResult_T` ADD CONSTRAINT FOREIGN KEY (`surveyQuestionId`) REFERENCES `ast_SurveyQuestion_M`(`surveyQuestionId`);



ALTER TABLE `ast_SurveyResult_T` ADD CONSTRAINT FOREIGN KEY (`contactId`) REFERENCES `ast_User_T`(`userId`);

