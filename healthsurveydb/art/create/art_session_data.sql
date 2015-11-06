DROP TABLE IF EXISTS `art_session_data`;

CREATE TABLE `art_session_data` (
  `sessionid` varchar(45) NOT NULL,
  `sno` int(11) NOT NULL AUTO_INCREMENT,
  `sessionDataType` varchar(45) DEFAULT NULL,
  `sessionData` text,
  `version_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`sno`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

