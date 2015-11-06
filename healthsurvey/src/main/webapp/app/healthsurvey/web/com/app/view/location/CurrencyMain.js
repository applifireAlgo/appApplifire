Ext.define('Healthsurvey.healthsurvey.web.com.app.view.location.CurrencyMain', {
     "extend": "Ext.tab.Panel",
     "customWidgetType": "vdTabLayout",
     "autoScroll": false,
     "controller": "CurrencyMainController",
     "restURL": "/Currency",
     "defaults": {
          "split": true
     },
     "requires": ["Healthsurvey.healthsurvey.shared.com.app.model.location.CurrencyModel", "Healthsurvey.healthsurvey.web.com.app.controller.location.CurrencyMainController", "Healthsurvey.healthsurvey.shared.com.app.model.location.CountryModel", "Healthsurvey.healthsurvey.shared.com.app.viewmodel.location.CurrencyViewModel", "Ext.form.field.CustomDateField"],
     "communicationLog": [],
     "tabPosition": "bottom",
     "items": [{
          "title": "Data Browser",
          "layout": "border",
          "defaults": {
               "split": true
          },
          "autoScroll": false,
          "customWidgetType": "vdBorderLayout",
          "items": [{
               "xtype": "tabpanel",
               "customWidgetType": "vdTabLayout",
               "margin": "5 0 5 5",
               "border": 1,
               "style": {
                    "borderColor": "#f6f6f6",
                    "borderStyle": "solid",
                    "borderWidth": "1px"
               },
               "displayName": "Currency",
               "name": "CurrencyTreeContainer",
               "itemId": "CurrencyTreeContainer",
               "restURL": "/Currency",
               "autoScroll": false,
               "collapsible": true,
               "titleCollapse": true,
               "collapseMode": "header",
               "collapsed": false,
               "items": [{
                    "xtype": "treepanel",
                    "customWidgetType": "vdTree",
                    "title": "Browse",
                    "useArrows": true,
                    "rootVisible": false,
                    "itemId": "CurrencyTree",
                    "listeners": {
                         "select": "treeClick"
                    },
                    "tbar": [{
                         "xtype": "triggerfield",
                         "customWidgetType": "vdTriggerField",
                         "emptyText": "Search",
                         "triggerCls": "",
                         "listeners": {
                              "change": "onTriggerfieldChange",
                              "buffer": 250
                         }
                    }, "->", {
                         "xtype": "tool",
                         "type": "refresh",
                         "tooltip": "Refresh Tree Data",
                         "handler": "onTreeRefreshClick"
                    }]
               }, {
                    "title": "Advance Search",
                    "xtype": "form",
                    "customWidgetType": "vdFormpanel",
                    "itemId": "queryPanel",
                    "dockedItems": [{
                         "xtype ": "toolbar",
                         "customWidgetType": "vdBBar",
                         "dock": "bottom",
                         "isDockedItem": true,
                         "items": [{
                              "xtype": "tbfill",
                              "customWidgetType": "vdTbFill"
                         }, {
                              "xtype": "button",
                              "customWidgetType": "vdButton",
                              "text": "Filter",
                              "handler": "onFilterClick"
                         }]
                    }],
                    "items": [{
                         "name": "currencyId",
                         "itemId": "currencyId",
                         "xtype": "textfield",
                         "customWidgetType": "vdTextfield",
                         "displayName": "Currency Code",
                         "margin": "5 5 5 5",
                         "fieldLabel": "Currency Code",
                         "fieldId": "F54DE664-AEDC-4B9F-BBCC-54656B2D7927",
                         "minLength": "0",
                         "maxLength": "64",
                         "hidden": true,
                         "value": ""
                    }, {
                         "name": "countryId",
                         "itemId": "countryId",
                         "xtype": "combo",
                         "customWidgetType": "vdCombo",
                         "displayName": "Country Code",
                         "margin": "5 5 5 5",
                         "fieldLabel": "Country Code",
                         "fieldId": "F88E3128-0F8D-4750-ABAA-C8E641BF2B46",
                         "restURL": "Country",
                         "displayField": "primaryDisplay",
                         "valueField": "primaryKey",
                         "typeAhead": true,
                         "queryMode": "local",
                         "minChars": 2,
                         "store": {
                              "data": [],
                              "model": "Healthsurvey.healthsurvey.shared.com.app.model.location.CountryModel"
                         }
                    }]
               }],
               "region": "west",
               "width": "20%"
          }, {
               "region": "center",
               "layout": "border",
               "defaults": {
                    "split": true
               },
               "customWidgetType": "vdBorderLayout",
               "items": [{
                    "customWidgetType": "vdFormpanel",
                    "viewModel": "CurrencyViewModel",
                    "xtype": "form",
                    "displayName": "Currency",
                    "title": "Currency",
                    "name": "Currency",
                    "itemId": "Currency",
                    "bodyPadding": 10,
                    "items": [{
                         "name": "countryId",
                         "itemId": "countryId",
                         "xtype": "combo",
                         "customWidgetType": "vdCombo",
                         "displayName": "Country Code",
                         "margin": "5 5 5 5",
                         "fieldLabel": "Country Code<font color='red'> *<\/font>",
                         "allowBlank": false,
                         "fieldId": "F88E3128-0F8D-4750-ABAA-C8E641BF2B46",
                         "restURL": "Country",
                         "displayField": "primaryDisplay",
                         "valueField": "primaryKey",
                         "typeAhead": true,
                         "queryMode": "local",
                         "minChars": 2,
                         "store": {
                              "data": [],
                              "model": "Healthsurvey.healthsurvey.shared.com.app.model.location.CountryModel"
                         },
                         "forceSelection": true,
                         "bind": "{countryId}",
                         "columnWidth": 0.5
                    }, {
                         "name": "currencyCode",
                         "itemId": "currencyCode",
                         "xtype": "textfield",
                         "customWidgetType": "vdTextfield",
                         "displayName": "Currency",
                         "margin": "5 5 5 5",
                         "fieldLabel": "Currency",
                         "fieldId": "F910B059-5B54-4A1C-99FC-3ABA229A225A",
                         "minLength": "0",
                         "maxLength": "128",
                         "bind": "{currencyCode}",
                         "columnWidth": 0.5
                    }, {
                         "name": "unicodeDecimal",
                         "itemId": "unicodeDecimal",
                         "xtype": "textfield",
                         "customWidgetType": "vdTextfield",
                         "displayName": "Unicode Descimal",
                         "margin": "5 5 5 5",
                         "fieldLabel": "Unicode Descimal",
                         "fieldId": "C399D968-0B36-483F-98E2-30C0DAB6E9BE",
                         "minLength": "0",
                         "maxLength": "128",
                         "bind": "{unicodeDecimal}",
                         "columnWidth": 0.5
                    }, {
                         "name": "unicodeHex",
                         "itemId": "unicodeHex",
                         "xtype": "textfield",
                         "customWidgetType": "vdTextfield",
                         "displayName": "unicode Hex",
                         "margin": "5 5 5 5",
                         "fieldLabel": "unicode Hex",
                         "fieldId": "08F17E2E-C498-4FEA-A18E-A2B83EE68A64",
                         "minLength": "0",
                         "maxLength": "128",
                         "bind": "{unicodeHex}",
                         "columnWidth": 0.5
                    }],
                    "layout": "column",
                    "defaults": {
                         "columnWidth": 0.5,
                         "labelAlign": "left",
                         "labelWidth": 200
                    },
                    "autoScroll": true,
                    "dockedItems": [{
                         "xtype ": "toolbar",
                         "customWidgetType": "vdBBar",
                         "dock": "bottom",
                         "ui": "footer",
                         "isDockedItem": true,
                         "parentId": 1,
                         "customId": 853,
                         "items": [{
                              "xtype": "tbfill",
                              "customWidgetType": "vdTbFill",
                              "parentId": 853,
                              "customId": 407
                         }, {
                              "customWidgetType": "vdButton",
                              "xtype": "button",
                              "margin": "0 5 0 5",
                              "text": "Save",
                              "hiddenName": "button",
                              "canHaveParent": false,
                              "itemId": "saveFormButton",
                              "parentId": 853,
                              "customId": 408,
                              "listeners": {
                                   "click": "saveForm"
                              }
                         }, {
                              "customWidgetType": "vdButton",
                              "xtype": "button",
                              "margin": "0 5 0 5",
                              "text": "Reset",
                              "hiddenName": "button",
                              "canHaveParent": false,
                              "itemId": "resetFormButton",
                              "parentId": 853,
                              "customId": 409,
                              "listeners": {
                                   "click": "resetForm"
                              }
                         }],
                         "defaults": {}
                    }],
                    "listeners": {
                         "scope": "controller"
                    },
                    "tools": [{
                         "type": "help",
                         "tooltip": "Console",
                         "handler": "onConsoleClick"
                    }],
                    "extend": "Ext.form.Panel",
                    "region": "center"
               }, {
                    "xtype": "gridpanel",
                    "customWidgetType": "vdGrid",
                    "displayName": "Currency",
                    "title": "Details Grid",
                    "name": "CurrencyGrid",
                    "itemId": "CurrencyGrid",
                    "restURL": "/Currency",
                    "store": [],
                    "bodyPadding": 10,
                    "columns": [{
                         "header": "Currency Code",
                         "dataIndex": "currencyId",
                         "hidden": true,
                         "flex": 1
                    }, {
                         "header": "primaryDisplay",
                         "dataIndex": "primaryDisplay",
                         "hidden": true
                    }, {
                         "header": "primaryKey",
                         "dataIndex": "primaryKey",
                         "hidden": true
                    }, {
                         "header": "Country Code",
                         "dataIndex": "countryId",
                         "renderer": "renderFormValue",
                         "flex": 1
                    }, {
                         "header": "Currency",
                         "dataIndex": "currencyCode",
                         "flex": 1
                    }, {
                         "header": "Unicode Descimal",
                         "dataIndex": "unicodeDecimal",
                         "flex": 1
                    }, {
                         "header": "unicode Hex",
                         "dataIndex": "unicodeHex",
                         "flex": 1
                    }, {
                         "header": "createdBy",
                         "dataIndex": "createdBy",
                         "hidden": true,
                         "flex": 1
                    }, {
                         "header": "createdDate",
                         "dataIndex": "createdDate",
                         "hidden": true,
                         "flex": 1
                    }, {
                         "header": "updatedBy",
                         "dataIndex": "updatedBy",
                         "hidden": true,
                         "flex": 1
                    }, {
                         "header": "updatedDate",
                         "dataIndex": "updatedDate",
                         "hidden": true,
                         "flex": 1
                    }, {
                         "header": "versionId",
                         "dataIndex": "versionId",
                         "hidden": true,
                         "flex": 1
                    }, {
                         "header": "activeStatus",
                         "dataIndex": "activeStatus",
                         "hidden": true,
                         "flex": 1
                    }, {
                         "header": "txnAccessCode",
                         "dataIndex": "txnAccessCode",
                         "hidden": true,
                         "flex": 1
                    }, {
                         "xtype": "actioncolumn",
                         "customWidgetType": "vdActionColumn",
                         "width": 30,
                         "sortable": false,
                         "menuDisable": true,
                         "items": [{
                              "icon": "images/delete.gif",
                              "tooltip": "Delete Record",
                              "handler": "onDeleteActionColumnClickMainGrid"
                         }]
                    }],
                    "listeners": {
                         "itemclick": "onGridItemClick"
                    },
                    "tools": [{
                         "type": "refresh",
                         "tooltip": "Refresh Grid Data",
                         "handler": "onGridRefreshClick"
                    }],
                    "collapsible": true,
                    "titleCollapse": true,
                    "collapseMode": "header",
                    "region": "south",
                    "height": "40%"
               }]
          }]
     }, {
          "title": "Add New",
          "itemId": "addNewForm",
          "layout": "border",
          "customWidgetType": "vdBorderLayout",
          "autoScroll": false,
          "items": [{
               "customWidgetType": "vdFormpanel",
               "viewModel": "CurrencyViewModel",
               "xtype": "form",
               "displayName": "Currency",
               "title": "Currency",
               "name": "Currency",
               "itemId": "Currency",
               "bodyPadding": 10,
               "items": [{
                    "name": "countryId",
                    "itemId": "countryId",
                    "xtype": "combo",
                    "customWidgetType": "vdCombo",
                    "displayName": "Country Code",
                    "margin": "5 5 5 5",
                    "fieldLabel": "Country Code<font color='red'> *<\/font>",
                    "allowBlank": false,
                    "fieldId": "F88E3128-0F8D-4750-ABAA-C8E641BF2B46",
                    "restURL": "Country",
                    "displayField": "primaryDisplay",
                    "valueField": "primaryKey",
                    "typeAhead": true,
                    "queryMode": "local",
                    "minChars": 2,
                    "store": {
                         "data": [],
                         "model": "Healthsurvey.healthsurvey.shared.com.app.model.location.CountryModel"
                    },
                    "forceSelection": true,
                    "bind": "{countryId}",
                    "columnWidth": 0.5
               }, {
                    "name": "currencyCode",
                    "itemId": "currencyCode",
                    "xtype": "textfield",
                    "customWidgetType": "vdTextfield",
                    "displayName": "Currency",
                    "margin": "5 5 5 5",
                    "fieldLabel": "Currency",
                    "fieldId": "F910B059-5B54-4A1C-99FC-3ABA229A225A",
                    "minLength": "0",
                    "maxLength": "128",
                    "bind": "{currencyCode}",
                    "columnWidth": 0.5
               }, {
                    "name": "unicodeDecimal",
                    "itemId": "unicodeDecimal",
                    "xtype": "textfield",
                    "customWidgetType": "vdTextfield",
                    "displayName": "Unicode Descimal",
                    "margin": "5 5 5 5",
                    "fieldLabel": "Unicode Descimal",
                    "fieldId": "C399D968-0B36-483F-98E2-30C0DAB6E9BE",
                    "minLength": "0",
                    "maxLength": "128",
                    "bind": "{unicodeDecimal}",
                    "columnWidth": 0.5
               }, {
                    "name": "unicodeHex",
                    "itemId": "unicodeHex",
                    "xtype": "textfield",
                    "customWidgetType": "vdTextfield",
                    "displayName": "unicode Hex",
                    "margin": "5 5 5 5",
                    "fieldLabel": "unicode Hex",
                    "fieldId": "08F17E2E-C498-4FEA-A18E-A2B83EE68A64",
                    "minLength": "0",
                    "maxLength": "128",
                    "bind": "{unicodeHex}",
                    "columnWidth": 0.5
               }],
               "layout": "column",
               "defaults": {
                    "columnWidth": 0.5,
                    "labelAlign": "left",
                    "labelWidth": 200
               },
               "autoScroll": true,
               "dockedItems": [{
                    "xtype ": "toolbar",
                    "customWidgetType": "vdBBar",
                    "dock": "bottom",
                    "ui": "footer",
                    "isDockedItem": true,
                    "parentId": 1,
                    "customId": 853,
                    "items": [{
                         "xtype": "tbfill",
                         "customWidgetType": "vdTbFill",
                         "parentId": 853,
                         "customId": 407
                    }, {
                         "customWidgetType": "vdButton",
                         "xtype": "button",
                         "margin": "0 5 0 5",
                         "text": "Save",
                         "hiddenName": "button",
                         "canHaveParent": false,
                         "itemId": "saveFormButton",
                         "parentId": 853,
                         "customId": 408,
                         "listeners": {
                              "click": "saveForm"
                         }
                    }, {
                         "customWidgetType": "vdButton",
                         "xtype": "button",
                         "margin": "0 5 0 5",
                         "text": "Reset",
                         "hiddenName": "button",
                         "canHaveParent": false,
                         "itemId": "resetFormButton",
                         "parentId": 853,
                         "customId": 409,
                         "listeners": {
                              "click": "resetForm"
                         }
                    }],
                    "defaults": {}
               }],
               "listeners": {
                    "scope": "controller"
               },
               "tools": [{
                    "type": "help",
                    "tooltip": "Console",
                    "handler": "onConsoleClick"
               }],
               "extend": "Ext.form.Panel",
               "region": "center"
          }]
     }]
});