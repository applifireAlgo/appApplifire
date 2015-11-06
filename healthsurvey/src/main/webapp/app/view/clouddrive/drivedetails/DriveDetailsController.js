Ext.define('Healthsurvey.view.clouddrive.drivedetails.DriveDetailsController',{
	extend : 'Ext.app.ViewController',
	alias : 'controller.drivedetails',
	clouddrive : null,
	drivelist : null,
	//documentView : null,
	docListView:null,
	docGridViewController:null,
	currentPath : null,
	docNavigation : null,
	nodehierachy : null,
	nodesHieraObj : null,
	newFolderMenu : null,
	newFolderDeleteMenu : null,
	selNode : null,
	driveNewFolder : null,
	shareFileId:null,
	shareFileNode:null,
	listViewFlag:false,
	createFolderFlag:null,
	drivelistTreeData:null,
	moveToTreePanel:null,
	moveToSelectedNode:null,
	
	init : function()
	{
		this.clouddrive = this.getView().up();
		this.nodehierachy = new Array();
		this.nodesHieraObj = [];
		this.selNode = {};
		/** used to display create folder menu*/
		this.newFolderMenu = Ext.create('Ext.menu.Menu', {
							items : [ Ext.create('Ext.Action', {
								text : 'Create Folder',
								iconCls:'createCloudFolder',
								listeners : {
									click : this.openCreateFolderWindow,
									scope : this
								}
							}) ]
		});

		this.newFolderDeleteMenu = Ext.create('Ext.menu.Menu',{
									items : [Ext.create('Ext.Action',{
										text : 'Create Folder',
										iconCls:'createCloudFolder',
										listeners : {
											click : this.openCreateFolderWindow,
											scope : this
										}
										}),
										Ext.create('Ext.Action',{
												text : 'Delete',
												iconCls:'delCloudFolder',
												listeners : {
													click : this.deleteFolder,
													scope : this
												}
										}) ]
		});

		/** create New folder/tag window*/
		this.driveNewFolder = Ext.create('Ext.window.Window',
										{
											title : 'Create New Folder',
											modal : true,
											resizable : false,
											closeAction :'close',
											border :0,
											plain : true,
											layout:'vbox',
											bodyPadding:'5',
											items : [{
														xtype : 'textfield',
														fieldLabel:'Folder Name',
														emptyText:'Enter a name',
														itemId : 'newFolderName',
														margin : '10 0 10 0'
													}],
											buttonAlign : 'right', 
											buttonMargins : '10 10 0 10',
											buttons : [
													{
														text : 'Save',
														icon:'images/greenFlopy_save.png',
														tooltip : 'Save',
														listeners : {
															click : this.createNewFolder,
															scope : this
														}
													},
													{
														text : 'Cancel',
														icon:'images/delete_icon.png',
														handler : function() {
															this.up('.window').close();
														}
													} ],
											listeners : {
												beforeclose : function(panel,eOpts) {
													this.child("#newFolderName").reset()
												}
											}
		 });

	},
	initobject : function()
	{
		this.drivelist = this.clouddrive.down("#drivelist");
		//this.documentView = this.clouddrive.down("#docsDataView");
		this.docListView=this.clouddrive.down("#docsGridView");
		this.docGridViewController= this.clouddrive.down("#documentsview").controller;
		this.currentPath = this.clouddrive.down("#currentPath");
		this.docNavigation = this.clouddrive.down("#docnavigation");
		//this.docController.initobject();
	},
	loadData : function(panel)
	{
		this.initobject();
	},
	onCreateFolderBtnClick:function(btn)
	{
		if(this.selNode.ftId==undefined || parseInt(this.selNode.hierarchy)==3 ||this.selNode.ftId==-1)
		{
			Ext.Msg.alert({title:'Info',msg:'Select App Drive or My Drive to create folder inside them',icon:Ext.MessageBox.INFO});
			return;
		}
		this.openCreateFolderWindow()
	},
	loadDriveList : function(treepanel)
	{	
		Ext.Ajax.request({
				url : "secure/cloudDriveController/getDriveList",
				method : 'POST',
				treepanel : treepanel,
				scope : this,
				jsonData : {},
				success : function(response, params,options)
				{	debugger;
					var responseJson = Ext.JSON.decode(response.responseText).response;
					if (responseJson.success == 'true')
					{
						var dataView=params.scope.clouddrive.down("#docsDataView");
						if(dataView!=null){
							dataView.clearViewEl();
						}
						var data = responseJson.data;
						params.scope.loadDriveListData(data.children,params.treepanel);	
						
						params.scope.drivelistTreeData=data.children;
						
						if(params.scope.createFolderFlag=="listView"){
							params.scope.moveToTreePanel.store.load();			
						}
						else if(params.scope.createFolderFlag=="gridView"){
							params.scope.moveToTreePanel.store.load();
						}
						params.scope.createFolderFlag=null;
						
					} else {
						Ext.Msg.alert('Error',"loading drive list fail");
					}
				},
				failure : function() {
					Ext.Msg.alert('Error','Cannot connect to server');
				}
		});

	 },
	loadDriveListData : function(data, treepanel)
	{
		var rootNode = treepanel.getRootNode();
		rootNode.removeAll();
		for (var x1 = 0; x1 < data.length; x1++) {
				this.addChild(rootNode, data[x1]);
		}
		// this.loaded = true;
		if (!this.selNode.hasOwnProperty("id")) {
			return;
		}
		this.selectNode(this.selNode.id, this.selNode.expanded);
	},
	addChild : function(parentNode, node)
	{
		if (node.hasOwnProperty("children")&& node.children != null)
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
			// child["expanded"]=true;
			var newNode = parentNode.appendChild(child);
			for (var x = 0; x < node.children.length; x++) {
				this.addChild(newNode, node.children[x]);
			}
		} else {
			node["leaf"]=true;
			parentNode.appendChild(node);
		}
	},
	loadFolderFiles : function(obj, record, item, index, e,eOpts) 
	{
		this.setNavigationPath(obj, record, item, index, e,eOpts);
		if(this.listViewFlag==false){
			this.refreshDataView(obj, record, item, index, e,eOpts);
		}
		else{
			this.refreshGridView(obj, record, item, index, e,eOpts);
		}	
	},
	refreshDataView : function(obj, record, item, index, e,eOpt)
	{
		// var docDataView =Ext.ComponentQuery.query("#docsDataView")[0];
		// docDataView.getStore().loadData(record.childNodes);
		if (record.data.files.length > 0)
		{
			var filesStore = Ext.create('Ext.data.Store', {
								fields : [ 'text', 'image', 'hierarchy', 'id',
										'files', 'displayText', 'ftId',
										'applicationType' ],
								data : record.data.files
			})
			this.clouddrive.down("#docsDataView").getStore().loadData(Ext.Array.merge(filesStore.data.items,record.childNodes));
		} else {
			this.clouddrive.down("#docsDataView").getStore().loadData(record.childNodes);
		}
	},
	refreshGridView : function(obj, record, item, index, e,eOpt)
	{
		if (record.data.files.length > 0)
		{
			var filesStore = Ext.create('Ext.data.Store', {
								fields : [ 'text', 'image', 'hierarchy', 'id',
										'files', 'displayText', 'ftId',
										'applicationType' ],
								data : record.data.files
			})
			this.docListView.getStore().loadData(Ext.Array.merge(filesStore.data.items,record.childNodes));
		} else {
			this.docListView.getStore().loadData(record.childNodes);
		}
	},
	setNavigationPath : function(obj, record, item, index, e,eOpts)
	{
		this.currentPath.setText(record.data.text);
		this.selNode = record.data;
		this.docNavigation.removeAll();
		var nodes = new Array();
		this.nodehierachy = new Array();
		this.nodesHieraObj = [];
		this.getAllParent(record, nodes);
		nodes.reverse();
		this.docNavigation.add(nodes);
	},
	getAllParent : function(record, nodes)
	{
		if (record.parentNode != null) {
				if (nodes.length > 0)
				 nodes.push({text : '>'});
				 nodes.push({text : record.data.text,
					 		 scope:this,
							 style : 'toolbar-text-font-size:5;',
							 handler : function() {
									// enable the enable button and disable button
									this.selectNode(record.data.id, true);
							 }
				});
				if (record.isRoot() == false)
						this.nodesHieraObj.push(record);
				this.nodehierachy.push(record.data.text);
				this.getAllParent(record.parentNode, nodes);
		}
	 },
	 selectNode : function(nodeId, isExpand)
	 {
		var seleNodeObj = this.drivelist.getStore().getNodeById(nodeId);
		this.drivelist.getSelectionModel().select(seleNodeObj);
		this.drivelist.selectPath(seleNodeObj.getPath());
		this.drivelist.fireEvent('itemclick', seleNodeObj,seleNodeObj);
		if (isExpand == true) {
			seleNodeObj.expand(isExpand);
		}
	},
	uploadFile : function(fileupload)
	{
		debugger;
		if(this.selNode.ftId==undefined||this.selNode.ftId==-1||parseInt(this.selNode.hierarchy)==3)
		{
			Ext.Msg.alert({title:'Info',msg:'Select App Drive or My Drive to upload a file',icon:Ext.MessageBox.INFO});
			return;
		}
		var entMask = new Ext.LoadMask({
		    msg    : 'Uploading...',
		    target : fileupload.up().up().up()
		}).show();
		var form = fileupload.up('form').getForm();
		if (form.isValid()) {
			form.submit({url : 'secure/cloudDriveController/uploadNewFile?parentId='
												+ this.selNode.ftId
												+ "&parentHierachy="
												+ this.selNode.hierarchy,
						scope : this,
						entMask:entMask,
						success : function(response, params,options) {
							var responseJson = Ext.JSON.decode(response.responseText).response;
							if (responseJson.success == 'true')
							{
								params.entMask.hide();
								params.scope.refreshDriveTree();
							}
							else{
								Ext.Msg.alert("Error","Uploading file failed!");
							}
						},
						failure:function(params,options)
						{
							options.entMask.hide();
							resptext=options.response.responseText;
							maxIndex=resptext.indexOf("Maximum upload size of");
							if(maxIndex!=-1){
								totalIndex=resptext.indexOf("exceeded;");
								var text=resptext.substr(maxIndex,totalIndex-maxIndex);
								Ext.Msg.alert({title:'Error',msg:text,icon:Ext.MessageBox.ERROR});
							}
							options.scope.refreshDriveTree();
							//Ext.Msg.alert({title:'Error',msg:"File Size Exceeds.Max file size allowed upto 3.1 Mb",icon:Ext.MessageBox.ERROR});
						}		
			});
		}
	},
	refreshDriveTree : function()
	{
		this.loadDriveList(this.drivelist);
	},
	
	/** call on right click of drive/folder this method is used to show menu to create new folder in drive/folder*/
	rightClickDrive : function(obj, record, item, index, e,eOpts) 
	{
		e.stopEvent();
		this.shareFileId = record.data.ftId;
		this.shareFileNode = record;
		if (record.data.ftId > 0) {
			this.newFolderDeleteMenu.showAt(e.getXY());
		} else {
			this.newFolderMenu.showAt(e.getXY());
		}
		return false;
	},
	
	/** this method used to save new folder information*/
	createNewFolder : function()
	{
		var ftId=null;
		var hierarchy=null;
		if(this.moveToSelectedNode!=null)
		{
			ftId=this.moveToSelectedNode.ftId;
			hierarchy=this.moveToSelectedNode.hierarchy;
		}
		else{
			ftId=this.selNode.ftId;
			hierarchy=this.selNode.hierarchy;
		}
		
		var newFolderName = this.driveNewFolder.down("#newFolderName").getValue();
		this.nodehierachy.reverse();
		// this.up().up().child()
		Ext.Ajax.request({
				url : 'secure/cloudDriveController/saveTags?tagName='
					+ newFolderName
					+ '&parentId='
					+ ftId
					+ '&parentHierachy='
					+ hierarchy
					+ '&tagImage=folder.png',
				headers : {
					'Content-Type' : 'application/json;application/xml'
				},
				waitMsg : 'Loading...',
				method : 'POST',
				scope : this,
				success : function(response, params, opts) {
						params.scope.refreshDriveTree();
						params.scope.driveNewFolder.close();
				},
				failure : function(response) {
					Ext.Msg.alert('Error',"creating folder failed");
				}
		});
	},
	openCreateFolderWindow : function()
	{
		this.driveNewFolder.show();
	},
	deleteFolder : function() 
	{
		var tagId = this.selNode.ftId;
		Ext.Msg.confirm('Confirmation',"Are you sure you want to delete Folder",function(id, value){
					if (id === 'yes')
					{
						this.me.deleteOperation(1,tagId);
					}
				}, {me : this}
		);
	},
	deleteOperation : function(isFileTag, id) 
	{
		Ext.Ajax.request({
			url : 'secure/cloudDriveController/deleteTagsFile?fileId='+id+"&isFileTag="+isFileTag,
			headers : {
				'Content-Type' : 'application/json;application/xml'
			},
			waitMsg : 'Loading...',
			method : 'POST',
			scope:this,
			success : function(response,params,opts) {
				params.scope.refreshDriveTree()
			},
			failure : function(response) {
				Ext.Msg.alert('Error',"Delete fail");
			}
		});
	}

});