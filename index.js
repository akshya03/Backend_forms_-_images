const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

//view engine middleware
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded());  //for get requests through url-form-encoded
app.use(fileUpload());

//info can travel both in query/body in GET request depending on frontend
app.get('/myget', (req, res)=>{
    console.log(req.query);
    console.log(`----`);
    console.log(req.body);

    res.send(req.query);
});

//info travels in body only in POST request
app.post('/mypost', (req, res)=>{
    console.log(req.body);
    console.log(req.files);
    res.send(req.body);
});

app.get('/mygetform', (req, res)=>{
    res.render("getform");  //no need to specify path as it will automatically access VIEWS folder
});

app.get('/mypostform', (req, res)=>{
    res.render("postform");  //no need to specify path as it will automatically access VIEWS folder
});

app.listen(4000, ()=>console.log(`Server is running on port: 4000`));