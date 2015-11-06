Ext.define('Healthsurvey.view.clouddrive.CloudDriveController', {
	extend: 'Ext.app.ViewController',
	requires : [ 'Healthsurvey.view.clouddrive.documentview.DocumentListView'
	           ],
	alias: 'controller.clouddrive',
	drivedetails:null,
	documentview:null,
	driveNewFolder :null,
	
	loadData:function(panel,eopts)
	{
		this.initObject();
	},
	initObject:function()
	{
		this.drivedetails=this.getView().down("drivedetails");
		this.documentview=this.getView().down("documentsview");
	},	
	onListViewClick:function()
	{
		debugger;
		this.getView().down("#drivedetails").controller.listViewFlag=true;
		centerPanel=this.getView().down("#documentViewId");
		centerPanel.removeAll();
		centerPanel.add({xtype:"documentListView"})
	},
	onGridViewClick:function()
	{
		debugger;
		this.getView().down("#drivedetails").controller.listViewFlag=false;
		centerPanel=this.getView().down("#documentViewId");
		centerPanel.removeAll();
		centerPanel.add({xtype:"documentsview"})
	}
	
});	