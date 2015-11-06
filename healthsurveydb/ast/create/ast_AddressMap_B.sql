DROP TABLE IF EXISTS `ast_AddressMap_B`;

CREATE TABLE `ast_AddressMap_B` ( `addMapId` INT(11) NOT NULL AUTO_INCREMENT, `contactId` VARCHAR(64) NOT NULL, `addressId` VARCHAR(64) NOT NULL, PRIMARY KEY (`addMapId`));

