/**
 * 
 */
Ext.define('Healthsurvey.view.logger.tabs.details.DetailsTabConnector', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.detailsTabConnector',
	
	alarmQueueType : null,
	alarmVolume : null,
	refreshFrequency : null,
	
	alarmSaverity : null,
	saverity0 : null,
	saverity1 : null,
	saverity2 : null,
	saverity3 : null,
	saverity4 : null,
	saverity5 : null,
	init : function()
	{
		var currentObject = this;
		currentObject.alarmQueueType = currentObject.view.down('#alarmQueueType');
		currentObject.alarmVolume = currentObject.view.down('#alarmVolume');
		currentObject.refreshFrequency = currentObject.view.down('#refreshFrequency');
		
		currentObject.alarmSaverity = currentObject.view.down('#alarmSaverity');
		currentObject.saverity0 = currentObject.view.down('#saverity0');
		currentObject.saverity1 = currentObject.view.down('#saverity1');
		currentObject.saverity2 = currentObject.view.down('#saverity2');
		currentObject.saverity3 = currentObject.view.down('#saverity3');
		currentObject.saverity4 = currentObject.view.down('#saverity4');
		currentObject.saverity5 = currentObject.view.down('#saverity5');
	},
	setLoggerForm : function(parsedFormJSON)
	{
		debugger;
		var currentObject = this;
		var loggingPropertiesJSON = parsedFormJSON.loggingProperties;
		
		for (i = 0; i < loggingPropertiesJSON.length; i++) {
			var attributeName = loggingPropertiesJSON[i].attributeName
			
			switch (attributeName)
			{
			  case 'refresh.frequency':
				  	{
				  		currentObject.refreshFrequency.setValue(loggingPropertiesJSON[i].attributeValue);
				  		currentObject.refreshFrequency.tip = loggingPropertiesJSON[i].attributeComment;
				  		currentObject.refreshFrequency.attributeId = loggingPropertiesJSON[i].attributeId;
				  		break;
				  	}
			  case 'alarm.queue': 
				  	{
				  		currentObject.alarmQueueType.tip = loggingPropertiesJSON[i].attributeComment;
				  		currentObject.alarmQueueType.select(currentObject.alarmQueueType.getStore().getAt(loggingPropertiesJSON[i].attributeValue));
				  		currentObject.alarmQueueType.attributeId = loggingPropertiesJSON[i].attributeId;
				  		break;
				  	}
			  case 'alarm.volume': 
			  		{
						currentObject.alarmVolume.setValue(loggingPropertiesJSON[i].attributeValue)
						currentObject.alarmVolume.tip = loggingPropertiesJSON[i].attributeComment;
						currentObject.alarmVolume.attributeId = loggingPropertiesJSON[i].attributeId;
						break;
			  		}
			}
		}
		
		var alarmSaverity = parsedFormJSON.alarmSeverity;
		
		for (i = 0; i < alarmSaverity.length; i++) {
			var attributeName = alarmSaverity[i].attributeName
			
			switch (attributeName)
			{
			  case '0':
				  	{
				  		currentObject.saverity0.setValue(alarmSaverity[i].attributeValue);
				  		currentObject.saverity0.attributeId = alarmSaverity[i].attributeId;
				  		break;
				  	}
			  case '1': 
				  	{
				  		currentObject.saverity1.setValue(alarmSaverity[i].attributeValue);
				  		currentObject.saverity1.attributeId = alarmSaverity[i].attributeId;
				  		break;
				  	}
			  case '2': 
			  		{
				  		currentObject.saverity2.setValue(alarmSaverity[i].attributeValue);	
				  		currentObject.saverity2.attributeId = alarmSaverity[i].attributeId;
						break;
			  		}
			  case '3':
			  	{
				  	currentObject.saverity4.setValue(alarmSaverity[i].attributeValue);
					currentObject.saverity4.attributeId = alarmSaverity[i].attributeId;
			  		break;
			  	}
			  case '4': 
			  	{
				  	currentObject.saverity3.setValue(alarmSaverity[i].attributeValue);
					currentObject.saverity3.attributeId = alarmSaverity[i].attributeId;
			  		break;
			  	}
			  case '5': 
		  		{
				  	currentObject.saverity5.setValue(alarmSaverity[i].attributeValue);	
					currentObject.saverity5.attributeId = alarmSaverity[i].attributeId;
					break;
		  		}
			}
		}
	},

	toJson : function(formJSON) {
		debugger;
		var decodedFormJSON = Ext.JSON.decode(formJSON);
		
		var id = decodedFormJSON.detailsId;
		var alarmQueueType = decodedFormJSON.alarmQueueType;
		var alarmVolume = decodedFormJSON.alarmVolume;
		var refreshFrequency = decodedFormJSON.refreshFrequency;
		
		var saverity0 = decodedFormJSON.saverity0;
		var saverity1 = decodedFormJSON.saverity1;
		var saverity2 = decodedFormJSON.saverity2;
		var saverity3 = decodedFormJSON.saverity3;
		var saverity4 = decodedFormJSON.saverity4;
		var saverity5 = decodedFormJSON.saverity5;
		
		var loggingPropertiesJson = '';		
		
		loggingPropertiesJson = loggingPropertiesJson.concat("'loggingProperties': [ ");
		loggingPropertiesJson = loggingPropertiesJson.concat("{'attributeName': 'alarm.queue',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeComment': '"+this.alarmQueueType.tip+"',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeValue': "+ alarmQueueType + ",");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeDisplayName': '"+this.alarmQueueType.fieldLabel+"',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeId': '"+this.alarmQueueType.attributeId+"'},");
		
		loggingPropertiesJson = loggingPropertiesJson.concat("{'attributeName': 'alarm.volume',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeComment': '"+this.alarmVolume.tip+"',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeValue': "+ alarmVolume + ",");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeDisplayName': '"+this.alarmVolume.fieldLabel+"',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeId': '"+this.alarmVolume.attributeId+"'},");
		
		loggingPropertiesJson = loggingPropertiesJson.concat("{'attributeName': 'refresh.frequency',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeComment': '"+this.refreshFrequency.tip+"',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeValue': "+ refreshFrequency + ",");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeDisplayName': '"+this.refreshFrequency.fieldLabel+"',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeId': '"+this.refreshFrequency.attributeId+"'}],");
		
		loggingPropertiesJson = loggingPropertiesJson.concat("'alarmSeverity': [ ");
		
		loggingPropertiesJson = loggingPropertiesJson.concat("{'attributeName': '0',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeComment': '',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeValue': '"+ saverity0 + "',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeDisplayName': '"+this.saverity0.fieldLabel+"',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeId': '"+this.saverity0.attributeId+"'},");
		
		loggingPropertiesJson = loggingPropertiesJson.concat("{'attributeName': '1',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeComment': '',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeValue': '"+ saverity1 + "',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeDisplayName': '"+this.saverity1.fieldLabel+"',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeId': '"+this.saverity1.attributeId+"'},");
		
		loggingPropertiesJson = loggingPropertiesJson.concat("{'attributeName': '2',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeComment': '',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeValue': '"+ saverity2 + "',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeDisplayName': '"+this.saverity2.fieldLabel+"',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeId': '"+this.saverity2.attributeId+"'},");
		
		loggingPropertiesJson = loggingPropertiesJson.concat("{'attributeName': '3',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeComment': '',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeValue': '"+ saverity3 + "',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeDisplayName': '"+this.saverity3.fieldLabel+"',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeId': '"+this.saverity3.attributeId+"'},");
		
		loggingPropertiesJson = loggingPropertiesJson.concat("{'attributeName': '4',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeComment': '',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeValue': '"+ saverity4 + "',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeDisplayName': '"+this.saverity4.fieldLabel+"',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeId': '"+this.saverity4.attributeId+"'},");
		
		loggingPropertiesJson = loggingPropertiesJson.concat("{'attributeName': '5',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeComment': '',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeValue': '"+ saverity5 + "',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeDisplayName': '"+this.saverity5.fieldLabel+"',");
		loggingPropertiesJson = loggingPropertiesJson.concat("'attributeId': '"+this.saverity5.attributeId+"'}]");
			
		return loggingPropertiesJson;
},
});