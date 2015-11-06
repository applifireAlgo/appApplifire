Ext.define('Healthsurvey.view.mobileview.main.TopPanel.TopMenu', { 
	extend: 'Ext.toolbar.Toolbar',
    xtype: 'topMenu',
    requires:['Healthsurvey.view.mobileview.main.TopPanel.TopMenuController',/*'Healthsurvey.view.mobileview.main.ResourceWindow'*/],
    controller :'topMenuController',
    border:0,
    itemId:'topMenuPanel',
    autoScroll :true,
    items:[
/*{
    menu: {
        items: [
                {
                	xtype:'panel',
                	closable:true,
                	//height:400,
                	width:900,
                    title: 'UI',
                    itemsId:'testing',
                  
                    listeners:
                    {
                    	afterrender:function(panel,e,eOpts)
                    	{
                    		debugger;
                    		var westAccodianPanel = this.up().up().up().up().up().down('#appMenuTreePanel');
                    		debugger;
                    		panel.items.add(westAccodianPanel.getView());
                    	
                    	},
                    
                    }
                    
                   
                }
        ]                     
    }
},
{
    menu: {
        items: [
                {		text: 'Resorces',
                		handler:function(panel,e,eOpts)
                    	{
                    		debugger;
                    		var westAccodianPanel = this.up().up().up().up().up().down('#appMenuTreePanel');
                    		var resourceWindow = Ext.create('Healthsurvey.view.mobileview.main.ResourceWindow');
                    	
                    		resourceWindow.items.items.push(westAccodianPanel);
                    	  	  
                    		resourceWindow.show();
                    		
                    		debugger;
                    		resourceWindow.setX(this.getX()+5);
                    		resourceWindow.setY(this.getY()+5);
                    		
                    	},
                    
                
                }
        ]                     
    }
}*/,
/*{
    //icon: 'images/text_list_bullets.png',
    menu: {
        items: [
                {
                    text: 'Login',
                   
                },
                {
                    text: 'Register',
                                      
                },
                {
                    text: 'Product'
                },
                {
                    text: 'Order'
                },
                {
                    text: 'Category'
                }
        ]                     
    }
}*/
    ]
});