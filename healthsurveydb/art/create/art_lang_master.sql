DROP TABLE IF EXISTS `art_lang_master`;

CREATE TABLE `art_lang_master` (

  `lang_id` varchar(64) NOT NULL ,

  `lang_name` varchar(50) DEFAULT NULL,

  `country_code` varchar(10) NOT NULL,

  `country_name` varchar(100) DEFAULT NULL,

  `updated_by` int(11) NOT NULL,

  `updated_date` date NOT NULL,

  `created_by` int(11) NOT NULL,

  `created_date` date NOT NULL,

  `version_id` int(11) NOT NULL,

  `active_status` int(1) NOT NULL,

  PRIMARY KEY (`lang_id`,`country_code`)

);

