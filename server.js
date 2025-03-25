const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const port=3019


const app=express()
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://mongomongo:HD4RXpshU3JbHJ5x@cluster0.8dsmy.mongodb.net/RideLynk')
const db=mongoose.connection
db.once('open',()=>{
    console.log("Mongodb Connection Successful");
}) 

const HostSchema=new mongoose.Schema({
    username:String,
    email:String,
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
        const {username,
            email,
            pickup_location_host,
            destination_location_host,
            date_host,
            pickup_time_host,
            vehicle_type_host,
            passenger_count_host,
            price_per_passenger
        }=req.body;
    
        const host=new Host({
            username,
            email,
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
            res.redirect('/viewRides.html');
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

app.get('/getRides', async(req,res)=>{
    try{
        const rides=await Host.find({});
        res.json(rides);
    }
    catch(error){
        console.error("Error fetching rides", error);
        res.status(500).send("Internal Server Error");
    }
})


///testing
app.get('/getHostedRides', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const rides = await Host.find({ email: email });
        res.json(rides);
    } catch (error) {
        console.error("Error fetching hosted rides", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});