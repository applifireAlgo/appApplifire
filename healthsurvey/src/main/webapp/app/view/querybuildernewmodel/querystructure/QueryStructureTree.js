Ext.define('Healthsurvey.view.querybuildernewmodel.querystructure.QueryStructureTree', {
	extend : 'Ext.tree.TreePanel',
	requires:['Healthsurvey.view.querybuildernewmodel.querystructure.QueryStructureController',
	          'Healthsurvey.view.querybuildernewmodel.querystructure.QueryStructureStore'],
	controller:'query-structure',
	xtype : 'query-structure',
	useArrows:true,
	rootVisible: false,
	loadMask :true,
	folderSort :true,
    title: '',
    initComponent: function() {
    	
        var me = this;

        Ext.applyIf(me,
        	{
            store: Ext.create('Ext.data.TreeStore', {
            	//fields:['type','text','config'],
            	recursive:true,
    		    root: {
    		        text: 'Root',
    		        expanded: true,
    		        children: [
    		                   {
    		                	   text:'SELECT',
    		                	   leaf:false,
    		                	   isSelect:true,
    		                	   nodeType:'isSelect',
    		                	   queryConfig :[],
    		                	   expanded:true,
    		                	   icon:'images/table-lines-icon.png',
    		                	   cls:'folderTitle',
    		                	   config:{},
    		                   },
    		                   {
    		                	   text:'FROM',
    		                	   leaf:false,
    		                	   isFrom:true,
    		                	   nodeType:'isFrom',
    		                	   queryConfig :[],
    		                	   expanded:true,
    		                	   cls:'folderTitle',
    		                	   icon:'images/table-lines-icon.png',
    		                	   config:{}
    		                   },
    		                   {
    		                	   text:'WHERE',
    		                	   leaf:false,
    		                	   isWhere:true,
    		                	   nodeType:'isWhere',
    		                	   queryConfig :[],
    		                	   cls:'folderTitle',
    		                	   icon:'images/table-lines-icon.png',
    		                	   expanded:true,
    		                	   config:{}
    		                   },
    		                 /*  {
    		                	   text:'JOIN',
    		                	   leaf:false,
    		                	   isJoin:true,
    		                	   nodeType:'isJoin',
    		                	   queryConfig :[],
    		                	   cls:'folderTitle',
    		                	   expanded:true,
    		                	   config:{}
    		                   },*/
    		                   {
    		                	   text:'GROUP BY',
    		                	   leaf:false,
    		                	   isGroupBy:true,
    		                	   nodeType:'isGroupBy',
    		                	   queryConfig :[],
    		                	   cls:'folderTitle',
    		                	   icon:'images/table-lines-icon.png',
    		                	   expanded:true,
    		                	   config:{}
    		                   },
    		                   {
    		                	   text:'ORDER BY',
    		                	   leaf:false,
    		                	   isOrderBy:true,
    		                	   nodeType:'isOrderBy',
    		                	   queryConfig :[],
    		                	   cls:'folderTitle',
    		                	   icon:'images/table-lines-icon.png',
    		                	   expanded:true,
    		                	   config:{}
    		                   }
    		                   ]
    		    }
            })
        	}
        );
    	    me.callParent(arguments);
    },
    listeners:{
    	scope:'controller',
    	renderer:function(){
    		
    	},
    	itemappend :'onItemAppend',
    	itemremove :'onItemRemove',
    	afterrender:'afterrender'
    }
});
