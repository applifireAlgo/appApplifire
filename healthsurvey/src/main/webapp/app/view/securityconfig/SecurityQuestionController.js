/**
 * 
 */
Ext.define('Healthsurvey.view.securityconfig.SecurityQuestionController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.securityQuestionController',
	
	questionId : null,
	levelid : null,
	question : null,
	questionDetails : null,
	questionsGrid : null,
	
	init : function()
	{
		debugger;
		var currentObject = this;
		currentObject.questionId = currentObject.view.down('#questionId');
		currentObject.levelid = currentObject.view.down('#levelid');
		currentObject.question = currentObject.view.down('#question');
		currentObject.questionDetails = currentObject.view.down('#questionDetails');
		currentObject.questionsGrid = currentObject.view.down('#questionsGrid');
	},
	
	loadFormData : function()
	{
		var currentObject = this;
		Ext.Ajax.request({
			timeout: 6000000,
			url : 'secure/Question/findAll',
			method : 'GET',
			jsonData : {},
			success : function(response, opts){
				debugger;
				var responseJson = Ext.JSON.decode(response.responseText);
				if (responseJson.response.success) {
					currentObject.addQuestionToGrid(responseJson.response.data);
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
	
	renderQuestionFieldsByGrid : function(selModel, record, index, options)
	{
		debugger;
		var currentObject = this;
		var question = record.getData();
		currentObject.questionId.setValue(question.questionId);
		currentObject.levelid.setValue(question.levelid);
		currentObject.question.setValue(question.question);
		currentObject.questionDetails.setValue(question.questionDetails);
	},
	
	addQuestionToGrid : function(questions)
	{
		debugger;
		var currentObject = this;
		for(var i = 0; i<questions.length; i++)
		{
			var question = questions[i];
			var rec = {"questionId" : question.questionId, "levelid" : question.levelid, "question" : question.question, "questionDetails" : question.questionDetails, "version_id" : question.version_id}
			currentObject.questionsGrid.getStore().add(rec);
			
			if(i==0)
			{
				currentObject.questionId.setValue(question.questionId);
				currentObject.levelid.setValue(question.levelid);
				currentObject.question.setValue(question.question);
				currentObject.questionDetails.setValue(question.questionDetails);
			}
		}
	},
	
	onResetClick : function(but, evt)
	{
		this.question.setValue();
		this.questionDetails.setValue();
	},
	
	clearQuestionFields : function()
	{
		this.question.setValue();
		this.questionDetails.setValue();
		this.clearQuestionsGrid();
	},
	
	clearQuestionsGrid : function()
	{
		this.questionsGrid.store.removeAll();
	},
	
	getJsonOfStore : function() {
		var currentObject = this;
		var questionJson = '['
		var questionGridStore = this.questionsGrid.getStore();
		questionGridStore.each(function(rec) {
			questionJson = questionJson.concat("{'questionId': '"+ rec.get('questionId') + "',");
			questionJson = questionJson.concat("'primaryKey': '"+ rec.get('questionId') + "',");
			questionJson = questionJson.concat("'levelid': "+  rec.get('levelid') + ",");
			questionJson = questionJson.concat("'question': '"+ rec.get('question') + "',");
			questionJson = questionJson.concat("'questionDetails': '"+ rec.get('questionDetails') + "',");
			questionJson = questionJson.concat("'questionIcon': '"+ " " + "',");
			questionJson = questionJson.concat("'version_id': "+ rec.get('version_id') + ",");
			questionJson = questionJson.concat("'primaryDisplay': '"+ "" + "'},");
		});
		questionJson = questionJson.concat(']');
		return questionJson;
	},
	
	updateSecurityQuestions : function()
	{
		debugger;
		var questionJson = this.getJsonOfStore();
		this.update(questionJson);
	},
	
	update : function(questionJson)
	{
		var currentObject = this;
		Ext.Ajax.request({
			timeout: 6000000,
			url : 'secure/Question/',
			method : 'PUT',
			headers: { 'isArray': true }, 
			jsonData : Ext.JSON.decode(questionJson),
			
			success : function(response, opts) {
				debugger;
				var responseJson = Ext.JSON.decode(response.responseText);
				if (responseJson.response.success) {
					currentObject.clearQuestionFields();
					currentObject.view.up().getController().loadFormData();
					Ext.Msg.alert("Info",responseJson.response.message);
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
	
	onUpdateClick : function()
	{
		debugger;
		var questionId = this.questionId.getValue();
		var question = this.question.getValue();
		var levelid = this.levelid.getValue();
		var questionDetails = this.questionDetails.getValue();
		
		var questionGridStore = this.questionsGrid.getStore();
		questionGridStore.each(function(rec) {
			debugger;
			if(questionId == rec.get('questionId'))
			{
				rec.set('levelid',levelid);
				rec.set('question',question);
				rec.set('questionDetails',questionDetails);
			}
		});
	}
});