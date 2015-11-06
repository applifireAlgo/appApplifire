
Ext.define('Healthsurvey.view.clouddrive.documentview.DocumentListViewController',{
	extend : 'Ext.app.ViewController',
	requires:['Healthsurvey.view.fw.PDF.panel.PDF'],
	alias : 'controller.documentlistview',
	clouddrive : null,
	drivelist : null,
	driveDetails : null,
	driveDetailsController : null,
	frame : null,
	downloadFileform : null,
	selectedFileId:null,
	selectedFileNode:null,
	baseFileId:null,
	moveToTagId:null,
	fileUploadWindow:null,
	
	init : function() 
	{
		debugger;
		this.clouddrive = this.getView().up().up();
		/*create form and iframe used to download file*/
		var body = Ext.getBody();
		this.frame = body.createChild({
			tag : 'iframe',
			cls : 'x-hidden',
			id : 'hiddenform-iframe' + this.getView().id,
			name : 'iframe' + this.getView().id
		});
		this.downloadFileform = body.createChild({
			tag : 'form',
			cls : 'x-hidden',
			id : 'hiddenform-form' + this.getView().id,
			method : 'post',
			ContentType : 'application/json;application/xml',
			action : "",
			target : 'iframe' + this.getView().id
		});
	},
	initObject : function()
	{
		debugger;
		this.driveDetails = this.clouddrive.down("#drivedetails");
		this.driveDetailsController = this.driveDetails.controller;
		this.drivelist = this.driveDetails.down("#drivelist");
		//Passing its own reference to drive details controller
		this.driveDetails.controller.docListView=this.getView().down("#docsGridView");
		this.manageRevGridStore=this.getManageRevGridStore();
	},
	loadData : function(panel, eopts) 
	{
		this.initObject();
	},
	/*
	 * this method call when user call on folder/file if user
	 * click on folder then folder will open if user clock on
	 * file the file will download
     */
	itemdblclick : function(dataview, record)
	{
		if (record.data.hierarchy.length > 0) {
			 this.driveDetailsController.selectNode(record.data.id, true)
		} else {
			this.downloadFiles(record.data.ftId);
		}
	},
	/** this method is used to download file*/
	downloadFiles : function(fileId) 
	{
		this.downloadFileform.dom.action = "secure/cloudDriveController/downloadFilePost?fileId="
										+ fileId, this.downloadFileform.dom.submit();
	},
	/*
     * this method call on right click of any file/folder 
	 * this will show menu which contains - preview,download
	 */
	itemcontextmenu : function(dataview, record, item, index,e, eOpts) 
	{
		
		e.stopEvent();	
		this.selectedFileId = record.data.ftId; 
		this.selectedFileNode =record;
		 
		var menu = this.getRightClickMenu(record.data.hierarchy);
		menu.showAt(e.getXY());
	},
	getRightClickMenu : function(hierarchy) 
	{
		var nodesHieraObj = this.driveDetailsController.nodesHieraObj;
		if (nodesHieraObj[nodesHieraObj.length - 1].data.ftId == -1&& hierarchy.length > 0) {
		return;
		}
		return Ext.create('Ext.menu.Menu',{
				items : [
						 hierarchy.length > 0 ? "": Ext.create('Ext.Action',
												   {
													text : 'Preview',
													icon : 'images/cloud/previewDoc.png',
													listeners:{
														click:'onPreviewClick',
														scope:this
													}
													},this),
					    hierarchy.length > 0 ? "": Ext.create('Ext.Action',
												  {
													text : 'Download',
													icon : 'images/cloud/download.png',
													listeners:{
														click:'onDownLoadClick',
														scope:this
													}
												   }),
						hierarchy.length > 0 ? "": '-',
								nodesHieraObj[nodesHieraObj.length - 1].data.ftId == -2
												&& hierarchy.length == 0 ? Ext.create('Ext.Action',
																	{
																		text : 'Move To',
																		icon : 'images/cloud/moveTo.png',
																		listeners:{
																			click:'onMoveToClick',
																			scope:this
																		}
																	})
															: "",
						       nodesHieraObj[nodesHieraObj.length - 1].data.ftId == -2
												&& hierarchy.length == 0 ? Ext.create('Ext.Action',
																	{
																		text : 'Share',
																		icon : 'images/cloud/ic_share.png',
																		listeners:{
																			click:'onShareClick',
																			scope:this
																		}
																	})
															: "",
							  nodesHieraObj[nodesHieraObj.length - 1].data.ftId == -2
												&& hierarchy.length == 0 ? Ext.create('Ext.Action',
																	{
																		text : 'Rename',
																		icon : 'images/cloud/rename.png',
																		listeners:{
																			click:'onRenameClick',
																			scope:this
																		}
																	})
															: "",
							  nodesHieraObj[nodesHieraObj.length - 1].data.ftId == -2
												&& hierarchy.length == 0 ? Ext.create('Ext.Action',
																	{
																		text : 'Add Star',
																		disabled:true,
																		icon : 'images/cloud/addStar.png',
																		handler : function() {
																		}
																	})
															: "",
							 nodesHieraObj[nodesHieraObj.length - 1].data.ftId != -1
							 		&& hierarchy.length == 0 ? Ext.create('Ext.Action',
																			{
																				text : 'Manage revisions',
																				icon : 'images/cloud/mr.png',
																				listeners:{
																					click:'onMakeRevisionClick',
																					scope:this
																				}
																			})
																			: "",
							nodesHieraObj[nodesHieraObj.length - 1].data.ftId != -1
									&& hierarchy.length == 0 ? Ext.create('Ext.Action',
											  {
												text : 'Make a Copy',
												icon : 'images/cloud/make-copy.png',
												listeners:{
													click:'onMakeCopyClick',
													scope:this
												}
											  }):"",
							nodesHieraObj[nodesHieraObj.length - 1].data.ftId == -1 ? "": Ext.create('Ext.Action',
																			{
																				text : 'Remove',
																				icon : 'images/trash.png',
																				listeners:{
																					click:'deleteFunc1',
																					scope:this
																				}
																			}) ]
				},this);

	},//getRightClickMenu ends
	
	onPreviewClick : function() 
	{	
		var appType = this.selectedFileNode.data.applicationType;
		if (appType.search("pdf") != -1) {
				this.openPDFViewer(this.selectedFileId,this.selectedFileNode.data.text);
		} else if (appType.search("image") != -1) {
			    this.openImageViewer(this.selectedFileId,this.selectedFileNode.data.text);
		} else {
				this.downloadFiles(this.selectedFileId);
		}
	},
	openPDFViewer:function(fileId, displayName)
	{
		debugger;;
		Ext.create('Ext.window.Window', {
			title : displayName,
			height : 500,
			width : 700,
			maximizable : true,
			layout : 'fit',
			items : [{
				xtype :'pdfpanel',
				title : '',
				width : 589,
				height : 433,
				pageScale : 0.75, // Initial scaling of the PDF. 1 = 100%
				// src : '../buzzor/SpringByExample.pdf', // URL to the PDF -
				// Same Domain or Server with CORS Support
				src : 'secure/cloudDriveController/downloadFile?fileId=' + fileId
			}]
		}).show();
	},
	openImageViewer:function(fileId, displayName)
	{
		
		Ext.create('Ext.window.Window', {
			title : displayName,
			height : 500,
			width : 700,
			maximizable : true,
			layout : 'fit',
			items : {
				xtype : 'image',
				title : '',
				width : 589,
				height : 433,
				pageScale : 0.75, // Initial scaling of the PDF. 1 = 100%
				// src : '../buzzor/SpringByExample.pdf', // URL to the PDF -
				// Same Domain or Server with CORS Support
				src : 'secure/cloudDriveController/downloadFile?fileId=' + fileId
			}
		}).show();
	},
	onDownLoadClick:function()
	{
		this.downloadFiles(this.selectedFileId);
	},
	renderTitleColumn : function(value, metaData, record) 
	{
		debugger;
		var view = this.getView();
		plugin = view.getPlugin('rowexpander');
		tpl =view.query("gridpanel")[0].titleTpl;
		if (!tpl.isTemplate) {
			view.query("gridpanel")[0].titleTpl = tpl = new Ext.XTemplate(tpl);
		}
		var data = Ext.Object.chain(record.data);
		return tpl.apply(data);
	},
	deleteFunc1:function() 
	{
		// File - 0 // Tag - 1
		var isFileTag = -1;
		var selId = this.selectedFileNode.data.id;
		if (selId.search("f") == 0) {
			isFileTag = 0;
		} else if (selId.search("t") == 0) {
			isFileTag = 1;
		}
		this.deleteFunc(isFileTag, this.selectedFileId);
	},
	deleteFunc:function(isFileTag, selectedFileId, rowIndex, grid)
	{
		Ext.Msg.confirm('Confirmation',"Are you sure you want to delete Folder/File", function(id, value) {
					if (id == 'yes') {
						/**Check if grid is defined then del function is called from grid or else called from right click menu*/
						if(this.grid!=undefined){
							this.grid.getStore().removeAt(this.rowIndex);
							this.me.deleteOperation(isFileTag, selectedFileId);
						}
						else{
							this.me.deleteOperation(isFileTag, selectedFileId);
						}		
					}
				}, {
					me : this,
					rowIndex:rowIndex,
					grid:grid
				});
	},
	deleteOperation:function(isFileTag, selectedFileId)
	{
		debugger;
		Ext.Ajax.request({
			url : 'secure/cloudDriveController/deleteTagsFile?fileId='+selectedFileId+"&isFileTag="+isFileTag,
			headers : {
				'Content-Type' : 'application/json;application/xml'
			},
			waitMsg : 'Loading...',
			method : 'POST',
			scope:this,
			params : {
				fileId : selectedFileId,
				isFileTag : isFileTag
			},
			success : function(response,currentObject) {
				 currentObject.scope.driveDetails.controller.refreshDriveTree();
			},
			failure : function(response) {
				 Ext.Msg.alert('Error', 'Cannot connect to server');
			}
		});
	},
	onMakeCopyClick:function()
	{
		debugger;
		var selectedFileId= this.selectedFileId;
		Ext.Ajax.request({
			url : 'secure/cloudDriveController/copyFile?fileId='+selectedFileId,
			headers : {'Content-Type' : 'application/json;application/xml'},
			waitMsg : 'Loading...',
			method : 'POST',
			scope:this,
			params : {
				fileId : selectedFileId,
			},
			success : function(response,currentObject) {
				currentObject.scope.driveDetails.controller.refreshDriveTree();
				Ext.Msg.alert('Success',"Files Copied successfully");	
			},
			failure : function(response) {
				 Ext.Msg.alert('Error', 'Cannot connect to server');
			}
		});
	},
	onRenameClick:function()
	{
		Ext.create('Ext.window.Window', {
			title :'Rename File',
			width:'25%',
			maximizable : true,
			resizable : true,
			layout : 'vbox',
			bodyPadding:'8',
			items :[{
				xtype:'textfield',
				fieldLabel:'New Name',
				value:this.selectedFileNode.data.text,
				itemId:'renameFieldId',
				width:'100%',
			}],
			buttons:[{
		    		  	text:'Save',
		    		  	icon:'images/greenFlopy_save.png',
		    		  	style:'float:right',
		    		  	listeners:{  
		    		  		click:'onRenameSaveBtnClick',
		    		  		scope:this,
		    		  	}
					},{
	    	  			text:'Cancel',
	    	  			icon:'images/delete_icon.png',
	    	  			style:'float:right',
	    	  			handler:function(){
	    	  				this.up().up().close();
	    	  			}
	          		}] 
		}).show();
	},
	onRenameSaveBtnClick:function(btn)
	{
		var selectedFileId=this.selectedFileId;
		var newFileName=btn.up().up().down('#renameFieldId').getValue();
		Ext.Ajax.request({
			url : 'secure/cloudDriveController/renameFile?fileId='+selectedFileId+"&newFileName="+newFileName,
			headers : {'Content-Type' : 'application/json;application/xml'},
			waitMsg : 'Loading...',
			method : 'POST',
			scope:this,
			btn:btn,
			params : {
				fileId : selectedFileId,
				newFileName : newFileName
			},
			success : function(response,currentObject) {
				currentObject.scope.driveDetails.controller.refreshDriveTree();
				currentObject.btn.up().up().close();
				Ext.Msg.alert('Success',"Files Renamed successfully");	
			},
			failure : function(response) {
				 Ext.Msg.alert('Error', 'Cannot connect to server');
			}
		});
	},
	onMoveToClick:function()
	{
		Ext.create('Ext.window.Window', {
			title :'Choose Destination Folder',
			width:'20%',
			height:300,
			maximizable : true,
			resizable : true,
			tbar:['->',{
		    	  xtype : 'button',
		    	  icon : 'images/cloud/newFolder.png',
		    	  tooltip:'Add New Folder',
		    	  listeners:{
		    		 click:'onAddNewFolderClick',
		    		 scope:this
		    	  }    	  
			}],
			items :[{
				xtype : 'treepanel',
				itemId : 'folderlist',
				rootVisible :false,
				useArrows: true,
				listeners : {
					load : 'loadMoveToFolderList',
					itemClick:'onClickFolderList',
					scope:this
				} 
			}],
			buttons:[{
		    		  	text:'Move',
		    		  	icon:'images/cloud/moveRight.png',
		    		  	style:'float:right',
		    		  	listeners:{  
		    		  		click:'onMoveBtnClick',
		    		  		scope:this,
		    		  	}
					},{
	    	  			text:'Cancel',
	    	  			icon:'images/delete_icon.png',
	    	  			style:'float:right',
	    	  			handler:function(){
	    	  				this.up().up().close();
	    	  			}
	          		}] 
		}).show();
	},
	loadMoveToFolderList:function(treepanel)
	{
		debugger;
		var data=this.driveDetailsController.drivelistTreeData;
		var rootNode = treepanel.getRootNode();
		rootNode.removeAll();
		for (var x1 = 0; x1 < data.length; x1++) {
			this.addChild(rootNode, data[x1]);
		}
	},
	addChild : function(parentNode, node)
	{
		if (node.hasOwnProperty("children")&& node.children != null)
		{
			if(node.hierarchy!=3)
			{
				var child = {
						text : node.text,
						icon : "images/folder_crisp.png",
						image : node.image,
						hierarchy : node.hierarchy,
						id : node.id,
						files : node.files,
						displayText : node.displayText,
						ftId : node.ftId,
						mimeType : node.mimeType,
						
					}
				if(node.children.length==0){
					child["leaf"]=true;
				}
				var newNode = parentNode.appendChild(child);
			}
			for (var x = 0; x < node.children.length; x++) {
				this.addChild(newNode, node.children[x]);
			}
		} else {
			node["leaf"]=true;
			parentNode.appendChild(node);
		}
	},
	onClickFolderList : function(view, record, item, index, e) 
	{
		debugger;
		this.driveDetailsController.moveToSelectedNode=record.data;
		this.moveToTagId=record.data.ftId
	},
	onMoveBtnClick:function(btn)
	{
		debugger;
		var selectedFileId=this.selectedFileId;
		var tagId=this.moveToTagId;
		/*grid=btn.up().up().down('#folderListGrid');
		var tagId=grid.getSelectionModel().getSelection()[0].data.tagId;*/
		Ext.Ajax.request({
			url : 'secure/cloudDriveController/moveFile?fileId='+selectedFileId+"&tagId="+tagId,
			headers : {'Content-Type' : 'application/json;application/xml'},
			waitMsg : 'Loading...',
			method : 'POST',
			scope:this,
			btn:btn,
			params : {
				fileId : selectedFileId,
				tagId : tagId
			},
			success : function(response,currentObject) {
				debugger;
				currentObject.scope.driveDetails.controller.refreshDriveTree();
				currentObject.btn.up().up().close();
				Ext.Msg.alert('Success',"Files Moved successfully");	
			},
			failure : function(response) {
				 Ext.Msg.alert('Error', 'Cannot connect to server');
			}
		});	
	},
	onAddNewFolderClick:function(btn)
	{
		debugger;
		this.driveDetailsController.createFolderFlag="listView";
		this.driveDetailsController.moveToTreePanel=btn.up().up().down("#folderlist");
		this.driveDetailsController.onCreateFolderBtnClick();
	},
	onShareClick:function()
	{
		Ext.create('Ext.window.Window', {
			title :'Share With',
			width:'25%',
			maximizable : true,
			resizable : true,
			layout : 'vbox',
			//bodyPadding:'8',
			items :[{
				xtype:'gridpanel',
				itemId:'shareUserGrid',
				selType: 'checkboxmodel',
				multiSelect : true,
				border:true,
				store:new Ext.create('Ext.data.Store', {
	    			fields : ['loginId','firstName','userId','lastName'],
	    			data : [],
	    			sorters: ['firstName']
	    		}), 
				columns : [{
					text : "User Name",
					sortable : true,
					resizable : true,
					menuDisabled : true,
					dataIndex : 'loginId',
					flex : 0.333333333,
				},{
					text : "First Name",
					sortable : true,
					resizable : true,
					menuDisabled : true,
					dataIndex : 'firstName',
					flex : 0.333333333,
				},{
					text : "Last Name",
					sortable : true,
					resizable : true,
					menuDisabled : true,
					dataIndex : 'lastName',
					flex : 0.333333333,
				},{
					dataIndex:"userId",
					hidden:true,
				}],
				title : '',
				width : '100%',
				//height : 380,
				listeners:{
					   afterrender:'afterShareUserGridRender',
					   scope:this
				}
			}],
			buttons:[{
		    		  	text:'Share',
		    		  	icon:'images/cloud/share.png',
		    		  	style:'float:right',
		    		  	listeners:{  
		    		  		click:'onShareBtnClick',
		    		  		scope:this,
		    		  	}
					},{
	    	  			text:'Cancel',
	    	  			icon:'images/delete_icon.png',
	    	  			style:'float:right',
	    	  			handler:function(){
	    	  				this.up().up().close();
	    	  			}
	          		}] 
		}).show();
	},
	afterShareUserGridRender:function(grid)
	{
		Ext.Ajax.request({
			url : "secure/cloudDriveController/getUsers",
			method : 'POST',
			scope : this,
			grid:grid,
			waitMsg : 'Loading...',
			jsonData : {},
			success : function(response, currentObject,options)
			{	
				debugger;
		    	var jsonResponse = Ext.JSON.decode(response.responseText);
				var data = jsonResponse.response.data;
				var tempData=[];
				for(var i=0;i<data.length;i++)
				{
					var obj={
							loginId:data[i].loginId,
							firstName:data[i].firstName,
							lastName:data[i].lastName,
							userId:data[i].userId
					}
					tempData.push(obj);
				}
				currentObject.grid.getStore().loadData(tempData);
			},
			failure : function() {
				Ext.Msg.alert('Error','Cannot connect to server');
			}
		});
	},
	onShareBtnClick:function(btn)
	{
		debugger;
		var grid=btn.up().up().down("#shareUserGrid");
		var jsonData=[];
		if (grid.getSelectionModel().hasSelection())
		{
			var rows = grid.getSelectionModel().getSelection();
			for (var x = 0; x < rows.length; x++)
			{
				var obj={
						sharedUserId:rows[x].data.userId,
						fileId:this.selectedFileId
				}
				jsonData.push(obj);
			}
			//console.log(jsonData);
			Ext.Ajax.request({
	    	    url : "secure/cloudDriveController/saveFileSharedToUser",
	    	    method : 'POST',
				headers : {'Content-Type' : 'application/json;application/xml'},
	    	    jsonData:jsonData,
	    	    btn:btn,
	    	    success : function(response, currentObject,options)
	    	    {
	    	    	debugger;
	    	    	var jsonResponse = Ext.JSON.decode(response.responseText);
	    	    	if(jsonResponse.response.success==true){
		    	    	Ext.Msg.alert('Success',"File Shared Successfully");
		    	    	currentObject.btn.up().up().close();
					}
	    	    	else{
	    	    		Ext.Msg.alert('Error', 'Sharing of File Failed!');
	    	    	}
	    	    },
	    	    failure : function() {
	    	    	Ext.Msg.alert('Error', 'Cannot connect to server!');
	    	    }
	    	});
		}
	},
	onMakeRevisionClick:function()
	{
		Ext.create('Ext.window.Window', {
			title :'Manage Revision',
			width:'30%',
			height:300,
			maximizable : true,
			resizable : true,
			autoScroll:true,
			layout:'fit',
			items:[{
				xtype:'form',
				layout : 'vbox',
				items :[{
			    	xtype : 'filefield',
			    	margin:'5 1 5 322',
			    	msgTarget : 'side',
			    	allowBlank : false,
			    	buttonOnly : true,
			    	name : 'uploadFile',
			    	buttonConfig : {
						 text:'Upload New Revision',
		    	  		 icon : 'images/cloud/uploadRevision.png',
		    	  		 tooltip:'Upload New Revision',
			    	},
			    	listeners:{
			    		 change:'onUpldNewRev',
			    		 scope:this
			    	}    
				  },
				  {
					xtype:'gridpanel',
					width:'100%',
					border:true,
					margin:'2',
					selType: 'cellmodel',
					scope:this, //Pass current controller scope
					store:this.manageRevGridStore,
					columns : [ 
						{
							xtype : 'actioncolumn',
							menuDisabled : true,
							text : 'Delete',
							align: 'center',
							flex:0.15,
							items : [ {
								//icon : 'images/delete.gif',/**No need to give icon or tooltip if they are mentioned in getClass & if hidden-class is returned then icon attr req*/ 
								tooltip : 'Delete Record',
								getClass: function(v, metadata, r, rowIndex, colIndex, store) {
							          if(rowIndex==0) {
							              return "icon-disable"; //return  "x-hidden-display";
							          }else{
							        	  return "icon-enable";
							          }
							    },
								handler : function(grid, rowIndex, colIndex){
									if(rowIndex!=0){
										rec=grid.getStore().getAt(rowIndex);
										var me=this.up().up().scope;
										me.deleteFunc(0, rec.data.fileId,rowIndex,grid);
									}else{
										Ext.Msg.alert('Info',"Cannot delete latest version of the file");
									}
								}						
							}]
						},{
							text:'Current Revision Date',
							dataIndex:'createdDate',
							flex:0.3
						},{
							text:'Current Revision By',
							dataIndex:'updatedBy',
							flex:0.3
						},{
							text:'Storage Used',
							dataIndex:'fileSize',	
							flex:0.2
						}],
						listeners:{
							   afterrender:'afterManageRevGridRender',
							   cellclick :'revGridCellClick',
							   scope:this
						}
			   }],
			}],
			buttons:[{
	    	  			text:'Cancel',
	    	  			icon:'images/delete_icon.png',
	    	  			style:'float:right',
	    	  			handler:function(){
	    	  				this.up().up().close();
	    	  			}
	          		}] 
		}).show();
	},
	getManageRevGridStore:function()
	{
		return new Ext.create('Ext.data.Store', {
			fields : ['baseFileId','fileId','updatedBy','createdDate','fileSize'],  
			data : []
		});
	},
	afterManageRevGridRender:function(grid)
	{
		var selectedFileId=this.selectedFileId;
		Ext.Ajax.request({
			url : "secure/cloudDriveController/getFileRevision?fileId="+selectedFileId,
			method : 'POST',
			scope : this,
			waitMsg : 'Loading...',
			jsonData : {},
			/*params:{
				fileId:selectedFileId
			},*/
			success : function(response, params,options)
			{	debugger;
				var responseJson = Ext.JSON.decode(response.responseText).response;
				if (responseJson.success == 'true')
				{
					var data = responseJson.data;
					params.scope.baseFileId=data[0].baseFileId;
					params.scope.manageRevGridStore.loadData(data);
				} else {
					Ext.Msg.alert('Error',"loading of manage revision grid failed");
				}
			},
			failure : function() {
				Ext.Msg.alert('Error','Cannot connect to server');
			}
		});
	},
	onUpldNewRev:function(fileupload)
	{
		debugger;
		this.fileUploadWindow=fileupload.up().up();
		var entMask = new Ext.LoadMask({
		    msg    : 'Uploading...',
		    target : fileupload.up().up()
		}).show();
		var form = fileupload.up('form').getForm();
		if (form.isValid()) {
			form.submit({url : 'secure/cloudDriveController/uploadRevisionFile?parentId='
												+ this.driveDetailsController.selNode.ftId
												+ "&parentHierachy="
												+ this.driveDetailsController.selNode.hierarchy
												+ "&oldFileId="
												+ this.selectedFileId
												+ "&baseFileId="
												+ this.baseFileId,
						scope : this,
						entMask:entMask,
						success : function(fp, currentObject) {
							debugger;
							currentObject.entMask.hide();
							currentObject.scope.driveDetails.controller.refreshDriveTree();
							currentObject.scope.afterManageRevGridRender();
							currentObject.scope.fileUploadWindow.close();
							Ext.Msg.alert('Success',"Files With New Revision Uploaded successfully");				
						}
			});
		}
	},
	revGridCellClick:function(iView, iCellEl,iColIdx, iStore, iRowEl, iRowIdx,iEvent)
	{
		/** If 2nd Column's cell is clicked then Download File*/
		if (iColIdx == 1) {
			this.downloadFiles(iStore.data.fileId);
		}
	}
	

});