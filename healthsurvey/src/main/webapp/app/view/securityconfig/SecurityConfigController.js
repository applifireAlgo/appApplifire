/**
 * 
 */
Ext.define('Healthsurvey.view.securityconfig.SecurityConfigController',{
	extend : 'Ext.app.ViewController',
	alias : 'controller.securityConfigController',
	
	configId : null,
	timeout : null, 
	passwordExpireDays : null,
	noOfReuseOfPassword : null,
	selectedPolicyId : null,
	
	encryption : null,
	algoPK : null,
	algoVersionId : null,
	algorithm : null,
	algoName : null,
	algoDescription: null,
	
	policyId : null,
	strength : null,
	
	strengthDisplayField : null,
	minLength : null,
	maxLength : null,
	minCapitalLetters : null,
	minSmallLetters : null,
	minNumericValues : null,
	minSpecialLetters : null,
	allowedSpecialLetters : null,
	
	id : null,
	policyVersionId : null,
	defaultStrength : null,
	defaultPolicy : null,
	passwordPolicies : null,
	passwordAlgorithms : null,
	
	securityQuestionController : null,
		
	init : function()
	{
		var currentObject = this;
		currentObject.configId = currentObject.view.down('#configId');
		currentObject.timeout = currentObject.view.down('#timeout');
		currentObject.passwordExpireDays = currentObject.view.down('#passwordExpireDays');
		currentObject.noOfReuseOfPassword = currentObject.view.down('#noOfReuseOfPassword');
		currentObject.selectedPolicyId = currentObject.view.down('#selectedPolicyId');
		
		currentObject.encryption = currentObject.view.down('#encryption');
		currentObject.algoPK = currentObject.view.down('#algoPK');
		currentObject.algoVersionId = currentObject.view.down('#algoVersionId');
		currentObject.algorithm = currentObject.view.down('#algorithm');
		currentObject.algoName = currentObject.view.down('#algoName');
		currentObject.algoDescription = currentObject.view.down('#algoDescription');
		
		currentObject.policyId = currentObject.view.down('#policyId');
		currentObject.id = currentObject.view.down('#id');
		currentObject.policyVersionId = currentObject.view.down('#policyVersionId');
		currentObject.strength = currentObject.view.down('#strength');
		
		currentObject.strengthDisplayField = currentObject.view.down('#strengthDisplayField');
		currentObject.minLength = currentObject.view.down('#minLength');
		currentObject.maxLength = currentObject.view.down('#maxLength');
		currentObject.minCapitalLetters = currentObject.view.down('#minCapitalLetters');
		currentObject.minSmallLetters = currentObject.view.down('#minSmallLetters');
		currentObject.minNumericValues = currentObject.view.down('#minNumericValues');
		currentObject.minSpecialLetters = currentObject.view.down('#minSpecialLetters');
		currentObject.allowedSpecialLetters = currentObject.view.down('#allowedSpecialLetters');
		
		currentObject.securityQuestionController = currentObject.view.down('#securityQuestion').getController();
		
		currentObject.loadFormData();
	},
	
	loadFormData : function()
	{
		var currentObject = this;
		currentObject.securityQuestionController.loadFormData();
		Ext.Ajax.request({
			timeout: 6000000,
			url : 'secure/ArtPasswordAlgoithm/findAll',
			method : 'GET',
			jsonData : {},
			success : function(response, opts){
				debugger;
				var responseJson = Ext.JSON.decode(response.responseText);
				if (responseJson.response.success) {
					currentObject.passwordAlgorithms = responseJson.response.data;
					currentObject.setPasswordAlgorithmData(currentObject.passwordAlgorithms);
					
					Ext.Ajax.request({
						timeout: 6000000,
						url : 'secure/AstAppSecurityConfig/findAll',
						method : 'GET',
						jsonData : {},
						success : function(response, opts){
							debugger;
							var responseJson = Ext.JSON.decode(response.responseText);
							if (responseJson.response.success) {
								currentObject.setAppSessionConfigData(responseJson.response.data[0]);
								
								Ext.Ajax.request({
									url : 'secure/AstPasswordAlgoithm/findAll',
									method : 'GET',
									jsonData : {},
									success : function(response, opts){
										debugger;
										var responseJson = Ext.JSON.decode(response.responseText);
										if (responseJson.response.success) {
											var data = responseJson.response.data[0];
											currentObject.algoPK = data.algoId;
											currentObject.algoVersionId = data.version_id;
											
											currentObject.algorithm =  data.algoId;
											currentObject.algoName = data.algoName;
											currentObject.algoDescription = data.algoDescription;
										} else {
											Ext.Msg.alert("Error.", responseJson.response.message);
										}
									},
									failure : function(response, opts){
										debugger;
										var responseJson = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert("Error...", responseJson.response.message);
									}
								});
							} else {
								Ext.Msg.alert("Error.", responseJson.response.message);
							}
						},
						failure : function(response, opts){
							debugger;
							var responseJson = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert("Error...", responseJson.response.message);
						}
					});
				} else {
					Ext.Msg.alert("Error.", responseJson.response.message);
				}
			},
			failure : function(response, opts){
				debugger;
				var responseJson = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert("Error...", responseJson.response.message);
			}
		});
		
		Ext.Ajax.request({
			timeout: 6000000,
			url : 'secure/AstPasswordPolicy/findAll',
			method : 'GET',
			jsonData : {},
			success : function(response, opts){
				debugger;
				var responseJson = Ext.JSON.decode(response.responseText);
				if (responseJson.response.success) {
					currentObject.defaultPolicy = responseJson.response.data[0];
					currentObject.id.setValue(responseJson.response.data[0].policyId);
					currentObject.policyVersionId.setValue(responseJson.response.data[0].version_id);
					
					Ext.Ajax.request({
						timeout: 6000000,
						url : 'secure/ArtPasswordPolicy/findAll',
						method : 'GET',
						jsonData : {},
						success : function(response, opts){
							debugger;
							var responseJson = Ext.JSON.decode(response.responseText);
							if (responseJson.response.success) {
								currentObject.setPasswordPolicyData(responseJson.response.data);
							} else {
								Ext.Msg.alert("Error.", responseJson.response.message);
							}
						},
						failure : function(response, opts){
							debugger;
							var responseJson = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert("Error...", responseJson.response.message);
						}
					});
					
				} else {
					Ext.Msg.alert("Error.", responseJson.response.message);
				}
			},
			failure : function(response, opts){
				debugger;
				var responseJson = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert("Error...", responseJson.response.message);
			}
		});
	},
	
	onAlgorithmSelection : function(combo, records, eOpts)
	{
		debugger;
		var currentObject = this;
		var id = records[0].get('id');
		
		for(var i = 0; i<currentObject.passwordAlgorithms.length; i++)
		{
			var passwordAlgorithm = currentObject.passwordAlgorithms[i];
			if(passwordAlgorithm.algoId == id)
			{
				currentObject.setPasswordAlgo(passwordAlgorithm.algorithm, passwordAlgorithm.algoName , passwordAlgorithm.algoDescription);
				break;
			}
		}
	},
	
	setPasswordAlgo : function(algorithm, algoName, algoDescription)
	{
		debugger;
		var currentObject = this;
		currentObject.algorithm = algorithm;
		currentObject.algoName = algoName;
		currentObject.algoDescription = algoDescription;
	},
	
	setPasswordAlgorithmData : function(passwordAlgorithm)
	{
		debugger;
		var currentObject = this;
		var comboDataArray = new Array();
		
		for(var i = 0; i<passwordAlgorithm.length; i++)
		{
			var algoId = passwordAlgorithm[i].algoId;
			var algo = passwordAlgorithm[i].algoName;
			
			var rec = {"id" : algoId, "value" : algo};
			comboDataArray.push(rec);
		}
		currentObject.setEncryptionStore(comboDataArray);
	},
	
	setEncryptionStore : function(comboData)
	{
		var store = this.encryption.getStore();

		var dataStore = Ext.create('Ext.data.Store', {
					fields : ['id', 'value'],
					data : comboData
				});

		this.encryption.setStore(dataStore);
	},
	
	setAppSessionConfigData : function(sessionConfigData)
	{
		debugger;
		var currentObject = this;
		currentObject.configId.setValue(sessionConfigData.configId);
		currentObject.timeout.setValue(sessionConfigData.timeout);
		currentObject.passwordExpireDays.setValue(sessionConfigData.passwordExpireDays);
		currentObject.noOfReuseOfPassword.setValue(sessionConfigData.noOfReuseOfPassword);
		currentObject.selectedPolicyId.setValue(sessionConfigData.policyId);
	
		var encryptionStore = currentObject.encryption.getStore();
		encryptionStore.each(function(record){
			if(sessionConfigData.algoId == record.get('id'))
			{
				currentObject.encryption.select(record);
			}
		});
	},
	
	setPasswordPolicyData : function(passwordPolicy)
	{
		debugger;
		var currentObject = this;
		var comboDataArray = new Array();
		currentObject.passwordPolicies = passwordPolicy;
		var strengthId;
		for(var i = 0; i<passwordPolicy.length; i++)
		{
			strengthId = parseInt(passwordPolicy[i].policyId);
			var strengthType = passwordPolicy[i].policyName;
			
			var rec = {"strengthId" : strengthId, "strength" : strengthType};
			comboDataArray.push(rec);
			if(currentObject.defaultPolicy.policyName == strengthType || currentObject.defaultPolicy.policyName == 'Custom')
			{
				currentObject.strength.setValue(currentObject.defaultPolicy.policyName);
				currentObject.renderDefaultPasswordPolicy(currentObject.defaultPolicy.policyName,currentObject.defaultPolicy.policyId);
			}
		}
		
		currentObject.setStrengthConfig(comboDataArray);
		currentObject.setSelected(currentObject.defaultPolicy.policyName);
	},
	
	setSelected : function(policyName)
	{
		debugger;
		var currentObject = this;
		var strengthStore = this.strength.getStore();
		strengthStore.each(function(record){
			if(policyName == record.get('strength'))
			{
				currentObject.strength.select(record);
			}
		});
	},
	
	onStrengthSelection : function(combo, records, eOpts)
	{
		debugger;
		this.renderDefaultPasswordPolicy(records[0].get('strength'), records[0].get('strengthId'));
	},
	
	getIdByName : function(name)
	{
		var id;
		var strengthStore = this.strength.getStore();
		strengthStore.each(function(record){
			if(name == record.get('strength'))
			{
				id = record.get('strengthId');
			}
		});
		return id;
	},
	
	getById : function(id)
	{
		var strength;
		var strengthStore = this.strength.getStore();
		strengthStore.each(function(record){
			if(id == record.get('strengthId'))
			{
				strength = record.get('strength');
			}
		});
		return strength;
	},
	
	setStrengthConfig : function(comboData)
	{
		var store = this.strength.getStore();

		var dataStore = Ext.create('Ext.data.Store', {
					fields : ['strengthId', 'strength'],
					data : comboData
				});

		this.strength.setStore(dataStore);
	},
	
	renderPolicyFields : function(policy)
	{
		debugger;
		var currentObject = this;
		currentObject.strengthDisplayField.setValue(policy.policyDescription);
		currentObject.minLength.setValue(policy.minPwdLength);
		
		currentObject.maxLength.setValue(policy.maxPwdLength);
		
		currentObject.minCapitalLetters.setValue(policy.minCapitalLetters);
		
		currentObject.minSmallLetters.setValue(policy.minSmallLetters);
		
		currentObject.minNumericValues.setValue(policy.minNumericValues);
		
		currentObject.minSpecialLetters.setValue(policy.minSpecialLetters);
		
		currentObject.allowedSpecialLetters.setValue(policy.allowedSpecialLetters);
	},
	
	setPolicyFieldsEnable : function(enable)
	{
		debugger;
		var currentObject = this;
		currentObject.strengthDisplayField.setDisabled(enable);
		currentObject.minLength.setDisabled(enable);
		currentObject.maxLength.setDisabled(enable);
		currentObject.minCapitalLetters.setDisabled(enable);
		currentObject.minSmallLetters.setDisabled(enable);
		currentObject.minNumericValues.setDisabled(enable);
		currentObject.minSpecialLetters.setDisabled(enable);
		currentObject.allowedSpecialLetters.setDisabled(enable);
	},
	
	clearConfigFields : function()
	{
		var currentObject = this;
		currentObject.timeout.setValue();
		currentObject.passwordExpireDays.setValue();
		currentObject.noOfReuseOfPassword.setValue();
		currentObject.encryption.setValue();
	},
	
	clearPolicyFields : function()
	{
		var currentObject = this;
		currentObject.strengthDisplayField.setValue("");
		currentObject.minLength.setValue();
		currentObject.maxLength.setValue();
		currentObject.minCapitalLetters.setValue();
		currentObject.minSmallLetters.setValue();
		currentObject.minNumericValues.setValue();
		currentObject.minSpecialLetters.setValue();
		currentObject.allowedSpecialLetters.setValue("");
	},
	
	renderDefaultPasswordPolicy : function(strength, strengthId)
	{
		debugger;
		var currentObject = this;
		currentObject.policyId.setValue(strengthId);
		
		if(strength == 'Custom')
		{
			if(currentObject.defaultPolicy.policyName == 'Custom')
			{
				currentObject.renderPolicyFields(currentObject.defaultPolicy);
			}
			else
			{
				currentObject.clearPolicyFields();
			}
			currentObject.setPolicyFieldsEnable(false);
		}
		else
		{
			for(var i = 0; i<currentObject.passwordPolicies.length; i++)
			{
				var policy = currentObject.passwordPolicies[i];
				
				if(strength == policy.policyName)
				{
					currentObject.renderPolicyFields(policy);
					currentObject.setPolicyFieldsEnable(true);
					break;
				}
			}
		}
	},
	
	onResetClick : function(but, evt) 
	{
		var securityConfigForm = but.up('form').getForm();
		this.clearPolicyFields();
		this.clearConfigFields();
	},
	
	onSubmitClick : function(but, evt) {
		debugger;
		var currentObject = this;
		var form = but.up('form').getForm();
		var formData = form.getValues();
		
		if (form.isValid()) {
			currentObject.updateAppSecurityConfig(formData);
		} else {
			Ext.Msg.alert('Form Validation', "Form is not valid");
		}
	},
	
	updatePasswordPolicy : function(formData)
	{
		debugger;
		var currentObject = this;
		var deleteUrl = 'secure/PasswordPolicy/';
		deleteUrl = deleteUrl.concat(formData.id);
		Ext.Ajax.request({
			timeout: 6000000,
			url : deleteUrl,
			params : {"cid" : formData.id},
			jsonData : {},
			method : 'DELETE',
			success : function(response, opts) {
				debugger;
				var passwordPolicyJson = '{';		
					passwordPolicyJson = passwordPolicyJson.concat("'policyId': '"+ formData.policyId + "',");
					passwordPolicyJson = passwordPolicyJson.concat("'policyName': '"+ currentObject.strength.getSelectedRecord().get('strength') + "',");
					passwordPolicyJson = passwordPolicyJson.concat("'policyDescription': '"+ currentObject.strengthDisplayField.getValue() + "',");
					passwordPolicyJson = passwordPolicyJson.concat("'minPwdLength': '"+ currentObject.minLength.getValue() + "',");
					passwordPolicyJson = passwordPolicyJson.concat("'maxPwdLength': '"+ currentObject.maxLength.getValue() + "',");

					passwordPolicyJson = passwordPolicyJson.concat("'minCapitalLetters': '"+ currentObject.minCapitalLetters.getValue() + "',");
					passwordPolicyJson = passwordPolicyJson.concat("'minSmallLetters': '"+ currentObject.minSmallLetters.getValue() + "',");
					passwordPolicyJson = passwordPolicyJson.concat("'minNumericValues': '"+ currentObject.minNumericValues.getValue() + "',");
					passwordPolicyJson = passwordPolicyJson.concat("'minSpecialLetters': '"+ currentObject.minSpecialLetters.getValue() + "',");
					passwordPolicyJson = passwordPolicyJson.concat("'allowedSpecialLetters': '"+ currentObject.allowedSpecialLetters.getValue() + "'}");
					
					Ext.Ajax.request({
						timeout: 6000000,
						url : 'secure/PasswordPolicy/',
						jsonData : Ext.JSON.decode(passwordPolicyJson),
						method : 'POST',
						success : function(response, opts) {
							debugger;
							var responseJson = Ext.JSON.decode(response.responseText);
							if (responseJson.response.success) {
								currentObject.updatePasswordAlgorithm(formData);
							}
							else{
								Ext.Msg.alert("Error...",responseJson.response.message);
							}
						},
						failure : function(response,opts) 
						{
							var responseJson = Ext.JSON.decode(response.responseText);	
							Ext.Msg.alert("Error...",responseJson.response.message); 
						},
					}, this);
			},
			failure : function(response,opts) 
			{
				var responseJson = Ext.JSON.decode(response.responseText);	
				Ext.Msg.alert("Error...",responseJson.response.message); 
			},
		}, this);
	},
	
	updatePasswordAlgorithm : function(formData)
	{
		debugger;
		var currentObject = this;
		var deleteUrl = 'secure/PasswordAlgo/';
		deleteUrl = deleteUrl.concat(currentObject.algoPK);
		Ext.Ajax.request({
			timeout: 6000000,
			url : deleteUrl,
			params : {"cid" : currentObject.algoPK},
			jsonData : {},
			method : 'DELETE',
			success : function(response, opts) {
				debugger;
				var passwordAlgorithmConfigJson = '{';		
				passwordAlgorithmConfigJson = passwordAlgorithmConfigJson.concat("'algoId': '"+ currentObject.algorithm + "',");
				passwordAlgorithmConfigJson = passwordAlgorithmConfigJson.concat("'algorithm': '"+ formData.encryption + "',");
				passwordAlgorithmConfigJson = passwordAlgorithmConfigJson.concat("'algoName': '"+ currentObject.algoName + "',");
				passwordAlgorithmConfigJson = passwordAlgorithmConfigJson.concat("'algoDescription': '"+ currentObject.algoDescription + "',");
				passwordAlgorithmConfigJson = passwordAlgorithmConfigJson.concat("'algoHelp': '"+ " " + "',");
				passwordAlgorithmConfigJson = passwordAlgorithmConfigJson.concat("'algoIcon': '"+ " " + "'}");

				Ext.Ajax.request({
					timeout: 6000000,
					url : 'secure/PasswordAlgo/',
					jsonData : Ext.JSON.decode(passwordAlgorithmConfigJson),
					method : 'POST',
					success : function(response, opts) {
						debugger;
						var responseJson = Ext.JSON.decode(response.responseText);
						if (responseJson.response.success) {
							currentObject.clearPolicyFields();
							currentObject.clearConfigFields();
							currentObject.securityQuestionController.updateSecurityQuestions();
						}
						else{
							Ext.Msg.alert("Error...",responseJson.response.message);	
						}
							
					},
					failure : function(response,opts) 
					{
						var responseJson = Ext.JSON.decode(response.responseText);	
						Ext.Msg.alert("Error...",responseJson.response.message); 
					},
				}, this);
			},
			failure : function(response,opts) 
			{
				var responseJson = Ext.JSON.decode(response.responseText);	
				Ext.Msg.alert("Error...",responseJson.response.message); 
			},
		}, this);
	},
	
	updateAppSecurityConfig : function(formData)
	{
		debugger;
		
		var currentObject = this;
		var appSessionConfigJson = '{';		
		appSessionConfigJson = appSessionConfigJson.concat("'configId': '"+ formData.configId + "',");
		appSessionConfigJson = appSessionConfigJson.concat("'timeout': '"+ formData.timeout + "',");
		appSessionConfigJson = appSessionConfigJson.concat("'noOfReuseOfPassword': "+ formData.noOfReuseOfPassword + ",");
		appSessionConfigJson = appSessionConfigJson.concat("'passwordExpireDays': "+ formData.passwordExpireDays + ",");
		appSessionConfigJson = appSessionConfigJson.concat("'algoId': "+ formData.encryption + ",");
		appSessionConfigJson = appSessionConfigJson.concat("'policyId': "+ formData.policyId + "}");
		
		Ext.Ajax.request({
			timeout: 6000000,
			url : 'secure/AstAppSecurityConfig/update',
			jsonData : Ext.JSON.decode(appSessionConfigJson),
			method : 'PUT',
			success : function(response, opts) {
				debugger;
				var responseJson = Ext.JSON.decode(response.responseText);
				if (responseJson.response.success) {
					currentObject.updatePasswordPolicy(formData);
					/*currentObject.updatePasswordAlgorithm(formData);
					currentObject.securityQuestionController.updateSecurityQuestions();
					currentObject.clearPolicyFields();
					currentObject.clearConfigFields();
					currentObject.securityQuestionController.clearQuestionFields();
					currentObject.loadFormData();*/
				} 
				else 
				{
					Ext.Msg.alert("Error...",responseJson.response.message);
				}
			},
			failure : function(response,opts) 
			{
				var responseJson = Ext.JSON.decode(response.responseText);	
				Ext.Msg.alert("Error...",responseJson.response.message); 
			},
		}, this);
	}
});