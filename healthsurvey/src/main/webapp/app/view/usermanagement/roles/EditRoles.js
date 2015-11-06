Ext.define('Healthsurvey.view.usermanagement.roles.EditRoles', {
	extend : 'Ext.panel.Panel',
	requires:['Healthsurvey.view.usermanagement.roles.EditRolesController',
	          'Ext.tree.plugin.TreeViewDragDrop'],
	controller:'editRolesController',
	xtype : 'editRole',
	layout:'border',
	margin:'2 0 0 0',
	items :[
	        {
	        	region:'west',
	        	xtype:'form',
	        	itemId:'eRoleFormPanel',
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
	        	    	   itemId:'eRoleName',
	        	    	   emptyText:'Enter Role Name',
	        	    	   allowBlank:false
	        	       },
	        	       {
	        	    	   xtype:'textarea',
	        	    	   width:'100%',
	        	    	   fieldLabel:'Role Description',
	        	    	   itemId:'eRoleDesc',
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
	        	        	width:'60%',
	        	        	margin:'2 0 0 0',
	        	        	title:'Mapped Features',
	        	        	split:true,
	        	        	useArrows: true,
	        	        	rootVisible: false,
	        	        	reserveScrollbar: true,  //very imp property
	        	        	multiSelect: true,
	        	        	dragGroup :'myDDGroup',
	        	        	itemId:'eMappedFeatureTree',
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
	        	        	         },
	        	        	         {
	        	        	        	 xtype: 'checkcolumn',
	        	        	        	 text:'Delete',
	        	        	        	 align:'center',
	        	        	        	 stopSelection: false,
	        	        	        	 menuDisabled: true,
	        	        	        	 dataIndex:'isDelete',
	        	        	        	 listeners : {
	        	        	        		 checkchange : 'onIsDeleteCheckChange'
	        	        	        	 }
	        	        	         }],
	        	        	listeners:{
	        	        			afterrender:'initializeDropZone',
        	        	     } 	
	        	        },
	        	        {
	        	        	region:'center',
    	        	        xtype:'treepanel',
    	        	       	itemId:'eAllFeatureTree',
    	        	       	width:'40%',
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
        tooltip:'Update data',
        listeners:{
        	click:'saveEditedRolesClick'
         }
     },
     {
	    text:'Reset',
	    icon:'images/reset1.png',
	    tooltip:'Reset data',
	    listeners:{
	       click:'resetEditedRolesClick'
	    }
	  }]
});