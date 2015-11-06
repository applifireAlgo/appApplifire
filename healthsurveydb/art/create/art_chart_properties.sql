DROP TABLE IF EXISTS `art_chart_properties`;

CREATE TABLE `art_chart_properties` (

  `property_id` varchar(64) NOT NULL,

  `property_name` varchar(300) NOT NULL,

  `widgets` varchar(300) NOT NULL,

  `widgets_json` text,

  `created_by` int(11) NOT NULL,

  `created_date` date NOT NULL,

  `updated_by` int(11) NOT NULL,

  `updated_date` date NOT NULL,

  `version_id` int(11) NOT NULL,

  `active_status` int(1) NOT NULL,

  PRIMARY KEY (`property_id`)

);

