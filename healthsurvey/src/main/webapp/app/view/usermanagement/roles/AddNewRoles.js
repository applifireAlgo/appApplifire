Ext.define('Healthsurvey.view.usermanagement.roles.AddNewRoles', {
	extend : 'Ext.panel.Panel',
	requires:['Healthsurvey.view.usermanagement.roles.AddNewRolesController',
	          'Ext.tree.plugin.TreeViewDragDrop'],
	controller:'newRolesController',
	xtype : 'addRole',
	itemId:'addRole',
	layout:'border',
	margin:'2 0 0 0',
	items :[
	        {
	        	region:'west',
	        	xtype:'form',
	        	itemId:'roleFormPanel',
	        	bodyPadding:'8',
	        	width:'20%',
	        	title:'Roles Configuration',
	        	split:true,
	        	closable:false,
	        	collapsible:true,
	        	items:[
	        	       {
	        	    	   xtype:'textfield',
	        	    	   width:'100%',
	        	    	   fieldLabel:'Role Name',
	        	    	   itemId:'roleName',
	        	    	   emptyText:'Enter Role Name',
	        	    	   allowBlank:false
	        	       },
	        	       {
	        	    	   xtype:'textarea',
	        	    	   width:'100%',
	        	    	   fieldLabel:'Role Description',
	        	    	   itemId:'roleDesc',
	        	    	   margin:'10 0 0 0 ',
	        	    	   emptyText:'Enter Role Description',
	        	    	   allowBlank:true
	        	       }]
			},
			{
	        	region:'center',
	        	xtype:'panel',
	        	title:'Features Configuration',
	        	layout:'border',
	        	split:true,
	        	closable:false,
	        	collapsible:true,
	        	items :[
	        	        {
	        	        	region:'west',
	        	        	xtype:'treepanel',
	        	        	width:'50%',
	        	        	margin:'2 0 0 0',
	        	        	title:'Mapped Features',
	        	        	split:true,
	        	        	useArrows: true,
	        	        	rootVisible: false,
	        	        	reserveScrollbar: true,  //very imp property
	        	        	multiSelect: true,
	        	        	dragGroup :'myDDGroup',
	        	        	itemId:'mappedFeatureTree',
	        	        	//singleExpand: true,
	        	        	columns:[
	        	        	         {
	        	        	        	 xtype:'treecolumn',
	        	        	        	 text: 'Features',
	        	        	             flex: 2,
	        	        	             sortable: true,
	        	        	             dataIndex: 'text', 
	        	        	             menuDisabled: true,
	        	        	         },{
	        	        	        	 xtype: 'checkcolumn',
	        	        	        	 text:'Read',
	        	        	        	 align:'center',
	        	        	        	 stopSelection: false,
	        	        	             menuDisabled: true,
	        	        	             dataIndex:'isRead',
	        	        	             listeners : {
          	        	        		   checkchange : 'onIsReadCheckChange'
          	        	        	   }
	        	        	         },{
	        	        	        	 xtype: 'checkcolumn',
	        	        	        	 text:'Write',
	        	        	        	 align:'center',
	        	        	        	 stopSelection: false,
	        	        	             menuDisabled: true,
	        	        	             dataIndex:'isWrite',
	        	        	             listeners : {
	        	        	            	 checkchange : 'onIsWriteCheckChange'
	        	        	             }
	        	        	         },
	        	        	         {
	        	        	        	 xtype: 'checkcolumn',
	        	        	        	 text:'Execute',
	        	        	        	 align:'center',
	        	        	        	 stopSelection: false,
	        	        	             menuDisabled: true,
	        	        	             dataIndex:'isExecute',
	        	        	             listeners : {
          	        	        		   checkchange : 'onIsExecuteCheckChange'
          	        	        	   }
	        	        	         }],
	        	        	listeners:{
	        	        			afterrender:'initializeDropZone',
	        	        			itemcontextmenu:'itemContextMenuClick',
        	        	     } 	
	        	        },
	        	        {
	        	        	region:'center',
    	        	        xtype:'treepanel',
    	        	       	itemId:'allFeatureTree',
    	        	       	width:'50%',
    	        	       	title:'All Features',
    	        	       	margin:'2 0 0 0',
    	        	       	rootVisible:false,
    	        	       	useArrows: true,
    	       	        	checked: false,
    	       	        	allowDeselect : false,
    	       	        	listeners:{
    	       	        		afterrender:'afterAllFeatureTreeRender'
    	       	        	}	
	        	        }]
			}
	],
	buttons:[{
        text:'Save',
        icon:'images/greenFlopy_save.png',
        tooltip:'Save data',
        listeners:{
        	click:'onSaveRolesClick'
         }
     },
     {
	    text:'Reset',
	    icon:'images/reset1.png',
	    tooltip:'Reset data',
	    listeners:{
	       click:'onResetRolesClick'
	    }
	  }]
});