const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const fs = require('fs');

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('*.js', function(req, res, next) {
  const url = req.url
  console.log("JS: " + url)
  if(url.indexOf('chunk') > 0 && url.indexOf('slice') < 0){
    console.log("Sending cachedSiteRedirect script")
    res.sendFile(path.join( __dirname, 'cachedSiteRedirect.js'));
  } else {
    console.log("Sending requested script")
    const gzFileExists = fs.existsSync(path.join(__dirname, 'build', url) + '.gz')
    if(gzFileExists){
      console.log("GZ: ", url)
      req.url = req.url + '.gz';
      res.set('Content-Encoding', 'gzip');
      res.set('Content-Type', 'text/javascript');
      res.set('Cache-Control', 'public, max-age=600')
      res.sendFile(path.join( __dirname, 'build', url)+'.gz');
    } else {
      res.sendFile(path.join( __dirname, 'build', url));
    }
  }
});

app.get('*.css', function(req, res, next) {
  const url = req.url
  console.log("CSS: " + url)
  const gzFileExists = fs.existsSync(path.join(__dirname, 'build', url) + '.gz')
  if(gzFileExists){
    console.log("GZ: ", url)
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/css');
    res.set('Cache-Control', 'public, max-age=600')
    res.sendFile(path.join( __dirname, 'build', url)+'.gz');
  } else {
      res.set('Cache-Control', 'public, max-age=600')
      res.sendFile(path.join( __dirname, 'build', url));
    }
});

app.get('*', function(req, res) {
  const url = req.url
  console.log("*: " + url)
  const fileExists = fs.existsSync(path.join(__dirname, 'build', url))
  if(fileExists){
    res.set('Cache-Control', 'public, max-age=600')
    res.sendFile(path.join( __dirname, 'build', req.url));
  } else {
    res.set('Cache-Control', 'public, max-age=600')
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  }
});

app.listen(process.env.PORT || 8080);
