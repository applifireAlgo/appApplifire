Ext
		.define(
				'Healthsurvey.view.reportui.querycriteria.QueryCriteriaView',
				{
					extend : 'Ext.panel.Panel',
					requires : [ 'Healthsurvey.view.reportui.querycriteria.QueryCriteriaController' ],
					xtype : 'querycriteria',
					controller : 'querycriteriaController',
					title : 'Query Criteria',
					split : true,
					closable : false,
					collapsible : true,
				
					bodyPadding : '1 0 0 0',
					itemId : 'querycriteria',
					layout: {
					    type: 'table',
					    columns: 4
					},
					bbar : [{
						boxLabel : 'Enable Auto Refresh',
						name : 'auto_refersh',
						itemId:'isAutoRef',
						xtype : 'checkboxfield',
						listeners:{
				        	 change:'setTimer'
				         }

					}, {
						xtype : 'combo',
						itemId:'cmbrefInterval',
						fieldLabel : 'Refresh Interval',
						store : Ext.create('Ext.data.Store', {
							fields : [ 'displayValue', 'value' ],
							data : [ {
								"displayValue" : "5 Seconds",
								"value" : 5000
							}, {
								"displayValue" : "10 Seconds",
								"value" : 10000
							}, {
								"displayValue" : "20 Seconds",
								"value" : 20000
							}, {
								"displayValue" : "30 Seconds",
								"value" : 30000
							}, {
								"displayValue" : "1 Minute",
								"value" : 60000
							}, {
								"displayValue" : "3 Minute",
								"value" : 180000
							}, {
								"displayValue" : "5 Minute",
								"value" : 300000
							},
							//...
							]
						}),
						name : "interval",
						queryMode : 'local',
						displayField : 'displayValue',
						valueField : 'value',
						listeners:{
				        	 select:'changeTimers'
				         }


					},'->', {
						xtype : 'button',
						text : 'Clear',
						itemId:"btnClear",
						//icon : 'resources/css/images/search.png',
						listeners:{
				        	 click:'clearData'
				         }
					}, {
						xtype : 'button',
						text : 'Search',
						itemId:"btnSearch",
						icon : 'resources/css/images/search.png',
						listeners:{
			        		 click:'filterData'
			        	 }
					} ]
				});