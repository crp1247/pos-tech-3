import mongoose from "mongoose";
import config from "config";

//Logger
import Logger from "./logger";

async function connect(){
    const dbUri= config.get<string>("dbUri");
    Logger.info("Conectou ao banco de dados");
    try{
        await mongoose.connect(dbUri);
    }catch(e){
        Logger.error("nao foi possivel concectar! ");
        Logger.error(`Erro ${e}`);
        process.exit(1);
    }
}

export default connect;