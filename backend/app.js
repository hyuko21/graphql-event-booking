const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');

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
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events() {
      return Event.find();
    },
    createEvent({ eventInput }) {
      const event = new Event({
        title: eventInput.title,
        description: eventInput.description,
        price: eventInput.price,
        date: new Date(eventInput.date)
      });

      return event.save();
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
