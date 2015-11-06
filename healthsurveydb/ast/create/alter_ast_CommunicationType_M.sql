

ALTER TABLE `ast_CommunicationType_M` ADD CONSTRAINT FOREIGN KEY (`commGroupId`) REFERENCES `ast_CommunicationGroup_M`(`commGroupId`);

