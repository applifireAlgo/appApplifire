Ext.define('Healthsurvey.view.usermanagement.users.AddUserRoleController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.addUserRoleController',
	userGridDefaultData:null,
	roleGridDefaultData:null,
	
	afterAvailableRoleGridRender:function(grid)
	{
		var me=this;
		Ext.Ajax.request({
    	    url : "secure/Roles/findAll",
    	    method : 'GET',
    	    jsonData : {},
    	    grid:grid,
    	    me:me,
    	    success : function(response, currentObject,options) 
    	    {
    	    	var jsonResponse = Ext.JSON.decode(response.responseText);
    	    	if(jsonResponse.response.success==true)
				{
	    			var data = jsonResponse.response.data;
	    			currentObject.grid.getStore().loadData(data);
	    			currentObject.me.roleGridDefaultData=data;
				}
    	    	else{
    	    		Ext.Msg.alert('Error', 'Data load Failed!');
    	    	}
    	    },
    	    failure : function() {
    	    	Ext.Msg.alert('Error', 'Cannot connect to server!');
    	    }
    	});
	},
	
	afterAvailableUserGridRender:function(grid)
	{
		debugger;
		var me=this;
		Ext.Ajax.request({		
			url : "secure/Login/FindUnMappedUser",
    	    method : 'POST',
    	    grid:grid,
    	    me:me,
    	    success : function(response, currentObject,options) 
    	    {
    	    	debugger;
    	    	var jsonResponse = Ext.JSON.decode(response.responseText);
    			var data = jsonResponse.response.data;
    			var tempData=[];
    			for(var i=0;i<data.length;i++)
    			{
    				var obj={
    						firstName:data[i].coreContacts.firstName,
    						userId:data[i].userId
    				}
    				tempData.push(obj);
    			}
    			currentObject.grid.getStore().loadData(tempData);
    			currentObject.me.userGridDefaultData=tempData;
    	    },
    	    failure : function(response, currentObject,options) {
    	    	Ext.Msg.alert('Error', 'Cannot find Service!');
    	    }
    	});
	},
	
	onAddToSelectRolesClick:function()
	{
		debugger;
		var avlGrid=this.getView().down('#availableRoleGrid');
		if (avlGrid.getSelectionModel().hasSelection())
		{
			var tempData=[];
			var rows = avlGrid.getSelectionModel().getSelection();
			for (var x = 0; x < rows.length; x++)
			{
				var row=rows[x];
				tempData.push(rows[x].data);
				avlGrid.getStore().remove(row);
			}
			this.getView().down('#selectedRoleGrid').getStore().add(tempData);
		}	
	},
	onRemoveFromSelectRolesClick:function()
	{
		debugger;
		var selGrid=this.getView().down('#selectedRoleGrid');
		if (selGrid.getSelectionModel().hasSelection())
		{
			var tempData=[];
			var rows = selGrid.getSelectionModel().getSelection();
			for (var x = 0; x < rows.length; x++)
			{
				var row=rows[x];
				tempData.push(row);
				selGrid.getStore().remove(row);
			}
			this.getView().down('#availableRoleGrid').getStore().add(tempData);
		}
	},
	
	onAddToSelectUserClick:function()
	{
		debugger;
		var avlGrid=this.getView().down('#availableUserGrid');
		if (avlGrid.getSelectionModel().hasSelection())
		{
			var tempData=[];
			var rows = avlGrid.getSelectionModel().getSelection();
			for (var x = 0; x < rows.length; x++)
			{
				var row=rows[x];
				tempData.push(rows[x].data);
				avlGrid.getStore().remove(row);
			}
			this.getView().down('#selectedUserGrid').getStore().add(tempData);
		}
	},
	onRemoveFromSelectUserClick:function()
	{
		debugger;
		var selGrid=this.getView().down('#selectedUserGrid');
		if (selGrid.getSelectionModel().hasSelection())
		{
			var tempData=[];
			var rows = selGrid.getSelectionModel().getSelection();
			for (var x = 0; x < rows.length; x++)
			{
				var row=rows[x];
				tempData.push(row);
				selGrid.getStore().remove(row);
			}
			this.getView().down('#availableUserGrid').getStore().add(tempData);
		}
	},
	
	onSaveUserRoleClick:function()
	{
		debugger;
		var me=this;

		if((this.getView().down('#selectedUserGrid').store.data.length == 0) && (this.getView().down('#selectedRoleGrid').store.data.length == 0)){
			Ext.Msg.alert("Input Required","Please select at least an User and a Role from Available Users and Available Roles Lists Respectively.");
			return;
		}

		if(this.getView().down('#selectedUserGrid').store.data.length == 0) {
			Ext.Msg.alert("Input Required","Please select at least an User from Available Users List.");
			return;
		}

		if(this.getView().down('#selectedRoleGrid').store.data.length == 0) {
			Ext.Msg.alert("Input Required","Please select at least a Role from Available Roles List.");
			return;
		}

		var userData=this.prepareUserGridData(this.getView().down('#selectedUserGrid'));
		var roleData=this.prepareRoleGridData(this.getView().down('#selectedRoleGrid'));
		
		var jsonData=[];
		for(var i=0;i<userData.length;i++)
		{
			var obj;
			for(var j=0;j<roleData.length;j++)
			{
				obj={
						userId:userData[i].userId,
						roleId:roleData[j].roleId
				}
				jsonData.push(obj);
			}
		}
		//console.log(jsonData)
		Ext.Ajax.request({
			url : "secure/UserRoleBridge",
			method : 'POST',
			headers:{isArray:true},  //if save as List parameter is called headers need to be passed
			jsonData:jsonData,
			me:me,
			success : function(response, currentObject,options)
			{
				debugger;
				var jsonResponse = Ext.JSON.decode(response.responseText);
				if(jsonResponse.response.success==true)
				{
					Ext.Msg.alert('Success',"Data Saved Successfully");
					currentObject.me.onRolesResetClick();
					
					var a =  currentObject.me.getView().down('#selectedUserGrid').getStore().data.items;

					currentObject.me.userGridDefaultData = currentObject.me.userGridDefaultData.filter(function( obj ) {
						var match = false;
						for(var i=0; i<a.length; i++){
							if(a[i].data.userId == obj.userId){
								match = true;
							}
						}
						if(!match)
							return obj;
					});
					
					currentObject.me.getView().down('#selectedUserGrid').getStore().removeAll();
					currentObject.me.getView().up().down('#mappedUserTreeId').getStore().load();
				}
				else{
					Ext.Msg.alert('Error', 'Data Load Failed!');
				}
			},
			failure : function() {
				Ext.Msg.alert('Error', 'Cannot connect to server!');
			}
		});
	},
	prepareRoleGridData : function(selectedRoleGrid)
	{
		debugger;
		var criteria = [];
		var store = selectedRoleGrid.getStore();
		Ext.Array.each(store.data.items,function(item, idx, items) {
							var object = {
									roleId : item.data.roleId
							};
							this.criteria.push(object);
						}, {
							criteria : criteria,
							selectedRoleGrid : selectedRoleGrid,
							scope : this
						});
		return criteria;
	},//prepareRoleGridData ends
	prepareUserGridData : function(selectedUserGrid)
	{
		debugger;
		var criteria = [];
		var store = selectedUserGrid.getStore();
		Ext.Array.each(store.data.items,function(item, idx, items) {
							var object = {
									userId : item.data.userId
							};
							this.criteria.push(object);
						}, {
							criteria : criteria,
							selectedUserGrid : selectedUserGrid,
							scope : this
						});
		return criteria;
	},//prepareUserGridData ends
	
	/** Reset Code for all the 4 grids*/
	onRolesResetClick:function()
	{
		this.getView().down('#availableRoleGrid').getStore().loadData(this.roleGridDefaultData);
		this.getView().down('#selectedRoleGrid').getStore().removeAll();
	},
	onUserResetClick:function()
	{
		this.getView().down('#availableUserGrid').getStore().loadData(this.userGridDefaultData);
		this.getView().down('#selectedUserGrid').getStore().removeAll();
	},
	onResetClick:function()
	{
		this.onRolesResetClick();
		this.onUserResetClick();
	}
});