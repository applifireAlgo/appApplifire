Ext.define('Healthsurvey.view.usermanagement.admin.AddUserDetailsController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.addUserController',
	addrTypeComboStore : null,
	countryComboStore : null,
	commGroupComboStore : null,

	afterTitleComboRender : function(combo) {
		Ext.Ajax.request({
			url : "secure/Title/findAll",
			method : 'GET',
			combo : combo,
			jsonData : {},
			success : function(response, currentObject, options) {
				var jsonResponse = Ext.JSON.decode(response.responseText);
				var data = jsonResponse.response.data;
				currentObject.combo.getStore().loadData(data);
			},
			failure : function() {
				Ext.Msg.alert('Error', 'Cannot connect to server');
			}
		});
	},
	aftrAddrTypeComboRender : function(combo) {
		var me = this;
		Ext.Ajax.request({
			url : "secure/AddressType/findAll",
			method : 'GET',
			combo : combo,
			me : me,
			jsonData : {},
			success : function(response, currentObject, options) {
				var jsonResponse = Ext.JSON.decode(response.responseText);
				var data = jsonResponse.response.data;
				currentObject.combo.getStore().loadData(data);
				currentObject.me.addrTypeComboStore = currentObject.combo.getStore();
			},
			failure : function() {
				Ext.Msg.alert('Error', 'Cannot connect to server');
			}
		});
	},
	afterLanguageComboRender : function(combo) {
		Ext.Ajax.request({
			url : "secure/Language/findAll",
			method : 'GET',
			combo : combo,
			jsonData : {},
			success : function(response, currentObject, options) {
				var jsonResponse = Ext.JSON.decode(response.responseText);
				var data = jsonResponse.response.data;
				currentObject.combo.getStore().loadData(data);
			},
			failure : function() {
				Ext.Msg.alert('Error', 'Cannot connect to server');
			}
		});
	},
	aftrCommGroupComboRender : function(combo) {
		var me = this;
		Ext.Ajax.request({
			url : "secure/CommunicationGroup/findAll",
			method : 'GET',
			combo : combo,
			me : me,
			jsonData : {},
			success : function(response, currentObject, options) {
				var jsonResponse = Ext.JSON.decode(response.responseText);
				var data = jsonResponse.response.data;
				currentObject.combo.getStore().loadData(data);
				currentObject.me.commGroupComboStore = currentObject.combo.getStore();
			},
			failure : function() {
				Ext.Msg.alert('Error', 'Cannot connect to server');
			}
		});
	},
	onCommGroupChange : function(commGroupId) {
		var tempView = this.getView();
		Ext.Ajax.request({
			url : "secure/CommunicationType/findByCommGroupId",
			method : 'POST',
			currentView : tempView,
			jsonData : {
				findKey : commGroupId.value
			},
			success : function(response, currentObject, options) {
				var jsonResponse = Ext.JSON.decode(response.responseText);
				var data = jsonResponse.response.data;
				var commType = currentObject.currentView.down('#commType');
				commType.getStore().loadData(data);
			},
			failure : function() {
				Ext.Msg.alert('Error', 'Cannot connect to server');
			}
		});
	},
	aftrCountryComboRender : function(combo) {
		var me = this;
		Ext.Ajax.request({
			url : "secure/Country/findAll",
			method : 'GET',
			combo : combo,
			me : me,
			jsonData : {},
			success : function(response, currentObject, options) {
				var jsonResponse = Ext.JSON.decode(response.responseText);
				var data = jsonResponse.response.data;
				currentObject.combo.getStore().loadData(data);
				currentObject.me.countryComboStore = currentObject.combo.getStore();
			},
			failure : function() {
				Ext.Msg.alert('Error', 'Cannot connect to server');
			}
		});
	},
	onCountryChange : function(countryId) {
		var tempView = this.getView();
		Ext.Ajax.request({
			url : "secure/State/findByCountryId",
			method : 'POST',
			currentView : tempView,
			jsonData : {
				findKey : countryId.value
			},
			success : function(response, currentObject, options) {
				var jsonResponse = Ext.JSON.decode(response.responseText);
				var data = jsonResponse.response.data;
				var stateId = currentObject.currentView.down('#stateId');
				stateId.setValue("");
				stateId.getStore().loadData(data);
			},
			failure : function() {
				Ext.Msg.alert('Error', 'Cannot connect to server');
			}
		});
	},
	onStateChange : function(stateId) {
		var tempView = this.getView();
		Ext.Ajax.request({
			url : "secure/City/findByStateId",
			method : 'POST',
			currentView : tempView,
			jsonData : {
				findKey : stateId.value
			},
			success : function(response, currentObject, options) {
				var jsonResponse = Ext.JSON.decode(response.responseText);
				var data = jsonResponse.response.data;
				var cityId = currentObject.currentView.down('#cityId');
				cityId.setValue("");
				cityId.getStore().loadData(data);
			},
			failure : function() {
				Ext.Msg.alert('Error', 'Cannot connect to server');
			}
		});
	},
	calculateAge : function(field, value, eOpts) {
		debugger;
		var today = new Date();
		if(today.getFullYear()-value.getFullYear()>=0) {
			var timeDiff = Math.abs(today.getTime() - value.getTime());
			var age = Math.floor(timeDiff/(1000*3600*24*365));
			if((age > 18) || (age == 18 && value.getMonth()-today.getMonth() >= 0 && today.getDate()-value.getDate() >= 0)){
				var form = this.getView();
				form.down('#age').setValue(age);
			}
			else {
				var form = this.getView();
				form.down('#dateofbirth').reset();
				form.down('#age').setValue("");
				Ext.Msg.alert({
					title : 'Error',
					msg : 'Age should be greater than 18. Please verify your date of birth.',
					icon : Ext.MessageBox.ERROR
				});
			}
		}
		else
		{
			Ext.Msg.alert({
				title : 'Error',
				msg : 'Date of birth cannot be future date.',
				icon : Ext.MessageBox.ERROR
			});
		}
	},
	addCommData : function(btn) {
		debugger;
		var commForm = btn.up().up().up();
		var grid = commForm.down('#commGrid');
		commForm.down('#commGroupId').allowBlank = false;
		commForm.down('#commType').allowBlank = false;
		commForm.down('#commData').allowBlank = false;
		if (commForm.isValid()) {
			var values = commForm.getValues();
			grid.getStore().add(values);
			commForm.reset();
		}
		commForm.down('#commGroupId').allowBlank = true;
		commForm.down('#commType').allowBlank = true;
		commForm.down('#commData').allowBlank = true;
	},
	onDeleteRowClick : function(grid, rowIndex) {
		grid.getStore().removeAt(rowIndex);
	},

	addAddressData : function(btn) {
		debugger;
		var addrForm = btn.up().up().up();
		var grid = addrForm.down('#addrGrid');
		addrForm.down('#addressTypeId').allowBlank = false;
		addrForm.down('#address1').allowBlank = false;
		addrForm.down('#zipcode').allowBlank = false;
		addrForm.down('#cityId').allowBlank = false;
		addrForm.down('#stateId').allowBlank = false;
		addrForm.down('#countryId').allowBlank = false;
		if (addrForm.isValid()) {
			var values = addrForm.getValues();
			grid.getStore().add(values);
			addrForm.reset();
		}
		addrForm.down('#addressTypeId').allowBlank = true;
		addrForm.down('#address1').allowBlank = true;
		addrForm.down('#zipcode').allowBlank = true;
		addrForm.down('#cityId').allowBlank = true;
		addrForm.down('#stateId').allowBlank = true;
		addrForm.down('#countryId').allowBlank = true;
	},

	onSaveUserForm : function(btn) {
		debugger;
		var me = this;
		var form = btn.up().up();
		if (form.isValid()) {
			var formData = form.getViewModel().getData();
			// check for duplicate login id
			Ext.Ajax.request({
				url : 'secure/PasswordGenerator/checkValidityOfLoginId',
				method : 'POST',
				jsonData : {
					findKey : formData.coreContacts.emailId
				},
				me : me,
				success : function(response, currentObject) {
					debugger;
					var jsonResponse = Ext.JSON.decode(response.responseText);
					if (jsonResponse.response.success == false) {
						Ext.Msg.alert({
							title : 'ERROR',
							msg : jsonResponse.response.message,
							icon : Ext.MessageBox.ERROR
						});
					} else {
						formData.coreContacts.genderId = form.down('#genderId').getValue().genderId;
						formData.user.allowMultipleLogin = formData.user.allowMultipleLogin == true ? 1 : 0;
						var commGrid = form.down('#commGrid');
						var addrGrid = form.down('#addrGrid');
						currentObject.me.createObject(formData, commGrid.bindLevel, currentObject.me.fetchDataFromStore(commGrid.getStore()));
						currentObject.me.createObject(formData, addrGrid.bindLevel, currentObject.me.fetchDataFromStore(addrGrid.getStore()));
						var jsonData = formData;

						var loginID = jsonData.coreContacts.emailId;
						jsonData.loginId = loginID;
						jsonData.user.userAccessCode = 55005;
						jsonData.user.changePasswordNextLogin = 1;
						jsonData.user.systemInfo = {
							activeStatus : 1
						};

						Ext.MessageBox.show({
							msg : 'Creating User',
							progressText : 'Creating User',
							width : 300,
							wait : true,
							waitConfig : {
								interval : 200
							},
							animateTarget : 'waitButton'
						});
						Ext.Ajax.request({
							url : 'secure/Login',
							method : 'POST',
							jsonData : jsonData,
							me : me,
							success : function(response, currentObject) {
								debugger;
								var jsonResponse = Ext.JSON.decode(response.responseText);
								var data = jsonResponse.response.data;
								Ext.Ajax.request({
									url : "secure/PasswordGenerator/generatePassword",
									method : 'POST',
									jsonData : {
										findKey : data.loginPk
									},
									success : function(response, opt) {
										debugger;
										var jsonResponse = Ext.JSON.decode(response.responseText);
										if(jsonResponse.response.success) {
											Ext.Msg.alert({
												title : 'Info',
												msg : "User Created Successfully<br>"+jsonResponse.response.message,
												icon : Ext.MessageBox.INFO
											});
										} else {
											Ext.Msg.alert({
												title : 'Info',
												msg : "User Created Successfully<br>"+jsonResponse.response.message,
												icon : Ext.MessageBox.INFO
											});
										}
									},
									failure : function(response, opt) {
										var jsonResponse = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert({
											title : 'Error',
											msg : jsonResponse.response.message,
											icon : Ext.MessageBox.ERROR
										});
									}
								});

								var usersTree = currentObject.me.getView().up().down('#viewUser').down('#usersTreeId');
								usersTree.store.load();
								var userPwdGrid = currentObject.me.getView().up().down('#userPwdResetView').down('#userPwdGrid');
								userPwdGrid.getStore().load();
								currentObject.me.getView().up().down('#userPwdResetView').getController().afterUserGridRender(userPwdGrid);
								currentObject.me.onResetUserForm();
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
	},

	onResetUserForm : function() {
		this.getView().getForm().reset();
		this.getView().down('#addrGrid').store.removeAll();
		this.getView().down('#commGrid').store.removeAll();
	},

	removeId : function(data) {
		for (var int = 0; int < data.length; int++) {
			delete data[int]['id'];
		}
	},
	createObject : function(data, dataLevel, assignValue) {
		debugger;
		this.removeId(assignValue);
		var dataLevels = dataLevel.split('.');
		var currentObject = data;
		for ( var iterable_element in dataLevels) {
			var element = dataLevels[iterable_element];
			var elementValue = currentObject[element];
			if (currentObject[element]) {
				currentObject = elementValue;
			} else {
				currentObject[element] = assignValue;
				return currentObject;
			}
		}
		return data;
	},
	fetchDataFromStore : function(store) {
		storeItems = store.data.items;
		obj = {};
		arr = [];
		for (counter in storeItems) {
			arr.push(storeItems[counter].data);
		}
		return obj['objArr'] = arr;
	},
	commGroupColRender : function(value, metaData, record, rowIndex, colIndex, store, view) {
		var combo = this.getView().down('#commGroupId');
		var matchRec = combo.store.findRecord('commGroupId', value);
		return matchRec.data.commGroupName;

	},
	commTypeColRender : function(value, metaData, record, rowIndex, colIndex, store, view) {
		var combo = this.getView().down('#commType');
		var matchRec = combo.store.findRecord('commType', value);
		return matchRec.data.commTypeName;

	},
	addrTypeColRender : function(value, metaData, record, rowIndex, colIndex, store, view) {
		var combo = this.getView().down('#addressTypeId');
		var matchRec = combo.store.findRecord('addressTypeId', value);
		return matchRec.data.addressType;
	},
	cityColRender : function(value, metaData, record, rowIndex, colIndex, store, view) {
		var combo = this.getView().down('#cityId');
		var matchRec = combo.store.findRecord('cityId', value);
		return matchRec.data.cityName;
	},
	stateColRender : function(value, metaData, record, rowIndex, colIndex, store, view) {
		var combo = this.getView().down('#stateId');
		var matchRec = combo.store.findRecord('stateId', value);
		return matchRec.data.stateName;
	},
	countryColRender : function(value, metaData, record, rowIndex, colIndex, store, view) {
		var combo = this.getView().down('#countryId');
		var matchRec = combo.store.findRecord('countryId', value);
		return matchRec.data.countryName;
	},
});