const Sequelize = require('sequelize')
const { Model } = require('sequelize')

class Posts extends Model{
    static init(){
        super.init({
            image : Sequelize.STRING,
            type: Sequelize.STRING,
            description: Sequelize.STRING,
            number_value: Sequelize.INTEGER,
            author_id: Sequelize.INTEGER
        },
        {
            Sequelize,
        })
    }
    static associate(models){
        this.belongsTo(models.Users, { foreignKey : "author_id", as : 'user'})
    }
}

module.exports = Posts