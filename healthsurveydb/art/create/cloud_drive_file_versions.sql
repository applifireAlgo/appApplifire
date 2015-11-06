DROP TABLE IF EXISTS `cloud_drive_file_versions`;

CREATE TABLE `cloud_drive_file_versions` ( `base_file_Id` varchar(64) DEFAULT NULL, `file_id` varchar(64) NOT NULL, `file_version_id` INT(5) NOT NULL, `created_by` VARCHAR(64) DEFAULT NULL, `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_by` VARCHAR(64) DEFAULT NULL, `updated_date` TIMESTAMP NULL DEFAULT NULL, `version_id` INT(5) DEFAULT NULL, `active_status` INT(1) DEFAULT NULL, PRIMARY KEY (`file_id`,`file_version_id`), CONSTRAINT `fk_file_version_id` FOREIGN KEY (`file_id`) REFERENCES `cloud_drive_files` (`file_id`) );

