

ALTER TABLE `ast_SurveyQueAnsBridge_B` ADD CONSTRAINT FOREIGN KEY (`surveyAnswerId`) REFERENCES `ast_SurveyAnswer_M`(`surveyAnswerId`);



ALTER TABLE `ast_SurveyQueAnsBridge_B` ADD CONSTRAINT FOREIGN KEY (`surveyQuestionId`) REFERENCES `ast_SurveyQuestion_M`(`surveyQuestionId`);

