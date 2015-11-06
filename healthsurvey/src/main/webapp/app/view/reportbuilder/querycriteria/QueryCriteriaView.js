Ext.define('Healthsurvey.view.reportbuilder.querycriteria.QueryCriteriaView', {
	extend : 'Ext.grid.Panel',
	requires:['Healthsurvey.view.reportbuilder.querycriteria.QueryCriteriaController',
	          'Healthsurvey.store.QueryCriteriaWidgetsStore',
	          'Ext.grid.RowEditor',
	          'Healthsurvey.view.reportbuilder.querycriteria.QueryCriteriaModel'
	          ],
	controller: 'queryCriteriaController',
	viewModel:'queryCriteriaModel',        
	xtype : 'query-criteria-view',
	panelId:'queyCriteriaGrid',
	itemId:'queryCriteriaGrid',
	border:true,
	bodyBorder:true,
	collapsible : true,
	collapseDirection : 'bottom',
	autoScroll : true,
	width : "100%",
	listeners:{
		scope:'controller',
		afterrender:'loadQueryCriteria',
		beforerender:'beforeGridRender',
		beforeedit:'loadDataBeforeEdit'
	},
	tbar:[
	      {
	    	  xtype : 'button',
	    	  icon : 'images/icon-add.png',
	    	  tooltip:'Add New Row',
	    	  listeners:{
	    		  click:'onAddQueryCriteriaRowClick'
	    	  }    	  
	      }, {
	    	   xtype: 'radiogroup',
	    	   fieldLabel:'Display Position',
	    	   margin:'0 4 0 600',
	    	   itemId:'qcDisplayPosition'	,
	    	   items: [
	             { boxLabel: 'Left', name: 'radio', inputValue: 'west' , margin:'0 5 0 0'},
	             { boxLabel: 'Top', name: 'radio', inputValue: 'north', checked: true },
	             ]
	       }
	],
	viewConfig : {
		plugins : {
			ptype : 'gridviewdragdrop'
		}
	},
	cntRow:1,
	columns : [
				{
					xtype : 'actioncolumn',
					menuDisabled : true,
					text : 'Action',
					align: 'left',
					flex:0.100,
					items : [ {
						icon : 'images/delete.gif',
						tooltip : 'Delete Row',
						handler : "onRemoveClick"						
					} ]
				},
				{
					header : 'Display Name',
					dataIndex : 'displayName',
					flex:0.125,
					align: 'left',
					editor : {
						xtype : 'textfield'
					}
				},
				{
					header : 'Attribute',
					dataIndex : 'name',
					align: 'left',
					flex:0.125,
					editor : {
						xtype : 'textfield'
					}
				},
				{
					header : 'Widget',
					dataIndex : 'widget',
					width : 130,
					sortable : false,
					menuDisabled : true,
					align: 'left',
					flex:0.125,
					renderer : function(value, metaData,record, row, col, store, gridView)
					{
						debugger;
						var store = this.columns[col].getEditor().getStore();// .data.items[0].data;
						var findVal = store.findExact("widget_xtype", value);
						if (findVal != -1) {
							return store.getAt(findVal).data.widget_name
						} else
						return "";
					},
					editor : {
						xtype : 'combo',
						editable : true,
						/*bind:{
						store:'{WidgetStore}'
						},*/
						store : 'Healthsurvey.store.QueryCriteriaWidgetsStore',
						queryMode : 'local',
						forceSelection : true,
						triggerAction : 'all',
						selectOnFocus : true,
						selectOnTab : true,
						allowBlank : false,
						displayField : 'widget_name',
						valueField : 'widget_xtype'
					}
				},
				{
					header : 'Service',	
					dataIndex : 'service',
					filterable : true,
					editable : false,
					align: 'left',
					flex:0.125,
					// To display name instead of id after editing grid & in record parameter respective id is saved
					renderer : function(value, metaData,record, row, col, store, gridView)
					{
						debugger;
						var serviceStore = this.columns[col].getEditor().getStore();// .data.items[0].data;
						var findVal = serviceStore.findExact("id", value);
						if (findVal != -1) {
							var url=serviceStore.getAt(findVal).data.jsonData;
							var name=serviceStore.getAt(findVal).data.name;
							record.data.serviceName=name;
							record.data.serviceUrl=url.resourceMapping;
							try{
								record.markDirty();	
							}catch(e){							
							}		
						}
						return record.data.serviceName;
					},
					editor:{
							xtype:'combobox',
							bind:{
								store : '{ServiceStore}'
							},
							emptyText : 'Select Service',
							queryMode : 'local',
							forceSelection : true,
							displayField : 'name',
							valueField : 'id',
							listeners:{
								change : 'onServiceClick'
							}
					}
				},
				{
					header : 'Service Operation',	
					dataIndex : 'serviceOp',
					filterable : true,
					editable : false,
					align: 'left',
					flex:0.125,
					// To display name instead of id after editing grid & in record parameter respective id is saved
					renderer : function(value, metaData,record, row, col, store, gridView)
					{
						debugger;
						var serviceOpStore = this.columns[col].getEditor().getStore();// .data.items[0].data;
						var findVal = serviceOpStore.findExact("id", value);				
						if (findVal != -1) {
							var url=serviceOpStore.getAt(findVal).data.jsonData;
							var name=serviceOpStore.getAt(findVal).data.name;
							record.data.serviceOpName=name;
							record.data.serviceOpUrl=url.serviceMethodHeader.resourceMapping;
							try{
								record.markDirty();	
							}catch(e){							
							}					
						}
						return record.data.serviceOpName;
					},		
					editor:{
							xtype:'combobox',
							bind:{
								store : '{ServiceOpStore}'
							},
							emptyText : 'Select Service',
							queryMode : 'local',
							forceSelection : true,
							displayField : 'name',
							valueField : 'id'
					}
				},
				{
					header : 'Default Value',
					dataIndex : 'defaultValue',
					align: 'left',
					flex:0.125,
					editor : {
						xtype : 'textfield',
						
					}
				},
				{
					header : 'Dependant Widget',
					width:140,
					dataIndex : 'dependantW',
					align: 'left',
					flex:0.150,
					renderer :function(value, metaData,record, row, col, store, gridView) 
					{
						debugger;
						var dWidgetStore = this.columns[col].getEditor().getStore();// .data.items[0].data;
						var findVal = dWidgetStore.findExact("dependentId", value);
						if (findVal != -1) {
							var name=dWidgetStore.getAt(findVal).data.dependentName;
							record.data.dependantWidgetName=name;
							try{
								record.markDirty();	
							}catch(e){							
							}		
						}
						return record.data.dependantWidgetName;
					},
					editor : {
						xtype : 'combobox',
						editable : true,
						comboType : 'dependant',
						store:{},
						queryMode : 'local',
						forceSelection : true,
						triggerAction : 'all',
						selectOnFocus : true,
						selectOnTab : true,
						allowBlank : true,
						displayField : 'dependentName',
						valueField : 'dependentId'
					}
				} 
	],//columns ends
	selType: 'rowmodel',
    plugins: {
        ptype: 'rowediting',
        clicksToEdit: 1
    }	
});