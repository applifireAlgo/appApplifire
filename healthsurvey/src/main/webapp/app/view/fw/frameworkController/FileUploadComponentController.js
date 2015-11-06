Ext.define('Healthsurvey.view.fw.frameworkController.FileUploadComponentController', {
	
	extend : 'Ext.app.ViewController',
	alias : 'controller.FileUploadComponentController',
	
	sendFile : function(btn, e, eOpts) {
		currentObject = btn.up('form');
		currentObject.submit({
			url : 'secure/UploadService/upload',
			method:'POST',
			maskEnable: true,
            maskEle: currentObject,
            maskMsg: 'File uploading...',
			scope:this,
			success : function(opts, response) {
				var responseData = Ext.JSON.decode(opts.response.responseText);
				//Ext.Msg.alert('Server Response', 'File Uploaded Successfully');
				this.view.up().down('#filePathHidden').setValue(responseData.response.data);
				this.view.down('#uploadButton').setDisabled(true);
			},
			failure : function(response, opts) {
				var responseData = Ext.JSON.decode(opts.response.responseText);
				//Ext.Msg.alert('Server Response', 'File Uploaded Successfully');
				this.view.up().down('#filePathHidden').setValue(responseData.response.data);
				this.view.down('#uploadButton').setDisabled(true);
				var fileField = this.view.down('filefield');
				fileField.setRawValue(responseData.response.data);
				
			}
		});
	}
});
	