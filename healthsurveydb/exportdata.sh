




echo $PATH
OSNAME=`uname -s`
ART_DATA_PATH=/tmp/applifire/db/LIFAHFMVSXANRRKY9FY9Q/18D01ABF-F632-496A-B379-FC50EDEAB8C0/art/data
AST_DATA_PATH=/tmp/applifire/db/LIFAHFMVSXANRRKY9FY9Q/18D01ABF-F632-496A-B379-FC50EDEAB8C0/ast/data
DB_NAME=applifire
USER=root
PASSWORD=root
PORT=3306
HOST=localhost
MYSQL=/usr/bin
PROJECT_ID=LIFAHFMVSXANRRKY9FY9Q
PROJECT_VERSION_ID=1

if [ $OSNAME == "Darwin" ]; then
echo "Setting up MYSQL PATH for OS $OSNAME"
MYSQL=/usr/local/mysql/bin/
fi



echo 'copy ART data from applifire starts....'
$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT    query_id ,
   jpql_query ,
   query_type , 
  query_json , 
  name , 
	upper( name ),
  app_creator_id , 
  project_id , 
  project_version_id ,
	0,
	current_timestamp,
	0,
	current_timestamp,
	0,
	1,sql_query
 FROM  aws_query  WHERE project_id='$PROJECT_ID' AND project_version_id='$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_query.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT
   enum_id ,
   enum_code ,
   enum_desc 
FROM  aws_enum  INTO OUTFILE '$ART_DATA_PATH/art_enum.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT
   enum_id ,
   type_id ,
   type_value ,
   type_desc 
FROM  aws_enum_details 
 INTO OUTFILE '$ART_DATA_PATH/art_enum_details.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT  report_name,  report_id,  query_id,  data_json,  chart_json,  created_by,  created_date,  updated_by,  updated_date,  project_id,  project_version_id,  app_creator_id,  active_status,  version_id,  search_json,  advance_config_json FROM aws_report_ui WHERE  project_id='$PROJECT_ID' AND project_version_id='$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_report_ui.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT  table_id ,
     entity_name ,
     table_name ,
     display_entity_name ,
     table_type ,
     domain ,
     project_id ,
  app_creator_id ,
    project_version_id ,
	0,
	current_timestamp,
	0,
	current_timestamp,
	0,
	1
   FROM  aws_table_details WHERE project_id='$PROJECT_ID' AND project_version_id='$PROJECT_VERSION_ID'  INTO OUTFILE '$ART_DATA_PATH/art_table_details.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT  field_id ,
     table_id ,
     field_name ,
     data_type ,
     datatype_precision ,
     is_pkey ,
     is_null ,
	 is_auto_inc ,
     is_unique ,
     is_fkey ,
     reff_key ,
	 reff_table ,
     primary_display ,
     default_value ,
     system_field ,
	 column_sequence ,
     display_json ,
     project_id ,
     app_creator_id ,
     project_version_id ,
    0,
	current_timestamp,
	0,
	current_timestamp,
	0,
	1,
     field_order ,
     field_group ,
     target_field ,
     transient_field ,
     ui_permission 
FROM  aws_table_field_details  WHERE project_id='$PROJECT_ID' AND project_version_id='$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_table_field_details.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT  id ,
     relation_type ,
     direction_type ,
     cascade_type ,
     fetch_type ,
     owning_cascade ,
     owning_table_id ,
     owning_key_id ,
     reff_table_id ,
     reff_key_id ,
     project_id ,
     project_version_id ,
     app_creator_id ,
    0,
	current_timestamp,
	0,
	current_timestamp,
	0,
	1,
     owing_entity 
FROM  aws_table_entity_relation  WHERE project_id='$PROJECT_ID' AND project_version_id='$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_table_entity_relation.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT art. id ,
    art. name ,
    art. json ,
    art. active_status ,
    art. version_id ,
     art. updated_date ,
    art. updated_by ,
    art. created_date ,
    art. created_by 
FROM  rad_database_aggregate  art, 
	  aws_project_database  db
 WHERE art.database_id=db.database_id 
AND db.project_id='$PROJECT_ID'
AND db.project_version_id='$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_database_aggregate.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT art. id ,
    art. name ,
    art. json ,
    art. active_status ,
    art. version_id ,
     art. updated_date ,
    art. updated_by ,
    art. created_date ,
    art. created_by 
FROM  rad_database_function  art, 
	  aws_project_database  db
 WHERE art.database_id=db.database_id 
AND db.project_id='$PROJECT_ID'
AND db.project_version_id='$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_database_function.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT art. id ,
    art. name ,
    art. json ,
    art. active_status ,
    art. version_id ,
     art. updated_date ,
    art. updated_by ,
    art. created_date ,
    art. created_by 
FROM  rad_database_operators  art, 
	  aws_project_database  db
 WHERE art.database_id=db.database_id 
