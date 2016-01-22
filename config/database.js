// MongoDB - connection URI
if(process.env.VCAP_SERVICES){
	var services = JSON.parse(process.env.VCAP_SERVICES);
	if(services['mongolab']) {
		var uri = services['mongolab'][0].credentials.uri;
	} 
	if(services['mongodb-2.4']){
		var uri = services['mongodb-2.4'][0].credentials.url;
		console.log("Using the experimental service and uri is "+uri);
	}
	if(services['user-provided']){
		var cm = services['user-provided'][0].credentials;
		var dbname = 'todoapp';
		var uri = 'mongodb://' + cm.user + ':' + cm.password + '@' + cm.uri + ':' + cm.port + '/' + dbname;
		console.log("Using the compose mongodb service and uri is "+uri);
	}
	//else {
	//	uri = process.env.MONGO_URI;
	//}
} else {
	if (process.env.DB_PORT_27017_TCP_ADDR){
		uri = "mongodb://" + process.env.DB_PORT_27017_TCP_ADDR + ":" + process.env.DB_PORT_27017_TCP_PORT +"/docker";
	} else{
		uri = ""
	}
}

module.exports = {
	url: uri
};
