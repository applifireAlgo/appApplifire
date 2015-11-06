/**
 * 
 */
/**
 * 
 */
Ext.define('Healthsurvey.view.logger.tabs.fileconnector.FileConnectorTabController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.fileConnectorTabController',
	
	fileConnectorEnabled : null,
	outPath : null,
	backupPath : null,
	backupDatePattern : null,
	bufferSize : null,
	flushPeriod : null,
	backupAfterNoOfFiles : null,
	rolloverTime : null,
	rolloverTimeUnit : null,
	rolloverSize : null,
	rolloverSizeUnit : null,
	rolloverPolicy : null,
	connectorCid : null,
	attributeId : null,
	systemDefined : null,
	init : function()
	{
		debugger;
		var currentObject = this;
		currentObject.fileConnectorEnabled = currentObject.view.down('#fileConnectorEnabled');
		currentObject.outPath = currentObject.view.down('#outPath');
		currentObject.backupPath = currentObject.view.down('#backupPath');
		currentObject.backupDatePattern = currentObject.view.down('#backupDatePattern');
		currentObject.bufferSize = currentObject.view.down('#bufferSize');
		currentObject.flushPeriod = currentObject.view.down('#flushPeriod');
		currentObject.backupAfterNoOfFiles = currentObject.view.down('#backupAfterNoOfFiles');
		currentObject.rolloverTime = currentObject.view.down('#rolloverTime');
		currentObject.rolloverTimeUnit = currentObject.view.down('#rolloverTimeUnit');
		currentObject.rolloverSize = currentObject.view.down('#rolloverSize');
		currentObject.rolloverSizeUnit = currentObject.view.down('#rolloverSizeUnit');
		currentObject.rolloverPolicy = currentObject.view.down('#rolloverPolicy');
		
		currentObject.connectorCid = currentObject.view.down('#fileConnectorCid');
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
		
		currentObject.fileConnectorEnabled.setValue(isEnabled);
		currentObject.systemDefined.select(connector.systemDefined);
		
		currentObject.attributeId.setValue(connector.attributeId);
		
		for (i = 0; i < logConnectorProperties.length; i++) {
			var attributeName = logConnectorProperties[i].attributeName
			
			switch (attributeName)
			{
				case 'output.path': 
				{
					currentObject.outPath.setValue(logConnectorProperties[i].attributeValue);
					currentObject.outPath.tip = logConnectorProperties[i].attributeComment;
					currentObject.outPath.attributeId = logConnectorProperties[i].attributeId;
					break;
				}  
				case 'backup.path': 
		  		{
				  	currentObject.backupPath.setValue(logConnectorProperties[i].attributeValue);
					currentObject.backupPath.tip = logConnectorProperties[i].attributeComment;
					currentObject.backupPath.attributeId = logConnectorProperties[i].attributeId;
					break;
				}
				case 'backup.date.pattern': 
	  			{
				  	currentObject.backupDatePattern.setValue(logConnectorProperties[i].attributeValue);
					currentObject.backupDatePattern.tip = logConnectorProperties[i].attributeComment;
					currentObject.backupDatePattern.attributeId = logConnectorProperties[i].attributeId;	
					break;
				}
				case 'buffer.size': 
	  			{
				  	currentObject.bufferSize.setValue(logConnectorProperties[i].attributeValue);
					currentObject.bufferSize.tip = logConnectorProperties[i].attributeComment;
					currentObject.bufferSize.attributeId = logConnectorProperties[i].attributeId;
					break;
				}
				case 'flush.period': 
		  		{
				  	currentObject.flushPeriod.setValue(logConnectorProperties[i].attributeValue);
					currentObject.flushPeriod.tip = logConnectorProperties[i].attributeComment;
					currentObject.flushPeriod.attributeId = logConnectorProperties[i].attributeId;
					break;
				}
				case 'backup.keep.last.x.files': 
	  			{
				  	currentObject.backupAfterNoOfFiles.setValue(logConnectorProperties[i].attributeValue);
					currentObject.backupAfterNoOfFiles.tip = logConnectorProperties[i].attributeComment;
					currentObject.backupAfterNoOfFiles.attributeId = logConnectorProperties[i].attributeId;
					break;
				}
				case 'file.rollover.time': 
	  			{
					currentObject.rolloverTime.setValue(logConnectorProperties[i].attributeValue);
					currentObject.rolloverTime.tip = logConnectorProperties[i].attributeComment;
					currentObject.rolloverTime.attributeId = logConnectorProperties[i].attributeId;
					break;
				}
				case 'file.rollover.time.unit': 
		  		{
				  	currentObject.rolloverTimeUnit.setValue(logConnectorProperties[i].attributeValue);
					currentObject.rolloverTimeUnit.tip = logConnectorProperties[i].attributeComment;
					currentObject.rolloverTimeUnit.attributeId = logConnectorProperties[i].attributeId;
					break;
				} 
	  			
			  case 'file.rollover.size': 
	  			{
				  	currentObject.rolloverSize.setValue(logConnectorProperties[i].attributeValue);
					currentObject.rolloverSize.tip = logConnectorProperties[i].attributeComment;
					currentObject.rolloverSize.attributeId = logConnectorProperties[i].attributeId;
					break;
				}
			  case 'file.rollover.size.unit': 
	  			{
					currentObject.rolloverSizeUnit.setValue(logConnectorProperties[i].attributeValue);
					currentObject.rolloverSizeUnit.tip = logConnectorProperties[i].attributeComment;
					currentObject.rolloverSizeUnit.attributeId = logConnectorProperties[i].attributeId;	
					break;
				}
	  		  case 'file.rollover.policy': 
	  			{
	  			  	currentObject.rolloverPolicy.select(currentObject.rolloverPolicy.getStore().getAt(logConnectorProperties[i].attributeValue));
	  			  	currentObject.rolloverPolicy.tip = logConnectorProperties[i].attributeComment;
	  			  	currentObject.rolloverPolicy.attributeId = logConnectorProperties[i].attributeId;
					break;
				}
			}
		}
	},

	toJson : function(formJSON) {
		debugger;
		var decodedFormJSON = Ext.JSON.decode(formJSON);
		var id = decodedFormJSON.fileConnectorId;
		var enabled = this.fileConnectorEnabled.getValue();
		var isSystemDefined =  this.systemDefined.getValue() == "true" ? true : false;
		var logLevel = decodedFormJSON.fileConnectorLogLevel;
		var name = decodedFormJSON.fileConnectorName;
		var className = decodedFormJSON.fileConnectorClassName;
		var cid = decodedFormJSON.fileConnectorCid;
		
		var outputPath = decodedFormJSON.outPath;
		var backupPath = decodedFormJSON.backupPath;
		var backupDatePattern = decodedFormJSON.backupDatePattern;
		var bufferSize = decodedFormJSON.bufferSize;
		var flushPeriod = decodedFormJSON.flushPeriod;
		var backupAfterNoOfFiles = decodedFormJSON.backupAfterNoOfFiles;
		var rolloverTime = decodedFormJSON.rolloverTime;
		var rolloverTimeUnit = decodedFormJSON.rolloverTimeUnit;
		var rolloverSize = decodedFormJSON.rolloverSize;
		var rolloverSizeUnit = decodedFormJSON.rolloverSizeUnit;
		var rolloverPolicy = decodedFormJSON.rolloverPolicy;

		var fileConnectorJson = '{';		
		
		fileConnectorJson = fileConnectorJson.concat("'id': '"+ id + "',");
		
		fileConnectorJson = fileConnectorJson.concat("'logConnectorProperties': [ ");
		fileConnectorJson = fileConnectorJson.concat("{'attributeName': 'output.path',");
		fileConnectorJson = fileConnectorJson.concat("'attributeComment': '"+this.outPath.tip+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeValue': '"+ outputPath + "',");
		fileConnectorJson = fileConnectorJson.concat("'attributeDisplayName': '"+this.outPath.fieldLabel+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeId': '"+this.outPath.attributeId+"'},");
		
		
		fileConnectorJson = fileConnectorJson.concat("{'attributeName': 'backup.path',");
		fileConnectorJson = fileConnectorJson.concat("'attributeComment': '"+this.backupPath.tip+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeValue': '"+ backupPath + "',");
		fileConnectorJson = fileConnectorJson.concat("'attributeDisplayName': '"+this.backupPath.fieldLabel+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeId': '"+this.backupPath.attributeId+"'},");
		
		
		fileConnectorJson = fileConnectorJson.concat("{'attributeName': 'backup.date.pattern',");
		fileConnectorJson = fileConnectorJson.concat("'attributeComment': '"+this.backupDatePattern.tip+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeValue': '"+ backupDatePattern + "',");
		fileConnectorJson = fileConnectorJson.concat("'attributeDisplayName': '"+this.backupDatePattern.fieldLabel+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeId': '"+this.backupDatePattern.attributeId+"'},");
		
		fileConnectorJson = fileConnectorJson.concat("{'attributeName': 'buffer.size',");
		fileConnectorJson = fileConnectorJson.concat("'attributeComment': '"+this.bufferSize.tip+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeValue': '"+ bufferSize + "',");
		fileConnectorJson = fileConnectorJson.concat("'attributeDisplayName': '"+this.bufferSize.fieldLabel+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeId': '"+this.bufferSize.attributeId+"'},");
		
		fileConnectorJson = fileConnectorJson.concat("{'attributeName': 'flush.period',");
		fileConnectorJson = fileConnectorJson.concat("'attributeComment': '"+this.flushPeriod.tip+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeValue': '"+ flushPeriod + "',");
		fileConnectorJson = fileConnectorJson.concat("'attributeDisplayName': '"+this.flushPeriod.fieldLabel+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeId': '"+this.flushPeriod.attributeId+"'},");
		
		fileConnectorJson = fileConnectorJson.concat("{'attributeName': 'backup.keep.last.x.files',");
		fileConnectorJson = fileConnectorJson.concat("'attributeComment': '"+this.backupAfterNoOfFiles.tip+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeValue': '"+ backupAfterNoOfFiles + "',");
		fileConnectorJson = fileConnectorJson.concat("'attributeDisplayName': '"+this.backupAfterNoOfFiles.fieldLabel+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeId': '"+this.backupAfterNoOfFiles.attributeId+"'},");
		
		fileConnectorJson = fileConnectorJson.concat("{'attributeName': 'file.rollover.time',");
		fileConnectorJson = fileConnectorJson.concat("'attributeComment': '"+this.rolloverTime.tip+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeValue': '"+ rolloverTime + "',");
		fileConnectorJson = fileConnectorJson.concat("'attributeDisplayName': '"+this.rolloverTime.fieldLabel+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeId': '"+this.rolloverTime.attributeId+"'},");
		
		fileConnectorJson = fileConnectorJson.concat("{'attributeName': 'file.rollover.time.unit',");
		fileConnectorJson = fileConnectorJson.concat("'attributeComment': '"+this.rolloverTimeUnit.tip+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeValue': '"+ rolloverTimeUnit + "',");
		fileConnectorJson = fileConnectorJson.concat("'attributeDisplayName': '"+this.rolloverTimeUnit.fieldLabel+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeId': '"+this.rolloverTimeUnit.attributeId+"'},");
		
		fileConnectorJson = fileConnectorJson.concat("{'attributeName': 'file.rollover.size',");
		fileConnectorJson = fileConnectorJson.concat("'attributeComment': '"+this.rolloverSize.tip+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeValue': '"+ rolloverSize + "',");
		fileConnectorJson = fileConnectorJson.concat("'attributeDisplayName': '"+this.rolloverSize.fieldLabel+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeId': '"+this.rolloverSize.attributeId+"'},");
		
		fileConnectorJson = fileConnectorJson.concat("{'attributeName': 'file.rollover.size.unit',");
		fileConnectorJson = fileConnectorJson.concat("'attributeComment': '"+this.rolloverSizeUnit.tip+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeValue': '"+ rolloverSizeUnit + "',");
		fileConnectorJson = fileConnectorJson.concat("'attributeDisplayName': '"+this.rolloverSizeUnit.fieldLabel+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeId': '"+this.rolloverSizeUnit.attributeId+"'},");
		
		fileConnectorJson = fileConnectorJson.concat("{'attributeName': 'file.rollover.policy',");
		fileConnectorJson = fileConnectorJson.concat("'attributeComment': '"+this.rolloverPolicy.tip+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeValue': "+ rolloverPolicy + ",");
		fileConnectorJson = fileConnectorJson.concat("'attributeDisplayName': '"+this.rolloverPolicy.fieldLabel+"',");
		fileConnectorJson = fileConnectorJson.concat("'attributeId': '"+this.rolloverPolicy.attributeId+"'}],");
		
		fileConnectorJson = fileConnectorJson.concat("'enabled': "+ enabled + ",");
		fileConnectorJson = fileConnectorJson.concat("'logLevel': "+ logLevel + ",");
		fileConnectorJson = fileConnectorJson.concat("'name': '"+ name + "',");
		fileConnectorJson = fileConnectorJson.concat("'className': '"+ className + "',");
		fileConnectorJson = fileConnectorJson.concat("'cid': "+ cid + ",");
		fileConnectorJson = fileConnectorJson.concat("'attributeId': "+ this.attributeId.getValue() + ",");
		fileConnectorJson = fileConnectorJson.concat("'systemDefined': "+ isSystemDefined + "}");
		
		return fileConnectorJson;
	}
	
});