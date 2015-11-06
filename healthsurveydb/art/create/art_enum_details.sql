DROP TABLE IF EXISTS `art_enum_details`;

CREATE TABLE `art_enum_details` (
  `enum_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `type_value` varchar(100) DEFAULT NULL,
  `type_desc` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`enum_id`,`type_id`),
  KEY `enum_id` (`enum_id`)
) ;

