Ext.define('Healthsurvey.view.fw.component.FileUploadComponent', {
	
	getValue : function() {
		return this.up().down('#filePathHidden').getValue();
	},
	
	requires :["Healthsurvey.view.fw.frameworkController.FileUploadComponentController"],
	controller : 'FileUploadComponentController',
	xtype : "fileupload",
	extend : 'Ext.form.FieldSet',	
	itemId : 'dataUploadFieldSet',
	cls : 'entity-fieldset',
	collapsed : false,
	collapsible : false,
	
	items : [{
		
		xtype : 'form',
		layout : 'hbox',
		defaults :{
			margin: "5 5 5 5",
		},
		items : [{
			xtype : 'filefield',
			name : 'file',
			flex : 3,
			listeners : {
				change : function(button, e, value) {
					var newValue = e.replace(/^c:\\fakepath\\/i, ''); 
					this.setRawValue(newValue);
					this.up().down('#uploadButton').setDisabled(false);
				},
				render : function() {
					var view = this.up();
					this.setFieldLabel(view.fileUploadCaption);
				}
			}
		 },{
			 xtype : 'button',
			action:'dataUpload',
			text : 'Upload',
			itemId : 'uploadButton',
			disabled : true,
			flex : 1,
			handler : 'sendFile'
		 }
		         ]
		
	}]
});