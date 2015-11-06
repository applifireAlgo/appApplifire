Ext.define('Healthsurvey.view.querybuildernewmodel.QueryBuilderPanel', {
	extend : 'Ext.panel.Panel',
	requires:['Healthsurvey.view.querybuildernewmodel.QueryBuilderController',
	          'Healthsurvey.view.querybuildernewmodel.queryentities.QueryEntitiesTree',
	          'Healthsurvey.view.querybuildernewmodel.queryentitiesrelation.QueryEntityRelationPanel',
	          'Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.QueryEntitiesModel',
	          'Healthsurvey.view.querybuildernewmodel.querydetail.QueryDetail',
	          'Healthsurvey.view.querybuildernewmodel.querycondition.QueryWhereClauseWindow',
	          'Healthsurvey.view.querybuildernewmodel.querycondition.QuerySelectTree',
	          'Healthsurvey.view.querybuildernewmodel.querycondition.QueryFromTree',
	          'Healthsurvey.view.querybuildernewmodel.querycondition.QueryGroupByTree',
	          'Healthsurvey.view.querybuildernewmodel.querystructure.QueryStructureTree',
	          'Healthsurvey.view.querybuildernewmodel.querycondition.QueryWhereCondition',
	          'Ext.grid.*',
	          'Ext.draw.*','Ext.chart.*'
	          ],
	xtype : 'query-builder',
	controller:'query-builder',
	border:0,
	title : 'Query Builder',
	layout : 'border',
	defaults:{
		border:0
	},
	
	defaults : {
		margin : 0,
		border : 0
	},
	items : [{
		
		region :'west',
		title:'',
		layout :'accordion',
		collapsible : true,
		collapsed : false,
		split : true,
		width :'18%',
		items:[{
			xtype : 'panel',
			itemId:'entTreePanel',
			title : 'Entities ',
			autoScroll :true,
			
			tbar : [ {
				xtype : 'combo',
				itemId : 'entSearchBox',
				emptyText : "Search",
				width : '100%',
				typeAhead : true,
				collapsed : false,
				queryMode: 'local',
				minChars : 1,
				disabled:true,
				displayField:'name',
				valueField:'id',
				listeners:{
					select:'onSearchBoxSelect'
				}
			}],
			items : [{xtype : 'query-entities-tree'}]
		},
		{
			title : 'Queries',
		}]
	},
	/***CENTER*/
	{
		region :'center',
		layout :'border',
		items :[{
			region : 'center',
			//height:'50%',
			split : true,
			bodyStyle : 'background-image:url("resources/square.gif");',
			layout:'fit',
			xtype : 'query-entities-relation',itemId:'entDetailPanel'
		}, 
		{
		region : 'south',
		height : '50%',
		layout:'border',
		split : true,
		items:[
		   {
			region : 'center',
			xtype:'tabpanel',
			split : true,
			
			items : [ {
				xtype : 'panel',
				title : 'Select',
				autoScroll : true,
				tbar : [ {
					xtype : 'combo',
					itemId : 'selectSearchBox',
					emptyText : "Search",
					width : '100%',
					store :Ext.create('Ext.data.Store', {
						storeId : 'selectStore',
						fields : ['id','name','config'],
						data : [],
						sortOnLoad :true
						}),
					typeAhead : true,
					collapsed : false,
					queryMode : 'local',
					minChars : 1,
					displayField : 'name',
					valueField : 'id',
					listeners:{
						select:'onSelectBoxSelect'
					}
					
				} ],
				items : [ {
					
					xtype : 'query-select'
				}, ]
			},
			 {
				xtype : 'panel',
				title : 'From',
				autoScroll : true,
				tbar : [ {
					xtype : 'combo',
					itemId : 'fromSearchBox',
					emptyText : "Search",
					width : '100%',
					store :Ext.create('Ext.data.Store', {
						storeId : 'fromStore',
						fields : ['id','name','config'],
						data : [],
						sortOnLoad :true
						}),
					typeAhead : true,
					collapsed : false,
					queryMode : 'local',
					minChars : 1,
					displayField : 'name',
					valueField : 'id',
					listeners:{
						select:'onFromBoxSelect'
					}
					
				} ],
				items : [ {
					
					xtype : 'query-from'
				}, ]
			},{
				xtype : 'panel',
				title : 'Where',
				autoScroll : true,
				items : [ {
					xtype : 'query-where-condition'
				}, ]
			},
			{
				xtype : 'panel',
				title : 'Group By',
				autoScroll : true,
				tbar : [ {
					xtype : 'combo',
					itemId : 'groupBySearchBox',
					emptyText : "Search",
					width : '100%',
					store :Ext.create('Ext.data.Store', {
						storeId : 'selectStore',
						fields : ['id','name','config'],
						data : [],
						sortOnLoad :true
						}),
					typeAhead : true,
					collapsed : false,
					queryMode : 'local',
					minChars : 1,
					displayField : 'name',
					valueField : 'id',
					listeners:{
						select:'onGroupByBoxSelect'
					}
					
				} ],
				items : [ {
					
					xtype : 'query-groupby'
				}, ]
			},{
				xtype : 'panel',
				title : 'Query',
				autoScroll : true,
				items : [{
					//title:'Query',
					xtype:'label',
					autoScroll:true,
					itemId : 'queryHTML',
					//maxWidth:400,
					html:''}]
				
			}]
		}
		]}
		],
		tbar : [{
				xtype : 'textfield',
				margin:'0 10 0 10',
				itemId : 'txtQueryName',
				//fieldLabel : 'Name',
				hidden : true,
				emptyText :'Enter Query Name',
				allowBlank : true,
				visible:false,
				width : '20%',
				},
		        {
		        	xtype : 'radiogroup',
		        	itemId : 'queryType',
		        	fieldLabel : '',
		        	columns : 3,
		        	width : '45%',
		        	margin:'0 10 0 10',
		        	defaults:{},
		        	hidden : true,
		        	vertical : true,
			    items:[
				{
					boxLabel : 'Named Query',
					name : 'queryType',
					inputValue : 1,
					typeId:1,
					checked : true
				}, {
					boxLabel : 'Report Query',
					name : 'queryType',
					margin:'0 0 0 10',
					inputValue : 2,
					checked : false,
					typeId:2
				}, {
					boxLabel : 'View',
					name : 'queryType',
					margin:'0 0 0 10',
					inputValue : 3,
					checked : false,
					typeId:3
				} ],
				listeners:{
					change:'onQueryTypeChkChange'
				}},{
					xtype:'tbfill'
				},
				 {
		        	xtype : 'radiogroup',
		        	itemId : 'floatindRadioGroup',
		        	fieldLabel : '',
		        	columns : 3,
		        	width : '45%',
		        	//margin:'0 10 0 10',
		        	defaults:{},
		        	hidden : true,
		        	vertical : true,
		        	items:[
		        	]
		        	},
				{
					xtype:'button',
					text:'New',
					itemId:'newBtn',
					handler :'onNewBtn',
					disabled:false
				},
				{
					xtype:'button',
					text:'Cancel',
					itemId:'cancelBtn',
					handler :'onCancelBtn',
					disabled:true
				}],
		        
		buttons : [ {
			xtype : 'tbfill'
		},{
			xtype : 'button',
			text : 'Execute',
			itemId:'executeBtn',
			disabled : true,
			hidden:false,
			//handler : 'openQueryDetailWindow'
		}, {
			xtype : 'button',
			text : 'Save',
			itemId:'saveBtn',
			disabled : true,
			hidden:true,
			handler : 'openQueryDetailWindow'
		}, {
			xtype : 'button',
			text : 'Reset',
			itemId:'resetBtn',
			disabled : true,
			hidden:true,
			handler : 'resetQueryBuilder'
		} ]
	}
	,{
		region : 'east',
		width:'18%',
		split : true,
		collapsible : true,
		collapsed : false,
		titleCollapse:true,
		title:'Query Structure',
		autoScroll:true,
		layout:'fit',
		items :[{xtype:'query-structure'}]
	}
	]
});