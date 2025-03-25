const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const port=3019

const app=express()
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

//replace this with the connect string form mongodb atlas
mongoose.connect('mongodb://127.0.0.1:27017/RideLynk')
const db=mongoose.connection
db.once('open',()=>{
    console.log("Mongodb Connection Successful");
}) 

const HostSchema=new mongoose.Schema({
    pickup_location_host:String,
    destination_location_host:String,
    date_host:Date,
    pickup_time_host:String,
    vehicle_type_host:String,
    passenger_count_host:String,
    price_per_passenger:String
})


const JoinSchema=new mongoose.Schema({
    pickup_location_join:String,
    destination_location_join:String,
    date_join:Date,
    pickup_time_join:String,
    preferred_vehicle_join:String
})

const Host=mongoose.model("host",HostSchema)
const Join=mongoose.model("join",JoinSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'hostJoin.html'));
})

app.post('/post',async(req,res)=>{
    console.log("Recieved POST request: ",req.body);

    if(req.body.pickup_location_host){
        const {pickup_location_host,
            destination_location_host,
            date_host,
            pickup_time_host,
            vehicle_type_host,
            passenger_count_host,
            price_per_passenger
        }=req.body;
    
        const host=new Host({
            pickup_location_host,
            destination_location_host,
            date_host: new Date(date_host),
            pickup_time_host,
            vehicle_type_host,
            passenger_count_host,
            price_per_passenger
        });
        try {
            await host.save();
            console.log("Data saved:", host);
            res.redirect('/home.html');
        } catch (error) {
            console.error("Error saving to database:", error);
            // res.status(500).send("Internal Server Error");
            res.send(`
                <script>
                    alert('Enter all the information');
                    window.location.href = '/hostJoin.html';
                </script>
            `);
        }
    }


    else if(req.body.pickup_location_join){
        const {pickup_location_join,
            destination_location_join,
            date_join, 
            pickup_time_join,
            preferred_vehicle_join}=req.body
        const join=new Join({
            pickup_location_join,
            destination_location_join,
            date_join: new Date(date_join),
            pickup_time_join,
            preferred_vehicle_join
        })
        try {
            await join.save();
            console.log("Data saved:", join);
            res.redirect('/home.html');
        } catch (error) {
            console.error("Error saving to database:", error);
            res.send(`
                <script>
                    alert('Enter all the information');
                    window.location.href = '/hostJoin.html';
                </script>
            `);
        }
    }
})

app.listen(port,()=>{
    console.log("Server Started");
})