AND db.project_id='$PROJECT_ID'
AND db.project_version_id='$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_database_operators.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "select rad.component_id,rad.component_name, rad.initializer,0,aws.project_id,aws.project_version_id,aws.app_creator_id,rad.created_by,CURRENT_TIMESTAMP,rad.updated_by,CURRENT_TIMESTAMP,rad.version_id,rad.active_status from rad_component rad , aws_project_component aws where rad.component_id= aws.component_id AND aws.project_id='$PROJECT_ID' AND aws.project_version_id='$PROJECT_VERSION_ID' AND rad.initializer != 'NULL' INTO OUTFILE '$ART_DATA_PATH/art_component_config.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT severity_id, log_config_id, severity, label, version_id, created_by, created_date, updated_by, updated_date, active_status FROM aws_log_severity_m WHERE project_id = '$PROJECT_ID' AND project_version_id = '$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_log_severity_m.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT  chart_json_id , chart_json , json_data_structure , java_class , created_by , created_date , updated_by , updated_date , version_id , active_status , data_field_id  FROM rad_chart_json  INTO OUTFILE '$ART_DATA_PATH/art_chart_json.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT  chart_id , chart_tree_id , chart_label , chart_description , chart_json_id , created_by , created_date , updated_by , updated_date , version_id , active_status , chart_point  FROM rad_chart_category INTO OUTFILE '$ART_DATA_PATH/art_chart_category.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT  chart_type_id , chart_id , chart_type  , chart_default , created_by , created_date , updated_by , updated_date , version_id  , active_status  FROM rad_chart_type INTO OUTFILE '$ART_DATA_PATH/art_chart_type.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT  data_field_id , data_field_name , data_field_json , created_by , created_date , updated_by , updated_date , version_id , active_status  FROM rad_chart_data_field_json INTO OUTFILE '$ART_DATA_PATH/art_chart_data_field_json.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT  lang_id , lang_name , country_code  , country_name , updated_by , updated_date , created_by , created_date , version_id  , active_status FROM rad_lang_master INTO OUTFILE '$ART_DATA_PATH/art_lang_master.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT  property_id , property_name , widgets , widgets_json , created_by , created_date , updated_by , updated_date , version_id , active_status  FROM rad_chart_properties INTO OUTFILE '$ART_DATA_PATH/art_chart_properties.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT  label_id , property_id , display_name  , lang_id , created_by , created_date , updated_by , updated_date , version_id  , active_status FROM rad_chart_prop_language INTO OUTFILE '$ART_DATA_PATH/art_chart_prop_language.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT  template_id , template_name , template_json , created_by , created_date , updated_by , updated_date , version_id , project_id , project_version_id , active_status , app_creator_id  FROM aws_chart_template WHERE  project_id='$PROJECT_ID' AND project_version_id='$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_chart_template.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT  report_id , report_name , report_synopsis , report_help , query_criteria_json , grid_conf_json , chart_properties , drilldown_json , dataEndPoint_json , created_by , created_date , updated_by , updated_date , project_id , project_version_id , app_creator_id , active_status , version_id , query_info ,  other_properties_json , search_json  , edit_flag,bounded_context,system_flag,advance_config_json  FROM aws_report_builder_details WHERE  project_id='$PROJECT_ID' AND project_version_id='$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_report_builder_details.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT  service_id  , service_name , service_class , service_json , source_details , status , project_id , app_creator_id , project_version_id , created_by , created_date , updated_by , updated_date , version_id , active_status , dao_id  FROM aws_service WHERE  project_id='$PROJECT_ID' AND project_version_id='$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_service.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT  operation_id , service_id  , operation_name , dao_class , operation_json , source_details , project_id , app_creator_id , project_version_id , created_by , created_date , updated_by , updated_date , version_id , active_status , dao_id , dao_operation_id  ,  operation_type  FROM aws_service_operation WHERE  project_id='$PROJECT_ID' AND project_version_id='$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_service_operation.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT log_config_id , version_id, created_by, created_date, updated_by, updated_date, active_status FROM aws_log_config_m WHERE project_id='$PROJECT_ID' AND project_version_id='$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_log_config_m.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT attribute_id, log_config_id, attribute_name, attribute_value, attribute_comment, attribute_display_name, version_id, created_by, created_date, updated_by, updated_date, active_status FROM aws_log_config_attributes WHERE project_id = '$PROJECT_ID' AND project_version_id = '$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_log_config_attributes.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT connector_id, log_config_id, connector_log_level, cid, id, enabled, connector_name, class_name, system_defined, version_id, created_by, created_date, updated_by, updated_date, active_status FROM aws_log_connector_m WHERE project_id = '$PROJECT_ID' AND project_version_id = '$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_log_connector_m.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT attribute_id, connector_id, attribute_name, attribute_value, attribute_comment, attribute_display_name, version_id, created_by, created_date, updated_by, updated_date, active_status FROM aws_log_connector_attributes_m WHERE project_id = '$PROJECT_ID' AND project_version_id = '$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_log_connector_attributes_m.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT id, log_module_name, connector_order_id, severity, id_range_starts_with, system_defined, version_id, created_by, created_date, updated_by, updated_date, active_status FROM aws_log_module WHERE project_id = '$PROJECT_ID' AND project_version_id = '$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_log_module.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT id, alarm_id, severity, connector_order_id, message, diagnose, solution, log_module_id, version_id, created_by, created_date, updated_by, updated_date, active_status FROM aws_app_alarm WHERE project_id = '$PROJECT_ID' AND project_version_id = '$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_app_alarm.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT  algoId ,  algorithm ,  algoName ,  algoDescription ,  active_status ,  created_date ,  updated_by ,  version_id ,  created_by ,  updated_date  FROM  rad_password_algorithm  INTO OUTFILE '$ART_DATA_PATH/art_password_algorithm.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT  policyId ,  policyName ,  policyDescription ,  minPwdLength ,  maxPwdLength ,  minCapitalLetters ,  minSmallLetters ,  minNumericValues ,  minSpecialLetters ,  allowedSpecialLetters ,  active_status ,  version_id ,  updated_date ,  updated_by ,  created_date ,  created_by  FROM  rad_password_policy   INTO OUTFILE '$ART_DATA_PATH/art_password_policy.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT schedulerId, schedulerkey, refreshTime, refreshUnit, batchSize, enabled, connectorClass, dataModel, schedulerName, threadPoolSize, 1 AS version_id, 1 AS created_by, CURRENT_TIMESTAMP AS created_date, 1 AS updated_by, CURRENT_TIMESTAMP AS updated_date, 1 AS active_status FROM aws_health_scheduler_config_m  WHERE project_id = '$PROJECT_ID' AND project_version_id = '$PROJECT_VERSION_ID'  INTO OUTFILE '$ART_DATA_PATH/art_health_scheduler_config_m.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT statusConfigId, diskPath, diskThreshold, executeSql, 1 AS version_id, 1 AS created_by, CURRENT_TIMESTAMP AS created_date, 1 AS updated_by, CURRENT_TIMESTAMP AS updated_date, 1 AS active_status FROM aws_health_status_config_m WHERE project_id = '$PROJECT_ID' AND project_version_id = '$PROJECT_VERSION_ID'  INTO OUTFILE '$ART_DATA_PATH/art_health_status_config_m.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT id,application_type,file_mime_type,extension,image FROM rad_cloud_drive_file_content_type INTO OUTFILE '$ART_DATA_PATH/cloud_drive_file_content_type.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT tag_id,tag_hierachy,tag_name,tag_image ,1 AS created_by,CURRENT_TIMESTAMP AS created_date ,1 AS updated_by, CURRENT_TIMESTAMP AS updated_date, 1 AS version_id,1 AS  active_status ,1 AS app_creator_id  FROM rad_cloud_drive_default_tag INTO OUTFILE '$ART_DATA_PATH/cloud_drive_tags.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT rule_id, rule_name, rule_xml, updated_by, updated_date, created_by,  created_date, version_id, active_status , project_id,project_version_id FROM aws_rules WHERE project_id='$PROJECT_ID' AND project_version_id='$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_rules.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT    integration_id,   integration_name,  integration_config_json,  integration_dsl,  project_id,  project_version_id,  created_by,  created_date,  app_creator_id,  updated_by,  updated_date,  version_id,  active_status, connectorId FROM aws_external_integration WHERE  project_id='$PROJECT_ID' AND project_version_id='$PROJECT_VERSION_ID'
 INTO OUTFILE '$ART_DATA_PATH/art_external_integration.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT jobId,jobName,uiJson,processJson,project_id,app_creator_id,project_version_id,
    created_by,
    created_date,
    updated_by,
    updated_date,
    version_id,
    active_status,
    beanName,
    currentStatus,
    statusTime FROM aws_job_details
WHERE  project_id='$PROJECT_ID' AND project_version_id='$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_job_details.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT schedulerId,
    schedulerExpression,
    jobId,
    project_id,
    app_creator_id,
    project_version_id,
    created_by,
    created_date,
    updated_by,
    version_id,
    active_status
FROM applifire.aws_scheduler_details WHERE  project_id='$PROJECT_ID' AND project_version_id='$PROJECT_VERSION_ID'
 INTO OUTFILE '$ART_DATA_PATH/art_scheduler_details.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

$MYSQL/mysql -p$PORT -u$USER -p$PASSWORD $DB_NAME -e "SELECT schedule_id, schedule_name, schedule_job, scheduler_expression, schedule_strategy, created_by, created_date, updated_by, updated_date, version_id, active_status FROM aws_schedule_config WHERE project_id = '$PROJECT_ID' AND project_version_id = '$PROJECT_VERSION_ID' INTO OUTFILE '$ART_DATA_PATH/art_schedule_config.csv' FIELDS TERMINATED BY '#appfire#' LINES TERMINATED BY '\n'";

echo 'copy ART data from applifire ends....'

