DROP TABLE IF EXISTS `zen_health_gauge`;

CREATE TABLE `zen_health_gauge` (  `gauge_id` varchar(64) NOT NULL ,  `scheduled_DateTime` datetime NOT NULL,  `method_Hit_Count` double NOT NULL,  `server_Instance_Id` int(11) NOT NULL,  `method_Hit_Time` double NOT NULL,  `server_Ip_Address` varchar(256) NOT NULL,  `service_Name` varchar(256) NOT NULL,  `method_Name` varchar(32) NOT NULL,  PRIMARY KEY (`gauge_id`)) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

