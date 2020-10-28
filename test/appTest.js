const server = require('../app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

const index = require('../routes/api/index');
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);


describe('Reports', () => {
    describe('GET /reports/kmom01', () => {
        it('Report for week 1', (done) => {
            chai.request(server)
                .get("/reports/week/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.id.should.equal("1");                    
                    // res.body.data.should.be.an("array");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    })
    describe('GET /reports/kmom02', () => {
        it('Report for week 2', (done) => {
            chai.request(server)
                .get("/reports/week/2")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.id.should.equal("2");                    
                    // res.body.data.should.be.an("array");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    })
    describe('POST /register', () => {
        it('Register new user', (done) => {
            chai.request(server)            
                .post('/register')
                .send({ email: 'chaiLatte3', password: '12345678' })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });

                    
                });
      
    })
    describe('POST /login', () => {
        it('Login', (done) => {
            chai.request(server)            
                .post('/login')
                .send({ email: 'chaiLatte3', password: '12345678' })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });

                    
                });
      
    })

    
   
})
