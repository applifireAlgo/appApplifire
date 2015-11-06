Ext.define('Healthsurvey.view.usermanagement.roles.RoleManagement', {
	extend : 'Ext.panel.Panel',
	requires : ['Healthsurvey.view.usermanagement.roles.AddNewRoles',
	            'Healthsurvey.view.usermanagement.roles.EditRoles',
	            'Healthsurvey.view.usermanagement.roles.RoleManagementController'],
	controller:'roleController',
	xtype : 'roleMainView',
	margin : '3 0 0 0',
	layout:'border',
	items:[{
	    	   xtype:'treepanel',
	    	   region:'west',
	    	   width:'15%',
	    	   title:'List of Roles',
	    	   itemId:'rolesTree',
	    	   split:true,
	    	   closable:false,
	    	   collapsible:true,
	    	   collapsed:true,
	    	   rootVisible : false,
	    	   //useArrows: true,
	    	   listeners: {
	   				load:'onRolesTreeLoad',
	   				itemclick:'onRoleListClick'
	   			},
	   			tbar: [{
					xtype : "textfield",
					emptyText : "Search Role",
					listeners : {
						change : "onTriggerFieldChange",
						buffer : 250
					}
	   			}]
	       },
	       {
	    	  region:'center',
	    	  xtype:'tabpanel',
	    	  itemId:'rolesTabPanel',
	    	 // tabPosition:'bottom',
	    	  items :[{
	    		        	title : 'Add New Roles',
	    		        	iconCls:'newTabIcon',
	    		        	xtype : 'addRole',
	    		        	style : 'background:#f6f6f6;',
	    		        	tooltip:'Add new roles with features'
	    		        },
	    		        {
	    					title : 'Edit Roles',
	    					iconCls:'editTabIcon',
	    					xtype : 'editRole',
	    		        	style : 'background:#f6f6f6;',
	    		        	disabled:true,
	    		        	itemId:'editRoleTab',
	    		        	tooltip:'Edit roles'
	    				}]
	    }]
	
});