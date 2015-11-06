Ext.define('Healthsurvey.view.reportbuilder.gridconfig.GridConfigView', {
	extend : 'Ext.grid.Panel',
	requires: ['Ext.ux.CheckColumn',
	           'Healthsurvey.view.reportbuilder.gridconfig.GridConfigController',
	           'Ext.grid.RowEditor'
	           ],
	controller: 'gridConfigController',
	xtype : 'grid-config-view',
	itemId:'gridConfig',
	panelId:'gridConfig',
	collapsible : true,
	collapseDirection : 'bottom',	
	width : "100%",
	autoScroll : true,
	listeners:{
		scope:'controller',
		afterrender:'afterRender'
	},
	viewConfig : {
			plugins : {
				ptype : 'gridviewdragdrop'
			}
	},
	selType: 'rowmodel',
    plugins: {
        ptype: 'rowediting',
        clicksToEdit: 1
    },
    tbar:[{
		xtype : "checkbox",
		checkId : "summaryGrid",
		itemId: "summaryGrid",
		inputValue : 1,
		boxLabel : "Summary Grid"
	},{
		xtype : "checkbox",
		checkId : "checkboxgrid",
		itemId: "checkboxgrid",
		inputValue : 1,
		boxLabel : "Checkbox Grid"
	} ,'->',
          {
	    	  xtype : 'button',
	    	  text:'Header Grouping',
	    	  icon : 'images/headerGroup.png',
	    	  tooltip:'Add Grouping to Grid Header',
	    	  listeners:{
	    		  click:'onHeaderGroupClick'
	    	  }    	  
	      }
    ],
	columns : [  
	            {
					xtype : 'checkcolumn',
					dataIndex : 'fieldVisible',
					text : 'Visible?',
					sortable : false,
					//locked:true,
					hideable : false,
					resizable : true,
					columnLines : false,
					menuDisabled : true,
					align: 'left',
					width:70,
					
					listeners:{
						afterrerender:function(th, eOpts){
						}
					}
	            }, 
	            {
					text : "Field Name",
					width:100,
					sortable : false,
					resizable : true,
					menuDisabled : true,
					editable : false,
					align: 'left',
					dataIndex : 'name'
	            },
	            {
					text : "Field Display Name",
					width:150,
					allowBlank : false,
					sortable : false,
					resizable : true,
					menuDisabled : true,
					dataIndex : 'displayName',
					align: 'left',
					editor : {
						allowBlank : false,
						xtype : 'textfield'
					}
	            },
	            {
					text : "Field Type ",
					width:100,
					menuDisabled : true,
					resizable : true,
					dataIndex : 'dataType',
					editable : false
	            },
	            {
					text : "Sort Type",
					width:100,
					sortable : true,
					dataIndex : 'isSortable',
					editable : false,
					resizable : true,
					menuDisabled : true,
					align: 'left',
					editor : {
						xtype : 'combo',
						editable : false,
						store : new Ext.data.ArrayStore({
							fields : [ 'isSortable', 'isSortableval' ],
							data : [ [ '', '' ], [ 'ASC', 'ASC' ], [ 'DESC', 'DESC' ]
							]
						}),
						displayField : 'isSortable',
						valueField : 'isSortableval',
						emptyText : 'Select Sort Type'
					}
	            }, 
	            {
					text : "Field Width",
					width:100,
					sortable : false,
					hideable : false,
					resizable : true,
					menuDisabled : true,
					align: 'left',
					dataIndex : 'fieldWidth',
					type : 'number',
					editor : {
						xtype : 'numberfield',
						minValue : 1,
						maxValue : 10000
					}
				},
				{
					text : "Alignment",
					width:100,
					sortable : true,
					dataIndex : 'alignment',
					editable : false,
					resizable : true,
					menuDisabled : true,
					align: 'left',
					editor : {
						xtype : 'combo',
						editable : false,
						store : new Ext.data.ArrayStore({
							fields : [ 'isAlign', 'isAlignval' ],
							data : [ [ '','' ],[ 'Right Align', 'Right Align' ],[ 'Left Align', 'Left Align' ]
		
							]
						}),
						displayField : 'isAlign',
						valueField : 'isAlignval',
						emptyText : 'Select Alignment'
					}
	            },
	            {
					xtype : 'checkcolumn',
					dataIndex : 'lock',
					text : 'Column Lock?',
					sortable : false,
					hideable : false,
					resizable : true,
					columnLines : false,
					menuDisabled : true,
					align: 'center',
					width:130,
	            },
	            {
					xtype : 'checkcolumn',
					dataIndex : 'summaryGroup',
					text : 'Row Grouping',
					sortable : false,
					hideable : false,
					resizable : true,
					columnLines : false,
					menuDisabled : true,
					align: 'center',
					width:130,
	            },
	            {	
	            	text : "Group Aggregation",
	            	width:135,
					//width:30,
					sortable : true,
					dataIndex : 'summaryAgg',
					editable : false,
					resizable : true,
					menuDisabled : true,
					align: 'left',
					editor : {
						xtype : 'combo',
						editable : false,
						store : new Ext.data.ArrayStore({
							fields : [ 'id', 'value' ],
							data : [ [ '','' ],[ 'Sum', 'Sum' ],[ 'Min', 'Min' ],[ 'Max', 'Max' ],[ 'Average', 'Average' ],[ 'Count', 'Count' ]
							]
						}),
						displayField : 'value',
						valueField : 'id',
						emptyText : 'Select Aggregation'
					}
	            },
	            {
					text : "Summary Caption",
					width:130,
					allowBlank : true,
					sortable : false,
					resizable : true,
					menuDisabled : true,
					dataIndex : 'summaryCaption',
					align: 'left',
					editor : {
						allowBlank : true,
						xtype : 'textfield'
					}
	            }
		]//columns ends

});