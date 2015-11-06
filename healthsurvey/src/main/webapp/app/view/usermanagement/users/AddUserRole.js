Ext.define('Healthsurvey.view.usermanagement.users.AddUserRole', {
	extend : 'Ext.panel.Panel',
	requires : ['Healthsurvey.view.usermanagement.users.AddUserRoleController'],
	controller:'addUserRoleController',
	xtype : 'addUserRole',
	margin : '3 0 0 0',
	layout: {
 		   type: 'vbox',
 		   align : 'stretch',
 	},
	items:[{
			title:'Step 1: Select Roles',
			flex:0.5,
			xtype:'panel',
			width : "100%",	
			layout:'hbox',
			bodyPadding:'8',
			bodyStyle:'background-image:url("resources/square.gif");',
			items:[
			       {
			    	   xtype:'grid',
			    	   flex:1,
			    	   margin:'0 15 0 25',
			    	   height:300,
			    	   title:'Available Roles',
			    	   itemId:'availableRoleGrid',
			    	   selType: 'checkboxmodel',
			    	   store:new Ext.create('Ext.data.Store', {
			    			fields : ['roleName','roleId'],
			    			data : [],
			    			sorters: ['roleName']
			    		}), 
			    	   columns:[{
			    	           	text:'Role Name',
			    	           	dataIndex:'roleName',
			    	           	flex:1
			    	   }],
			    	   tools: [{
			                type: 'refresh',
			                tooltip: 'Reset both grids',
			                listeners:{
			                	click:'onRolesResetClick'
			                }
			            }],
			            listeners:{
			            	afterrender:'afterAvailableRoleGridRender'
			            },
			            viewConfig: {
			                plugins: {
			                    ptype: 'gridviewdragdrop'
			                }
			            }
			       },
			       {
			    	   layout:'vbox',
			    	   bodyStyle: 'background:transparent;',
			    	   items:[
								{
									   xtype:'button',
									   text:'>>',
									   tooltip:'Add to Selected',
									   margin:'100 0 0 0',
									   listeners:{
										   click:'onAddToSelectRolesClick'
									   }
								},
								{
									   xtype:'button',
									   text:'<<',
									   tooltip:'Remove from Selected',
									   margin:'10 0 0 0',
									   listeners:{
										   click:'onRemoveFromSelectRolesClick'
									   }
								}]
			       },
			       {
			    	   xtype:'grid',
			    	   flex:1,
			    	   margin:'0 25 0 15',
			    	   height:300,
			    	   itemId:'selectedRoleGrid',
			    	   title:'Selected Roles',
			    	   store:new Ext.create('Ext.data.Store', {
			    			fields : ['roleName','roleId'],
			    			data : [],
			    			sorters: ['roleName']
			    		}), 
			    	   columns:[{
			    	            text:'Role Name',
			    	            dataIndex:'roleName',
			    	            flex:1
			    	   }],
			    	   viewConfig: {
			                plugins: {
			                    ptype: 'gridviewdragdrop'
			                }
			           }
			       }
			]
		},
		{
			title:'Step 2: Select Users',
			flex:0.5,
			margin:'0 0 3 0',
			xtype:'panel',
			width : "100%",
			layout:'hbox',
			bodyPadding:'8',
			bodyStyle:'background-image:url("resources/square.gif");',
			items:[
			       {
			    	   xtype:'grid',
			    	   flex:1,
			    	   margin:'0 15 0 25',
			    	   height:300,
			    	   title:'Available Users',
			    	   itemId:'availableUserGrid',
			    	   selType: 'checkboxmodel',
			    	   store:new Ext.create('Ext.data.Store', {
			    			fields : ['firstName','userId'],
			    			data : [],
			    			sorters: ['firstName']
			    		}), 
			    	   columns:[{
			    	         	text:'User Name',
			    	         	dataIndex:'firstName',
			    	         	flex:1
			    	   }],
			    	   tools: [{
			                type: 'refresh',
			                tooltip: 'Reset both grids',
			                listeners:{
			                	click:'onUserResetClick'
			                }
			            }],
			            listeners:{
			            	afterrender:'afterAvailableUserGridRender'
			            },
			            viewConfig: {
			                plugins: {
			                    ptype: 'gridviewdragdrop'
			                }
			           }
			       },
			       {
			    	   layout:'vbox',
			    	   bodyStyle: 'background:transparent;',
			    	   items:[
								{
									   xtype:'button',
									   text:'>>',
									   tooltip:'Add to Selected',
									   margin:'100 0 0 0',
									   listeners:{
										   click:'onAddToSelectUserClick'
									   }
								},
								{
									   xtype:'button',
									   text:'<<',
									   tooltip:'Remove from Selected',
									   margin:'10 0 0 0',
									   listeners:{
										   click:'onRemoveFromSelectUserClick'
									   }
								}]
			       },
			       {
			    	   xtype:'grid',
			    	   flex:1,
			    	   margin:'0 25 0 15',
			    	   height:300,
			    	   title:'Selected Users',
			    	   itemId:'selectedUserGrid',
			    	   store:new Ext.create('Ext.data.Store', {
			    			fields : ['firstName','userId'],
			    			data : [],
				    		sorters: ['firstName']
			    		}), 
			    	   columns:[{
			    	            text:'User Name',
			    	            dataIndex:'firstName',
			    	            flex:1
			    	   }],
			    	   viewConfig: {
			                plugins: {
			                    ptype: 'gridviewdragdrop'
			                }
			           }
			       }
			]
	}],
	buttons:[{
				text:'Save',
				icon:'images/greenFlopy_save.png',
				tooltip:'Save mapped data',
				listeners:{
					click:'onSaveUserRoleClick'
				}
			},
			{
				text:'Reset',
				icon:'images/reset1.png',
				tooltip:'Reset all grids',
				listeners:{
					click:'onResetClick'
				}
			}]
});