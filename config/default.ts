const dbUser =process.env.DB_USER;
const  dbPassword = process.env.DB_PASS;
  


export default{
 port: 3000,
 dbUri: `mongodb+srv://${dbUser}:${dbPassword}@blog.49aag.mongodb.net/?retryWrites=true&w=majority&appName=blog`,
env: "development",
};