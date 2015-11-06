DROP TABLE IF EXISTS `art_chart_type`;

CREATE TABLE `art_chart_type` (

  `chart_type_id` varchar(64) NOT NULL ,

  `chart_id` VARCHAR(64) NOT NULL,

  `chart_type` varchar(100) NOT NULL,

  `chart_default` varchar(1) NOT NULL,

  `created_by` int(11) NOT NULL,

  `created_date` date NOT NULL,

  `updated_by` int(11) NOT NULL,

  `updated_date` date NOT NULL,

  `version_id` int(11) NOT NULL,

  `active_status` int(1) NOT NULL,

  PRIMARY KEY (`chart_type_id`),

  KEY `ForeignKey` (`chart_id`),

  CONSTRAINT `ForeignKey` FOREIGN KEY (`chart_id`) REFERENCES `art_chart_category` (`chart_id`) ON DELETE CASCADE ON UPDATE CASCADE

);

