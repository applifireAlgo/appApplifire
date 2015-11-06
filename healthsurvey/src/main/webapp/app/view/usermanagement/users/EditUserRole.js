Ext.define('Healthsurvey.view.usermanagement.users.EditUserRole', {
	extend : 'Ext.panel.Panel',
	requires : ['Ext.ux.form.ItemSelector',
	            'Healthsurvey.view.usermanagement.users.EditUserRoleController'],
	controller:'editUserRoleController',
	xtype : 'editUserRole',
	margin : '3 0 0 0',
	layout:'border',
	items:[{
	    	   xtype:'treepanel',
	    	   region:'west',
	    	   width:'18%',
	    	   title:'List of Users',
	    	   itemId:'mappedUserTreeId',
	    	   split:true,
	    	   closable:false,
	    	   collapsible:true,
	    	   rootVisible : false,
	    	   listeners: {
	   				load:'onUserTreeLoad',
	   				itemclick:'onUserListClick'
	   		   },
	   		   tbar: [{
						xtype : "textfield",
						emptyText : "Search User",
						listeners : {
							change : "onTriggerFieldChange",
							buffer : 250
						}
	   		   }]
	       },
	       {
	    	  region:'center',
	    	  xtype:'form',
	    	  layout:'fit',
	    	  itemId : 'form',
	    	  items:[{
		    	  		xtype: 'itemselector',
			            name: 'itemselector',
			            itemId: 'itemselector-field',
			            anchor: '100%',
			            imagePath: 'ext/src/ux/css/images/',
			            store:Ext.create('Ext.data.Store', {
			    			fields : ['roleName','roleId','roleUserMapId'],
			    			data : []
			    		}),
			            displayField:'roleName',
			            valueField: 'roleId',
			            //value: ['3', '4', '6'],
			            allowBlank: true,
			            msgTarget: 'side',
			            toTitle: 'Mapped Roles',
			            fromTitle: 'All Roles',     
			            listeners:{
			            	afterrender:'afterItemSelectorRender'
			            }
			      	}],
			   buttons:[{
		        		text:'Save',
		        		icon:'images/greenFlopy_save.png',
		        		disabled:true,
		        		itemId:'savebtn',
		        		tooltip:'Update mapped data',
		        		listeners:{
		        			click:'onUpdateUserRoleClick'
		        		}
		  			},
		  			{
		  				text:'Reset',
		  				icon:'images/reset1.png',
		  				tooltip:'Reset selected roles',
		  				listeners:{
		  					click:'onResetClick'
		  				}
		  			}]
	  }]			  	
});