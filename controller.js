
const base=(req, res) => {
    res.render(__dirname + "/students");
    // Assuming you have a "students.ejs" template
}

const register_user=(req, res) => {
    var query = "INSERT INTO students (id, name, email, password) VALUES (NULL, ?, ?, ?)";
    conn.query(query, [req.body.name, req.body.email, req.body.password], (error) => {
        if (error) {
            console.log("Error inserting data: " + error);
        } else {
            console.log("user registered")
            res.redirect("/");
        }
    });
}
const users=(req,res)=>{

    var dataquerry="SELECT * FROM students";
    conn.query(dataquerry,(error,data)=>{
if(error){
    console.log("error getting data");
}
else{
    res.render(__dirname+"/students_data",{students:data})
  
}

    }) }


   const delete_user = (req,res)=>{




        var dataquerry="DELETE  FROM students where id=?";
        conn.query(dataquerry,[req.query._id],(error,data)=>{
    if(error){
        console.log("error getting data");
    }
    else{
        res.redirect("/users")
      
    }}) }   
 
    const update_user=(req,res)=>{




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

        
        const update_user_data=(req,res)=>{



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


           const search =(req,res)=>{


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


            module.exports = {base,register_user,users,delete_user,update_user,update_user_data,search}