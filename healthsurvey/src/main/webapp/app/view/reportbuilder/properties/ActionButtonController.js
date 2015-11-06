Ext.define('Healthsurvey.view.reportbuilder.properties.ActionButtonController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.actionbuttoncontroller',
    rptBuilderTab:null,
    chartRightPanel:null,
    querycriteria:null,
    onAddActionButton:function(btn)
    {
    	debugger;
    	this.loadServiceData();
	//	var rptBuilderActiveTab=btn.up().up().up().up().up().up().getActiveTab();
    	this.settingsWindow.isEdit=false;
    	this.settingsWindow.down("#actionnames").reset();
    	this.settingsWindow.down("#actionservice").reset();
		this.settingsWindow.show();
    },
    
    afterActionButtonRender:function(grid) 
	{
		this.rptBuilderTab=grid.up().up().up();
		this.querycriteria=rptBuilderTab.down("#queryCriteriaGrid");
		this.initWidgets (rptBuilderTab,grid);
		
		grid.reconfigure(this.getActionButtonStore());
		
		if(this.rptBuilderTab.isEdit!=null && this.rptBuilderTab.isEdit==true)
		{
			if(this.rptBuilderTab.actionbuttongrid.length>0){
				grid.getStore().loadData(this.rptBuilderTab.actionbuttongrid,true);
			}
		}
	},
	getActionButtonStore : function()
	{
		return Ext.create('Ext.data.Store', {
			fields : [	'name',
			          	'servicename',
			          	'serviceid'
			         ],
			data : []
		});
	},
    initWidgets : function(rptBuilderActiveTab, actionbuttongrid)
	{
		this.setServiceStore();
		this.settingsWindow=this.getSettingWindow(rptBuilderActiveTab, actionbuttongrid);
	},
	getSettingWindow:function(rptBuilderActiveTab, actionbuttongrid)
	{
		return Ext.create('Ext.window.Window',{
					title : 'Data Point Configuration',
					modal : true,
					resizable : false,
					gridObj : actionbuttongrid,
					controller : this,
					closeAction : 'close',
					border : 0,
					plain : true,
					isEdit:false,
					layout:'vbox',
					editdFieldName:null,
					editAggField:null,
					bodyPadding:'5',
					items : [
					         {
					        	 xtype:'textfield',
					        	 fieldLabel:'Label',
					        	 txtType : "labelName",
					        	 itemId:"actionnames",
					        	 emptyText:'Enter a name',
					        	 margin : '10 0 0 0'
					         },	
					         this.getServiceCombo(),
		],// window items ends
					buttonAlign : 'right',
					buttonMargins : '10 10 0 10',
					buttons : [
					           {
								text : 'Save',
								icon:'images/greenFlopy_save.png',
								tooltip : 'Save',
								handler : function()
								{
									var windowObj = this.up().up();
									var controller = windowObj.controller;
									var grid = windowObj.gridObj;
									var store=grid.getStore();
									var name=windowObj.down("#actionnames");
									var service=windowObj.down("#actionservice");
									var findVal=service.store.findExact("id",service.getValue());
									var dName=service.store.getAt(findVal).data.name;
									var data = {
												name : name.getValue(),
												servicename: dName,
												serviceid:service.getValue()
											}
												
									if (windowObj.isEdit != undefined&& windowObj.isEdit == true)
										{
											var rec = store.getAt(windowObj.rowIndex);
											rec.set(data);
										}else {
											store.add(data);
										}
									this.up().up().close();	
								}// handler ends
							},
							{
								text : 'Cancel',
								icon:'images/delete_icon.png',
								handler : function(){
									this.up().up().close();// window close
								}
							}]// buttons ends
				});	// window ends
	}, // getSettingWindow ends
	
	editActionclick:function( th, record, item, index, e, eOpts )
	{
		this.loadServiceData();
		var rptBuilderActiveTab=th.up().up().up().up().up().getActiveTab();
		record = record.data;
		this.settingsWindow.isEdit = true;
		this.settingsWindow["rowIndex"] = index;
		this.settingsWindow.down("#actionnames").setValue(record.name);
    	this.settingsWindow.down("#actionservice").setValue(record.serviceid);
		this.settingsWindow.show();
	},
	loadSavedData : function(record) 
	{

	},
	
	onDeleteActionClick : function(grid, rowIndex)
	{
		grid.getStore().removeAt(rowIndex);
	},getServiceCombo:function(){
		return new Ext.form.ComboBox({
			xtype : 'combobox',
			fieldLabel : 'Select Service',
			valueField : 'id',
			margin : '10 0 0 0',
			displayField : 'name',
			itemId:"actionservice",
			columnWidth : 0.4,
			emptyText : 'Select',
			store:this.servicestore,
			queryMode : 'local',
		});
	},
	setServiceStore : function() //Store structure same as GridConfig store structure
	{
		this.servicestore=Ext.create('Ext.data.Store', {
			fields : [ 'id', 'name','jsonData'],
			data : []
		});
		
	},
	loadServiceData:function(){
		this.servicestore.loadData(this.querycriteria.controller.serviceData);
	}
});