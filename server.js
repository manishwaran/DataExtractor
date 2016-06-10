var healthCheck = require('connect-health-check');
var express = require('express');
var app = express();
var healthCheck = require('connect-health-check');
var bodyParser = require('body-parser'),
	request=require('request'),
	tempResp = "",
	cheerio = require('cheerio'),
	cheerioAdv = require('cheerio-advanced-selectors'),
	fs = require('fs'); // remove

// cheerio = cheerioAdv.wrap(cheerio)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(healthCheck)
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
	res.sendFile(__dirname + "./html/index.html")
});

app.post('/loadwebpage', function(req, res){
	console.log(req.body)
	tempResp=""
	var url=req.body.url
	console.log(url);
	if(url){
		var options = {
			url : url,
			headers : {"User-Agent" : "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/50.0.2661.102 Chrome/50.0.2661.102 Safari/537.36"}
		}
		request(options,function(err,reqst,response){
			tempResp = response;
			fs.writeFileSync("./data.html", tempResp);
			res.send(response)
			res.end();
		});

	}
	else{
		console.log("data not fetched")
		res.end("data not fetched");
	}
});

app.post('/getresult',function(req,res){
	var runJson = JSON.parse(req.body.data),
		resultJson = [],
		$ = cheerio.load(tempResp);
		console.log(runJson);
	fs.writeFileSync("./data1.html", tempResp);
	runJson.forEach(function(item,index){
		var obj = {};
		obj.id=item.id;
		obj.val=cheerioAdv.find($, item.css).text();
		console.log("val"+obj.val);
		// obj.val=$(item.css).text();
		// console.log("Title " + $('title').text())
		// console.log($(item.css).toString());
		// console.log("item css : "+ item.css);
		// console.log("result : "+ obj.val);
		resultJson.push(obj);
	})
	console.log("result sent "+resultJson);
	res.json(resultJson);

})

app.listen(3030, function () {
  console.log('Example app listening on port 3030!');
});
