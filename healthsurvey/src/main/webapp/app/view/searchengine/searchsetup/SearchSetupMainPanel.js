/**
 * 
 */
Ext.define('Healthsurvey.view.searchengine.searchsetup.SearchSetupMainPanel', 
{
	extend : 'Ext.panel.Panel',
	xtype : 'searchsetup',
	requires : [ 'Ext.layout.container.HBox', 'Ext.layout.container.VBox', 'Healthsurvey.view.searchengine.searchsetup.SearchSetupMainPanelController',
	             'Healthsurvey.view.searchengine.searchsetup.ChartFieldsModel',
	           ],
	controller : 'searchsetupcontroller',
	layout : 
	{ 
		type : 'vbox', pack : 'start', align : 'stretch'
	},
	defaults: { bodyStyle: 'padding:10px'},
	
	items :[{
	flex : 0.4,	
	layout : {
		type : 'hbox',
		pack : 'start',
		align : 'stretch'
	},

	bodyPadding : 10,
	defaults : {
		frame : true,
		bodyPadding : 10
	},

	items : [ {
		title : 'Add/Update',
		flex : 0.3,
		margin : '0 10 0 0',
		layout : 'column',
		items : [ {
			xtype : 'radiogroup',
			columnWidth : 1,
			items : [ {
				boxLabel : 'New',
				name : 'rb',
				inputValue : 'new',
				checked : true
			}, {
				boxLabel : 'Update',
				name : 'rb',
				inputValue : 'update'
			}, {
				boxLabel : 'Delete',
				name : 'rb',
				inputValue : 'delete'
			} ],
		},
		{
			xtype : 'combobox',
			fieldLabel: 'Config Name',
			valueField : 'config_id',
			displayField : 'config_name',
			margin:'0 0 10 0',
			columnWidth:1,
			typeAhead: false, 
			keyNavEnabled: false,
		    mouseWheelEnabled: false,
		    
		    store : 
		    {
//				autoLoad : true,
				pageSize : 9999,
				fields : [ 'config_id', 'config_json', 'config_name' ],
				proxy : 
				{
					type : 'ajax',
					url : 'secure/buzzorapp/getChartConfig',
					reader : { type : 'json' }
				},
				listeners : 
				{
					/*load : function() 
					{
						debugger;						
						var lst = this.last();
						if (lst && currentTab.down('combobox[itemId="config"]'))
						{
							currentTab.down('combobox[itemId="config"]').setValue(lst.data);
						}
					}*/
				}
		    },
		    listeners : 
		    {
//		    	select : 'onSelectOfConfigName',
		    }
		    
		},
		{
			xtype : 'combobox',
			columnWidth : 1,
			itemId : 'chtqueryListCombo',
			fieldLabel : 'Query Name',
		    valueField: 'queryID',
		    displayField: 'queryName',
			typeAhead : true,
			forceSelection : true,
			triggerAction : 'all',
			emptyText : 'Select Query...',
			selectOnFocus : true,
			allowBlank : false,
			editable : true,
		}]
	}, {
		title : 'Change Type',
		flex : 0.3,
		margin : '0 10 0 0',
		title: 'Chart Type',
		layout: { type : 'vbox', pack : 'start', align : 'stretch'},
		items : 
		[{
			xtype : 'combobox',
			fieldLabel: 'Chart For Search',
			labelWidth : 120,
		},
		{
			xtype : 'fieldset',
			title : 'Data',
			margin: '10 0 0 0',
			layout: { type : 'vbox', pack : 'start', align : 'stretch'},
			items : 
			[
			 {
				xtype: 'combobox',
				fieldLabel: 'Months of data',
				valueField: 'name',
				displayField: 'months',
				margin :'10 0 0 0',	
				typeAhead: true,
				emptyText: 'Select Months...',
				editable: true,
				anyMatch: true,
				store : 
				{
					autoLoad:true,
					fields: ['months', 'name'],
				    data : [
				        {"months":"1", "name":"1"},
				        {"months":"2", "name":"2"},
				        {"months":"3", "name":"3"},
				        {"months":"4", "name":"4"},
				        {"months":"5", "name":"5"},
				        {"months":"6", "name":"6"},
				        {"months":"7", "name":"7"},
				        {"months":"8", "name":"8"},
				        {"months":"9", "name":"9"},
				        {"months":"10", "name":"10"},
				        {"months":"11", "name":"11"},
				        {"months":"12", "name":"12"},
				    ]
				},

			 },
			 {
				margin:'10 0 0 0',
				xtype : 'textfield',	
				fieldLabel : 'Title',
			 },
			 {
				xtype: 'combobox',
				fieldLabel: 'Data aggregation',
				valueField: 'name',
				displayField: 'func',
				margin :'10 0 10 0 ',	
				typeAhead: true,
				emptyText: 'Select agg...',
				editable: true,
				anyMatch: true,
				store : 
				{
					autoLoad:true,
					fields: ['func', 'name'],
					data : [
					        {"func":"SUM", "name":"SUM"},
					        {"func":"MIN", "name":"MIN"},
					        {"func":"MAX", "name":"MAX"},
					        {"func":"AVG", "name":"AVG"}
					       ]
				},

			 }
			]
		
		
		}]
	}, {
		title : 'Details For Chart',
		flex : 0.4,
		layout:'column',
		items : [{
			xtype : 'fieldset',
			border : 0,
			itemId : 'xfieldSet',
			columnWidth: 0.5,
			defaults : { xtype : 'combobox'},
			items : [
			         {
			        	 alias : 'widget.xchtqryfldgrid',
			        	 itemId : 'xchtQryFldGrid',
// 		        		 store : 'chartfieldsstorex',
			        	 valueField: 'fieldName',
			        	 displayField: 'fieldName',
			        	 emptyText: 'Select Column...',
			        	 fieldLabel: 'Column',
			         },
			         {
			        	alias : 'widget.xchtqryfldgrid',
			        	itemId : 'valuefieldforchart',
//		        		store : 'chartfieldsstorex', 
			        	valueField: 'fieldName',
			        	displayField: 'fieldName',
			        	emptyText: 'Select Row...',
			        	fieldLabel: 'Row',
			         },
			         {
			        	alias : 'widget.xchtqryfldgrid',
			        	itemId : 'keyfield',
//			        	store : chtfieldsStorex,
//			        	store : 'chartfieldsstorex',
			        	valueField: 'fieldName',
			        	displayField: 'fieldName',
			        	emptyText: 'Select Key...',
			        	fieldLabel: 'Key',
			         },
			         {
			        	alias : 'widget.ychtqryfldgrid',
			        	itemId : 'ychtQryFldGrid',
//			        	store : 'chartfieldsstorex',
			        	valueField: 'fieldName',
			        	displayField: 'fieldName',
			        	emptyText: 'Select Value...',
			        	fieldLabel: 'Value',
			         }]
		},{
			xtype : 'fieldset',
			title : 'Captions',
			itemId : 'yfieldSet',
			columnWidth: 0.5,
			defaults : {margin : '10 0 10 0'},
			items : [{
					xtype : 'textfield',
					fieldLabel : 'X Axis',
					region : 'center',
					itemId : 'yaxis',
			},{
				xtype : 'textfield',
				fieldLabel : 'Y Axis',
				itemId : 'xaxis',
			}]
		}]

	} ],
	buttons : 
	[
	 {
		 text : 'Save',
		 icon : 'images/searchengine/save.gif',
		 formBind : true, 
		 handler : function() {}
	 },
	 {
		 text : 'Reset',
		 icon : 'images/searchengine/cross.png',
		 handler : function(){}
	 },
	 {
	 	text:'Preview',
	 	icon: 'images/searchengine/save.gif',
	 	handler:function(){}
	 }
	],
 },
 {
	flex : 0.6,
	items : [{
//		xtype : 'textfield',
		fieldLabel : 'Try Image Here'
	}]
 }]
});

