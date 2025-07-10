const Sequelize = require('sequelize');

class DatabaseManager {
    static instance = null;

    static getInstance() {
        if (!DatabaseManager.instance) {
            const DATABASE_URL = process.env.DATABASE_URL || './database.db';

            DatabaseManager.instance =
                DATABASE_URL === './database.db'
                    ? new Sequelize({
                            dialect: 'sqlite',
                            storage: DATABASE_URL,
                            logging: false,
                      })
                    : new Sequelize(DATABASE_URL, {
                            dialect: 'postgres',
                            ssl: true,
                            protocol: 'postgres',
                            dialectOptions: {
                                native: true,
                                ssl: { require: true, rejectUnauthorized: false },
                            },
                            logging: false,
                      });
        }
        return DatabaseManager.instance;
    }
}

const DATABASE = DatabaseManager.getInstance();

DATABASE.sync()
    .then(() => {
        console.log('𝐉𝐄𝐑𝐑𝐓-𝐌𝐃 𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄 𝐈𝐁𝐒𝐓𝐀𝐋𝐋𝐄𝐃 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋𝐘☄️☃️.');
    })
    .catch((error) => {
        console.error('ERROR UPDATEING THE DATABASE:', error);
    });

module.exports = { DATABASE };
// 𝐂𝐑𝐄𝐃𝐈𝐓 𝐓𝐎 𝐒𝐈𝐋𝐄𝐍𝐓-𝐊𝐈𝐋𝐋𝐄𝐑469♡︎☠︎︎ 
