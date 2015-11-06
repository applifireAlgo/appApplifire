Ext.define('Healthsurvey.view.querybuildernewmodel.queryentitiesrelation.QueryEntityRelationController', {
	extend : 'Ext.app.ViewController',
	requires:['Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.EntityJoinModel',
	          'Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.Query'],
	alias:'controller.query-entities-relation',
	entRelationPanel:null,
	queryBuilder :null,
	init:function(){
		this.entRelationPanel = this.getView();
		this.entRelationPanel.connections = [];
		this.queryBuilder = this.entRelationPanel.up().up();
		this.queryBuilder.controller.entRelationPanel = this.entRelationPanel;
		
	},
	initEntRelationPanel : function(){
		/**Assign drop zone...*/
		var drop = new Ext.dd.DropZone(this.entRelationPanel.el, {
			ddGroup:'entityDDGroup',
			scope : this,
			getTargetFromEvent: function(event) { 
    		        return this.entRelationPanel;
    		},
			notifyOver : function(src,e,data) {
				
			},
			notifyDrop : function(src,e,data) {
				
				this.scope.queryBuilder.controller.entTreePanel.controller.drawEntitySprite(data.draggedRecord);
			},
			notifyOut : function(src,e,data) { 
			}
		});
		this.entRelationPanel.drop = drop;
	 
	},
	removeJoinConnection : function(connection){
		var surface = this.entRelationPanel.down('draw').getSurface();
		surface.remove(connection.line,true);
		surface.renderFrame();
	}, 
	connection: function(shadowsprite1, shadowsprite2, line, aBBPos,uuid,marker){
		
    var LeftRightCoordinates, line1, line2, miniLine1, miniLine2, path, surface, color = typeof line == "string" ? line : "#0174DF";
 
    
    surface = shadowsprite1.getSurface();
   
    LeftRightCoordinates = this.getLeftRightCoordinates(shadowsprite1, shadowsprite2, aBBPos,uuid);
    
    if (LeftRightCoordinates.leftBoxConnectionPoint.x - LeftRightCoordinates.rightBoxConnectionPoint.x < 0) {
        line1 = 12;
        line2 = 12;
    }
    else {
        line1 = -12;
        line2 = -12;
    }
    // define the path between the left and the right box
    path = ["M", LeftRightCoordinates.leftBoxConnectionPoint.x, LeftRightCoordinates.leftBoxConnectionPoint.y, "H", LeftRightCoordinates.leftBoxConnectionPoint.x + line1, "L", LeftRightCoordinates.rightBoxConnectionPoint.x - line2, LeftRightCoordinates.rightBoxConnectionPoint.y, "H", LeftRightCoordinates.rightBoxConnectionPoint.x];//.join(",");
    //check if it is a new connection or not
    if (typeof(line)=='object' && (line !== undefined) && (line !== null)) {
	
        console.log('From '+shadowsprite1.id+' To '+shadowsprite2.id +'(Existing) ---> '+path);
      //  imgSp.setAttributes({	type:'image',src:'images/where.png',height:50,width:50,x:50,y:50});
       
        line.setAttributes({
    			type:'path',
    			path: path,
    	        stroke:'#0174DF',
    	        'stroke-width': 1,
    	        from: shadowsprite1,
    	        to: shadowsprite2,
    	        aBBPos: aBBPos,
    	        uuid: uuid,
    	        surface:surface
    	    });
       
       // surface.add(marker);
        var centerPoint = line.getBBoxCenter();
        marker.setAttributes({
            type: 'image',
            src:'images/where.png',
            x: centerPoint[0],
            y: centerPoint[1]-20,
            width: 20,
            height: 20
          });
        line.repaint();
        marker.repaint();
        surface.renderSprite(line);
        surface.renderFrame();
        
       // console.log('From '+shadowsprite1.id+' To '+shadowsprite2.id +' path has been changed!');
    }
   else {
       //	console.log('From '+shadowsprite1.id+' To '+shadowsprite2.id +' ---> '+path);
    	uuid = this.createUUID();
    	line = Ext.create('Ext.draw.Sprite');
    	marker = Ext.create('Ext.draw.Sprite');
    	
    	line.setAttributes({
    			type:'path',
    			path: path,
    	        stroke:'#0174DF',
    	        'stroke-width': 1,
    	        from: shadowsprite1,
    	        to: shadowsprite2,
    	        aBBPos: aBBPos,
    	        uuid: uuid,
    	        surface:surface
    	    });
    	//LeftRightCoordinates.rightBoxConnectionPoint.x
    	debugger;
    	
       //  linesprite.attr.path.updateSvgString(path);
    	var centerPoint = line.getBBoxCenter();
    	  marker = surface.add({
              type: 'image',
              src:'images/where.png',
              x: centerPoint[0],
              y: centerPoint[1]-20,
              width: 20,
              height: 20
            });
    	  
    	
     surface.add(marker);
     surface.renderSprite(marker);
     
	 surface.add(line);
	 surface.renderSprite(line);

	 surface.renderFrame();

	}
    return {
	 	line :line,
	 	from: shadowsprite1,
        to: shadowsprite2,
        marker:marker,
        aBBPos: aBBPos,
        uuid: uuid
 };
},

getLeftRightCoordinates: function(shadowsprite1, shadowsprite2, aBBPos){
    var bb1, bb2, p = [], dx, leftBoxConnectionPoint, rightBoxConnectionPoint, dis, columHeight = 21,
    headerHeight = 46, gridHeader=30,LeftRightCoordinates = {};
    
    gridHeader=(this.queryBuilder.controller.queryType==1)?0:30; 
    console.log('Sprtie BBox CONNECT POINTS ::--> ['+aBBPos[0] +','+aBBPos[1]+']');
    
    bb1 = shadowsprite1.getBBox();
    
    bb1.pY = bb1.y + headerHeight + gridHeader+((aBBPos[0]) * columHeight) + (columHeight / 2);// - shadowsprite1.scrollTop;
    
    bb2 = shadowsprite2.getBBox();//shadowsprite2.spriteinfo.BBox;
    
    console.log('Sprtie BBox after MOVE on Connection'+JSON.stringify(bb2));
    bb2.pY = bb2.y + headerHeight + gridHeader+((aBBPos[1]) * columHeight) + (columHeight / 2);// - shadowsprite2.scrollTop;

    if (bb1.pY > (bb1.y + 4) && bb1.pY < (bb1.y + bb1.height - 4)) {
        p.push({
            x: bb1.x - 1, 
            y: bb1.pY
        });
        p.push({
            x: bb1.x + bb1.width + 1,
            y: bb1.pY
        });
    }
    else {
        if (bb1.pY < (bb1.y + 4)) {
            p.push({
                x: bb1.x - 1,
                y: bb1.y + 4
            });
            p.push({
                x: bb1.x + bb1.width + 1, 
                y: bb1.y + 4
            });
        }
        else {
            p.push({
                x: bb1.x - 1, 
                y: bb1.y + bb1.height - 4
            });
            p.push({
                x: bb1.x + bb1.width + 1,
                y: bb1.y + bb1.height - 4
            });
        };
                };
    
    if (bb2.pY > (bb2.y + 4) && bb2.pY < (bb2.y + bb2.height - 4)) {
        p.push({
            x: bb2.x - 1,
            y: bb2.pY
        });
        p.push({
            x: bb2.x + bb2.width + 1, 
            y: bb2.pY
        });
    }
    else {
        if (bb2.pY < (bb2.y + 4)) {
            p.push({
                x: bb2.x - 1, 
                y: bb2.y + 4
            });
            p.push({
                x: bb2.x + bb2.width + 1, 
                y: bb2.y + 4
            });
        }
        else {
            p.push({
                x: bb2.x - 1, 
                y: bb2.y + bb2.height - 4
            });
            
            p.push({
                x: bb2.x + bb2.width + 1, 
                y: bb2.y + bb2.height - 4
            });
        }
    };
    
    for (var i = 0; i < 2; i++) {
        for (var j = 2; j < 4; j++) {
        	
            dx = Math.abs(p[i].x - p[j].x), dy = Math.abs(p[i].y - p[j].y);
            if (((i == 0 && j == 3) && dx < Math.abs(p[1].x - p[2].x)) || ((i == 1 && j == 2) && dx < Math.abs(p[0].x - p[3].x))) {
                leftBoxConnectionPoint = p[i];
                rightBoxConnectionPoint = p[j];
            }
        }
    };
    
    return {
        leftBoxConnectionPoint: leftBoxConnectionPoint,
        rightBoxConnectionPoint: rightBoxConnectionPoint
    };
    
},
createUUID: function(){
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    
    var uuid = s.join("");
    return uuid;
},
});