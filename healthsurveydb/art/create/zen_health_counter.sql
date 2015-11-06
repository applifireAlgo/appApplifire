DROP TABLE IF EXISTS `zen_health_counter`;

CREATE TABLE `zen_health_counter` (  `counter_id` varchar(64) NOT NULL ,  `server_Instance_Id` int(11) NOT NULL,  `http_Status` varchar(256) NOT NULL,  `server_Ip_Address` varchar(256) NOT NULL,  `service_Name` varchar(32) NOT NULL,  `scheduled_DateTime` datetime NOT NULL,  `status_Count` int(2) NOT NULL,  `method_Name` varchar(100) NOT NULL,  `counter_Type` int(4) NOT NULL,  PRIMARY KEY (`counter_id`)) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

