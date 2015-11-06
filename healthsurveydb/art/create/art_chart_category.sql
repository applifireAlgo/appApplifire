DROP TABLE IF EXISTS `art_chart_category`;

CREATE TABLE `art_chart_category` (

  `chart_id` varchar(64) NOT NULL ,

  `chart_tree_id` varchar(30) NOT NULL,

  `chart_label` varchar(100) NOT NULL,

  `chart_description` varchar(200) DEFAULT NULL,

  `chart_json_id` VARCHAR(64) NOT NULL,

  `created_by` int(11) NOT NULL,

  `created_date` date NOT NULL,

  `updated_by` int(11) NOT NULL,

  `updated_date` date NOT NULL,

  `version_id` int(11) NOT NULL,

  `active_status` int(1) NOT NULL,

  `chart_point` int(1) NOT NULL DEFAULT '0',

  PRIMARY KEY (`chart_id`),

  KEY `Foreign Key` (`chart_json_id`),

  CONSTRAINT `Foreign Key` FOREIGN KEY (`chart_json_id`) REFERENCES `art_chart_json` (`chart_json_id`) ON DELETE CASCADE ON UPDATE CASCADE

);



