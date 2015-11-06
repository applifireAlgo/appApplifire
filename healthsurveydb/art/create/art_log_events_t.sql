DROP TABLE IF EXISTS `art_log_events_t`;

CREATE TABLE `art_log_events_t` (
  `event_id` bigint NOT NULL,
  `customer_id` int(11) NOT NULL,
  `app_name` varchar(20) NOT NULL,
  `time_stamp` datetime,
  `alarm_id` int(20),
  `severity` varchar(64),  
  `user_id` varchar(200) ,
  `ip_address` varchar(30),
  `module` varchar(100) ,
  `class_name` varchar(300) ,
  `method_name` varchar(100),  
  `message` varchar(2000) ,  
  `throwable_message` TEXT NULL DEFAULT NULL,
  FOREIGN KEY (severity) REFERENCES art_log_severity_m(severity_id)
);

