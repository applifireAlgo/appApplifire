

ALTER TABLE `ast_Taluka_M` ADD CONSTRAINT FOREIGN KEY (`countryId`) REFERENCES `ast_Country_M`(`countryId`);



ALTER TABLE `ast_Taluka_M` ADD CONSTRAINT FOREIGN KEY (`regionId`) REFERENCES `ast_Region_M`(`regionId`);



ALTER TABLE `ast_Taluka_M` ADD CONSTRAINT FOREIGN KEY (`districtId`) REFERENCES `ast_District_M`(`districtId`);



ALTER TABLE `ast_Taluka_M` ADD CONSTRAINT FOREIGN KEY (`stateId`) REFERENCES `ast_State_M`(`stateId`);

