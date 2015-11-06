

ALTER TABLE `ast_PassRecovery_TP` ADD CONSTRAINT FOREIGN KEY (`questionId`) REFERENCES `ast_Question_M`(`questionId`);



ALTER TABLE `ast_PassRecovery_TP` ADD CONSTRAINT FOREIGN KEY (`userId`) REFERENCES `ast_User_T`(`userId`);

