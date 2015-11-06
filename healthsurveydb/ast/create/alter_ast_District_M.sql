

ALTER TABLE `ast_District_M` ADD CONSTRAINT FOREIGN KEY (`countryId`) REFERENCES `ast_Country_M`(`countryId`);



ALTER TABLE `ast_District_M` ADD CONSTRAINT FOREIGN KEY (`regionId`) REFERENCES `ast_Region_M`(`regionId`);



ALTER TABLE `ast_District_M` ADD CONSTRAINT FOREIGN KEY (`stateId`) REFERENCES `ast_State_M`(`stateId`);

