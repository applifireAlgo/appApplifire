DROP TABLE IF EXISTS `art_password_policy`;

CREATE TABLE `art_password_policy` ( `policyId` VARCHAR (256) NOT NULL, `policyName` VARCHAR (256) NOT NULL, `policyDescription` VARCHAR (512) NOT NULL, `minPwdLength` INT (11) NOT NULL, `maxPwdLength` INT (11) NOT NULL, `minCapitalLetters` INT (11) NOT NULL, `minSmallLetters` INT (11) NOT NULL, `minNumericValues` INT (11) NOT NULL, `minSpecialLetters` INT (11) NOT NULL, `allowedSpecialLetters` VARCHAR (256) DEFAULT NULL, `active_status` INT (1) DEFAULT '1', `version_id` INT (11) DEFAULT '-1', `updated_date` DATETIME DEFAULT '1900-01-01 00:00:00', `updated_by` INT (11) DEFAULT '-1', `created_date` DATETIME DEFAULT '1900-01-01 00:00:00', `created_by` INT (11) DEFAULT '-1', PRIMARY KEY (`policyId`) ) ;

