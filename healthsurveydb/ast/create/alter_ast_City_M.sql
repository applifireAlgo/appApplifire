

ALTER TABLE `ast_City_M` ADD CONSTRAINT FOREIGN KEY (`countryId`) REFERENCES `ast_Country_M`(`countryId`);



ALTER TABLE `ast_City_M` ADD CONSTRAINT FOREIGN KEY (`stateId`) REFERENCES `ast_State_M`(`stateId`);

