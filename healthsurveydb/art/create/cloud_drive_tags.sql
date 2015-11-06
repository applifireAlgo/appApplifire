DROP TABLE IF EXISTS `cloud_drive_tags`;

CREATE TABLE `cloud_drive_tags` ( `tag_id` varchar(64) NOT NULL, `tag_hierachy` VARCHAR(100) DEFAULT NULL, `tag_name` VARCHAR(50) DEFAULT NULL, `tag_image` VARCHAR(50) DEFAULT NULL, `created_by` VARCHAR(64) DEFAULT NULL, `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_by` VARCHAR(64) DEFAULT NULL, `updated_date` TIMESTAMP NULL DEFAULT NULL, `version_id` INT(11) DEFAULT NULL, `active_status` INT(1) DEFAULT NULL, `app_creator_id` VARCHAR(64) DEFAULT NULL, KEY `tag_id` (`tag_id`) );

