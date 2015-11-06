Ext.define('Healthsurvey.view.mobileview.resource.AppMenuTreePanelController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.appMenuTreePanelController',
	
	init : function() 
	{
		this.formTreePanel = this.getView();
		this.callParent();
	},
	renderFormPanel: function( currentObject, record, item, index, e, eOpts){
    	debugger;
    	//mbadd
    	
    	if(!record.data.leaf){
    		return false;
    	}
    	if(record.data.menuAction == null || record.data.menuAction == ""){
    		Ext.Msg.alert('Error...', 'No view available');
    		return;
    	}
    	var loadMask = new Ext.LoadMask({
		    msg    : 'Loading data...',
		    target : this.getView().up().up().up().up()//.up() //mbremove
		}).show();
    	
    	if(record.data.leaf)
    	{
    		var flag = false;
    		var config = record.data;
    		debugger;
    		var viewFile = config.menuAction;
    		var selectedView = Ext.create(viewFile);
    		selectedView.setTitle("");
    		selectedView.titleCollapse=false;
    		
    		var appCenterPanel =  Ext.getCmp('appMainTabPanel');
    		appCenterPanel.removeAll(true);
    		debugger;
    		//appCenterPanel.setTitle(config.text);
    		appCenterPanel.add([selectedView]);
    		//mbadd
    		appCenterPanel.setDisabled(!appCenterPanel.isDisabled());
    		loadMask.hide();
    	}
    	resourcePanel = currentObject.up().up().up().up();
    	resourcePanel.setHidden(true);
    	debugger;
	},
	applicationTabClose : function(me, eopts){
		debugger;
		
		
	}
	
});
