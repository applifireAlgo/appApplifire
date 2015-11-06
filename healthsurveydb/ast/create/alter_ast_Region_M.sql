

ALTER TABLE `ast_Region_M` ADD CONSTRAINT FOREIGN KEY (`countryId`) REFERENCES `ast_Country_M`(`countryId`);



ALTER TABLE `ast_Region_M` ADD CONSTRAINT FOREIGN KEY (`stateId`) REFERENCES `ast_State_M`(`stateId`);

