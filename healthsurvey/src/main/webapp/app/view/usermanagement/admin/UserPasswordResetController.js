Ext.define('Healthsurvey.view.usermanagement.admin.UserPasswordResetController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.userPwdResetController',

	afterUserGridRender : function(grid) {
		debugger;
		// var gridPanel = this.getView().down('#userPwdGrid');
		Ext.Ajax.request({
			url : "secure/Login/findAll",
			method : 'GET',
			jsonData : {},
			grid : grid,
			maskEnable : true,
			maskEle : this.view,
			success : function(response, currentObject, options) {
				debugger;
				var jsonResponse = Ext.JSON.decode(response.responseText);
				var data = jsonResponse.response.data;
				var tempData = [];
				for (var i = 0; i < data.length; i++) {
					var obj = {
						firstName : data[i].coreContacts.firstName,
						middleName : data[i].coreContacts.middleName,
						lastName : data[i].coreContacts.lastName,
						loginId : data[i].loginId,
						userId : data[i].userId,
						isLocked : data[i].user.isLocked
					}
					tempData.push(obj);
				}
				currentObject.grid.getStore().loadData(tempData);
			},
			failure : function() {
				Ext.Msg.alert('Error', 'Cannot connect to server!');
			}
		});
	},// afterUserGridRender ends

	onGridTextFieldChange : function(me) {
		debugger;
		var grid = me.up().up();
		var v;
		try {
			v = new RegExp(me.getValue(), 'i');
			grid.store.clearFilter(true);
			grid.store.filter('firstName', v);
		} catch (e) {
			me.markInvalid('Invalid regular expression');
		}
	},// onGridTextFieldChange ends

	prepareLockedUnlockJSON : function(userGrid, locked) {
		debugger;
		var usersJSON = [];
		var rows = userGrid.getSelectionModel().getSelection();
		for (var x = 0; x < rows.length; x++) {
			var obj = {
				userId : rows[x].data.userId,
				isLocked : locked
			};
			usersJSON.push(obj);
		}
		return usersJSON;
	},

	prepareSessionTimeoutJSON : function(userGrid) {
		debugger;
		var sessionTimeoutValue = this.getView().down('#sessionTimeFieldId').getValue();
		var usersJSON = [];
		var rows = userGrid.getSelectionModel().getSelection();
		for (var x = 0; x < rows.length; x++) {
			var obj = {
				userId : rows[x].data.userId,
				sessionTimeout : sessionTimeoutValue
			};
			usersJSON.push(obj);
		}
		return usersJSON;
	},

	prepareChangePasswordInNextLoginJSON : function(userGrid) {
		debugger;
		var usersJSON = [];
		var rows = userGrid.getSelectionModel().getSelection();
		for (var x = 0; x < rows.length; x++) {
			var obj = {
				userId : rows[x].data.userId,
				changePasswordNextLogin : true
			};
			usersJSON.push(obj);
		}
		return usersJSON;
	},

	prepareOneTimePasswordGenerationJSON : function(userGrid) {
		debugger;
		var usersJSON = [];
		var rows = userGrid.getSelectionModel().getSelection();
		for (var x = 0; x < rows.length; x++) {
			var obj = {
				userId : rows[x].data.userId,
				genTempOneTimePassword : true
			};
			usersJSON.push(obj);
		}
		return usersJSON;
	},

	prepareResetPasswordJSON : function(userGrid) {
		debugger;
		var usersJSON = [];
		var rows = userGrid.getSelectionModel().getSelection();
		for (var x = 0; x < rows.length; x++) {
			var obj = {
				userId : rows[x].data.userId,
				loginId : rows[x].data.loginId
			};
			usersJSON.push(obj);
		}
		return usersJSON;
	},

	onResetPwdClick : function(b) {
		debugger;
		var grid = this.getView().down('#userPwdGrid');
		if (grid.getSelectionModel().hasSelection() == false) {
			Ext.Msg.alert({
				title : 'Warning',
				msg : 'Select account to reset password',
				icon : Ext.MessageBox.WARNING
			});
		} else {
			var jsonData = this.prepareResetPasswordJSON(grid);
			Ext.Msg.confirm('Confirm', 'Are you sure you want to reset password', function(id, value) {
				if (id == 'yes') {
					debugger;
					this.controller.resetPassword(this.jsonData);
				}
			}, {
				controller : this,
				jsonData : jsonData
			});
		}
	},

	onLockAccountClick : function(btn, opt) {
		debugger;
		var grid = this.getView().down('#userPwdGrid');
		if (grid.getSelectionModel().hasSelection() == false) {
			Ext.Msg.alert({
				title : 'Warning',
				msg : 'Select account to lock',
				icon : Ext.MessageBox.WARNING
			});
		} else {
			var isValid = true;
			var rows = grid.getSelectionModel().getSelection();
			for (var x = 0; x < rows.length; x++) {
				if (rows[x].data.isLocked == true) {
					var userName = rows[x].data.firstName;
					userName = userName + " " + (rows[x].data.middleName == null ? "" : rows[x].data.middleName);
					userName = userName + " " + (rows[x].data.lastName == null ? "" : rows[x].data.lastName);
					Ext.Msg.alert({
						title : 'Info',
						msg : userName + " is already locked, so you cannot lock this account again",
						icon : Ext.MessageBox.Info
					});
					isValid = false;
					break;
				}
			}

			if (isValid) {
				var jsonData = this.prepareLockedUnlockJSON(grid, true);
				Ext.Msg.confirm('Confirm', 'Are you sure you want to lock account', function(id, value) {
					if (id == 'yes') {
						debugger;
						this.controller.updateRecord(this.jsonData);
					}
				}, {
					controller : this,
					jsonData : jsonData
				});
			}
		}
	},

	onUnLockAccountClick : function(btn, opt) {
		debugger;
		var grid = this.getView().down('#userPwdGrid');
		if (grid.getSelectionModel().hasSelection() == false) {
			Ext.Msg.alert({
				title : 'Warning',
				msg : 'Select account to unlock',
				icon : Ext.MessageBox.WARNING
			});
		} else {
			var isValid = true;
			var rows = grid.getSelectionModel().getSelection();
			for (var x = 0; x < rows.length; x++) {
				if (rows[x].data.isLocked == false || rows[x].data.isLocked == null) {
					var userName = rows[x].data.firstName;
					userName = userName + " " + (rows[x].data.middleName == null ? "" : rows[x].data.middleName);
					userName = userName + " " + (rows[x].data.lastName == null ? "" : rows[x].data.lastName);

					Ext.Msg.alert({
						title : 'Info',
						msg : userName + " is not locked, so you cannot unlock this account",
						icon : Ext.MessageBox.Info
					});
					isValid = false;
					break;
				}
			}

			if (isValid) {
				var jsonData = this.prepareLockedUnlockJSON(grid, false);
				Ext.Msg.confirm('Confirm', 'Are you sure you want to unlock account', function(id, value) {
					if (id == 'yes') {
						debugger;
						this.controller.updateRecord(this.jsonData);
					}
				}, {
					controller : this,
					jsonData : jsonData
				});
			}
		}
	},

	onSaveSessionTimeoutsClick : function(btn, opt) {
		debugger;
		var sessionTimeout = this.getView().down('#sessionTimeFieldId');
		if (sessionTimeout.getValue() >= sessionTimeout.minValue) {
			var grid = this.getView().down('#userPwdGrid');
			if (grid.getSelectionModel().hasSelection() == false) {
				Ext.Msg.alert({
					title : 'Warning',
					msg : 'Select account to save session timeout',
					icon : Ext.MessageBox.WARNING
				});
			} else {
				if (this.getView().down('#sessionTimeFieldId').isValid()) {
					var jsonData = this.prepareSessionTimeoutJSON(grid);
					Ext.Msg.confirm('Confirm', 'Are you sure you want to save session timeout', function(id, value) {
						if (id == 'yes') {
							debugger;
							this.controller.updateRecord(this.jsonData);
						}
					}, {
						controller : this,
						jsonData : jsonData
					});
				}
			}
		} else {
			Ext.Msg.alert({
				title : 'Info',
				msg : 'Please enter the valid session timeout',
				icon : Ext.MessageBox.INFO
			});
		}

	},

	onChangePasswordInNextLoginClick : function(btn, opt) {
		debugger;
		var grid = this.getView().down('#userPwdGrid');
		if (grid.getSelectionModel().hasSelection() == false) {
			Ext.Msg.alert({
				title : 'Warning',
				msg : 'Select account to change password in next login',
				icon : Ext.MessageBox.WARNING
			});
		} else {
			var jsonData = this.prepareChangePasswordInNextLoginJSON(grid);
			Ext.Msg.confirm('Confirm', 'Are you sure you want to change password in next login', function(id, value) {
				if (id == 'yes') {
					debugger;
					this.controller.updateRecord(this.jsonData);
				}
			}, {
				controller : this,
				jsonData : jsonData
			});
		}
	},

	onGenerateOneTimePasswordClick : function(btn, opt) {
		debugger;
		var grid = this.getView().down('#userPwdGrid');
		if (grid.getSelectionModel().hasSelection() == false) {
			Ext.Msg.alert({
				title : 'Warning',
				msg : 'Select account to generate one time password',
				icon : Ext.MessageBox.WARNING
			});
		} else {
			var jsonData = this.prepareOneTimePasswordGenerationJSON(grid);
			Ext.Msg.confirm('Confirm', 'Are you sure you want to generate one time password', function(id, value) {
				if (id == 'yes') {
					debugger;
					this.controller.updateRecord(this.jsonData);
				}
			}, {
				controller : this,
				jsonData : jsonData
			});
		}
	},

	resetPassword : function(jsonData) {
		debugger;
		var currentObject = this;
		Ext.Ajax.request({
			timeout : 180000,
			url : 'secure/PasswordGenerator/resetPassword',
			method : 'PUT',
			jsonData : jsonData,
			maskEnable : true,
			maskEle : this.view,

			success : function(response, eOpts) {
				debugger;
				var jsonResponse = Ext.JSON.decode(response.responseText);
				if (jsonResponse.response.success) {
					Ext.Msg.alert('Info', jsonResponse.response.message);
					var userPwdGrid = currentObject.getView().down('#userPwdGrid');
					userPwdGrid.getStore().load();
					currentObject.afterUserGridRender(userPwdGrid);
				} else {
					Ext.Msg.alert({
						title : 'Info',
						msg : jsonResponse.response.message,
						icon : Ext.MessageBox.ERROR
					});
				}
			},
			failure : function() {
				Ext.Msg.alert({
					title : 'Error',
					msg : 'Cannot connect to server',
					icon : Ext.MessageBox.ERROR
				});
			}
		});
	},

	updateRecord : function(jsonData) {
		debugger;
		var currentObject = this;
		Ext.Ajax.request({
			timeout : 180000,
			url : 'secure/PasswordGenerator/updateUser',
			method : 'POST',
			jsonData : jsonData,
			maskEnable : true,
			maskEle : this.view,
			success : function(response, eOpts) {
				debugger;
				var jsonResponse = Ext.JSON.decode(response.responseText);
				if (jsonResponse.response.success) {
					Ext.Msg.alert('Info', "Data Updated Successfully");

					var userPwdGrid = currentObject.getView().down('#userPwdGrid');
					userPwdGrid.getStore().load();
					currentObject.afterUserGridRender(userPwdGrid);
				} else {
					Ext.Msg.alert({
						title : 'Info',
						msg : jsonResponse.response.message,
						icon : Ext.MessageBox.ERROR
					});
				}
			},
			failure : function() {
				Ext.Msg.alert({
					title : 'Error',
					msg : 'Cannot connect to server',
					icon : Ext.MessageBox.ERROR
				});
			}
		});
	}
});