/**
 * 
 */
Ext.define('Healthsurvey.view.apphealth.AppHealthConnectorController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.appHealthConnectorController',

	connectorId : null,
	connectorName : null,
	isEnabled : null,
	connectorClass : null,
	dataModel : null,

	batchSize : null,
	refreshTime : null,
	refreshUnit : null,
	threadPoolSize : null,

	statusConfigId : null,
	diskPath : null,
	diskThreshold : null,
	executeSql : null,

	diskProperties : null,
	databaseProperties : null,
	schedulerVersionId : null,
	statusVersionId : null,

	init : function() {
		var currentObject = this;
		currentObject.diskProperties = currentObject.view.down('#diskProperties');
		currentObject.databaseProperties = currentObject.view.down('#databaseProperties');

		currentObject.connectorId = currentObject.view.down('#connectorId');
		currentObject.connectorName = currentObject.view.down('#connectorName');
		currentObject.isEnabled = currentObject.view.down('#isEnabled');
		currentObject.connectorClass = currentObject.view.down('#connectorClass');
		currentObject.dataModel = currentObject.view.down('#dataModel');

		currentObject.batchSize = currentObject.view.down('#batchSize');
		currentObject.refreshTime = currentObject.view.down('#refreshTime');
		currentObject.refreshUnit = currentObject.view.down('#refreshUnit');
		currentObject.threadPoolSize = currentObject.view.down('#threadPoolSize');

		currentObject.statusConfigId = currentObject.view.down('#statusConfigId');
		currentObject.diskPath = currentObject.view.down('#diskPath');
		currentObject.diskThreshold = currentObject.view.down('#diskThreshold');
		currentObject.executeSql = currentObject.view.down('#executeSql');
		currentObject.schedulerVersionId = currentObject.view.down('#schedulerVersionId');
		currentObject.statusVersionId = currentObject.view.down('#statusVersionId');
	},

	setFormData : function(appHealthScheduler, appHealthStatusData, statusPanelIndex) {
		var currentObject = this;
		currentObject.connectorId.setValue(appHealthScheduler.schedulerId);
		currentObject.connectorName.setValue(appHealthScheduler.schedulerName);
		currentObject.isEnabled.setValue(appHealthScheduler.enabled);
		currentObject.connectorClass.setValue(appHealthScheduler.connectorClass);
		currentObject.dataModel.setValue(appHealthScheduler.dataModel);

		currentObject.batchSize.setValue(appHealthScheduler.batchSize);
		currentObject.threadPoolSize.setValue(appHealthScheduler.threadPoolSize);
		currentObject.refreshTime.setValue(appHealthScheduler.refreshTime);
		currentObject.refreshUnit.setValue(appHealthScheduler.refreshUnit);

		currentObject.statusConfigId.setValue(appHealthStatusData.statusConfigId);
		currentObject.diskPath.setValue(appHealthStatusData.diskPath);
		currentObject.diskThreshold.setValue(appHealthStatusData.diskThreshold);
		currentObject.executeSql.setValue(appHealthStatusData.executeSql);
		if (appHealthScheduler.schedulerName != "connector.status") {
			currentObject.diskProperties.hide();
			currentObject.databaseProperties.hide();
		}
		currentObject.schedulerVersionId.setValue(appHealthScheduler.version_id);
		currentObject.statusVersionId.setValue(appHealthStatusData.version_id);
	},

	setConfigurationFields : function(configuration) {
		var form = this.view.getForm();
		var dbSQL = Ext.create("Ext.form.field.Text", {
			fieldLabel : "First Name",
			value : configuration.dbSQL
		});
		this.view.add(dbSQL);
	},

	getStatusJson : function() {
		var currentObject = this;
		var connectorStatusJson = '{';
		connectorStatusJson = connectorStatusJson.concat("'primaryKey': '"+ currentObject.statusConfigId.getValue() + "',");
		connectorStatusJson = connectorStatusJson.concat("'statusConfigId': '" + currentObject.statusConfigId.getValue() + "',");
		connectorStatusJson = connectorStatusJson.concat("'diskPath': '" + currentObject.diskPath.getValue() + "',");
		connectorStatusJson = connectorStatusJson.concat("'diskThreshold': '" + currentObject.diskThreshold.getValue() + "',");
		connectorStatusJson = connectorStatusJson.concat("'executeSql': '" + currentObject.executeSql.getRawValue() + "',");
		connectorStatusJson = connectorStatusJson.concat("'version_id': "+ currentObject.statusVersionId.getValue() + ",");
		connectorStatusJson = connectorStatusJson.concat("'primaryDisplay': '"+ "" + "'}");
		return connectorStatusJson;
	},

	toJson : function() {
		var currentObject = this;
		var connectorJson = '{';
		connectorJson = connectorJson.concat("'primaryKey': '"+ currentObject.connectorId.getValue() + "',");
		connectorJson = connectorJson.concat("'schedulerId': '" + currentObject.connectorId.getValue() + "',");

		connectorJson = connectorJson.concat("'schedulerKey': '" + currentObject.getView().getTitle() + "',");
		connectorJson = connectorJson.concat("'schedulerName': '" + currentObject.connectorName.getValue() + "',");
		connectorJson = connectorJson.concat("'enabled': '" + currentObject.isEnabled.getValue() + "',");
		connectorJson = connectorJson.concat("'connectorClass': '" + currentObject.connectorClass.getValue() + "',");
		connectorJson = connectorJson.concat("'dataModel': '" + currentObject.dataModel.getValue() + "',");

		connectorJson = connectorJson.concat("'batchSize': '" + currentObject.batchSize.getValue() + "',");
		connectorJson = connectorJson.concat("'threadPoolSize': '" + currentObject.threadPoolSize.getValue() + "',");

		connectorJson = connectorJson.concat("'refreshTime': '" + currentObject.refreshTime.getValue() + "',");
		connectorJson = connectorJson.concat("'refreshUnit': '" + currentObject.refreshUnit.getValue() + "',");
		connectorJson = connectorJson.concat("'version_id': "+ currentObject.schedulerVersionId.getValue() + ",");
		connectorJson = connectorJson.concat("'primaryDisplay': '"+ "" + "'}");

		return connectorJson;
	},

});