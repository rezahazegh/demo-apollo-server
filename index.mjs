import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import {
  addTeacher,
  teacher,
  teachers,
  deleteTeacher,
} from './schema/resolvers/teacher.resolver.js';
import {
  course,
  courses,
  addCourse,
  deleteCourse,
  courseTeacher,
} from './schema/resolvers/course.resolver.js';

const types = await loadSchema('./schema/**/*.gql', {
  loaders: [new GraphQLFileLoader()],
});

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    teacher,
    teachers,
    course,
    courses,
  },
  Mutation: {
    addTeacher,
    deleteTeacher,
    addCourse,
    deleteCourse,
  },
  Course: {
    teacher: courseTeacher,
  },
};

const app = express();
await mongoose.connect('mongodb://localhost:27017/test');
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs: [types],
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);
