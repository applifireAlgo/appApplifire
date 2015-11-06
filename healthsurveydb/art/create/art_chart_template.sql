DROP TABLE IF EXISTS `art_chart_template`;

CREATE TABLE `art_chart_template` (

  `template_id` varchar(64) NOT NULL ,

  `template_name` varchar(500) NOT NULL,

  `template_json` longtext NOT NULL,

  `created_by` int(11) NOT NULL,

  `created_date` date NOT NULL,

  `updated_by` int(11) NOT NULL,

  `updated_date` date NOT NULL,

  `version_id` int(11) NOT NULL,

  `project_id` VARCHAR(256),

  `project_version_id` INT(11),

  `active_status` int(1) NOT NULL,

  `app_creator_id` varchar(256),

  PRIMARY KEY (`template_id`)

);

