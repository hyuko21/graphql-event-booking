const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');
const User = require('./models/user');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
      creator: User!
    }

    type User {
      _id: ID!
      email: String!
      password: String
      createdEvents: [Event!]!
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type RootQuery {
      events: [Event!]!
      users: [User!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events() {
      return Event.find().populate('creator', ['email']);
    },
    users() {
      return User.find().select(['email']);
    },
    async createEvent({ eventInput }) {
      const event = new Event({
        title: eventInput.title,
        description: eventInput.description,
        price: eventInput.price,
        date: new Date(eventInput.date),
        creator: '5d93b1feaf1fb610e35801f7'
      });

      const user = await User.findById(event.creator);

      if (!user) {
        throw Error('User not found');
      }

      user.createdEvents.push(event);
      user.save();

      return event.save();
    },
    async createUser({ userInput }) {
      let user = await User.findOne({ email: userInput.email });

      if (user) {
        throw Error('User already exists')
      }

      user = new User({
        email: userInput.email,
        password: userInput.password
      });

      await user.save();

      return { ...user._doc, password: undefined };
    }
  },
  graphiql: true
}));

mongoose.connect(
  `mongodb+srv://${
    process.env.MONGO_USER
  }:${
    process.env.MONGO_PASSWORD
  }@cluster0-lkk9t.mongodb.net/${
    process.env.MONGO_DB
  }?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  function(err) {
    if (err) {
      console.log(err);
    } else {
      app.listen(3000);
    }
  }
);
