const multer = require('multer');
const bodyParser = require('body-parser');
const express = require('express')
const router = express.Router()
const port 	   = process.env.PORT || 8080;

//This is to keep track of the photo names for picking a random image
var photoList = ['img1.jpeg', 'img2.jpeg'];

// storage for the images
var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("imgUploader", 3); 


/*Honestly I am not sure if this is the correct way to do it, but I could not
get this working with an API (most likely due to states) so this seemed like the 
simplest way to do it */


/*This function takes a query and returns a path to a random image */
function imageHandler(req, res, next) {
    let url = req.url;
    let qObj = req.query;
    if (qObj != undefined) {
        let photo = photoList[Math.floor(Math.random()*photoList.length)];
        //Send a link to the next random image
        res.json( "/images/" + photo);
    }
    else {
	    next();
    }
}
const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };


function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
}

const app = express()
app.use('/',router);  
app.use(express.static('public')); 

app.get('/query', imageHandler );   
app.use( fileNotFound );            
app.use(bodyParser.json());

router.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});
router.get("/upload", function(req, res) {
    res.sendFile(__dirname + "/public/upload.html");
});

app.listen(port, function (){console.log('Listening...');} )

//Api for uploading an image
router.post('/upload', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            res.status(400).json({message: err.message})
        } else {
            let path = `/public/images/${req.files[0].filename}`
            //Add the item to the photo list for the randomization
            photoList.push(req.files[0].filename)
            res.status(200).json({message: 'Image Uploaded Successfully !', path: path})
        }
    })
})
