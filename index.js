const express = require('express');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

const app = express();

//view engine middleware
app.set('view engine', 'ejs');

cloudinary.config({
    // cloud_name: process.env.CLOUD_NAME,
    cloud_name: "dbtivsyyr",
    api_key: "876148867736379",
    api_secret: "UUso9KsGbwTHLucRxmiHt6E_L4k"

});

app.use(express.json());
app.use(express.urlencoded());  //for get requests through url-form-encoded
app.use(fileUpload({
    //to handle files in backend when not done in frontend (optional)
    //when doen console.log(req.files), this will help show "Data: <Buffer>", else it will display in form of bytes->the whole file
    //helps to directly transfer the file to desired location/cloud
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

//info can travel both in query/body in GET request depending on frontend
app.get('/myget', (req, res)=>{
    console.log(req.query);
    console.log(`----`);
    console.log(req.body);

    res.send(req.query);
});

//info travels in body only in POST request
app.post('/mypost', (req, res)=>{
    console.log(req.body);  //this will print the file name
    console.log(req.files); 
    //this shoould print the actual file. if this shows 'undefined', then in the file is not correctly handled by frontend
    //to handle it in backend, use options through file-upload middleware

    //cloudinary

    let file = req.files.samplefile;    //"samplefile" is the name same as "name" of file in frontend HTML form
    //after uploading to cloudinary, we receive a result
    result = cloudinary.uploader.upload(file,{
        folder: 'users'
    });
    console.log(result);

    details={
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        result
    };
    res.send(details);

    // res.send(req.body);
});

app.get('/mygetform', (req, res)=>{
    res.render("getform");  //no need to specify path as it will automatically access VIEWS folder
});

app.get('/mypostform', (req, res)=>{
    res.render("postform");  //no need to specify path as it will automatically access VIEWS folder
});

app.listen(4000, ()=>console.log(`Server is running on port: 4000`));