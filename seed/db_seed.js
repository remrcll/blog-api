const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
const faker = require('faker');
const {
  post
} = require('../routes/users');


console.log(`You are running the seed script.`);
console.log(`All your previous data will be purged.`);

// We connect to the database

/** CONNECT TO DB */

mongoose.connect('mongodb://localhost/blog-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on(
  'error',
  console.error.bind(console, 'connection error:')
);

db.once('open', () => {
  console.log(
    `You are connected to the DB. Seed will start now...`
  );
});

(async function () {
 
  // We purge all the users
  try {
    await User.deleteMany({});
    console.log(`All users have been deleted...`);
  } catch (err) {
    console.log(err);
  }

  // We purge all the posts
  try {
    await Post.deleteMany({});
    console.log(`All posts have been deleted...`);
  } catch (err) {
    console.log(err);
  }

  // We create 20 fake users

  const userPromises = Array(20)
    .fill(null)
    .map(() => {
      const user = new User({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        username: faker.lorem.word()
      });

      console.log(
        `We created a user: ${user.firstname} ${user.lastname}`
      );
      return user.save();
    });

  try {
    await Promise.all(userPromises);
    console.log(`All users are saved`);
  } catch (error) {
    console.log(error);
  }

  // We create 5 fake posts for each user
  for await (const userId of User.aggregate([{
    $sort: {
      _id: 1
    }
  }])) {
    const postPromises = Array(5)
      .fill(null)
      .map(() => {
        const post = new Post({
          user_id: userId._id,
          title: faker.lorem.sentence(),
          text: faker.lorem.sentences(),
          date: faker.date.past().toLocaleDateString(),
          image: faker.image.imageUrl(),
        });

        console.log(
          `We created the post: ${post.title} for user ${post.user_id}`
        );
        return post.save();
      });

    try {
      await Promise.all(postPromises);
      console.log(`All posts are saved`);
    } catch (error) {
      console.log(error);
    }
  }

  // We close the db connection
  console.log(
    `We are closing the mongoose connection. Ciaaaaoo!`
  );

  mongoose.connection.close();
  console.log('Connection closed!')
})();