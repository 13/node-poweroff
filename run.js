#!/usr/bin/env node

require('dotenv').config()

const username = process.env.USER
const password = process.env.PASS
const users = {};
users[username] = password;

const express = require('express')
const app = express()
const path = require('path')
const basicAuth = require('express-basic-auth')

const os = require("os");
const hostname = os.hostname();

const exec = require('child_process').exec

function execute(command, callback){
  exec(command, function(error, stdout, stderr){ callback(stdout) })
}

function execute(command, callback){
	  exec(command, function(error, stdout, stderr){ callback(stdout) })
}

app.use(basicAuth({
  users: { 'process.env.USER': 'process.env.PASS' },
  users,
  challenge: true,
  unauthorizedResponse: 'Unauthorized'
}))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'))
})

app.get('/api', function (req, res) {
  console.log('api')
  res.json({ hostname: hostname, uptime: process.uptime() })  
})

app.get('/poweroff', function (req, res) {
  console.log('poweroff')
  res.sendFile(path.join(__dirname+'/public/index.html'))
  execute('sudo systemctl poweroff', function(callback){
    console.log(callback)
  })
})

app.get('/reboot', function (req, res) {
  console.log('reboot')
  res.sendFile(path.join(__dirname+'/public/index.html'))
  execute('sudo systemctl reboot', function(callback){
    console.log(callback)
  })
})
 
process.on('SIGINT', _ => {
  button.unexport()
})

console.log('Listening...')
app.listen(1337)
