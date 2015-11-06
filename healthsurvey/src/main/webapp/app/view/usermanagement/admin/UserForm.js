Ext.define('Healthsurvey.view.usermanagement.admin.UserForm', {
	extend : 'Ext.form.Panel',
	xtype : 'userForm',
	itemId : 'userForm',
	requires : [ 'Healthsurvey.view.usermanagement.admin.AddUserDetailsViewModel', 'Healthsurvey.model.AddUserDataModel' ],
	viewModel : 'addUserModel',
	layout : 'anchor',
	bodyPadding : '8',
	items : [ {
		xtype : 'fieldset',
		title : 'General Info',
		width : '100%',
		layout : 'column',
		items : [ {
			columnWidth : .50,
			defaults : {
				width : '95%',
				margin : '8'
			},
			items : [ {
				xtype : 'combo',
				name : 'titleId',
				itemId : 'titleId',
				fieldLabel : 'Title<font color="red">*</font>',
				store : {
					fields : [ 'titleId', 'titles' ],
					data : []
				},
				allowBlank : false,
				queryMode : 'local',
				displayField : 'titles',
				valueField : 'titleId',
				bind : "{coreContacts.titleId}"
			}, {
				xtype : 'textfield',
				name : 'firstName',
				fieldLabel : 'First Name<font color="red">*</font>',
				allowBlank : false,
				bind : "{coreContacts.firstName}"
			}, {
				xtype : 'textfield',
				name : 'middleName',
				fieldLabel : 'Middle Name',
				bind : "{coreContacts.middleName}"
			}, {
				xtype : 'textfield',
				name : 'lastName',
				fieldLabel : 'Last Name<font color="red">*</font>',
				bind : "{coreContacts.lastName}"
			}, {
				xtype : 'datefield',
				name : 'dateofbirth',
				itemId : 'dateofbirth',
				fieldLabel : 'DOB',
				bind : "{coreContacts.dateofbirth}"
			}, {
				xtype : 'numberfield',
				name : 'age',
				fieldLabel : 'Age',
				minValue : '18',
				allowBlank : true,
				bind : "{coreContacts.age}"
			}, {
				xtype : 'radiogroup',
				name : 'genderId',
				itemId : 'genderId',
				fieldLabel : 'Gender<font color="red">*</font>',
				items : [ {
					boxLabel : 'Male',
					name : 'genderId',
					inputValue : '2B81C578-0A97-4B76-A799-4523B5CC5B66'
				}, {
					boxLabel : 'Female',
					name : 'genderId',
					inputValue : '00CF63C8-E1A3-465B-981D-029A9367D92B'
				}, ]
			}, {
				xtype : 'textfield',
				name : 'emailId',
				fieldLabel : 'Email ID<font color="red">*</font>',
				allowBlank : false,
				regex : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
				bind : "{coreContacts.emailId}"
			}, {
				xtype : 'textfield',
				name : 'phoneNumber',
				fieldLabel : 'Phone Number<font color="red">*</font>',
				allowBlank : false,
				regex : /^((\+\d{1,3}([-\(]| )?\(?\d\)?([-\(]| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})$/,
				bind : "{coreContacts.phoneNumber}"
			} ]
		}, {
			columnWidth : .50,
			defaults : {
				width : '95%',
				margin : '8'
			},
			items : [ {
				xtype : 'combo',
				name : 'nativeTitle',
				itemId : 'nativeTitle',
				fieldLabel : 'Native Title',
				store : {
					fields : [ 'titleId', 'titles' ],
					data : [],
					sorters : [ 'titles', 'ASC' ]
				},
				queryMode : 'local',
				forceSelection : true,
				displayField : 'titles',
				valueField : 'titleId',
				allowBlank : true,
				bind : "{coreContacts.nativeTitle}"
			}, {
				xtype : 'textfield',
				name : 'nativeFirstName',
				fieldLabel : 'Native First Name',
				allowBlank : true,
				bind : "{coreContacts.nativeFirstName}"
			}, {
				xtype : 'textfield',
				name : 'nativeMiddleName',
				fieldLabel : 'Native Middle Name',
				allowBlank : true,
				bind : "{coreContacts.nativeMiddleName}"
			}, {
				xtype : 'textfield',
				name : 'nativeLastName',
				fieldLabel : 'Native Last Name',
				bind : "{coreContacts.nativeLastName}"
			}, {
				xtype : 'combo',
				name : 'nativeLanguageCode',
				itemId : 'nativeLangCombo',
				allowBlank : true,
				fieldLabel : 'Native Language Code',
				store : {
					fields : [ 'languageId', 'language' ],
					data : []
				},
				queryMode : 'local',
				forceSelection : true,
				displayField : 'language',
				valueField : 'languageId',
				bind : "{coreContacts.nativeLanguageCode}"
			}, {
				xtype : 'datefield',
				name : 'approximateDOB',
				itemId : 'approximateDOB',
				fieldLabel : 'Approx DOB',
				allowBlank : true,
				bind : "{coreContacts.approximateDOB}",
				hidden : true
			} ]
		} ]
	}, {
		xtype : 'fieldset',
		title : 'Contact Info',
		items : [ {
			xtype : 'grid',
			itemId : 'addrGrid',
			// title:'Address Details',
			width : '100%',
			margin : '0 0 6 0',
			border : true,
			bindLevel : "coreContacts.address",
			store : {
				fields : [],
				data : []
			},
			columns : [ {
				text : 'Address Type',
				flex : 0.1,
				dataIndex : 'addressTypeId',
				renderer : 'addrTypeColRenderer',
				menuDisabled : true
			}, {
				text : 'Address 1',
				flex : 0.2,
				dataIndex : 'address1'
			}, {
				text : 'Postal Code',
				flex : 0.1,
				dataIndex : 'zipcode'
			}, {
				text : 'City',
				flex : 0.2,
				dataIndex : 'cityId',
				renderer : 'cityColRenderer'
			}, {
				text : 'State',
				flex : 0.2,
				dataIndex : 'stateId',
				renderer : 'stateColRenderer'
			}, {
				text : 'Country',
				flex : 0.1,
				dataIndex : 'countryId',
				renderer : 'countryColRenderer'
			}, {
				text : 'Address Label',
				flex : 0.1,
				dataIndex : 'addressLabel',
				hidden : true,
			}, {
				text : 'Address 2',
				flex : 0.1,
				dataIndex : 'address2',
				hidden : true,
			}, {
				text : 'Address 3',
				flex : 0.1,
				dataIndex : 'address3',
				hidden : true,
			}, {
				text : 'Latitude',
				flex : 0.1,
				dataIndex : 'latitude',
				hidden : true,
			}, {
				text : 'Longitude',
				flex : 0.1,
				dataIndex : 'longitude',
				hidden : true,
			} ]
		} ]
	}, {
		xtype : 'fieldset',
		title : 'Communication Info',
		items : [ {
			xtype : 'grid',
			itemId : 'commGrid',
			// title:'Communication Details',
			width : '100%',
			margin : '0 0 6 0',
			border : true,
			bindLevel : "coreContacts.communicationData",
			store : {
				fields : [],
				data : []
			},
			columns : [ {
				text : 'Communication Group',
				flex : 0.3,
				dataIndex : 'commGroupId',
				renderer : 'commGroupColRenderer'
			}, {
				text : 'Communication Type',
				flex : 0.3,
				dataIndex : 'commType',
				renderer : 'commTypeColRenderer'
			}, {
				text : 'Communication Data',
				flex : 0.3,
				dataIndex : 'commData'
			} ]
		} ]
	}, {
		xtype : 'fieldset',
		title : 'Login Credentials',
		width : '100%',
		layout : 'column',
		items : [ {
			columnWidth : .50,
			defaults : {
				width : '95%',
				margin : '8'
			},
			items : [ {
				xtype : 'textfield',
				name : 'loginId',
				fieldLabel : 'Login Id<font color="red">*</font>',
				allowBlank : false,
				bind : '{loginId}'
			} ]
		}, {
			columnWidth : .50,
			defaults : {
				width : '95%',
				margin : '8'
			},
			items : []
		} ]
	}, {
		xtype : 'fieldset',
		title : 'Other Settings',
		width : '100%',
		layout : 'column',
		items : [ {
			columnWidth : .50,
			defaults : {
				width : '95%',
				margin : '8'
			},
			items : [ {
				xtype : 'numberfield',
				name : 'sessionTimeout',
				fieldLabel : 'Session Time Out<font color="red">*</font>',
				minValue : '0',
				allowBlank : true,
				bind : "{user.sessionTimeout}"
			} ]
		}, {
			columnWidth : .50,
			defaults : {/* width:'95%', */
				margin : '8'
			},
			items : [ {
				xtype : 'checkbox',
				name : 'allowMultipleLogin',
				fieldLabel : 'Allow Multiple Login',
				labelWidth : 120,
				checked : 0,
				allowBlank : true,
				bind : "{user.allowMultipleLogin}"
			} ]
		} ]
	} ]
});