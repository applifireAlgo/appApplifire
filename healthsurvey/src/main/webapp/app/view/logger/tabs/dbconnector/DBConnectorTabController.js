/**
 * 
 */
Ext.define('Healthsurvey.view.logger.tabs.dbconnector.DBConnectorTabController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.dbConnectorTabController',
	
	rDBConnectorEnabled : null,
	
	rSameAsProjectCreation : null,
	relationalDatabaseDD : null,
	rDriverName : null,
	rDatabaseHost : null,
	rDatabasePort : null,
	rDatabaseUserId : null,
	rDatabasePassword : null,
	dbTablename : null,
	rBatchSize : null,
	rThreadTimeout : null,
	rThreadPool : null,
	connectorCid : null,
	attributeId : null,
	systemDefined : null,
	init : function()
	{
		var currentObject = this;
		
		currentObject.rDBConnectorEnabled = currentObject.view.down('#rDBConnectorEnabled');
		currentObject.rSameAsProjectCreation = currentObject.view.down('#rSameAsProjectCreation');

		currentObject.dbTablename = currentObject.view.down('#dbTablename');
		currentObject.rBatchSize = currentObject.view.down('#rBatchSize');	
		currentObject.rThreadTimeout = currentObject.view.down('#rThreadTimeout');
		currentObject.rThreadPool = currentObject.view.down('#rThreadPool');
		
		currentObject.connectorCid = currentObject.view.down('#dbConnectorCid');
		currentObject.attributeId = currentObject.view.down('#attributeId');
		currentObject.systemDefined = currentObject.view.down('#systemDefined');
	},
	onSameAsProjectCreation : function()
	{
		debugger;
	},
	setLoggerForm : function(parsedFormJSON)
	{
		debugger;
		var currentObject = this;
		
		var connector;
		
		for (i = 0; i < parsedFormJSON.connectorArray.length; i++) {
			if (parsedFormJSON.connectorArray[i].cid == currentObject.connectorCid.getValue()) {
				connector = parsedFormJSON.connectorArray[i];
			}
		}
		
		var logConnectorProperties = connector.logConnectorProperties;
		var isEnabled = connector.enabled == 'true' ? true : false;
		currentObject.rDBConnectorEnabled.setValue(isEnabled);
		
		currentObject.systemDefined.select(connector.systemDefined);
		
		currentObject.attributeId.setValue(connector.attributeId); 
		
		for (i = 0; i < logConnectorProperties.length; i++) {
			var attributeName = logConnectorProperties[i].attributeName
			
			switch (attributeName)
			{
			  case 'tablename':
				  	{
						currentObject.dbTablename.setValue(logConnectorProperties[i].attributeValue);
						currentObject.dbTablename.tip = logConnectorProperties[i].attributeComment;
						currentObject.dbTablename.attributeId = logConnectorProperties[i].attributeId;
				  		break;
				  	}
			  case 'batchSize': 
	  			{
			  		currentObject.rBatchSize.setValue(logConnectorProperties[i].attributeValue);
			  		currentObject.rBatchSize.tip = logConnectorProperties[i].attributeComment;
			  		currentObject.rBatchSize.attributeId = logConnectorProperties[i].attributeId;
			  		break;
	  			}
			  case 'threadPoolSize': 
				  	{
				  		currentObject.rThreadPool.setValue(logConnectorProperties[i].attributeValue);
				  		currentObject.rThreadPool.tip = logConnectorProperties[i].attributeComment;
				  		currentObject.rThreadPool.attributeId = logConnectorProperties[i].attributeId;
				  		break;
				  	}
			  case 'thread.timeout': 
			  		{
				  		currentObject.rThreadTimeout.setValue(logConnectorProperties[i].attributeValue);
				  		currentObject.rThreadTimeout.tip = logConnectorProperties[i].attributeComment;
				  		currentObject.rThreadTimeout.attributeId = logConnectorProperties[i].attributeId;
						break;
			  		}
			}
		}
	},
	
	toJson : function(formJSON){
		debugger;
		var decodedFormJSON = Ext.JSON.decode(formJSON);
		var id = decodedFormJSON.dbConnectorId;
		
		var tablename = decodedFormJSON.dbTablename;
		var batchSize = decodedFormJSON.rBatchSize;
		var threadTimeout = decodedFormJSON.rThreadTimeout; //thread.timeout
		var threadPoolSize = decodedFormJSON.rThreadPool;
		
		var enabled = this.rDBConnectorEnabled.getValue();
		var isSystemDefined =  this.systemDefined.getValue() == "true" ? true : false;
		var logLevel = decodedFormJSON.dbConnectorLogLevel;
		var name = decodedFormJSON.dbConnectorName;
		var className = decodedFormJSON.dbConnectorClassName;
		var cid = decodedFormJSON.dbConnectorCid;
			
		var dbConnectoeJson = '{';		
		
		dbConnectoeJson = dbConnectoeJson.concat("'id': '"+ id + "',");
		
		dbConnectoeJson = dbConnectoeJson.concat("'logConnectorProperties': [ ");
		
		dbConnectoeJson = dbConnectoeJson.concat("{'attributeName': 'tablename',");
		dbConnectoeJson = dbConnectoeJson.concat("'attributeComment': '"+this.dbTablename.tip+"',");
		dbConnectoeJson = dbConnectoeJson.concat("'attributeValue': '"+ tablename + "',");
		dbConnectoeJson = dbConnectoeJson.concat("'attributeDisplayName': '"+this.dbTablename.fieldLabel+"',");
		dbConnectoeJson = dbConnectoeJson.concat("'attributeId': '"+this.dbTablename.attributeId+"'},");
		
		dbConnectoeJson = dbConnectoeJson.concat("{'attributeName': 'batchSize',");
		dbConnectoeJson = dbConnectoeJson.concat("'attributeComment': '"+this.rBatchSize.tip+"',");
		dbConnectoeJson = dbConnectoeJson.concat("'attributeValue': '"+ batchSize + "',");
		dbConnectoeJson = dbConnectoeJson.concat("'attributeDisplayName': '"+this.rBatchSize.fieldLabel+"',");
		dbConnectoeJson = dbConnectoeJson.concat("'attributeId': '"+this.rBatchSize.attributeId+"'},");
		
		dbConnectoeJson = dbConnectoeJson.concat("{'attributeName': 'thread.timeout',");
		dbConnectoeJson = dbConnectoeJson.concat("'attributeComment': '"+this.rThreadTimeout.tip+"',");
		dbConnectoeJson = dbConnectoeJson.concat("'attributeValue': '"+ threadTimeout + "',");
		dbConnectoeJson = dbConnectoeJson.concat("'attributeDisplayName': '"+this.rThreadTimeout.fieldLabel+"',");
		dbConnectoeJson = dbConnectoeJson.concat("'attributeId': '"+this.rThreadTimeout.attributeId+"'},");
		
		dbConnectoeJson = dbConnectoeJson.concat("{'attributeName': 'threadPoolSize',");
		dbConnectoeJson = dbConnectoeJson.concat("'attributeComment': '"+this.rThreadPool.tip+"',");
		dbConnectoeJson = dbConnectoeJson.concat("'attributeValue': '"+ threadPoolSize + "',");
		dbConnectoeJson = dbConnectoeJson.concat("'attributeDisplayName': '"+this.rThreadPool.fieldLabel+"',");
		dbConnectoeJson = dbConnectoeJson.concat("'attributeId': '"+this.rThreadPool.attributeId+"'}],");
		
		dbConnectoeJson = dbConnectoeJson.concat("'enabled': "+ enabled + ",");
		dbConnectoeJson = dbConnectoeJson.concat("'logLevel': "+ logLevel + ",");
		dbConnectoeJson = dbConnectoeJson.concat("'name': '"+ name + "',");
		dbConnectoeJson = dbConnectoeJson.concat("'className': '"+ className + "',");
		dbConnectoeJson = dbConnectoeJson.concat("'cid': "+ cid + ",");
		dbConnectoeJson = dbConnectoeJson.concat("'attributeId': "+ this.attributeId.getValue() + ",");
		dbConnectoeJson = dbConnectoeJson.concat("'systemDefined': "+ isSystemDefined + "}");
		
		return dbConnectoeJson;
}
});