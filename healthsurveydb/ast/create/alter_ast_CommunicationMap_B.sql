

ALTER TABLE `ast_CommunicationMap_B` ADD CONSTRAINT FOREIGN KEY (`contactId`) REFERENCES `ast_CoreContacts_T`(`contactId`);



ALTER TABLE `ast_CommunicationMap_B` ADD CONSTRAINT FOREIGN KEY (`commDataId`) REFERENCES `ast_CommunicationData_TP`(`commDataId`);

