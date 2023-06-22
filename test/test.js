const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../src/app");
chai.use(chaiHttp);
chai.should();


describe("authentication", () => {

    describe("post //api/v1/auth/login", () => {
        it("should login an existing user", (done) => {
            chai.request(app)
                .post('/api/v1/auth/login')
                .send({ email: 'test@email.com', password: 'hjtkrdi333' })
                .end((err, res) => {
                    res.should.have.status(200);
                    done()
                })

        })
    })

    describe("post //api/v1/auth/login", () => {
        it("should not be able to login if they have not registered", (done) => {
            chai.request(app)
                .post('/api/v1/auth/login')
                .send({ email: 'Wronguser@wrongone.com', password: 'wrong!!!!' })
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        })
    })

    describe("post /api/v1/auth/register", () => {
        it("should not create an user without an email", (done) => {
            chai
                .request(app)
                .post("/api/v1/auth/register")
                .send({ name: 'testUser1', password: 'test!!!!', phone: 6518889791 })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    })
})


describe('tests with auth', () => {
    let token;
    // this runs before all the tests in this describe block
    before(async () => {
        const response = await chai.request(app)
            .post('/api/v1/auth/login')
            .send({ email: 'test@email.com', password: 'hjtkrdi333' });
        token = response.body.token

    });

    it("should create a pet entry with valid input", (done) => {
        chai
            .request(app)
            .post("/api/v1/pets")
            .auth(token, { type: 'bearer' })
            .send({
                petSituation: "lost", animalType: "dog", petLocation: "55075", petDate: "1/10/2023", 
                "contact.email": "test@email.com",
                "contact.phone": 4567891230,
                "contact.name": "jentester",
                "userID": "6489f2a2ac183c68df633a86"

            })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    })
    it("should not create an activity entry without valid input", (done) => {
        chai
            .request(app)
            .post("/api/v1/pets")
            .auth(token, { type: 'bearer' })
            .send({ situation: "lost" })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    })
})

