

ALTER TABLE `ast_UserAppState_T` ADD CONSTRAINT FOREIGN KEY (`AppSessionId`) REFERENCES `ast_LoginSession_T`(`AppSessionId`);

