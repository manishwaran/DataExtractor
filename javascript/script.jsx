
jQuery.fn.extend({
    getPath: function () {
        console.log("hai");
        var path, node = this;
        while (node.length) {
            var realNode = node[0], name = realNode.localName;
            if (!name) break;
            name = name.toLowerCase();

            var parent = node.parent();

            var sameTagSiblings = parent.children(name);
            if (sameTagSiblings.length > 1) {
                allSiblings = parent.children();
                var index = allSiblings.index(realNode) + 1;
                if (index > 1) {
                    name += ':nth-child(' + index + ')';
                }
            }
            path = name + (path ? '>' + path : '');
            node = parent;
        }
        return path;
    }
	});

var global_id=0;
var classArray=[],idArray=[],tagArray=[];


$(document).ready(function(){
var runJson = [];
$("#btn").click(function(e){
	e.preventDefault();
	var child = document.getElementById("result");
	$(child).empty();
	$('#myIframe').contents().find('body').html("");
    $.post("/loadwebpage",$("form#myform").serialize(),function(data, status){
        $('#myIframe').contents().find('body').html(data);
	});
    document.getElementById("url").value = "";
});

$("#add-btn").on("click",function(){
	var original = document.getElementById("append")
	var clone = original.cloneNode(true);
	clone.style.display="block";
	global_id=global_id+1;
	clone.id=original.id+global_id.toString();
	document.getElementById("parent").appendChild(clone);
});


$('iframe').contents().click(function(e){
  var cssSelector=$(e.target).getPath();
	uniqueCssSelector=cssSelector.replace(/>/g," ");
	tagArray.push(e.target.tagName);
	var idAry=e.target.getAttribute("id");
	var classAry=e.target.getAttribute("class");
	var str="";
	if(idAry != null )
		str+=idAry.toString()+",";
	if(classAry != null )
		str+=","+classAry.toString();
	$("#"+"append"+global_id.toString()+" #css-input").val(uniqueCssSelector);
	$("#"+"append"+global_id.toString()+" #attr-input").val(str);
	var obj = {};
	obj.id = global_id;
	obj.cssSelector = uniqueCssSelector;
	obj.attr = str;
	runJson.push(obj);
	});

	$("#run-btn").on("click",function(){

		console.log(runJson)
		var child = document.getElementById("result");
		$(child).empty();
		$.post("/getresult",{data: JSON.stringify(runJson)},function(data, status){
        	data.forEach(function(e){
        		var res = document.createElement('p');
        		res.innerHTML=" = > " + e.val ;
        		document.getElementById("result").appendChild(res);
        	});
        	runJson=[];
		});
	});

	$("#clear-btn").on("click",function(){
		runJson=[];
		var child = document.getElementById("parent");
		$(child).empty();
		child = document.getElementById("result");
		$(child).empty()
	});

});
