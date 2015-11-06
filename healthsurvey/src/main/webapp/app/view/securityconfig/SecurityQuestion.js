/**
 * 
 */
Ext.define('Healthsurvey.view.securityconfig.SecurityQuestion', {
	extend : 'Ext.form.FieldSet',
	xtype : 'securityQuestion',
	requires : [ 'Healthsurvey.view.securityconfig.SecurityQuestionController' ],
	controller : 'securityQuestionController',

	title : 'Security Questions',
	layout : 'anchor',
	defaults : {
		anchor : '100% ',
		labelWidth : 150,
		margin : 10,
	},

	items : [{
		xtype : 'hidden',
		name : 'questionId',
		itemId : 'questionId',
		value : '',
	}, {
		xtype : 'hidden',
		name : 'levelid',
		itemId : 'levelid',
		value : ''
	}, {
		xtype : 'textfield',
		name : 'question',
		itemId : 'question',
		fieldLabel : 'Question',
		blankText : 'Question should not be blank!',
	}, {
		xtype : 'textfield',
		name : 'questionDetails',
		itemId : 'questionDetails',
		fieldLabel : 'Question Details',
		blankText : 'Question Details should not be blank!',
	},{
		xtype : 'fieldcontainer',
		layout : 'hbox',
		defaults : {margin : 10},
		items : [ {
			flex : 0.8,
		}, {
			flex : 0.1,
			xtype : 'button',
			text : 'Reset',
			itemId : 'resetButton',
			handler : 'onResetClick',
		}, {
			flex : 0.1,
			xtype : 'button',
			text : 'Update',
			itemId : 'updateButton',
			handler : 'onUpdateClick',
		} ]
	},{
		xtype : 'gridpanel',
		name : 'questionsGrid',
		itemId : 'questionsGrid',
		height : 150,
		stateful : true,
		collapsed : false,
		multiSelect : true,
		autoScroll : true,
		columnLines : true,
		viewConfig : {
			enableTextSelection : true
		},
		store : {
			fields : [],
			data : []
		},
		columns : [ {
			text : 'Question ID',
			width : '25%',
			sortable : true,
			hidden : true,
			dataIndex : 'questionId'
		}, {
			text : 'Level ID',
			width : '20%',
			hidden : true,
			dataIndex : 'levelid'
		}, {
			text : 'Question',
			width : '50%',
			dataIndex : 'question'
		}, {
			text : 'QuestionDetails',
			width : '50%',
			dataIndex : 'questionDetails'
		},
		{
			text : 'Version ID',
			width : '20%',
			hidden : true,
			dataIndex : 'version_id'
		}],
		listeners : {
			select : 'renderQuestionFieldsByGrid'
		}
	}],
});