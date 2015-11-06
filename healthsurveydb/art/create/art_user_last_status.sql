DROP TABLE IF EXISTS `art_user_last_status`;

CREATE TABLE `art_user_last_status` (

  `id` VARCHAR(64) NOT NULL,

  `user_id` VARCHAR(64) DEFAULT NULL,

  `menu_id` VARCHAR(64) DEFAULT NULL,

  `json` TEXT,

  `project_id` VARCHAR(256) DEFAULT NULL,

  `project_version_id` VARCHAR(256) DEFAULT NULL,

  `updated_by` INT(11) DEFAULT NULL,

  `updated_date` DATETIME DEFAULT NULL,

  `created_by` INT(11) DEFAULT NULL,

  `created_date` DATETIME DEFAULT NULL,

  `version_id` INT(11) DEFAULT NULL,

  `active_status` TINYINT(1) DEFAULT NULL,

  `app_creator_id` VARCHAR(256) DEFAULT NULL,

  PRIMARY KEY (`id`)

) ;

