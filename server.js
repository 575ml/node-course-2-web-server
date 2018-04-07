const express = require('express'),
	  hbs	  = require('hbs'),
	  fs	  = require('fs'),
	  app 	  = express();
	  //server  = require('http').createServer(app),
	  //io      = require('socket.io')(server);

const port = process.env.PORT || 5000;

//APP
app.set('view engine', 'hbs');
//app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

//LOG REQUEST TO /server.log'
app.use((req, res, next) => {
	var now = new Date().toString();
	//var ip = client.handshake.headers[‘x-forwarded-for’] || client.handshake.address.address;
	var log = `${now}: ${req.method} ${req.url} from ${req.ip}.`;
	console.log(log);
	fs.appendFile('logs/server.log', log +'\n',(err) =>{
		if (err) {
			console.log('Unable to append to server.log.');
		}
	});
	next();
});

//MAINTENANCE
// app.use((req, res, next) =>{
// 	res.render('maintenance.hbs');
// });

//HELPERS
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});



//MONGOOSE
// var url = process.env.DATABASEURL || "mongodb://localhost/web_server";

//ROUTES
//INDEX
app.get('/', (req, res) => {
	res.render('index', {
		pageTitle: 'Home',
		welcomeMessage: 'A\'s Random Bits and Pieces'
	})
});

//CONTACT
app.get('/contact', (req, res) => {
	res.render('contact', {
		pageTitle: 'Need something?'
	});
});

//PROJECT
app.get('/projects', (req, res) => {
	res.render('projects', {
		pageTitle: 'Projects'
	})
});

//404
app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Error'
	})
})

app.listen(port, () => {
	console.log(`Server init on poty ${port}`);
});