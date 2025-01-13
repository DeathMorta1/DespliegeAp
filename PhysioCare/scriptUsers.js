const mongoose = require('mongoose');

const User = require('./models/users.js');

async function loadData() {
    try{
        await User.deleteMany({});

        const users = [
            new User({
                login: 'Pepe',
                password: 'a123456',
                rol: 'admin'
            }),
            new User({
                login: 'Mario',
                password: 'b123456',
                rol: 'physio'
            }),
            new User({
                login: 'Andrea',
                password: 'c123456',
                rol: 'physio'
            }),
            new User({
                _id:'67587ac98b351540a21dd8d7',
                login: 'José',
                password: 'd123456',
                rol: 'patient'
            })
        ];

        // Save all files using Promise.all
        const savedUsers = await Promise.all(users.map(user => user.save()));
        console.log('Added users:', savedUsers);

        mongoose.disconnect();
        console.log('Data successfully loaded and disconnected from MongoDB');
    } catch (error) {
        console.error('Error loading data:', error);
        mongoose.disconnect();
    }
}

mongoose.connect('mongodb://localhost:27017/physiocare')
  .then(() => {
    console.log('Successful connection to MongoDB');
    loadData();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });