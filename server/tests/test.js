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
      const response = await request(app).get('/users/getUserdata/' + test_user_id);
      expect(response.statusCode).toBe(200)
      let user_id = response.body._id
      let user_name = response.body.name
      let user_coins = response.body.coins

      expect(user_id).toBe(test_user_id)
      expect(user_name).toBe(test_user_name)
      expect(user_coins).toBe(0)

      //expect({_id: user_id, name: user_name, coins: user_coins}).toBe( { _id: test_user_id, name: test_user_name, coins: 0 } )
    })

    //Testing get /users/getUserdata/:_id
    test("Get user data from wrong user id", async ()=> {
      const response = await request(app).get('/users/getUserdata' + non_existent_user_id )
      expect(response.statusCode).toBe(200)
      expect(response.text).toBe('User not found')
    })
  });






  
})