const userController = require('../server/controllers/userController');

const request = require('supertest');
const express = require('express');
const apiRouter = require('../server/routes/api');
const { MongoClient } = require('mongodb');
const { ContextExclusionPlugin } = require('webpack');
const { deleteOne } = require('../server/models/userModel');
// run the command below to test just this file
// npm test expressTest

// describe('Test userController.js', () => {

//     test('')


// })
const app = new express();

describe('Test Handlers', function () {
  // {
  //   "_id": "62fd2fcc4cb7c0fba9a157e3",
  //   "spotify_id": "31qr2pztpwio2zzt2rhjjt3m46ta",
  //   "__v": 0,
  //   "display_name": "goose",
  //   "playlist_id": "0xQP1CHAI6J1tKg7FkiYHy"
  // }
    // test('responds to /api/users/create/', () => {
    //     const req = {
    //       spotify_id:  "31qr2pztpwio2zzt2rhjjt3m46ta"
    //     };
    //     const res = {
    //         docs: {
    //             "_id": "62fc5afb46d862e41b9db357",
    //             "spotify_id": "createDoc Id",
    //             "playlist_id": "1234567",
    //             "__v": 0
    //         },
    //         send: function (input) { this.text = input }
    //     };
    //     index(req, res);

    //     expect(res.text).toEqual('hello world!');
    // });

    // test('responds to /hello/:name', () => {
    //     const req = { params: { name: 'Bob' } };

    //     const res = {
    //         text: '',
    //         send: function (input) { this.text = input }
    //     };
    //     hello(req, res);

    //     expect(res.text).toEqual('hello Bob!');
    // });
    test('redirect after /getToken', () => {
      app.use('/api', apiRouter);
      return request(app)
                .get('/api/getToken')
                .expect(301)
                .then(res => {
                  expect(res.headers.location).toContain('#/player');
                  done();
                })
      // status 301 indicates a successful redirection
      // expect(res.status).toEqual(301);
      // expect(res.headers.location).toContain('#/player')
              
    })

});
// import * from '/server/controllers/playlistController.js'
// import * from '../server/controllers/userController.js'

const MONGO_URI = 'mongodb+srv://pantless-thundergoose:thundergeese@cluster0.uhu1iyu.mongodb.net/?retryWrites=true&w=majority';
console.log('what am I?', Object.keys(globalThis))

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = {_id: '12345', username: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});