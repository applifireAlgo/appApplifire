Ext.define('Healthsurvey.view.querybuildernewmodel.querycondition.QueryWhereCondition', {
	extend : 'Ext.tree.TreePanel',
	requires:['Healthsurvey.view.querybuildernewmodel.querycondition.QueryWhereConditionController'],
	controller:'query-where-condition',
	xtype : 'query-where-condition',
	itemId : 'query-where-condition',
	controller:'query-where-condition',
	useArrows:false,
	rootVisible: true,
	loadMask :true,
	folderSort :true,
	margin:'0 1 0 1',
    title: '',
  //  hideHeaders :true,
    queryBuilder:null,
    store:null,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            store: Ext.create('Ext.data.TreeStore', {
    		    fields:['_connId','_parentConnId','isRootCondition','andor','leftFieldConfig','operator', 'rightFieldConfig'],
    		    root: {
    		        text: 'Root',
    		        andor:'Where',
    		        isWhere:true,
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
            columns: [{
            	xtype:'actioncolumn',
            	width:40,
            	defaults:{
            		margin:10
            	},
            	items:[{
            		icon:'images/new.png',
            		margin:5,
            		handler:'addWhereCondition'
            	},{
            		icon:'images/delete.png',
            		margin:5,
            		handler:'deleteWhereCondition'
            	}] 
            	},
            	 {
                    xtype: 'treecolumn',
                    dataIndex: 'andor',
                    text: '',
                    flex:1,
                    rootVisible:false,
                    editor:{xtype:'combobox',store:['AND','OR']}
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'leftFieldConfig',
                    text: 'Left Operand',
                    emptyCellText:'<a>Left Operand </a>',
                    flex:1,
                    editor:'label',
                    renderer: function(val, meta, model){
                    	
                    	if(model.isRoot()){
                    		return " ";
                    	}else if(val && (val.hasOwnProperty('fieldValue'))){
                    		return val.fieldValue;
                    	}
                    	/*if(val && (val.hasOwnProperty('fieldConfig')&&val.hasOwnProperty('entConfig'))){
                    		return val.entConfig.name.replace(" ","").toLowerCase()+"."+val.fieldConfig.fieldName;

                    	}*/
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'operator',
                    text: 'Operator',
                   emptyCellText:'Operator',
                    width:80,
                    editor:{xtype:'combobox',store:['=','!=','<','>','<>','>=','<=','!<','!>']},
                    renderer: function(val, meta, model){
                    	
                    	if(model.isRoot()){
                    		return " ";
                    	}else
                    		if(val){
                    				
                        		return val;
                        	}
                    }
                    	
                },{
                    xtype: 'gridcolumn',
                    dataIndex: 'rightFieldConfig',
                    text: 'Right Operand',
                    emptyCellText:'<a>Right Operand </a>',
                    flex:1,
                    editor:'label',
                    renderer: function(val, meta, model){
                    	
                    	if(model.isRoot()){
                    		return " ";
                    	}
                    		else if(val && (val.hasOwnProperty('fieldValue'))){
                        		return val.fieldValue;
                        	}
                    		/*
                    	if(val && (val.hasOwnProperty('fieldConfig')&&val.hasOwnProperty('entConfig'))){
                    		return val.entConfig.name.replace(" ","").toLowerCase()+"."+val.fieldConfig.fieldName;
                    	}*/
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: '_connId',
                    text: 'ConnId',
                    emptyCellText:'',
                    hidden:true
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'isRootCondition',
                    text: 'isWhereRoot',
                    emptyCellText:'',
                    hidden:true
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: '_parentConnId',
                    text: '_parentConnId',
                    emptyCellText:'',
                    hidden:true
                },
                
            ]
        });

        me.callParent(arguments);
    }
    
    
});