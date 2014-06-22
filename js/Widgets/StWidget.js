// @author  Ivan Reinaldo
// Defines a BST object; keeps implementation of BST internally and interact with GraphWidget to display BST visualizations
// Also includes AVL tree

var ST = function(){
  var self = this;
  var graphWidget = new GraphWidget();

  var maxValueAllowed = 100; // Range of valid values of BST vertexes allowed
  var maxVertexAllowed = 16;

  var initialArray = [15, 6, 23, 4, 8, 19, 7, 9, 3, 71];

  /*
   * internalSt: Internal representation of BST in this object
   * The keys are the text of the nodes, and the value is the attributes of the corresponding node encapsulated in a JS object, which are:
   * - "parent": text of the parent node. If the node is root node, the value is null.
   * - "leftChild": text of the left child. No child -> null
   * - "rightChild": text of the right child. No child -> null
   * - "cx": X-coordinate of center of the node
   * - "cy": Y-coordinate of center of the node
   * - "height": height of the node. Height of root is 0
   * - "vertexClassNumber": Vertex class number of the corresponding node
   *
   * In addition, there is a key called "root" in internalSt, containing the text of the root node.
   * If BST is empty, root is null.
   */

  var internalSt = {};
  var amountVertex = 0;
  var vertexAmt=0;
  this.getGraphWidget = function(){
    return graphWidget;
  }

  this.generateRandom = function(){
    vertexAmt = Math.floor((Math.random()*(maxVertexAllowed-5) + 5));
	create_empty_tree(vertexAmt);
    var initArr = [];

    while(initArr.length < vertexAmt){
      var random = Math.floor(1+Math.random()*(maxValueAllowed-1));
      if($.inArray(random, initArr) < 0) initArr.push(random);
    }

    var stateList = [];
    var vertexTraversed = {};
    var edgeTraversed = {};
    var currentState = createState(internalSt);

    currentState["status"] = "Init with empty value tree";
    currentState["lineNo"] = 0;
    stateList.push(currentState);

    function build(root, L, R) {
      vertexTraversed[root] = true;
      if (L == R) {
        internalSt[root]["value"] = initArr[L];
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "Set this to a[" + L + "] = " + initArr[L];
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
      } else {
        vertexTraversed[root*2] = true;
        edgeTraversed[root*2] = true;
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["el"][root*2]["animateHighlighted"] = true;
        currentState["el"][root*2]["state"] = EDGE_TRAVERSED;
        currentState["lineNo"] = 3;
        currentState["status"] = "Build left tree";
        stateList.push(currentState);
        build(root*2, L, Math.floor((L+R)/2));
        delete vertexTraversed[root*2];
        delete edgeTraversed[root*2];
        vertexTraversed[root*2+1] = true;
        edgeTraversed[root*2+1] = true;
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["el"][root*2+1]["animateHighlighted"] = true;
        currentState["el"][root*2+1]["state"] = EDGE_TRAVERSED;
        currentState["lineNo"] = 4;
        currentState["status"] = "Build right tree";
        stateList.push(currentState);
        build(root*2+1, Math.floor((L+R)/2)+1, R);
        delete vertexTraversed[root*2+1];
        delete edgeTraversed[root*2+1];
        internalSt[root]["value"] = Math.min(internalSt[root*2]["value"], internalSt[root*2+1]["value"]);
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 5;
        currentState["status"] = "Set this to min(" + internalSt[root*2]["value"] + ", " + internalSt[root*2+1]["value"] + ") = " + internalSt[root]["value"];
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
      }
      delete vertexTraversed[root];
    }
    build(1, 0, vertexAmt-1);
    currentState = createState(internalSt);
    currentState["status"] = "Finish";
    stateList.push(currentState);
    graphWidget.startAnimation(stateList);
    populatePseudocode(0);
    return true;
  }




  this.generateMin = function(nodes){
	console.log(nodes);
    vertexAmt = nodes.length;
	console.log(vertexAmt);
	create_empty_tree(vertexAmt);
    var initArr = [];
	var count=0;
    while(initArr.length < vertexAmt){
      var new_element = nodes[count];
      initArr.push(new_element);
	  count++;
    }

    var stateList = [];
    var vertexTraversed = {};
    var edgeTraversed = {};
    var currentState = createState(internalSt);

    currentState["status"] = "Init with empty value tree";
    currentState["lineNo"] = 0;
    stateList.push(currentState);

    function build(root, L, R) {
      vertexTraversed[root] = true;
      if (L == R) {
        internalSt[root]["value"] = initArr[L];
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "Set this to a[" + L + "] = " + initArr[L];
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
      } else {
        vertexTraversed[root*2] = true;
        edgeTraversed[root*2] = true;
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["el"][root*2]["animateHighlighted"] = true;
        currentState["el"][root*2]["state"] = EDGE_TRAVERSED;
        currentState["lineNo"] = 3;
        currentState["status"] = "Build left tree";
        stateList.push(currentState);
        build(root*2, L, Math.floor((L+R)/2));
        delete vertexTraversed[root*2];
        delete edgeTraversed[root*2];
        vertexTraversed[root*2+1] = true;
        edgeTraversed[root*2+1] = true;
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["el"][root*2+1]["animateHighlighted"] = true;
        currentState["el"][root*2+1]["state"] = EDGE_TRAVERSED;
        currentState["lineNo"] = 4;
        currentState["status"] = "Build right tree";
        stateList.push(currentState);
        build(root*2+1, Math.floor((L+R)/2)+1, R);
        delete vertexTraversed[root*2+1];
        delete edgeTraversed[root*2+1];
        internalSt[root]["value"] = Math.min(internalSt[root*2]["value"], internalSt[root*2+1]["value"]);
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 5;
        currentState["status"] = "Set this to min(" + internalSt[root*2]["value"] + ", " + internalSt[root*2+1]["value"] + ") = " + internalSt[root]["value"];
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
      }
      delete vertexTraversed[root];
    }
    build(1, 0, vertexAmt-1);
    currentState = createState(internalSt);
    currentState["status"] = "Finish";
    stateList.push(currentState);
    graphWidget.startAnimation(stateList);
    populatePseudocode(0);
    return true;
  }




  this.generateMax = function(nodes){
    vertexAmt = nodes.length;
	create_empty_tree(vertexAmt);
    var initArr = [];
	var count=0;
    while(initArr.length < vertexAmt){
      var new_element = nodes[count];
      initArr.push(new_element);
	  count++;
    }

    var stateList = [];
    var vertexTraversed = {};
    var edgeTraversed = {};
    var currentState = createState(internalSt);

    currentState["status"] = "Init with empty value tree";
    currentState["lineNo"] = 0;
    stateList.push(currentState);

    function build(root, L, R) {
      vertexTraversed[root] = true;
      if (L == R) {
        internalSt[root]["value"] = initArr[L];
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "Set this to a[" + L + "] = " + initArr[L];
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
      } else {
        vertexTraversed[root*2] = true;
        edgeTraversed[root*2] = true;
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["el"][root*2]["animateHighlighted"] = true;
        currentState["el"][root*2]["state"] = EDGE_TRAVERSED;
        currentState["lineNo"] = 3;
        currentState["status"] = "Build left tree";
        stateList.push(currentState);
        build(root*2, L, Math.floor((L+R)/2));
        delete vertexTraversed[root*2];
        delete edgeTraversed[root*2];
        vertexTraversed[root*2+1] = true;
        edgeTraversed[root*2+1] = true;
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["el"][root*2+1]["animateHighlighted"] = true;
        currentState["el"][root*2+1]["state"] = EDGE_TRAVERSED;
        currentState["lineNo"] = 4;
        currentState["status"] = "Build right tree";
        stateList.push(currentState);
        build(root*2+1, Math.floor((L+R)/2)+1, R);
        delete vertexTraversed[root*2+1];
        delete edgeTraversed[root*2+1];
        internalSt[root]["value"] = Math.max(internalSt[root*2]["value"], internalSt[root*2+1]["value"]);
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 5;
        currentState["status"] = "Set this to max(" + internalSt[root*2]["value"] + ", " + internalSt[root*2+1]["value"] + ") = " + internalSt[root]["value"];
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
      }
      delete vertexTraversed[root];
    }
    build(1, 0, vertexAmt-1);
    currentState = createState(internalSt);
    currentState["status"] = "Finish";
    stateList.push(currentState);
    graphWidget.startAnimation(stateList);
    populatePseudocode(0);
    return true;
  }


  this.generateSum = function(nodes){
    vertexAmt = nodes.length;
	create_empty_tree(vertexAmt);
    var initArr = [];
	var count=0;
    while(initArr.length < vertexAmt){
      var new_element = nodes[count];
      initArr.push(new_element);
	  count++;
    }

    var stateList = [];
    var vertexTraversed = {};
    var edgeTraversed = {};
    var currentState = createState(internalSt);

    currentState["status"] = "Init with empty value tree";
    currentState["lineNo"] = 0;
    stateList.push(currentState);

    function build(root, L, R) {
      vertexTraversed[root] = true;
      if (L == R) {
        internalSt[root]["value"] = initArr[L];
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "Set this to a[" + L + "] = " + initArr[L];
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
      } else {
        vertexTraversed[root*2] = true;
        edgeTraversed[root*2] = true;
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["el"][root*2]["animateHighlighted"] = true;
        currentState["el"][root*2]["state"] = EDGE_TRAVERSED;
        currentState["lineNo"] = 3;
        currentState["status"] = "Build left tree";
        stateList.push(currentState);
        build(root*2, L, Math.floor((L+R)/2));
        delete vertexTraversed[root*2];
        delete edgeTraversed[root*2];
        vertexTraversed[root*2+1] = true;
        edgeTraversed[root*2+1] = true;
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["el"][root*2+1]["animateHighlighted"] = true;
        currentState["el"][root*2+1]["state"] = EDGE_TRAVERSED;
        currentState["lineNo"] = 4;
        currentState["status"] = "Build right tree";
        stateList.push(currentState);
        build(root*2+1, Math.floor((L+R)/2)+1, R);
        delete vertexTraversed[root*2+1];
        delete edgeTraversed[root*2+1];
        internalSt[root]["value"] = (internalSt[root*2]["value"]+internalSt[root*2+1]["value"]);
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 5;
        currentState["status"] = "Set this to sum(" + internalSt[root*2]["value"] + ", " + internalSt[root*2+1]["value"] + ") = " + internalSt[root]["value"];
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
      }
      delete vertexTraversed[root];
    }
    build(1, 0, vertexAmt-1);
    currentState = createState(internalSt);
    currentState["status"] = "Finish";
    stateList.push(currentState);
    graphWidget.startAnimation(stateList);
    populatePseudocode(0);
    return true;
  }


  this.rmqMin = function (L, R) {
  	var current_min=999;
	function min(a,b){
		if (a<b) return a;else return b;
	}
	var stateList = [];
    var vertexTraversed = {};
    var edgeTraversed = {};
    var currentState = createState(internalSt);

    currentState["status"] = "Look for the smallest element between L-R";
    currentState["lineNo"] = 0;
    stateList.push(currentState);
    function rmq_min(root, x,y,L, R) {
	  if (internalSt[root]["lazy"]==true){
		var middle=(Math.floor((x+y)/2));
	  	currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "This vertex would be lazely updated";
        currentState["vl"][2*root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
		internalSt[2*root]["value"]=internalSt[root]["value"];
		if (x<middle){
			internalSt[2*root]["lazy"]=true;
		}
		currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "This vertex would be lazely updated";
        currentState["vl"][2*root+1]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
		internalSt[2*root+1]["value"]=internalSt[root]["value"];
		if (middle+1<y){
			internalSt[2*root+1]["lazy"]=true;
		}
		internalSt[root]["lazy"]=false;
	  }


      vertexTraversed[root] = true;
      if ((x>=L) && (y<=R)) {
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "This Area would be considered";
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
	    if (current_min>internalSt[root]["value"]){
			current_min=internalSt[root]["value"];
		}     	
      } else {
		var middle=(Math.floor((x+y)/2));
		if (L<=middle){
 	        vertexTraversed[root*2] = true;
        	edgeTraversed[root*2] = true;
        	currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        	currentState["el"][root*2]["animateHighlighted"] = true;
        	currentState["el"][root*2]["state"] = EDGE_TRAVERSED;
        	currentState["lineNo"] = 3;
        	currentState["status"] = "Look for the minimum element on the left side";
        	stateList.push(currentState);
        	rmq_min(root*2, x, Math.floor((x+y)/2),L,R);
        	delete vertexTraversed[root*2];
        	delete edgeTraversed[root*2];		
		}
		if (R>=middle+1){
        	vertexTraversed[root*2+1] = true;
        	edgeTraversed[root*2+1] = true;
        	currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        	currentState["el"][root*2+1]["animateHighlighted"] = true;
        	currentState["el"][root*2+1]["state"] = EDGE_TRAVERSED;
        	currentState["lineNo"] = 4;
        	currentState["status"] = "Look for the minimum element on the right side";
        	stateList.push(currentState);
        	rmq_min(root*2+1, Math.floor((x+y)/2)+1, y,L,R);
        	delete vertexTraversed[root*2+1];
        	delete edgeTraversed[root*2+1];
		}
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 5;
        currentState["status"] = "Finish the serach in this interval";
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
      }
      delete vertexTraversed[root];
    }
    rmq_min(1, 0, vertexAmt-1,L,R);
    currentState = createState(internalSt);
    currentState["status"] = "Finish";
    stateList.push(currentState);
    graphWidget.startAnimation(stateList);
    populatePseudocode(1);
	alert(current_min);
    return true;	
  }

  this.rmqMax = function (L, R) {
  	var current_max=-999;
	function max(a,b){
		if (a>b) return a;else return b;
	}
	var stateList = [];
    var vertexTraversed = {};
    var edgeTraversed = {};
    var currentState = createState(internalSt);

    currentState["status"] = "Look for the smallest element between L-R";
    currentState["lineNo"] = 0;
    stateList.push(currentState);
    function rmq_max(root, x,y,L, R) {
	  if (internalSt[root]["lazy"]==true){
		var middle=(Math.floor((x+y)/2));
	  	currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "This vertex would be lazely updated";
        currentState["vl"][2*root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
		internalSt[2*root]["value"]=internalSt[root]["value"];
		if (x<middle){
			internalSt[2*root]["lazy"]=true;
		}
		currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "This vertex would be lazely updated";
        currentState["vl"][2*root+1]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
		internalSt[2*root+1]["value"]=internalSt[root]["value"];
		if (middle+1<y){
			internalSt[2*root+1]["lazy"]=true;
		}
		internalSt[root]["lazy"]=false;
	  }


      vertexTraversed[root] = true;
      if ((x>=L) && (y<=R)) {
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "This Area would be considered";
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
	    if (current_max<internalSt[root]["value"]){
			current_max=internalSt[root]["value"];
		}     	
      } else {
		var middle=(Math.floor((x+y)/2));
		if (L<=middle){
 	        vertexTraversed[root*2] = true;
        	edgeTraversed[root*2] = true;
        	currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        	currentState["el"][root*2]["animateHighlighted"] = true;
        	currentState["el"][root*2]["state"] = EDGE_TRAVERSED;
        	currentState["lineNo"] = 3;
        	currentState["status"] = "Look for the maximum element on the left side";
        	stateList.push(currentState);
        	rmq_max(root*2, x, Math.floor((x+y)/2),L,R);
        	delete vertexTraversed[root*2];
        	delete edgeTraversed[root*2];		
		}
		if (R>=middle+1){
        	vertexTraversed[root*2+1] = true;
        	edgeTraversed[root*2+1] = true;
        	currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        	currentState["el"][root*2+1]["animateHighlighted"] = true;
        	currentState["el"][root*2+1]["state"] = EDGE_TRAVERSED;
        	currentState["lineNo"] = 4;
        	currentState["status"] = "Look for the maximum element on the right side";
        	stateList.push(currentState);
        	rmq_max(root*2+1, Math.floor((x+y)/2)+1, y,L,R);
        	delete vertexTraversed[root*2+1];
        	delete edgeTraversed[root*2+1];
		}
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 5;
        currentState["status"] = "Finish the serach in this interval";
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
      }
      delete vertexTraversed[root];
    }
    rmq_max(1, 0, vertexAmt-1,L,R);
    currentState = createState(internalSt);
    currentState["status"] = "Finish";
    stateList.push(currentState);
    graphWidget.startAnimation(stateList);
    populatePseudocode(1);
	alert(current_max);
    return true;	
  }


  this.rmqSum = function (L, R) {
  	var current_sum=0;
	var stateList = [];
    var vertexTraversed = {};
    var edgeTraversed = {};
    var currentState = createState(internalSt);

    currentState["status"] = "Look for the smallest element between L-R";
    currentState["lineNo"] = 0;
    stateList.push(currentState);
    function rmq_sum(root, x,y,L, R) {
	  if (internalSt[root]["lazy"]==true){
		var middle=(Math.floor((x+y)/2));
	  	currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "This vertex would be lazely updated";
        currentState["vl"][2*root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
		internalSt[2*root]["value"]=internalSt[root]["value"]/(y-x+1)*(middle-x+1);
		if (x<middle){
			internalSt[2*root]["lazy"]=true;
		}
		currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "This vertex would be lazely updated";
        currentState["vl"][2*root+1]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
		internalSt[2*root+1]["value"]=internalSt[root]["value"]/(y-x+1)*(y-middle);
		if (middle+1<y){
			internalSt[2*root+1]["lazy"]=true;
		}
		internalSt[root]["lazy"]=false;
	  }



      vertexTraversed[root] = true;
      if ((x>=L) && (y<=R)) {
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "This Area would be considered";
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
		current_sum+=internalSt[root]["value"];
      } else {
		var middle=(Math.floor((x+y)/2));
		if (L<=middle){
 	        vertexTraversed[root*2] = true;
        	edgeTraversed[root*2] = true;
        	currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        	currentState["el"][root*2]["animateHighlighted"] = true;
        	currentState["el"][root*2]["state"] = EDGE_TRAVERSED;
        	currentState["lineNo"] = 3;
        	currentState["status"] = "Look for the maximum element on the left side";
        	stateList.push(currentState);
        	rmq_sum(root*2, x, Math.floor((x+y)/2),L,R);
        	delete vertexTraversed[root*2];
        	delete edgeTraversed[root*2];		
		}
		if (R>=middle+1){
        	vertexTraversed[root*2+1] = true;
        	edgeTraversed[root*2+1] = true;
        	currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        	currentState["el"][root*2+1]["animateHighlighted"] = true;
        	currentState["el"][root*2+1]["state"] = EDGE_TRAVERSED;
        	currentState["lineNo"] = 4;
        	currentState["status"] = "Look for the maximum element on the right side";
        	stateList.push(currentState);
        	rmq_sum(root*2+1, Math.floor((x+y)/2)+1, y,L,R);
        	delete vertexTraversed[root*2+1];
        	delete edgeTraversed[root*2+1];
		}
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 5;
        currentState["status"] = "Finish the serach in this interval";
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
      }
      delete vertexTraversed[root];
    }
    rmq_sum(1, 0, vertexAmt-1,L,R);
    currentState = createState(internalSt);
    currentState["status"] = "Finish";
    stateList.push(currentState);
    graphWidget.startAnimation(stateList);
    populatePseudocode(1);
	alert(current_sum);
    return true;	
  }


  this.updateMin = function (L, R,value) {
	
  	var current_min=999;
	function min(a,b){
		if (a<b) return a;else return b;
	}
	var stateList = [];
    var vertexTraversed = {};
    var edgeTraversed = {};
    var currentState = createState(internalSt);

    currentState["status"] = "Update the value from "+L+" to "+R;
    currentState["lineNo"] = 0;
    stateList.push(currentState);
    function update(root, x,y,L, R,value) {
		
	  if (internalSt[root]["lazy"]==true){
		var middle=(Math.floor((x+y)/2));
	  	currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "This vertex would be lazely updated";
        currentState["vl"][2*root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
		internalSt[2*root]["value"]=internalSt[root]["value"];
		if (x<middle){
			internalSt[2*root]["lazy"]=true;
		}
		currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "This vertex would be lazely updated";
        currentState["vl"][2*root+1]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
		internalSt[2*root+1]["value"]=internalSt[root]["value"];
		if (middle+1<y){
			internalSt[2*root+1]["lazy"]=true;
		}
		internalSt[root]["lazy"]=false;
	  }


      vertexTraversed[root] = true;
      if ((x>=L) && (y<=R)) {
		internalSt[root]["value"]=value;
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "This vertex would be updated";
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);

		if (x<y){
			internalSt[root]["lazy"]=true;
		}
	    if (current_min>internalSt[root]["value"]){
			current_min=internalSt[root]["value"];
		}     	
      } else {

		var middle=(Math.floor((x+y)/2));
		if (L<=middle){
 	        vertexTraversed[root*2] = true;
        	edgeTraversed[root*2] = true;
        	currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        	currentState["el"][root*2]["animateHighlighted"] = true;
        	currentState["el"][root*2]["state"] = EDGE_TRAVERSED;
        	currentState["lineNo"] = 3;
        	currentState["status"] = "Look for the update area on the left side";
        	stateList.push(currentState);
        	update(root*2, x, Math.floor((x+y)/2),L,R,value);
        	delete vertexTraversed[root*2];
        	delete edgeTraversed[root*2];		
		}
		if (R>=middle+1){
        	vertexTraversed[root*2+1] = true;
        	edgeTraversed[root*2+1] = true;
        	currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        	currentState["el"][root*2+1]["animateHighlighted"] = true;
        	currentState["el"][root*2+1]["state"] = EDGE_TRAVERSED;
        	currentState["lineNo"] = 4;
        	currentState["status"] = "Look for the update area on the right side";
        	stateList.push(currentState);
        	update(root*2+1, Math.floor((x+y)/2)+1, y,L,R,value);
        	delete vertexTraversed[root*2+1];
        	delete edgeTraversed[root*2+1];
		}
		internalSt[root]["value"]=min(internalSt[root*2]["value"], internalSt[root*2+1]["value"]);
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 5;
        currentState["status"] = "Finish the update in this interval";
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
      }
      delete vertexTraversed[root];
    }
    update(1, 0, vertexAmt-1,L,R,value);
    currentState = createState(internalSt);
    currentState["status"] = "Finish";
    stateList.push(currentState);
    graphWidget.startAnimation(stateList);
    populatePseudocode(2);
    return true;	
  }


  this.updateMax = function (L, R,value) {
	
  	var current_max=-999;
	function max(a,b){
		if (a>b) return a;else return b;
	}
	var stateList = [];
    var vertexTraversed = {};
    var edgeTraversed = {};
    var currentState = createState(internalSt);

    currentState["status"] = "Update the value from "+L+" to "+R;
    currentState["lineNo"] = 0;
    stateList.push(currentState);
    function update(root, x,y,L, R,value) {
		
	  if (internalSt[root]["lazy"]==true){
		var middle=(Math.floor((x+y)/2));
	  	currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "This vertex would be lazely updated";
        currentState["vl"][2*root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
		internalSt[2*root]["value"]=internalSt[root]["value"];
		if (x<middle){
			internalSt[2*root]["lazy"]=true;
		}
		currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "This vertex would be lazely updated";
        currentState["vl"][2*root+1]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
		internalSt[2*root+1]["value"]=internalSt[root]["value"];
		if (middle+1<y){
			internalSt[2*root+1]["lazy"]=true;
		}
		internalSt[root]["lazy"]=false;
	  }


      vertexTraversed[root] = true;
      if ((x>=L) && (y<=R)) {
		internalSt[root]["value"]=value;
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "This vertex would be updated";
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);

		if (x<y){
			internalSt[root]["lazy"]=true;
		}

      } else {

		var middle=(Math.floor((x+y)/2));
		if (L<=middle){
 	        vertexTraversed[root*2] = true;
        	edgeTraversed[root*2] = true;
        	currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        	currentState["el"][root*2]["animateHighlighted"] = true;
        	currentState["el"][root*2]["state"] = EDGE_TRAVERSED;
        	currentState["lineNo"] = 3;
        	currentState["status"] = "Look for the update area on the left side";
        	stateList.push(currentState);
        	update(root*2, x, Math.floor((x+y)/2),L,R,value);
        	delete vertexTraversed[root*2];
        	delete edgeTraversed[root*2];		
		}
		if (R>=middle+1){
        	vertexTraversed[root*2+1] = true;
        	edgeTraversed[root*2+1] = true;
        	currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        	currentState["el"][root*2+1]["animateHighlighted"] = true;
        	currentState["el"][root*2+1]["state"] = EDGE_TRAVERSED;
        	currentState["lineNo"] = 4;
        	currentState["status"] = "Look for the update area on the right side";
        	stateList.push(currentState);
        	update(root*2+1, Math.floor((x+y)/2)+1, y,L,R,value);
        	delete vertexTraversed[root*2+1];
        	delete edgeTraversed[root*2+1];
		}
		
		internalSt[root]["value"]=max(internalSt[root*2]["value"], internalSt[root*2+1]["value"]);

        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 5;
        currentState["status"] = "Finish the update in this interval";
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
      }
      delete vertexTraversed[root];
    }
    update(1, 0, vertexAmt-1,L,R,value);
    currentState = createState(internalSt);
    currentState["status"] = "Finish";
    stateList.push(currentState);
    graphWidget.startAnimation(stateList);
    populatePseudocode(2);
    return true;	
  }	

  this.updateSum = function (L, R,value) {
	
	var stateList = [];
    var vertexTraversed = {};
    var edgeTraversed = {};
    var currentState = createState(internalSt);

    currentState["status"] = "Update the value from "+L+" to "+R;
    currentState["lineNo"] = 0;
    stateList.push(currentState);
    function update(root, x,y,L, R,value) {
		
	  if (internalSt[root]["lazy"]==true){
		var middle=(Math.floor((x+y)/2));
	  	currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "This vertex would be lazely updated";
        currentState["vl"][2*root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
		internalSt[2*root]["value"]=internalSt[root]["value"]/(y-x+1)*(middle-x+1);
		if (x<middle){
			internalSt[2*root]["lazy"]=true;
		}
		currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "This vertex would be lazely updated";
        currentState["vl"][2*root+1]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
		internalSt[2*root+1]["value"]=internalSt[root]["value"]/(y-x+1)*(y-middle);
		if (middle+1<y){
			internalSt[2*root+1]["lazy"]=true;
		}
		internalSt[root]["lazy"]=false;
	  }


      vertexTraversed[root] = true;
      if ((x>=L) && (y<=R)) {
		internalSt[root]["value"]=value*(y-x+1);
        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 1;
        currentState["status"] = "This vertex would be updated";
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);

		if (x<y){
			internalSt[root]["lazy"]=true;
		}

      } else {

		var middle=(Math.floor((x+y)/2));
		if (L<=middle){
 	        vertexTraversed[root*2] = true;
        	edgeTraversed[root*2] = true;
        	currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        	currentState["el"][root*2]["animateHighlighted"] = true;
        	currentState["el"][root*2]["state"] = EDGE_TRAVERSED;
        	currentState["lineNo"] = 3;
        	currentState["status"] = "Look for the update area on the left side";
        	stateList.push(currentState);
        	update(root*2, x, Math.floor((x+y)/2),L,R,value);
        	delete vertexTraversed[root*2];
        	delete edgeTraversed[root*2];		
		}
		if (R>=middle+1){
        	vertexTraversed[root*2+1] = true;
        	edgeTraversed[root*2+1] = true;
        	currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        	currentState["el"][root*2+1]["animateHighlighted"] = true;
        	currentState["el"][root*2+1]["state"] = EDGE_TRAVERSED;
        	currentState["lineNo"] = 4;
        	currentState["status"] = "Look for the update area on the right side";
        	stateList.push(currentState);
        	update(root*2+1, Math.floor((x+y)/2)+1, y,L,R,value);
        	delete vertexTraversed[root*2+1];
        	delete edgeTraversed[root*2+1];
		}
		
		internalSt[root]["value"]=internalSt[root*2]["value"]+internalSt[root*2+1]["value"];

        currentState = createState(internalSt, vertexTraversed, edgeTraversed);
        currentState["lineNo"] = 5;
        currentState["status"] = "Finish the update in this interval";
        currentState["vl"][root]["state"] = VERTEX_HIGHLIGHTED;
        stateList.push(currentState);
      }
      delete vertexTraversed[root];
    }
    update(1, 0, vertexAmt-1,L,R,value);
    currentState = createState(internalSt);
    currentState["status"] = "Finish";
    stateList.push(currentState);
    graphWidget.startAnimation(stateList);
    populatePseudocode(2);
    return true;	
  }		


  function create_empty_tree(vertexAmt){
    var i;

    clearScreen();

    function helper(parent, root, L, R) {
      if (L == R) {
        internalSt[root] = {
          "parent": parent,
          "leftChild": null,
          "rightChild": null,
          "value": 0,
          "lazy": false
        };
      } else {
        internalSt[root] = {
          "parent": parent,
          "leftChild": root * 2,
          "rightChild": root * 2 + 1,
          "value": 0,
          "lazy": false
        };
        helper(root, root * 2, L, Math.floor((L+R)/2));
        helper(root, root * 2 + 1, Math.floor((L+R)/2)+1, R);
      }
    }

    internalSt["root"] = 1;
    helper(null, 1, 0, vertexAmt - 1);

    recalculatePosition();

    function helper2(root, L, R) {
      if (L == R) {
        graphWidget.addVertex(internalSt[root]["cx"], internalSt[root]["cy"], internalSt[root]["value"], "[" + L + ", " + R + "]", root, true);
      } else {
        graphWidget.addVertex(internalSt[root]["cx"], internalSt[root]["cy"], internalSt[root]["value"], "[" + L + ", " + R + "]", root, true);
        helper2(root * 2, L, Math.floor((L+R)/2));
        helper2(root * 2 + 1, Math.floor((L+R)/2)+1, R);
      }
    }
    helper2(1, 0, vertexAmt - 1);

    for(key in internalSt){
      if(key == "root") continue;
      if(key == internalSt["root"]) continue;
      var parentVertex = internalSt[key]["parent"];
      graphWidget.addEdge(parentVertex, parseInt(key), parseInt(key), EDGE_TYPE_UDE, 1, true);
    }
  }

  function clearScreen(){
    var key;

    for(key in internalSt){
      if(key == "root") continue;
      if(key == internalSt["root"]) continue;
      graphWidget.removeEdge(key);
    }

    for(key in internalSt){
      if(key == "root") continue;
      graphWidget.removeVertex(key);
    }

    internalSt = {};
    internalSt["root"] = null;
    amountVertex = 0;
  }

  /*
   * internalStObject: a JS object with the same structure of internalSt. This means the BST doen't have to be the BST stored in this class
   * vertexTraversed: JS object with the vertexes of the BST which are to be marked as traversed as the key
   * edgeTraversed: JS object with the edges of the BST which are to be marked as traversed as the key
   */

  function createState(internalStObject, vertexTraversed, edgeTraversed){
    if(vertexTraversed == null || vertexTraversed == undefined || !(vertexTraversed instanceof Object))
      vertexTraversed = {};
    if(edgeTraversed == null || edgeTraversed == undefined || !(edgeTraversed instanceof Object))
      edgeTraversed = {};

    var state = {
      "vl":{},
      "el":{}
    };

    var key;
    var vertexClass;

    for(key in internalStObject){
      if(key == "root") continue;
      key = parseInt(key);
      state["vl"][key] = {};

      state["vl"][key]["cx"] = internalStObject[key]["cx"];
      state["vl"][key]["cy"] = internalStObject[key]["cy"];
      state["vl"][key]["text"] = internalStObject[key]["value"];
      if (internalStObject[key]["lazy"])
        state["vl"][key]["state"] = "lazy";
      else
        state["vl"][key]["state"] = VERTEX_DEFAULT;

      if(internalStObject[key]["parent"] == null) continue;

      state["el"][key] = {};

      state["el"][key]["vertexA"] = internalStObject[key]["parent"];
      state["el"][key]["vertexB"] = key;
      state["el"][key]["type"] = EDGE_TYPE_UDE;
      state["el"][key]["weight"] = 1;
      state["el"][key]["state"] = EDGE_DEFAULT;
      state["el"][key]["animateHighlighted"] = false;
    }

    for(key in vertexTraversed){
      key = parseInt(key);
      if (typeof state["vl"][key] == "undefined")
        console.log(internalStObject[key]);
      state["vl"][key]["state"] = VERTEX_TRAVERSED;
    }

    for(key in edgeTraversed){
      key = parseInt(key);
      state["el"][key]["state"] = EDGE_TRAVERSED;
    }

    return state;
  }

  function recalculatePosition(){
    calcHeight(internalSt["root"], 0);
    updatePosition(internalSt["root"]);

    function calcHeight(currentVertex, currentHeight){
      if(currentVertex == null) return;
      internalSt[currentVertex]["height"] = currentHeight;
      calcHeight(internalSt[currentVertex]["leftChild"], currentHeight + 1);
      calcHeight(internalSt[currentVertex]["rightChild"], currentHeight + 1);
    }

    function updatePosition(currentVertex, isLeft){
      if(currentVertex == null) return;

      if(currentVertex == internalSt["root"]) internalSt[currentVertex]["cx"] = MAIN_SVG_WIDTH/2;
      else{
        var i;
        var xAxisOffset = MAIN_SVG_WIDTH/2;
        var parentVertex = internalSt[currentVertex]["parent"]
        for(i = 0; i < internalSt[currentVertex]["height"]; i++){
          xAxisOffset /= 2;
        }

        if(isLeft)
          internalSt[currentVertex]["cx"] = internalSt[parentVertex]["cx"] - xAxisOffset;
        else
          internalSt[currentVertex]["cx"] = internalSt[parentVertex]["cx"] + xAxisOffset;
      }

      internalSt[currentVertex]["cy"] = 50 + 50*internalSt[currentVertex]["height"];

      updatePosition(internalSt[currentVertex]["leftChild"], true);
      updatePosition(internalSt[currentVertex]["rightChild"], false);
    }
  }
  
  function populatePseudocode(act) {
    switch (act) {
      case 0: // Build
        document.getElementById('code1').innerHTML = 'if L == R then this = array[L]';
        document.getElementById('code2').innerHTML = 'else';
        document.getElementById('code3').innerHTML = '&nbspbuild left_child, L, (L+R)/2';
        document.getElementById('code4').innerHTML = '&nbspbuild right_child, (L+R)/2+1, R';
        document.getElementById('code5').innerHTML = '&nbspthis=min/max/sum(left_child, right_child)';
        document.getElementById('code6').innerHTML = '';
        document.getElementById('code7').innerHTML = '';
        break;
    case 1: // RMQ
        document.getElementById('code1').innerHTML = 'if L<=x<=y<=R then this area would be considered';
        document.getElementById('code2').innerHTML = 'else';
        document.getElementById('code3').innerHTML = '&nbspRMQ at left_child, L, (L+R)/2';
        document.getElementById('code4').innerHTML = '&nbspRMQ at right_child, (L+R)/2+1, R';
        document.getElementById('code5').innerHTML = '&nbspback to this';
        document.getElementById('code6').innerHTML = '';
        document.getElementById('code7').innerHTML = '';
        break;
    case 2: // update
        document.getElementById('code1').innerHTML = 'if L<=x<=y<=R then this area will be updated';
        document.getElementById('code2').innerHTML = 'else';
        document.getElementById('code3').innerHTML = '&nbspupdate at left_child, L, (L+R)/2';
        document.getElementById('code4').innerHTML = '&nbspupdate at right_child, (L+R)/2+1, R';
        document.getElementById('code5').innerHTML = '&nbspupdate this= Min/Max/Sum(this.left,this.right)';
        document.getElementById('code6').innerHTML = '';
        document.getElementById('code7').innerHTML = '';
        break;
    case 3: // in-order traversal
        document.getElementById('code1').innerHTML = 'if this is null';
        document.getElementById('code2').innerHTML = '&nbsp;&nbsp;return';
        document.getElementById('code3').innerHTML = 'inOrder(left)';
        document.getElementById('code4').innerHTML = 'visit this, then inOrder(right)';
        document.getElementById('code5').innerHTML = '';
        document.getElementById('code6').innerHTML = '';
        document.getElementById('code7').innerHTML = '';
        break;
    case 4: // search
        document.getElementById('code1').innerHTML = 'if this == null';
        document.getElementById('code2').innerHTML = '&nbsp;&nbsp;return null';
        document.getElementById('code3').innerHTML = 'else if this key == search value';
        document.getElementById('code4').innerHTML = '&nbsp;&nbsp;return this';
        document.getElementById('code5').innerHTML = 'else if this key < search value';
        document.getElementById('code6').innerHTML = '&nbsp;&nbsp;search right';
        document.getElementById('code7').innerHTML = 'else search left';
        break;
    case 5: // remove
        document.getElementById('code1').innerHTML = 'search for v';
        document.getElementById('code2').innerHTML = 'if v is a leaf';
        document.getElementById('code3').innerHTML = '&nbsp;&nbsp;delete leaf v';
        document.getElementById('code4').innerHTML = 'else if v has 1 child';
        document.getElementById('code5').innerHTML = '&nbsp;&nbsp;bypass v';
        document.getElementById('code6').innerHTML = 'else replace v with successor';
        document.getElementById('code7').innerHTML = '';
        break;
    case 6: // insert with rotations
        document.getElementById('code1').innerHTML = 'insert v';
        document.getElementById('code2').innerHTML = 'check balance factor of this and its children';
        document.getElementById('code3').innerHTML = '&nbsp;&nbsp;case1: this.rotateRight';
        document.getElementById('code4').innerHTML = '&nbsp;&nbsp;case2: this.left.rotateLeft, this.rotateRight';
        document.getElementById('code5').innerHTML = '&nbsp;&nbsp;case3: this.rotateLeft';
        document.getElementById('code6').innerHTML = '&nbsp;&nbsp;case4: this.right.rotateRight, this.rotateLeft';
        document.getElementById('code7').innerHTML = '&nbsp;&nbsp;this is balanced';
        break;
    case 7: // remove with rotations
        document.getElementById('code1').innerHTML = 'remove v';
        document.getElementById('code2').innerHTML = 'check balance factor of this and its children';
        document.getElementById('code3').innerHTML = '&nbsp;&nbsp;case1: this.rotateRight';
        document.getElementById('code4').innerHTML = '&nbsp;&nbsp;case2: this.left.rotateLeft, this.rotateRight';
        document.getElementById('code5').innerHTML = '&nbsp;&nbsp;case3: this.rotateLeft';
        document.getElementById('code6').innerHTML = '&nbsp;&nbsp;case4: this.right.rotateRight, this.rotateLeft';
        document.getElementById('code7').innerHTML = '&nbsp;&nbsp;this is balanced';
        break;
    case 8: // successor
        document.getElementById('code1').innerHTML = 'if this.right != null return findMin(this.right)';
        document.getElementById('code2').innerHTML = 'else';
        document.getElementById('code3').innerHTML = '&nbsp;&nbsp;p = this.parent, T = this';
        document.getElementById('code4').innerHTML = '&nbsp;&nbsp;while(p != null && T == p.right)';
        document.getElementById('code5').innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;T = p, p = T.parent';
        document.getElementById('code6').innerHTML = '&nbsp;&nbsp;if p is null return -1';
        document.getElementById('code7').innerHTML = '&nbsp;&nbsp;else return p';
        break;
    case 9: // predecessor
        document.getElementById('code1').innerHTML = 'if this.left != null return findMax(this.left)';
        document.getElementById('code2').innerHTML = 'else';
        document.getElementById('code3').innerHTML = '&nbsp;&nbsp;p = this.parent, T = this';
        document.getElementById('code4').innerHTML = '&nbsp;&nbsp;while(p != null && T == p.left)';
        document.getElementById('code5').innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;T = p, p = T.parent';
        document.getElementById('code6').innerHTML = '&nbsp;&nbsp;if p is null return -1';
        document.getElementById('code7').innerHTML = '&nbsp;&nbsp;else return p';
        break;
    }
  }
}