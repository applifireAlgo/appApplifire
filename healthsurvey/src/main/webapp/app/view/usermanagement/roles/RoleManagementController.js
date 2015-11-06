Ext.define('Healthsurvey.view.usermanagement.roles.RoleManagementController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.roleController',
	editTab:null,
	
	onRolesTreeLoad:function(currentObject, records, successful, operation, node, eOpts )
    {
        var tempView = this.getView();
        Ext.Ajax.request(
    	{
    		url : "secure/Roles/findAll",
    		method : 'GET',
    		jsonData : {},
    		currentView:tempView,
    		success : function(response, currentObject,options) 
    		{
    			debugger;
    			var responseJson = Ext.JSON.decode(response.responseText);
    			if(responseJson.response.success==true)
            	{
					var data = responseJson.response.data;
					var tree = rolesTree=currentObject.currentView.down('#rolesTree');
					var rootNode = tree.getRootNode();
					rootNode.removeAll();
					for (var i = 0; i < data.length; i++)
					{
						var childNode = {
								text : data[i].roleName,//primaryDisplay
								roleDescription:data[i].roleDescription,
								roleId:data[i].roleId,
								roleMenuBridge:data[i].roleMenuBridge,
								versionId:data[i].versionId,
								leaf : true,
								icon : 'images/user/roles.png'
						};
						rootNode.appendChild(childNode);
					}
					tree.getStore().sort('text', 'ASC');
            	}
    			else{
    				Ext.Msg.alert({title : 'Error',msg : 'Data Transaction',icon : Ext.MessageBox.ERROR});
    			}
    		},
    		failure : function() {
    			Ext.Msg.alert({title : 'Error',msg : 'Cannot connect to server',icon : Ext.MessageBox.ERROR});
    		}
    	});
    },//onRolesTreeLoad ends
	
	onRoleListClick:function(item, record, item, index, e, eOpts)
	{
		debugger;
		this.editTab=this.getView().down('#editRoleTab');
		this.editTab.enable();
		this.getView().down('#rolesTabPanel').setActiveTab(this.editTab);
		
		this.editTab.controller.roleId=record.data.roleId;
		this.editTab.controller.versionId=record.data.versionId;
		this.editTab.down('#eRoleName').setValue(record.data.text); //tabPanel.activeTab.down('#eRoleName').setValue(record.data.text)
		this.editTab.down('#eRoleDesc').setValue(record.data.roleDescription);
		
		this.editTab.down('#eMappedFeatureTree').getRootNode().removeAll();
		this.createMappedTree(this.getView().down('#addRole').controller.defaultMenuStore,record.data.roleMenuBridge);
	},
	createMappedTree:function(rawData,roleMenuBridge)
	{
		var mappedTreePanel=this.editTab.down("#eMappedFeatureTree");	
  		var rootNode=mappedTreePanel.getRootNode();
    	/*for(var j=0;j<rawData.length;j++){
    		data=rawData[j];
      		var fChild=data.children;*/
    		var fChild=rawData;
      		for(var x1=0;x1<fChild.length;x1++)
      		{
      			this.addChild(rootNode,fChild[x1],roleMenuBridge);
      		}
    	//}
	},
	addChild:function(parentNode,node,roleMenuBridge)
    {
		debugger;
		var menuID=null;
		for(var i=roleMenuBridge.length-1;i>=0;i--)
		{
			menuID=roleMenuBridge[i].menuId;
			if(node.menuId==menuID)
			{
				if(node.hasOwnProperty("children")&& node.children!=null)
		    	{
		    		var child={
		        			text:node.text,
		        			menuId:roleMenuBridge[i].menuId,
		        			icon : 'images/folder-database-icon.png',
		        			isRead:roleMenuBridge[i].isRead,
		        			isWrite:roleMenuBridge[i].isWrite,
		        			isExecute:roleMenuBridge[i].isExecute,
		        			isDelete:false, //set its value explicitly cause it does not come from db
		        			roleMenuMapId:roleMenuBridge[i].roleMenuMapId,
		        			versionId:roleMenuBridge[i].versionId
		        	}
		    		/** here we are not getting does the menu is head or not from db so i am adding headMenu property here to identify it**/
					child["isHeadMenu"] = true;
		    		child["expanded"]=true;
		    		var newNode=parentNode.appendChild(child);
		    		for(var x=0;x<node.children.length;x++)
		    		{	
		    			this.addChild(newNode,node.children[x],roleMenuBridge);
		    		}
		    	}else{
		    		node["isRead"]=roleMenuBridge[i].isRead;
		    		node["isWrite"]=roleMenuBridge[i].isWrite;
		    		node["isExecute"]=roleMenuBridge[i].isExecute;
		    		node["roleMenuMapId"]=roleMenuBridge[i].roleMenuMapId;
		    		node["versionId"]=roleMenuBridge[i].versionId;
		    		node["isDelete"]=false;   //set its value explicitly cause it does not come from db
		    		node["isHeadMenu"] = false;
		    		node['visible'] = (node.text=="")?false:true;
		    		parentNode.appendChild(node);
		    	} 
			}  	
		}//for ends
    },//addChild ends
    
    onTriggerFieldChange : function(me) 
    {
		var tree = me.up().up();
		var v;
		try {
			v = new RegExp(me.getValue(), 'i');
			tree.store.filter({filterFn : function(node) {
							var children = node.childNodes, len = children
									&& children.length, visible = node
									.isLeaf() ? v.test(node
									.get('text')) : false, i;
							for (i = 0; i < len && !(visible = children[i].get('visible')); i++);
							return visible;
						},
						id : 'titleFilter'
					});
		} catch (e) {
			me.markInvalid('Invalid regular expression');
		}
	},//onTriggerFieldChange ends
});