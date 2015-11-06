DROP TABLE IF EXISTS `art_job_details`;

CREATE TABLE `art_job_details` (
  `jobId` varchar(64) NOT NULL,
  `jobName` varchar(128) DEFAULT NULL,
  `uiJson` text NOT NULL,
  `processJson` text,
  `project_id` varchar(256) DEFAULT NULL,
  `app_creator_id` varchar(256) DEFAULT NULL,
  `project_version_id` varchar(256) DEFAULT NULL,
  `created_by` varchar(64) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` varchar(64) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `version_id` int(11) DEFAULT NULL,
  `active_status` tinyint(1) DEFAULT NULL,
  `beanName` varchar(64) DEFAULT NULL,
  `currentStatus` varchar(64) DEFAULT NULL,
  `statusTime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`jobId`)
);

