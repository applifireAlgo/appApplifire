

ALTER TABLE `ast_Login_T` ADD CONSTRAINT FOREIGN KEY (`contactId`) REFERENCES `ast_CoreContacts_T`(`contactId`);



ALTER TABLE `ast_Login_T` ADD CONSTRAINT FOREIGN KEY (`userId`) REFERENCES `ast_User_T`(`userId`);

