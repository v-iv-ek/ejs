const Sequelize=require("sequelize");
const sequelize=new Sequelize('node-complete','root','0820',
{
    dialect:'mysql',
    host:'localhost'

});

module.exports=sequelize;