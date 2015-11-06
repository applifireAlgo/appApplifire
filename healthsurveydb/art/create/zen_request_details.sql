DROP TABLE IF EXISTS `zen_request_details`;

CREATE TABLE `zen_request_details` (
  `requestId` varchar(46) NOT NULL,
  `class_Name` varchar(150) DEFAULT NULL,
  `ip_Address` varchar(45) DEFAULT NULL,
  `request_Time` datetime DEFAULT NULL,
  `request_Method` varchar(45) DEFAULT NULL,
  `http_Status` varchar(45) DEFAULT NULL,
  `return_Status` varchar(45) DEFAULT NULL,
  `execution_Time` double DEFAULT NULL,
  `method_Name` varchar(45) DEFAULT NULL,
  `end_Time` datetime NOT NULL,
  `typeofClass` varchar(11) DEFAULT NULL,
  `callSeqId` int(11) DEFAULT NULL,
  `exceptionId` int(11) DEFAULT NULL,
  `userId` varchar(45) DEFAULT NULL,
  `appSessionId` varchar(45) DEFAULT NULL
);

