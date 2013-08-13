var http=require("http");
var url=require("url");
var request = require("request");

var strFolderName = '';
var constUpdatePeriod = 3600000 * 6 ;
var blnFetching = false;
var baseUrl = "http://alprovider4bbt.ap01.aws.af.cm/?id=";

var arrSearchResult = new Array();
var marrFolders = undefined;
var mstrCommaSeparatedFolders = "";


arrSearchResult['Vinod-Rathod']         = {url: "447ABFBCBAE4F164%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;

arrSearchResult['Varsha-Tiwari']        = {url: "14D75B1F06A3BD93%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;

arrSearchResult['Sonu-Sargam']         = {url: "BA31248C6B39A38F%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;

arrSearchResult['Chhotu-Chhaliya']     = {url: "DF993DC6A57FBED%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;

arrSearchResult['Khushboo-Uttam']      = {url: "67571815690FC67%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;

arrSearchResult['Anand-Mohan']         = {url: "8279179735096FC5%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
 
arrSearchResult['Vinay-Ratod']    = {url: "78C673B9C7B3CB4%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;

arrSearchResult['Rekha-Rao']      = {url: "D4A1374B35DDE483%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;

arrSearchResult['Radha-Pandey']   = {url: "902EDB39E44E2147%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Alok-Kumar']              = {url: "5B704AE5DB9F2265%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Manoj-Tiwari']            = {url: "5665FFD8F4CC0185%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Pawan-Singh']             = {url: "485A0982763181E%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Kalpana-Patowary']        = {url: "E811D14547AFA64A%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Vinay-Bihari']            = {url: "12BA4D6367056885%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Ritesh-Pandey']           = {url: "26A9F76E5BB27C0A%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Rakesh-Mishra']           = {url: "EF70EF3F9C01E517%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Khesari-Lal']             = {url: "AC7F5B8A992F8B13%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Arvind-Akela']            = {url: "76D4313431ABA420%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Indu-Sonali']             = {url: "BFC472D1926F148C%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Shreya-Ghoshal']          = {url: "5D231F806388F062%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Khushboo-Jain']           = {url: "17A24897C67E0F0B%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Pamela-Jain']             = {url: "B3E4EF7B21ADA3E8%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Alka-Yagnik']             = {url: "2FA3BE92B217D4EE%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Dinesh-Lal-Yadav']        = {url: "BC0A43175CBD7D44%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Guddu-Rangila']           = {url: "453BAE8D162D3972%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Sharada-Sinha']           = {url: "BE3CBDDD51C08BED%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Udit-Narayan']            = {url: "F1C44F7DC2EFF874%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;
arrSearchResult['Mohan-Rathod']            = {url: "D70889D152F9EC58%21105", xmlResult:"", jsonResult:"", lastUpdateTime:0,reqCount:0, failing:false} ;


function convertToXml(jsonObject){
	
	//console.log("Length = " + jsonObject.length);
	var xmlResult = '<?xml version="1.0" encoding="UTF-8" ?><audio-list>';
	for(var i=0; i<jsonObject.length; i++ ){
		xmlResult += "<audio-info>";
		xmlResult += "<title>" + jsonObject[i].title + "</title>";
		xmlResult += "<url>" + jsonObject[i].url + "</url>";
		xmlResult += "<size>" + jsonObject[i].size + "</size>";
		xmlResult += "</audio-info>";
		//console.log(jsonObject[i].title + "\n\r");
	}	
	return xmlResult + "</audio-list>";
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

http.createServer(function(req,res){
	//console.log("url : " + req.url);
	//req.on('end', function () { } );
		
		//console.log("req.on : " + req.url);
		if (req.url === '/favicon.ico') {
			res.writeHead(200, {'Content-Type': 'image/x-icon'} );
			res.end();
			//console.log('favicon requested');
			return;
		}
		
		var _get = url.parse(req.url, true).query;
		
		if(_get && _get.service){
			res.writeHead(200,{"Content-type":"text/html"});	
			
			switch(_get.service){
				case 'GET_FOLDERS':	{	
					if(mstrCommaSeparatedFolders.length == 0){
						for(var objectName in arrSearchResult) {
							if(mstrCommaSeparatedFolders == ""){
								mstrCommaSeparatedFolders = objectName;
							}else{
								mstrCommaSeparatedFolders += "," + objectName;
							}
						}	
						marrFolders = mstrCommaSeparatedFolders.split(",").sort();	
						
						for(i=0; i<marrFolders.length; i++){
							if(i==0){
								mstrCommaSeparatedFolders = marrFolders[i];
							}else{
							    mstrCommaSeparatedFolders += "," + marrFolders[i];
							}
							//console.log(mstrCommaSeparatedFolders + "\n\r")
						}
						//mstrCommaSeparatedFolders = JSON.stringify (marrFolders.sort());
						//console.log('marrFolders ' + JSON.stringify(marrFolders) + '\n');
					}
					res.write(mstrCommaSeparatedFolders) ;				
				}break;
				
				case 'GET_FOLDERS_ID':	{
					var arrFoldersId = new Array();
					for(var objectName in arrSearchResult) {
						arrFoldersId = arrFoldersId.concat({folder:objectName, sdid:arrSearchResult[objectName].url});
					}					
					res.write(JSON.stringify(arrFoldersId)) ;
				}break;
				
				case 'GET_AUDIO_JSON':	{
					if(_get.folder){
						res.write(arrSearchResult[_get.folder].jsonResult) ;
					}
				}break;
				
				case 'VIEW_SERVER':	{
					for(var objectName in arrSearchResult) {
						var theObject = arrSearchResult[objectName];
						var intPeriod = ((new Date().getTime()) - theObject.lastUpdateTime ) / 60000;
						if(theObject.failing == true){
							res.write("<p><h3 style='color:red'> " + objectName + " " + theObject.url + ", Time : " +  intPeriod.toFixed(0)  + " min. , Count : " + theObject.reqCount +  "</h3></p>" ) ;
						}else{
							res.write("<p> " + objectName + " " + theObject.url + ", Time : " +  intPeriod.toFixed(0)  + " min. , Count : " + theObject.reqCount +  "</p>" ) ;
						}
					}					
				}break;
				
				case 'RESET':	{
					var packageObject = arrSearchResult[_get.folder];
					if(packageObject == undefined) {
						console.log('Invalid folder ' + strFolderName + '\n');
						return;
					}
					packageObject.lastUpdateTime = 0;	
					for(var objectName in arrSearchResult) {
						var theObject = arrSearchResult[objectName];
						var intPeriod = ((new Date().getTime()) - theObject.lastUpdateTime ) / 60000;
						res.write("<p> " + theObject.url + ", Time : " +  intPeriod.toFixed(0)  + " min. , Count : " + theObject.reqCount +  "</p>" ) ;
					}				
				}break;
				
			}
			res.end();	
			return;
		}
		
		if(_get ){
			var packageObject = undefined;
		    if( _get.folder ){
				strFolderName =  _get.folder;				
			}else{
				//console.log("marrFolders.length: " + marrFolders.length)
				var iRandom = getRandomInt(0,marrFolders.length -1 );
				strFolderName = marrFolders[iRandom];
				//console.log("iRandom: " + iRandom);
				//console.log("strFolderName: " + strFolderName);		
			}
			
			packageObject = arrSearchResult[strFolderName];
			//console.log("folder: " + strFolderName);
			//console.log("packageObject: " + packageObject);
			
						
			if(packageObject == undefined) {
				console.log('Invalid folder ' + strFolderName + '\n');
				return;
			}
			
			packageObject.reqCount++;			
			var lastUpdatedTime = packageObject.lastUpdateTime;
			if((new Date().getTime()-lastUpdatedTime) < constUpdatePeriod )			
			{				
				//console.log('Result from Cache ' + strFolderName);
				res.writeHead(200,{"Content-type":"text/html"});
				res.write(packageObject.xmlResult);
				res.end();				
			}else{

				// Temproraly setting lastUpdateTime as minimal so that other request will be served.				
				// console.log("Fetching: " + packageObject.url);	
				if(blnFetching == true) return;
				packageObject.lastUpdateTime = new Date().getTime();	
				blnFetching = true;		
				var sdId = packageObject.url;
				if(sdId.indexOf(",") > 0){
					var arrIds = packageObject.url.split(",");
					var randomId = getRandomInt(0,arrIds.length -1 );
					sdId = arrIds[randomId]
					//console.log(" sdId " + sdId + ", randomId " + randomId );
				}
				request(baseUrl + sdId , function (error, response, body) {
					
					//console.log('Fetch Response Received: ' + strFolderName + '\n');
					
					if (!error && response.statusCode == 200) {
								
						
						packageObject.jsonResult = body;
						var jsonObject =  eval(body);
						
						if( jsonObject != null && jsonObject.length > 0 ){
							packageObject.xmlResult = convertToXml(jsonObject);
							packageObject.lastUpdateTime = new Date().getTime();
							packageObject.failing =false;
						}else{
							packageObject.failing =true;
							packageObject.xmlResult ="";
							packageObject.lastUpdateTime = 0;							
						}
												
						res.writeHead(200,{"Content-type":"text/html"});
						res.write(packageObject.xmlResult);
						res.end();
					}else{
						console.log('Failed to fetch ' + strFolderName + '\n');
					}
					blnFetching = false;
				});
			}			
		}
		else{
			console.log('Invalid Request ' + req.url + '\n');
		}
					
}).listen( (process.env.OPENSHIFT_NODEJS_PORT || 8080), (process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1"));
							
