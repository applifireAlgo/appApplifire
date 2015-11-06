Ext
		.define(
				'Healthsurvey.view.searchengine.search.documentView',
				{
					extend : 'Ext.grid.Panel',
					xtype : 'documentView',
					itemId : 'documentView',
					cls : 'company-news-grid',

					requires : [
							'Ext.grid.plugin.RowExpander',
							'Healthsurvey.view.searchengine.search.documentController',
							'Healthsurvey.view.searchengine.search.RowExpander' ],

					config : {
						activeState : null,
						defaultActiveState : 'all'
					},
					tbar : [ {
						text : 'All Posts',
						xtype : 'cycle',
						reference : 'filterButton',
						showText : true,
						width : 150,
						textAlign : 'left',

						listeners : {
							change : 'onNewsClick'
						},

						menu : {

							items : [ {
								text : 'All Documents',
								type : 'all',
								itemId : 'all',
								checked : true
							}, {
								text : 'Word Document',
								type : 'doc',
								itemId : 'doc'
							}, {
								text : 'Excel Document',
								type : 'xls',
								itemId : 'xls'
							}, {
								text : 'PPT Document',
								type : 'ppt',
								itemId : 'ppt'
							}, {
								text : 'PDF Document',
								type : 'pdf',
								itemId : 'pdf'
							} ]
						}
					} ],
					controller : 'documentController',

					hideHeaders : true,

					columns : [ {
						dataIndex : 'title',
						flex : 1,
						renderer : 'renderTitleColumn'
					} ],

					viewConfig : {
						listeners : {
							itemclick : 'onCompanyClick'
						//expandbody : 	'onCompanyExpandBody'
						/*collapsebody : 'onCompanyCollapseBody'*/
						}
					},
					dockedItems : [ {
						xtype : 'pagingtoolbar',
						//store : mystore, // same store GridPanel is using
						dock : 'bottom',
						displayInfo : true,
						/*items:[
				                '-', {
				                text: 'Show Preview',
				                pressed: pluginExpanded,
				                enableToggle: true,
				                toggleHandler: function(btn, pressed) {
				                    var preview = Ext.getCmp('gv').getPlugin('preview');
				                    preview.toggleExpanded(pressed);
				                }
				            }]*/
					} ],

					/*plugins : [ {
						ptype : 'ux-rowexpander',
						pluginId : 'rowexpander'
					} ],*/

					// This XTemplate is used by the controller to format the
					// title column.
					titleTpl : '<div class="text-wrapper">'
							+ '<div class="news-icon {file_type}">&nbsp;</div>'
							+ '<div class="news-data">'
							+ '<div class="news-picture"><img src="fw/image/{file_type_ext}"></div>'
							+ '<div class="news-content">'
							+ '<div class="news-title">{id}</div>'
							+ '<div class="news-small">by <span class="news-author">{author}</span>'
							+ '<img src="fw/image/cal-icon.png"/>{date}</div>'
							+ '<div class="dowload-image" >'
							+ '<img src="fw/image/download.png"></div>' + '</div>'
							+ '</div>' + '</div>',

					validStates : {
						all : 1,
						doc : 1,
						xls : 1,
						ppt : 1,
						pdf : 1
					},

					isValidState : function(state) {
						return state in this.validStates;
					},
					initComponent : function() {
						debugger;
						var mystore = Ext.create('Ext.data.ArrayStore', {
							fields : [ {
								name : 'id'
							}, {
								name : 'subject'

							}, {
								name : 'author'
							}, {
								name : 'attr_content'
							}, {
								name : "file_type"
							}, {
								name : "file_type_ext"
							} ],
							pageSize : 10,
							proxy : {
								type : 'memory',
								enablePaging : true,
								reader : {
									type : 'json'
								}
							}

						/*
						 * proxy : { type : 'ajax', url :
						 * 'secure/buzzorapp/getThenOperations', reader : { type :
						 * 'json' } }
						 */
						});
						this.store = mystore;
						pagging = this.dockedItems[0];
						/*this.reconfigure(mystore);
						pagging.bindStore(mystore);*/
						//pagging=this.dockedItems[0];
						pagging.store = this.store;

						this.callParent();

					}
				});