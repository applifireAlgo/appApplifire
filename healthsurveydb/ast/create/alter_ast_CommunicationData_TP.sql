

ALTER TABLE `ast_CommunicationData_TP` ADD CONSTRAINT FOREIGN KEY (`commGroupId`) REFERENCES `ast_CommunicationGroup_M`(`commGroupId`);



ALTER TABLE `ast_CommunicationData_TP` ADD CONSTRAINT FOREIGN KEY (`commType`) REFERENCES `ast_CommunicationType_M`(`commType`);

