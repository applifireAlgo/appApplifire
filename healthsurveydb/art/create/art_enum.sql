DROP TABLE IF EXISTS `art_enum`;

CREATE TABLE `art_enum` (
  `enum_id` int(11) NOT NULL DEFAULT '0',
  `enum_code` varchar(20) DEFAULT NULL,
  `enum_desc` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`enum_id`)
) ;

