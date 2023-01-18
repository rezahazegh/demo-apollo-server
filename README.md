# GraphQL server demo with @apollo/server

## Project Description
This project contains `Course` and `Teacher` entities, It provides create, update and delete for them.

**Entities relation**: Every course would have a teacher.

## Directory Description
* `models`: It includes required mongoose models to store entities in MongoDB
* `schema`: it include GraphQL related stuff
  * `types`: It includes types, something like dto in REST API
  * `resolvers`: It include resolvers, something like route handlers in REST API

## Project Setup
Run `docker compose up -d` to setup MongoDB via docker

Run app and open `localhost:4000` to reach out to Apollo Sandbox (An in-browser tool for writing, validating, and testing GraphQL queries)

## Sample Requests
### Create, Read and Delete Teacher
```
mutation {
  addTeacher(name: "Peter Parker", email: "spiderman@gmail.com", phone: "855-465-2386") {
    id
    name
    email
    phone
  }
}
```
```
{
  teachers {
    id,
    name
  }
}
```
```
{
  teacher(id: "63c421e024a2dcb1e5dcdce6") {
    id,
    name
  }
}
```
```
mutation {
  deleteTeacher(id: "63c421e024a2dcb1e5dcdce6") {
    id,
    name
  }
}
```
### Create, Read, Update and Delete Course
```
mutation {
  addCourse(name: "GraphQL by Spider-Man", description: "This is the project description", status: new, teacherId: "63c424b724a2dcb1e5dcdcef") {
   name
   description
  }
}
```
```
{
  courses {
    id,
    name,
    status
  }
}
```
```
{
  course(id: "63c4252c24a2dcb1e5dcdcf1") {
    id,
    name,
    status
  }
}
```
```
mutation {
  updateCourse(id: "63c4252c24a2dcb1e5dcdcf1", status: completed) {
   name
   status
  }
}
```
```
mutation {
  deleteCourse(id: "63c4252c24a2dcb1e5dcdcf1") {
    id
  }
}
```