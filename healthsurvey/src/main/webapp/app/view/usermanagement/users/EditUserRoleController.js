Ext.define('Healthsurvey.view.usermanagement.users.EditUserRoleController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.editUserRoleController',
	// userId:null,
	userRoleData : null,

	onUserTreeLoad : function(currentObject, records, successful, operation, node, eOpts) {
		var tempView = this.getView();
		Ext.Ajax.request({
			url : "secure/Login/FindMappedUser",
			method : 'POST',
			currentView : tempView,
			success : function(response, currentObject, options) {
				var jsonResponse = Ext.JSON.decode(response.responseText);
				if (jsonResponse.response.success == true) {
					var data = jsonResponse.response.data;
					var tree = currentObject.currentView.down('#mappedUserTreeId');
					var rootNode = tree.getRootNode();
					rootNode.removeAll();
					for (var i = 0; i < data.length; i++) {
						var childNode = {
							text : data[i].coreContacts.firstName,
							userId : data[i].userId,
							versionId : data[i].versionId,
							leaf : true,
							icon : 'images/user/roles.png'
						};
						rootNode.appendChild(childNode);
					}
					tree.getStore().sort('text', 'ASC');
				} else {
					Ext.Msg.alert({
						title : 'Error',
						msg : "Data Transaction failed",
						icon : Ext.MessageBox.ERROR
					});
				}
			},
			failure : function() {
				Ext.Msg.alert({
					title : 'Error',
					msg : "Cannot find Service",
					icon : Ext.MessageBox.ERROR
				});
			}
		});
	},// onUserTreeLoad ends

	afterItemSelectorRender : function(itemselector, eOpts) {
		Ext.Ajax.request({
			url : "secure/Roles/findAll",
			method : 'GET',
			jsonData : {},
			itemSelector : itemselector,
			success : function(response, currentObject, options) {
				debugger;
				var jsonResponse = Ext.JSON.decode(response.responseText);
				if (jsonResponse.response.success == true) {
					var data = jsonResponse.response.data;
					currentObject.itemSelector.store.loadData(data);
					currentObject.itemSelector.store.sort('roleName', 'ASC');
					currentObject.itemSelector.bindStore(currentObject.itemSelector.store);
				} else {
					Ext.Msg.alert({
						title : 'Error',
						msg : "Data Transaction failed",
						icon : Ext.MessageBox.ERROR
					});
				}
			},
			failure : function() {
				Ext.Msg.alert({
					title : 'Error',
					msg : "Cannot Connect to server",
					icon : Ext.MessageBox.ERROR
				});
			}
		});
	},// afterItemSelectorRender ends

	onUserListClick : function(item, record, item, index, e, eOpts) {
		debugger;
		var me = this;
		this.userId = record.data.userId;
		this.getView().down('#savebtn').enable();
		Ext.Ajax.request({
			url : "secure/UserRoleBridge/findByUserId",
			method : 'POST',
			me : me,
			jsonData : {
				findKey : record.data.userId
			},
			success : function(response, currentObject, options) {
				debugger;
				var jsonResponse = Ext.JSON.decode(response.responseText);
				if (jsonResponse.response.success == true) {
					var data = jsonResponse.response.data;
					currentObject.me.userRoleData = data; // store
					// userRoleData
					// globally
					var tempVal = [];
					for (var i = 0; i < data.length; i++) {
						tempVal.push(data[i].roleId);
					}
					currentObject.me.getView().down('#itemselector-field').setValue(tempVal);
				} else {
					Ext.Msg.alert({
						title : 'Error',
						msg : "Data Transaction failed",
						icon : Ext.MessageBox.ERROR
					});
				}
			},
			failure : function() {
				Ext.Msg.alert({
					title : 'Error',
					msg : "Cannot Connect to server",
					icon : Ext.MessageBox.ERROR
				});
			}
		});
	},// onUserListClick ends

	onResetClick : function(btn) {
		btn.up().up().reset(); // form.reset()
	},

	prepareUpdateJSON : function(userId, oldRolesArray, newRolesArray) {
		debugger;
		var updatedRolesJSON = [];
		// Calculating INSERT JSON
		for (var n = 0; n < newRolesArray.length; n++) {
			var isNew = true;
			for (var o = 0; o < oldRolesArray.length; o++) {
				if (newRolesArray[n] == oldRolesArray[o].roleId) {
					isNew = false;
					break;
				}
			}
			if (isNew == true) {
				var role = {
					userId : userId,
					roleId : newRolesArray[n],
				}
				updatedRolesJSON.push(role);
			}
		}

		// Calculating DELETE JSON
		for (var o = 0; o < oldRolesArray.length; o++) {
			var isRemoved = true;
			for (var n = 0; n < newRolesArray.length; n++) {
				if (newRolesArray[n] == oldRolesArray[o].roleId) {
					isRemoved = false;
					break;
				}
			}
			if (isRemoved == true) {
				var role = {
					roleUserMapId : oldRolesArray[o].roleUserMapId,
					userId : oldRolesArray[o].userId,
					roleId : oldRolesArray[o].roleId,
					versionId : oldRolesArray[o].versionId,
					systemInfo : {
						activeStatus : -1
					}
				}
				updatedRolesJSON.push(role);
			}
		}
		return updatedRolesJSON;
	},

	onUpdateUserRoleClick : function(btn) {
		debugger;
		var currentObject = this;
		var userId = this.userId;
		var roleIdArray = btn.up().up().getValues().itemselector.split(",");
		
		var jsonData = this.prepareUpdateJSON(userId, this.userRoleData, roleIdArray);
		
		if (jsonData.length == 0) {
			Ext.Msg.alert({
				title : 'Info',
				msg : "No Changes Found",
				icon : Ext.MessageBox.INFO
			});
		} else {
			Ext.Ajax.request({
				url : "secure/UserRoleBridge",
				method : 'PUT',
				headers : {
					isArray : true
				},
				jsonData : jsonData,
				timeout : 180000,
				success : function(response, options) {
					debugger;
					var jsonResponse = Ext.JSON.decode(response.responseText);
					if (jsonResponse.response.success == true) {
						Ext.Msg.alert('Success', jsonResponse.response.message);
						currentObject.getView().down('#form').reset();
					} else {
						Ext.Msg.alert({
							title : 'Error',
							msg : "Data Transaction failed",
							icon : Ext.MessageBox.ERROR
						});
					}
				},
				failure : function() {
					Ext.Msg.alert({
						title : 'Error',
						msg : "Cannot Connect to server",
						icon : Ext.MessageBox.ERROR
					});
				}
			});
		}
	},// onUpdateUserRoleClick ends

	onTriggerFieldChange : function(me) {
		var tree = me.up().up();
		var v;
		try {
			v = new RegExp(me.getValue(), 'i');
			tree.store.filter({
				filterFn : function(node) {
					var children = node.childNodes, len = children && children.length, visible = node.isLeaf() ? v.test(node.get('text')) : false, i;
					for (i = 0; i < len && !(visible = children[i].get('visible')); i++)
						;
					return visible;
				},
				id : 'titleFilter'
			});
		} catch (e) {
			me.markInvalid('Invalid regular expression');
		}
	},// onTriggerFieldChange ends

	formatUserRoleData : function(userId, dataArray, roleIdArray) {
		debugger;
		var jsonData = [];
		/** UPDATE */
		var obj = null;
		for (var i = 0; i < roleIdArray.length; i++) {
			for (var j = 0; j < dataArray.length; j++) {
				if (roleIdArray[i] == dataArray[j].roleId) {
					/*
					 * obj={ userId:userId, roleId:roleIdArray[i],
					 * versionId:dataArray[j].versionId,
					 * roleUserMapId:dataArray[j].roleUserMapId,
					 * systemInfo:{activeStatus:1}, } jsonData.push(obj);
					 */
					roleIdArray.splice(i, 1);
					dataArray.splice(j, 1);
				}
			}
		}
		/** INSERT */
		if (roleIdArray.length != 0) {
			for (var k = 0; k < roleIdArray.length; k++) {
				obj = {
					userId : userId,
					roleId : roleIdArray[k],
				}
				jsonData.push(obj);
			}
		}
		/** DELETE */
		if (dataArray.length != 0) {
			for (var l = 0; l < dataArray.length; l++) {
				obj = {
					roleUserMapId : dataArray[l].roleUserMapId,
					userId : dataArray[l].userId,
					roleId : dataArray[l].roleId,
					versionId : dataArray[l].versionId,
					systemInfo : {
						activeStatus : -1
					}
				}
				jsonData.push(obj);
			}
		}

		return jsonData;
	},// formatUserRoleData ends

});