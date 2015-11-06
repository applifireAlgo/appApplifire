DROP TABLE IF EXISTS `art_chart_prop_language`;

CREATE TABLE `art_chart_prop_language` (

  `label_id` varchar(64) NOT NULL,

  `property_id` varchar(64) NOT NULL,

  `display_name` varchar(200) NOT NULL,

  `lang_id` varchar(64) NOT NULL,

  `created_by` int(11) NOT NULL,

  `created_date` date NOT NULL,

  `updated_by` int(11) NOT NULL,

  `updated_date` date NOT NULL,

  `version_id` int(11) NOT NULL,

  `active_status` int(1) NOT NULL,

  PRIMARY KEY (`label_id`),

  KEY `property_id` (`property_id`),

  KEY `art_mst_chart_prop_language`	 (`lang_id`),

  CONSTRAINT `art_chart_prop_language` FOREIGN KEY (`lang_id`) REFERENCES `art_lang_master` (`lang_id`),

  CONSTRAINT `art_chart_prop_language1` FOREIGN KEY (`property_id`) REFERENCES `art_chart_properties` (`property_id`)

);

