# Install Node
Download the latest Node.js and NPM here: https://nodejs.org/en/download/

#Deprecate Node to v6.11.2 (and npm to v3.10.10) using N
```npm install -g n```
```n 6.11.2```

#Verify node version
```node -v``` should be v6.11.2

Verify npm version
```npm -v``` should be 3.10.10

### After install…
Verify ```/usr/local/bin/npm``` is in your path.
The command ```Echo $PATH``` may look something like this .. ```/Users/liannehaug/.rbenv/shims:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin``

# Running the app
First... ```npm install```
In one tab run ```gulp```
In another tab run```npm start```
