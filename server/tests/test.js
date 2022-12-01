const request = require('supertest')
const app = require('../app.js')
const db = require("../db");

describe("initializing test", () => {

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  describe("Test validation, should always pass", ()=> {
    it("Test initialization", ()=> {
      expect(true).toBe(true);
    });
  })

  describe("User routes tests", ()=> {
    test_user_name = 'test'
    test_user_id = '635c25c9eaed95a24c491f7d'

    non_existent_user_id ='dadadad'

    //Testing get /users/:name
    test("Get user id from username", async ()=> {
      const response = await request(app).get('/users/' + test_user_name)
      expect(response.statusCode).toBe(200)
      expect(response.body._id).toBe(test_user_id)
    });

    //Testing get /users/getGroups/:_id
    test("Get list of groups from user id", async ()=> {
      const response = await request(app).get('/users/getGroups' + test_user_id)
      expect(response.statusCode).toBe(200)
      expect(response.body).toStrictEqual({})
    })

    //Testing get /users/getTasks/:_id
    test("Get list of tasks from user id", async ()=> {
      const response = await request(app).get('/users/getTasks' + test_user_id)
      expect(response.statusCode).toBe(200)
      expect(response.body).toStrictEqual({})
    })

    //Testing get /users/getUserdata/:_id
    test("Get user data from user id", async ()=> {
      const response = await request(app).get('/users/getUserdata' + test_user_id)
      expect(response.statusCode).toBe(200)
      console.log(response)
      expect(response).toBe(test_user_id)
    })

    //Testing get /users/getUserdata/:_id
    test("Get user data from wrong user id", async ()=> {
      const response = await request(app).get('/users/getUserdata' + non_existent_user_id )
      expect(response.statusCode).toBe(200)
      console.log(response)
      expect(response.text).toBe('User not found')
    })
  });






  
})