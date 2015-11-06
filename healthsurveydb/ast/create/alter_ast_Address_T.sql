

ALTER TABLE `ast_Address_T` ADD CONSTRAINT FOREIGN KEY (`countryId`) REFERENCES `ast_Country_M`(`countryId`);



ALTER TABLE `ast_Address_T` ADD CONSTRAINT FOREIGN KEY (`addressTypeId`) REFERENCES `ast_AddressType_M`(`addressTypeId`);



ALTER TABLE `ast_Address_T` ADD CONSTRAINT FOREIGN KEY (`cityId`) REFERENCES `ast_City_M`(`cityId`);



ALTER TABLE `ast_Address_T` ADD CONSTRAINT FOREIGN KEY (`stateId`) REFERENCES `ast_State_M`(`stateId`);

