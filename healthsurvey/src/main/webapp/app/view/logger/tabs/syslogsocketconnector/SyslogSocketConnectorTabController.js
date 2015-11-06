/**
 * 
 */
/**
 * 
 */
Ext.define('Healthsurvey.view.logger.tabs.syslogsocketconnector.SyslogSocketConnectorTabController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.syslogSocketConnectorTabController',
	
	syslogEnabled : null,
	syslogDatabaseHost : null,
	syslogDatabasePort : null,
	connectorCid : null,
	attributeId : null,
	systemDefined : null,
	
	init : function()
	{
		var currentObject = this;
		currentObject.syslogEnabled = currentObject.view.down('#syslogEnabled');  
		currentObject.syslogDatabaseHost = currentObject.view.down('#syslogDatabaseHost');
		currentObject.syslogDatabasePort = currentObject.view.down('#syslogDatabasePort');
		
		currentObject.connectorCid = currentObject.view.down('#syslogCid');
		currentObject.attributeId = currentObject.view.down('#attributeId');
		currentObject.systemDefined = currentObject.view.down('#systemDefined');
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
		currentObject.syslogEnabled.setValue(isEnabled);
		
		currentObject.systemDefined.select(connector.systemDefined);
		
		currentObject.attributeId.setValue(connector.attributeId);
	
		for (i = 0; i < logConnectorProperties.length; i++) {
			var attributeName = logConnectorProperties[i].attributeName
			
			switch (attributeName)
			{
			  case 'hostname': 
	  			{
					currentObject.syslogDatabaseHost.setValue(logConnectorProperties[i].attributeValue);
					currentObject.syslogDatabaseHost.tip = logConnectorProperties[i].attributeComment;
					currentObject.syslogDatabaseHost.attributeId = logConnectorProperties[i].attributeId;
					break;
				}
			  case 'port': 
	  			{
				  	currentObject.syslogDatabasePort.setValue(logConnectorProperties[i].attributeValue);
					currentObject.syslogDatabasePort.tip = logConnectorProperties[i].attributeComment;
					currentObject.syslogDatabasePort.attributeId = logConnectorProperties[i].attributeId;
					break;
				}
			}
		}
	},
	
	toJson : function(formJSON) {
		debugger;
		var decodedFormJSON = Ext.JSON.decode(formJSON);
		var id = decodedFormJSON.syslogId;
		var enabled = this.syslogEnabled.getValue();
		var isSystemDefined =  this.systemDefined.getValue() == "true" ? true : false;
		
		var logLevel = decodedFormJSON.syslogLogLevel;
		var name = decodedFormJSON.syslogName;
		var className = decodedFormJSON.syslogClassName;
		var cid = decodedFormJSON.syslogCid;
		var syslogHost = decodedFormJSON.syslogDatabaseHost;
		var syslogPort = decodedFormJSON.syslogDatabasePort;
		
		var syslogSocketConnectorJson = '{';		
		
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("'id': '"+ id + "',");
		
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("'logConnectorProperties': [ ");
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("{'attributeName': 'hostname',");
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("'attributeComment': '"+this.syslogDatabaseHost.tip+"',");
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("'attributeValue': '"+ syslogHost + "',");
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("'attributeDisplayName': '"+this.syslogDatabaseHost.fieldLabel+"',");
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("'attributeId': '"+this.syslogDatabaseHost.attributeId+"'},");
		
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("{'attributeName': 'port',");
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("'attributeComment': '"+this.syslogDatabasePort.tip+"',");
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("'attributeValue': '"+ syslogPort + "',");
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("'attributeDisplayName': '"+this.syslogDatabasePort.fieldLabel+"',");
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("'attributeId': '"+this.syslogDatabasePort.attributeId+"'}],");
		
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("'enabled': "+ enabled + ",");
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("'logLevel': "+ logLevel + ",");
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("'name': '"+ name + "',");
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("'className': '"+ className + "',");
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("'cid': "+ cid + ",");
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("'attributeId': "+ this.attributeId.getValue() + ",");
		syslogSocketConnectorJson = syslogSocketConnectorJson.concat("'systemDefined': "+ isSystemDefined + "}");
		
		return syslogSocketConnectorJson;
},
	
});