DROP TABLE IF EXISTS `cloud_drive_file_content_type`;

CREATE TABLE `cloud_drive_file_content_type` ( `id` int(11) NOT NULL AUTO_INCREMENT, `application_type` varchar(300) NOT NULL, `file_mime_type` varchar(300) DEFAULT NULL, `extension` varchar(25) DEFAULT NULL, `image` varchar(25) DEFAULT NULL, PRIMARY KEY (`id`) );

