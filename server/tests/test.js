
const request = require('supertest')
const app = require('./app.js')
const db = require("./db");

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//Randomly generate a user
const sample_name = makeid(10)
const sample_password = makeid(5)

//Randomly generate a group name
const groupName = makeid(8)

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
    describe("User get routes tests", ()=> {
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

      // a user has a lot of other fields, so if you want to go into the db to compare the fields, you can do that. Data is stored in the response.body
    })

    //Testing get /users/getUserdata/:_id
    test("Get user data from wrong user id", async ()=> {
      const response = await request(app).get('/users/getUserdata' + non_existent_user_id )
      expect(response.statusCode).toBe(200)
      expect(response.text).toBe('User not found')
    })
    })
    
    

    describe("User post routes tests", ()=> {
      const sample_user = {
        name: sample_name,
        password: sample_password,
        coins: 1
      }
      test("Create user", async () =>{
        const response = await request(app).post('/users/createUser').send(sample_user)
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toBe(sample_name)
      })

      test("Authenticate user", async ()=> {
        const response = await request(app).post('/users/authenticate').send(sample_user)
        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe('Authentication successful!')

      })
    })

    describe("User put routes tests",  ()=> {
      test("Update user", async ()=> {
        const sample_user = await request(app).get('/users/' + sample_name)
        const sample_user_id = sample_user.body._id

        const user_to_update = {
          userID: sample_user_id,
          data: {
            name:"updating name",
            coin: 0
          }
        }
        const response = await request(app).put('/users/updateUser').send(user_to_update)
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toBe("updating name")
        expect(response.body.coins).toBe(1)

      })
      
    })

  });
  
})