const Sequelize = require('sequelize')
const { Model } = require('sequelize')

class Posts extends Model{
    static init(sequelize){
        super.init({
            image : Sequelize.STRING,
            description: Sequelize.STRING,
            number_value: Sequelize.INTEGER,
            author_id: Sequelize.INTEGER
        },
        {
            sequelize,
        })
    }
    static associate(models){
        this.belongsTo(models.Users, { foreignKey : "author_id", as : 'user'})
    }
}

module.exports = Posts