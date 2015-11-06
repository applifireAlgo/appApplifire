
/********************************************************************************************************

 * File Name:-ListViewBaseView.js

 * Date Created:-29-Sept-2015

 * Author:- Shrikrishna

 * Purpose :-

 
 *********************************************************************************************************
 Version   |	Date Modified    |  	Author 	   |	Modifications	

 * 1.0			29-Sept-2015 			 Shrikrishna			
								
 *********************************************************************************************************/


Ext.define('Healthsurvey.view.fw.component.ListViewBaseView', {
     extend : 'Ext.form.Panel',
     requires : ["Healthsurvey.view.fw.frameworkController.ListViewBaseController"],
     controller : "ListViewBaseController",
     isListPanel : true,
     autoScroll: true,
     xtype : 'listViewBaseView',
     tools: [{
         type: "left",
         itemId: "firstBut",
         handler: "onPaginationClick",
         tooltip:'First',
         isFirst : true
    }, {
         type: "prev",
         itemId: "prevBut",
         tooltip:'Previous',
         handler: "onPaginationClick",
         isPrev : true
    }, {
         type: "next",
         itemId: "nextBut",
         tooltip:'Next',
         handler: "onPaginationClick",
         isNext : true
    }, {
         type: "right",
         itemId: "lastBut",
         tooltip:'Last',
         handler: "onPaginationClick",
         isLast : true
    }]
});