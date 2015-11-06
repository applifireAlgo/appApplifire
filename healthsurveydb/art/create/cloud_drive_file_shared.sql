DROP TABLE IF EXISTS `cloud_drive_file_shared`;

CREATE TABLE `cloud_drive_file_shared` ( `file_id` varchar(64) DEFAULT NULL, `shared_user_id` varchar(64) DEFAULT NULL, `updated_by` varchar(64) DEFAULT NULL, `updated_date` TIMESTAMP NULL DEFAULT NULL, `created_by` varchar(64) DEFAULT NULL, `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `version_id` int(11) DEFAULT NULL, `active_status` int(1) DEFAULT NULL, `id` varchar(64) NOT NULL, PRIMARY KEY (`id`) );

