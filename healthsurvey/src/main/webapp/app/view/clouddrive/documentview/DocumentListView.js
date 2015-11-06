Ext.define("Healthsurvey.view.clouddrive.documentview.DocumentListView",{
		extend : 'Ext.panel.Panel',
		requires : [ 'Healthsurvey.view.clouddrive.documentview.DocumentListViewController',
		             'Ext.grid.plugin.RowExpander'
		           ],
		controller : 'documentlistview',
		xtype : 'documentListView',
		itemId : 'documentListView',
		width:'100%',
		//autoScroll : true,
		overflowY: 'auto',
		border : 0,
		items : [{
				xtype:'grid',
				cls : 'cloud-grid',
				itemId : 'docsGridView',
				hideHeaders : true,
				columns : [{
					flex : 1,
					renderer : 'renderTitleColumn'
				}],
				titleTpl : '<div class="cloud-text-wrapper">'
					//+ '<div class="news-icon {file_type}">&nbsp;</div>'
					+ '<div class="news-data">'
					+ '<div class="news-picture"><img src="images/{image}"></div>'
					+ '<div class="news-content">'
					//Add updated by and time later on when added from db in the below div tag by{author} &{last_save date}
					+ '<div class="news-title">{displayText} <span class="news-small"> by  <img style="margin:5px 0px" src="fw/image/star.png"/> <img style="margin:5px 0px" src="fw/image/cal-icon.png"/>  </span></div>'
					+ '<div class="news-small">'
					+ '</div>'
					+ '<div class="dowload-image" >'
					+ '<img src="fw/image/download.png"></div>' + '</div>'
					+ '</div>' + '</div>',
				listeners : {
					click : {
						fn : this.onClick,
						scope : this
					},
					"itemdblclick" : 'itemdblclick',
					"itemcontextmenu" :'itemcontextmenu' 
				},
				//autoHeight:true,
			} ],
			/*dockedItems : {
					xtype : 'toolbar',
					itemId : 'docnavigation',
					margin : '0 0 0 0',
					cls : 'mytoolbar',
					// overlay: true,
					style : 'opacity: .7;',
					//width : 620,
					items : []
			},*/
			listeners:{
				scope:'controller',
				afterrender:'loadData'
			}
	});