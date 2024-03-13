const graphql = require("graphql");
const User = require("../models/user");
const Location = require("../models/location");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    created_at: { type: GraphQLString },
    locations: {
      type: new GraphQLList(LocationType),
      resolve(parent, args) {
        return Location.find({ user_id: parent.id });
      },
    },
  }),
});

const LocationType = new GraphQLObjectType({
  name: "Location",
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    name: { type: GraphQLString },
    latitude: { type: GraphQLString },
    longitude: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.user_id);
      },
    },
  }),
});

const RootQuery = new graphql.GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    location: {
      type: LocationType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Location.findById(args.id);
      },
    },
    loginUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const user = await User.findOne({ email: args.email });
        if (!user) {
          throw new Error("No such user found");
        }

        const valid = args.password === user.password;
        if (!valid) {
          throw new Error("Invalid password");
        }

        return user;
      },
    },
    locationsByUser: {
      type: new GraphQLList(LocationType),
      args: { user_id: { type: GraphQLID } },
      resolve(parent, args) {
        return Location.find({ user_id: args.user_id });
      },
    },
  },
});

const Mutation = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: new graphql.GraphQLNonNull(GraphQLString) },
        password: { type: new graphql.GraphQLNonNull(GraphQLString) },
        email: { type: new graphql.GraphQLNonNull(GraphQLString) },
        created_at: { type: new graphql.GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const existingUser = await User.findOne({ email: args.email });
        if (existingUser) {
          throw new Error("User already exists");
        }

        let user = new User({
          username: args.username,
          password: args.password,
          email: args.email,
          created_at: args.created_at,
        });
        return user.save();
      },
    },
    addLocation: {
      type: LocationType,
      args: {
        user_id: { type: new graphql.GraphQLNonNull(GraphQLID) },
        name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        latitude: { type: new graphql.GraphQLNonNull(GraphQLString) },
        longitude: { type: new graphql.GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        let location = new Location({
          user_id: args.user_id,
          name: args.name,
          latitude: args.latitude,
          longitude: args.longitude,
        });
        return location.save();
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
