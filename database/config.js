const mongoose = require("mongoose");

const dbConnection = async()=>{

    try {
        await mongoose.connect( process.env.MONGODB_CNN, 
        // {    CREO QUE POR VERSIONES ESTO YA NO VA, 
        //      PERO EN EL VIDEO ERA NECESARIO
        //         useNewUrlParser: true,
        //         useUnifiedTopology: true,
        //         useCreateIndex: true,
        //         useFindAndModify: false
        // }
        );
        console.log("Base de datos Online!");

    }catch(error) {
        console.log(error);
        throw new Error("Error a la hora de iniciar la base de datos");   
    }
}



module.exports = {
    dbConnection
}