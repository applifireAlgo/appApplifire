DROP TABLE IF EXISTS `art_schedule_config`;

CREATE TABLE `art_schedule_config` ( `schedule_id` VARCHAR(64) NOT NULL, `schedule_name` VARCHAR(256) NOT NULL, `schedule_job` VARCHAR(64) NOT NULL, `scheduler_expression` VARCHAR(256) DEFAULT NULL, `schedule_strategy` LONGTEXT NOT NULL, `created_by` VARCHAR(64) DEFAULT '-1', `created_date` DATETIME DEFAULT '1900-01-01 00:00:00', `updated_by` VARCHAR(64) DEFAULT '-1', `updated_date` DATETIME DEFAULT '1900-01-01 00:00:00', `version_id` INT(11) DEFAULT '-1', `active_status` INT(1) DEFAULT '1', PRIMARY KEY (`schedule_id`) ) ;

