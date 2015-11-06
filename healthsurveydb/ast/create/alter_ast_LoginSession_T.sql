

ALTER TABLE `ast_LoginSession_T` ADD CONSTRAINT FOREIGN KEY (`userId`) REFERENCES `ast_User_T`(`userId`);

