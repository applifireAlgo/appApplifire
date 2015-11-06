DROP TABLE IF EXISTS `art_password_algorithm`;

CREATE TABLE `art_password_algorithm` ( `algoId` varchar(256) NOT NULL, `algorithm` varchar(256) NOT NULL, `algoName` varchar(256) NOT NULL, `algoDescription` varchar(256) DEFAULT NULL, `active_status` int(1) DEFAULT '1', `created_date` datetime DEFAULT '1900-01-01 00:00:00', `updated_by` int(11) DEFAULT '-1', `version_id` int(11) DEFAULT '-1', `created_by` int(11) DEFAULT '-1', `updated_date` datetime DEFAULT '1900-01-01 00:00:00', PRIMARY KEY (`algoId`) );

