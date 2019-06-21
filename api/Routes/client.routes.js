const express = require('express');
const JsonDB = require('node-json-db');
const {Config} = require('node-json-db/dist/lib/JsonDBConfig');
const axios = require('axios');
const clientRouter = express.Router();
const db = new JsonDB(new Config("DivicesDB", true, false, '/'));

const axiosInstance = axios.create({
    baseURL: 'https://onesignal.com/api/v1/',
    timeout: 7000,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        'Authorization': 'Basic ZjVhZjU5YWItOGFkNS00MGIxLTkxZmQtMDdmZDM3MzRhNjFl'}
  });

clientRouter.route('/playerId')
    .post((req, res)=>{    
        const tag = req.body.tag;
        const id = req.body.id;
        db.push("/db/list[]",{tag,id});
        const data = db.getData("/");
        res.send(data);
    })
    .get((req, res)=>{
        const data = db.getData("/");
        res.send(data);
    });

clientRouter.route('/message')
    .post((req, res)=>{
        const message = req.body;
        res.send(message);
        sendNotification(message);
    });

function sendNotification(message){
    axiosInstance.post('notifications',{
        app_id: "2dc2ed30-fc1d-42a0-8a79-0543959da4df",
        included_segments:["All"],
        contents:{en:message.body},
        headings:{en:message.title}
    })
}

module.exports = clientRouter;