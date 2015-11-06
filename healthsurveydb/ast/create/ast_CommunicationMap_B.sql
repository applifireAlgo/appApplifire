DROP TABLE IF EXISTS `ast_CommunicationMap_B`;

CREATE TABLE `ast_CommunicationMap_B` ( `commMapId` INT(11) NOT NULL AUTO_INCREMENT, `contactId` VARCHAR(64) NOT NULL, `commDataId` VARCHAR(64) NOT NULL, PRIMARY KEY (`commMapId`));

