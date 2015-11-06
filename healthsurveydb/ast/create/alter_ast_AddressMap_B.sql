

ALTER TABLE `ast_AddressMap_B` ADD CONSTRAINT FOREIGN KEY (`contactId`) REFERENCES `ast_CoreContacts_T`(`contactId`);



ALTER TABLE `ast_AddressMap_B` ADD CONSTRAINT FOREIGN KEY (`addressId`) REFERENCES `ast_Address_T`(`addressId`);

