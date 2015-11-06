

ALTER TABLE `ast_RoleMenuBridge_TP` ADD CONSTRAINT FOREIGN KEY (`roleId`) REFERENCES `ast_Roles_T`(`roleId`);



ALTER TABLE `ast_RoleMenuBridge_TP` ADD CONSTRAINT FOREIGN KEY (`menuId`) REFERENCES `ast_AppMenus_M`(`menuId`);

