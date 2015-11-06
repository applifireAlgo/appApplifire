

ALTER TABLE `ast_SurveyScore_M` ADD CONSTRAINT FOREIGN KEY (`userId`) REFERENCES `ast_User_T`(`userId`);

