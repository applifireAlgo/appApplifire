

ALTER TABLE `ast_UserRoleBridge_T` ADD CONSTRAINT FOREIGN KEY (`roleId`) REFERENCES `ast_Roles_T`(`roleId`);



ALTER TABLE `ast_UserRoleBridge_T` ADD CONSTRAINT FOREIGN KEY (`userId`) REFERENCES `ast_User_T`(`userId`);

