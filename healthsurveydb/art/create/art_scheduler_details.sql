DROP TABLE IF EXISTS `art_scheduler_details`;

CREATE TABLE `art_scheduler_details` (
  `schedulerId` varchar(64) NOT NULL,
  `schedulerExpression` varchar(64) DEFAULT NULL,
  `jobId` varchar(64) DEFAULT NULL,
  `project_id` varchar(64) DEFAULT NULL,
  `app_creator_id` varchar(64) DEFAULT NULL,
  `project_version_id` varchar(64) DEFAULT NULL,
  `created_by` varchar(64) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` varchar(64) DEFAULT NULL,
  `version_id` int(11) DEFAULT NULL,
  `active_status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`schedulerId`)
) ;

