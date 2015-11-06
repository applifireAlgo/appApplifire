

ALTER TABLE `ast_CoreContacts_T` ADD CONSTRAINT FOREIGN KEY (`timeZone`) REFERENCES `ast_Timezone_M`(`timezoneId`);



ALTER TABLE `ast_CoreContacts_T` ADD CONSTRAINT FOREIGN KEY (`genderId`) REFERENCES `ast_Gender_M`(`genderId`);



ALTER TABLE `ast_CoreContacts_T` ADD CONSTRAINT FOREIGN KEY (`titleId`) REFERENCES `ast_Title_M`(`titleId`);



ALTER TABLE `ast_CoreContacts_T` ADD CONSTRAINT FOREIGN KEY (`nativeLanguageCode`) REFERENCES `ast_Language_M`(`languageId`);

