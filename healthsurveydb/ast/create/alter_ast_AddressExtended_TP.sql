

ALTER TABLE `ast_AddressExtended_TP` ADD CONSTRAINT FOREIGN KEY (`talukaId`) REFERENCES `ast_Taluka_M`(`talukaId`);



ALTER TABLE `ast_AddressExtended_TP` ADD CONSTRAINT FOREIGN KEY (`regionId`) REFERENCES `ast_Region_M`(`regionId`);



ALTER TABLE `ast_AddressExtended_TP` ADD CONSTRAINT FOREIGN KEY (`districtId`) REFERENCES `ast_District_M`(`districtId`);



ALTER TABLE `ast_AddressExtended_TP` ADD CONSTRAINT FOREIGN KEY (`addressId`) REFERENCES `ast_Address_T`(`addressId`);



ALTER TABLE `ast_AddressExtended_TP` ADD CONSTRAINT FOREIGN KEY (`villageId`) REFERENCES `ast_Village_M`(`villageId`);

