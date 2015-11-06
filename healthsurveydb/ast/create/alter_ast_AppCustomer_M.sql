

ALTER TABLE `ast_AppCustomer_M` ADD CONSTRAINT FOREIGN KEY (`contactId`) REFERENCES `ast_CoreContacts_T`(`contactId`);



ALTER TABLE `ast_AppCustomer_M` ADD CONSTRAINT FOREIGN KEY (`appCustomerType`) REFERENCES `ast_AppCustomerType_M`(`appcustTypeId`);



ALTER TABLE `ast_AppCustomer_M` ADD CONSTRAINT FOREIGN KEY (`appCustomerCategory`) REFERENCES `ast_AppCustomerCategory_M`(`appcustCategoryId`);

