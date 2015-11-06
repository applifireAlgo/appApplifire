Ext.define('Healthsurvey.view.querybuildernewmodel.querycondition.QuerySelectTree', {
	extend : 'Ext.tree.TreePanel',
	requires:['Healthsurvey.view.querybuildernewmodel.querycondition.QuerySelectController',
	          'Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.QueryFieldsStore','Ext.selection.CheckboxModel'],
	controller:'query-select',
	xtype : 'query-select',
	useArrows:true,
	rootVisible: false,
	loadMask :true,
	margin:'0 1 0 1',
	folderSort :true,
	checked:false,
	bodyPadding:'0 10 0 0',
	hideHeaders :true,
	store:null,
    title: '',
    	 initComponent: function() {
    	        var me = this;

    	        Ext.applyIf(me, {
    	            store: Ext.create('Ext.data.TreeStore', {
    	    		    fields:['selectField','orderBy','aggregate'],
    	    		    root: {
    	    		        text: 'Root',
    	    		        selectField:'Fields',
    	    		        isSelect:true,
    	    		        expanded: true,
    	    		        children: []
    	    		    }
    	    		}),
    	            plugins:[
    	                     Ext.create('Ext.grid.plugin.CellEditing',{
    	                    	 clicksToEdit:1,
    	                    	 listeners:{
    	                    		scope:'controller',
    	                    		beforeedit:'beforeCellEdit',
    	                    		edit:'onCellEdit'
    	                    	 }
    	                     })
    	            ],
    	            columns: [
    	            	 {
    	                    xtype: 'treecolumn',
    	                    dataIndex: 'selectField',
    	                    text: '',
    	                    flex:4
    	                   
    	                },
    	                {
    	                    xtype: 'gridcolumn',
    	                    dataIndex: 'orderBy',
    	                    //text: 'Sort',
    	                    emptyCellText:'Sort',
    	                    flex:1,
    	                    editor:{xtype:'combobox',store:['ASC','DESC']},
    	                    renderer: function(val, meta, model){
    	                    	
    	                    	if(model.data.isEntity){
    	                    		return " ";
    	                    	}
    	                    	else{
    	                    		return val;
    	                    	}
    	                    }
    	                },
    	                {
    	                    xtype: 'gridcolumn',
    	                    dataIndex: 'aggregate',
    	                    //text: 'aggregate',
    	                    emptyCellText:'Aggregate',
    	                    flex:1,
    	                    editor:{xtype:'combobox',store:['AVG','SUM']},
    	                    renderer: function(val, meta, model){
    	                    	
    	                    	if(model.data.isEntity){
    	                    		return " ";
    	                    	}
    	                    	else{
    	                    		
    	                    		return val;
    	                    	}
    	                    }
    	                    	
    	                } 
    	            ]
    	        });

    	        me.callParent(arguments);
    	    }
});
