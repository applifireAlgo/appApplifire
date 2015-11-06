DROP TABLE IF EXISTS `art_loginSession`;

CREATE TABLE `art_loginSession` (
  `sessionid` varchar(45) NOT NULL,
  `loginTime` timestamp NULL DEFAULT NULL,
  `logoutTime` timestamp NULL DEFAULT NULL,
  `clientIPAddress` varchar(45) DEFAULT NULL,
  `clientIPAddressInt` int(11) DEFAULT NULL,
  `clientNetworkAddress` int(11) DEFAULT NULL,
  `clientBrowser` varchar(1000) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `version_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`sessionid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

