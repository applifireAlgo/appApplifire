Ext.define("Healthsurvey.view.clouddrive.drivedetails.DriveDetails",{
	extend : 'Ext.form.Panel',
	requires : [ 'Healthsurvey.view.clouddrive.drivedetails.DriveDetailsController' ],
	xtype : 'drivedetails',
	itemId : 'drivedetails',
	split : true,
	closable : false,
	collapsible : true,
	width : '18%',
	bodyPadding : '10 5 0 5',
	controller : 'drivedetails',
	layout : {
		type : 'anchor'
	},
	items:[
			{
				xtype : "panel",
				layout : "hbox",
				anchor : '100%',
				items : [
						 {
							xtype : 'button',
							text : 'Create Folder',
							icon:'images/icon-add.png',
							margin : '2 0 10 5',
							listeners : {
								click :'onCreateFolderBtnClick'
							}
						},
						{
							xtype : 'filefield',
							msgTarget : 'side',
							allowBlank : false,
							buttonOnly : true,
							margin : '2 5 10 5',
							name : 'uploadFile',
							buttonConfig : {
								text : 'Upload',
								icon : 'images/cloud/upload.png',
							},
							listeners : {
								change :'uploadFile'
							}
						}]
			},
			{
				xtype : 'fieldset',
				cls : 'entity-fieldset',
				height : 300,
				anchor : '100%',
				// title : 'Reports',
				items : [ {
					xtype : 'treepanel',
					itemId : 'drivelist',
					rootVisible : false,
					useArrows: true,
					//lines : true,
					listeners : {
						load : 'loadDriveList',
						itemclick: 'loadFolderFiles',
						//itemcontextmenu:'rightClickDrive'
					}
				} ]
			}],
	listeners : {
		afterrender : 'loadData',
		scope : 'controller'
	}
});