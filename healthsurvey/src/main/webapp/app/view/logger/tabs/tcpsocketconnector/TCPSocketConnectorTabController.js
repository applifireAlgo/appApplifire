/**
 * 
 */
Ext.define('Healthsurvey.view.logger.tabs.tcpsocketconnector.TCPSocketConnectorTabController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.tcpSocketConnectorTabController',

	tcpEnabled : null,
	tcpDatabaseHost : null,
	tcpDatabasePort : null,
	connectorCid : null,
	attributeId : null,
	systemDefined : null,
	init : function()
	{
		var currentObject = this;
		currentObject.tcpEnabled = currentObject.view.down('#tcpEnabled');  
		currentObject.tcpDatabaseHost = currentObject.view.down('#tcpDatabaseHost');
		currentObject.tcpDatabasePort = currentObject.view.down('#tcpDatabasePort');
			
		currentObject.connectorCid = currentObject.view.down('#tcpCid');
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
	
		currentObject.tcpEnabled.setValue(isEnabled);
		currentObject.systemDefined.select(connector.systemDefined);
		
		currentObject.attributeId.setValue(connector.attributeId);
		
		for (i = 0; i < logConnectorProperties.length; i++) {
			var attributeName = logConnectorProperties[i].attributeName
			
			switch (attributeName)
			{
			  case 'hostname': 
	  			{
				  	currentObject.tcpDatabaseHost.setValue(logConnectorProperties[i].attributeValue);
					currentObject.tcpDatabaseHost.tip = logConnectorProperties[i].attributeComment;
					currentObject.tcpDatabaseHost.attributeId = logConnectorProperties[i].attributeId;
					break;
				}
			  case 'port': 
	  			{
				  	currentObject.tcpDatabasePort.setValue(logConnectorProperties[i].attributeValue);
					currentObject.tcpDatabasePort.tip = logConnectorProperties[i].attributeComment;
					currentObject.tcpDatabasePort.attributeId = logConnectorProperties[i].attributeId;
					break;
				}
			}
		}
	},
	
	toJson : function(formJSON) {
		debugger;
		var decodedFormJSON = Ext.JSON.decode(formJSON);
		var id = decodedFormJSON.tcpId;
		var enabled = this.tcpEnabled.getValue();
		var isSystemDefined =  this.systemDefined.getValue() == "true" ? true : false;
		var logLevel = decodedFormJSON.tcpLogLevel;
		var name = decodedFormJSON.tcpName;
		var className = decodedFormJSON.tcpClassName;
		var cid = decodedFormJSON.tcpCid;
		var tcpHost = decodedFormJSON.tcpDatabaseHost;
		var tcpPort = decodedFormJSON.tcpDatabasePort;
		
		var tcpSocketConnectorJson = '{';		
		
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("'id': '"+ id + "',");
		
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("'logConnectorProperties': [ ");
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("{'attributeName': 'hostname',");
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("'attributeComment': '"+this.tcpDatabaseHost.tip+"',");
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("'attributeValue': '"+ tcpHost + "',");
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("'attributeDisplayName': '"+this.tcpDatabaseHost.fieldLabel+"',");
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("'attributeId': '"+this.tcpDatabaseHost.attributeId+"'},");
		
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("{'attributeName': 'port',");
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("'attributeComment': '"+this.tcpDatabasePort.tip+"',");
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("'attributeValue': '"+ tcpPort + "',");
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("'attributeDisplayName': '"+this.tcpDatabasePort.fieldLabel+"',");
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("'attributeId': '"+this.tcpDatabasePort.attributeId+"'}],");
		
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("'enabled': "+ enabled + ",");
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("'logLevel': "+ logLevel + ",");
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("'name': '"+ name + "',");
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("'className': '"+ className + "',");
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("'cid': "+ cid + ",");
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("'attributeId': "+ this.attributeId.getValue() + ",");
		tcpSocketConnectorJson = tcpSocketConnectorJson.concat("'systemDefined': "+ isSystemDefined + "}");
		
		return tcpSocketConnectorJson;
	}

});