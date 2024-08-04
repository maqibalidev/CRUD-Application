const express= require('express');
const router =new express();
const conn =require("./config")

conn.connect((error) => {
    if (error) {
        console.log("Can't connect to database: " + error);
    } else {
        console.log("Connected to database");
    }
});

router.get("/", (req, res) => {
    res.render(__dirname + "/students");
    // Assuming you have a "students.ejs" template
});

router.post("/register-user", (req, res) => {
    var query = "INSERT INTO students (id, name, email, password) VALUES (NULL, ?, ?, ?)";
    conn.query(query, [req.body.name, req.body.email, req.body.password], (error) => {
        if (error) {
            console.log("Error inserting data: " + error);
        } else {
            console.log("user registered")
            res.redirect("/");
        }
    });
});


router.get("/users",(req,res)=>{

    var dataquerry="SELECT * FROM students";
    conn.query(dataquerry,(error,data)=>{
if(error){
    console.log("error getting data");
}
else{
    res.render(__dirname+"/students_data",{students:data})
  
}

    }) 


})

router.get("/delete",(req,res)=>{




    var dataquerry="DELETE  FROM students where id=?";
    conn.query(dataquerry,[req.query._id],(error,data)=>{
if(error){
    console.log("error getting data");
}
else{
    res.redirect("/users")
  
}

    }) 
}

)


router.get("/update",(req,res)=>{




var dataquerry="SELECT * FROM students WHERE id=?";
conn.query(dataquerry,[req.query._id],(error,data)=>{
if(error){
console.log("error getting data");
}
else{
    console.log(data);
res.render(__dirname+"/updatedata",{students:data})

}

}) 


}

)

router.post("/update-user-data",(req,res)=>{



    var dataquery = "UPDATE students SET name=?, email=?, password=? WHERE id=?";
    console.log(req.body)
    conn.query(dataquery,[req.body.name,req.body.email,req.body.password,req.body._id],(error,data)=>{
    if(error){
    console.log("error getting data");
    }
    else{
       
    res.redirect("/users");
    
    }
    
    }) 
    
    
    }
    
    )
    
    router.get("/search",(req,res)=>{


        const name = req.query.search;
       


      
        var dataquery = "SELECT * FROM students WHERE name LIKE ?";
        var searchTerm = '%' + name + '%';
        
        conn.query(dataquery, [searchTerm], (error, data) => {
            if (error) {
                console.error("Error executing query:", error);
            } else {
             
                res.render(__dirname+"/students_data",{students:data})  // Process the results here
            }
        });
             
        
        
        }
        
        )
        router.get("/adduser",(req,res)=>{
            res.redirect("/")
        })

        module.exports=router;