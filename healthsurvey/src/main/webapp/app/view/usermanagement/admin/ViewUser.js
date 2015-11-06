Ext.define('Healthsurvey.view.usermanagement.admin.ViewUser', {
	extend : 'Ext.panel.Panel',
    requires:['Healthsurvey.view.usermanagement.admin.ViewUserController'],
    xtype: 'viewUser',
    controller: 'viewUserController',
    layout: {
        type: 'border'
    },
    margin:'3 0 0 0',
    items:[
           	{
           	 xtype:'treepanel',
	    	   region:'west',
	    	   width:'18%',
	    	   title:'List of Users',
	    	   itemId:'usersTreeId',
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
    			region : 'center',
    			xtype:'panel',
    			itemId:'userDetailsPanel',
    			title:'User Details',
    			layout:'anchor',
    			autoScroll:true,
    			listeners:{
				    afterrender:'afterUserDetailPanelRender'
				}
    		}
    	]
});
