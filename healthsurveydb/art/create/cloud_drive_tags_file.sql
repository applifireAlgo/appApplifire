DROP TABLE IF EXISTS `cloud_drive_tags_file`;

CREATE TABLE `cloud_drive_tags_file` ( `id` int(11) NOT NULL AUTO_INCREMENT, `file_id` varchar(64) DEFAULT NULL, `tag_id` varchar(64) DEFAULT NULL, PRIMARY KEY (`id`), KEY `fk_file_id` (`file_id`), CONSTRAINT `fk_file_id` FOREIGN KEY (`file_id`) REFERENCES `cloud_drive_files` (`file_id`) );

