DROP TABLE IF EXISTS `zen_health_status`;

CREATE TABLE `zen_health_status` (  `healthId` varchar(64) NOT NULL ,  `scheduled_DateTime` datetime NOT NULL,  `free_Space` double NOT NULL,  `status` varchar(256) NOT NULL,  `server_Instance_Id` int(3) NOT NULL,  `used_Space` double NOT NULL,  `server_Ip_Address` varchar(30) NOT NULL,  `total_Space` double NOT NULL,  PRIMARY KEY (`healthId`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;

