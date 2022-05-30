import express from "express";
import { blogRouter } from "./app/routes/blog.routes";
import sequelize from "./app/config/db.config";
import "./app/db/models";
import "./app/db/relations"

const app = express();

app.use(express.urlencoded({ extended : true }));
app.use(express.json());

sequelize
  .authenticate()
  .then(() => console.log("connection done"))
  .catch((err) => console.log(err.message));

sequelize.sync({ alter: true }).then(() => console.log("tables created"));

app.get('/',(req,res)=>{
    res.json({ message : 'server is connected' });
});

//blog routes
app.use('/api',blogRouter);

//404 route
app.use((req,res)=>{
    res.status(404).json({ message : '404 not found' });
});

const port = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000,()=>{
    console.log(`server is running on port ${port}`);
});
