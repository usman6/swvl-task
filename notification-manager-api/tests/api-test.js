const server = require('../src/bin/www');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

//Language

describe('Language', () => {
    describe('/GET languages', () => {
        it('it should GET languages', (done) => {
            chai.request(server)
                .get('/api/v1/language')
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });
});

describe('Query languages', () => {
    it('it should GET a message', (done) => {
        chai.request(server)
            .post('/api/v1/language/query')
            .set('content-type', 'application/json')
            .send({
                "pageSize": 100,
                "query": [
                    {
                        "action": "$eq",
                        "name": "id",
                        "value": 1
                    }
                ]
            })
            .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                done();
            });
    });
});

//Customer

describe('Customer', () => {
    describe('/GET customer', () => {
        it('it should GET customers', (done) => {
            chai.request(server)
                .get('/api/v1/customer')
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });
});

describe('Customer', () => {
    describe('/GET 1 customer', () => {
        it('it should GET one customer', (done) => {
            chai.request(server)
                .get('/api/v1/customer/1')
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });
});

describe('Query customers', () => {
    it('it should GET customers', (done) => {
        chai.request(server)
            .post('/api/v1/customer/query')
            .set('content-type', 'application/json')
            .send({
                "pageSize": 100,
                "query": [
                    {
                        "action": "$eq",
                        "name": "id",
                        "value": 1
                    }
                ]
            })
            .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                done();
            });
    });
}); 


//Notification Category

describe('Notification Category', () => {
    describe('/GET All', () => {
        it('it should GET notification categories', (done) => {
            chai.request(server)
                .get('/api/v1/notification-category')
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });
});

describe('Query notification categories', () => {
    it('it should return notification categories', (done) => {
        chai.request(server)
            .post('/api/v1/notification-category/query')
            .set('content-type', 'application/json')
            .send({
                "pageSize": 100,
                "query": [
                    {
                        "action": "$eq",
                        "name": "id",
                        "value": 1
                    }
                ]
            })
            .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                done();
            });
    });
}); 

//Notification Type

describe('Notification Type', () => {
    describe('/GET All', () => {
        it('it should GET notification types', (done) => {
            chai.request(server)
                .get('/api/v1/notification-type')
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });
});

describe('Query notification types', () => {
    it('it should return notification types', (done) => {
        chai.request(server)
            .post('/api/v1/notification-type/query')
            .set('content-type', 'application/json')
            .send({
                "pageSize": 100,
                "query": [
                    {
                        "action": "$eq",
                        "name": "id",
                        "value": 1
                    }
                ]
            })
            .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                done();
            });
    });
}); 



//Group

describe('Group', () => {
    describe('/GET All', () => {
        it('it should GET groups', (done) => {
            chai.request(server)
                .get('/api/v1/group')
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });
});

describe('Query groups', () => {
    it('it should return groups', (done) => {
        chai.request(server)
            .post('/api/v1/group/query')
            .set('content-type', 'application/json')
            .send({
                "pageSize": 100,
                "query": [
                    {
                        "action": "$eq",
                        "name": "id",
                        "value": 1
                    }
                ]
            })
            .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                done();
            });
    });
}); 


describe('Group customers', () => {
    describe('/GET group customers', () => {
        it('it should GET group customers', (done) => {
            chai.request(server)
                .get('/api/v1/group/1/customer')
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('array');
                    done();
                });
        });
    });
});

describe('home', () => {
    describe('/', () => {
        it('home', (done) => {
            chai.request(server)
                .get('/status')
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });
});

describe('health', () => {
    describe('/', () => {
        it('health', (done) => {
            chai.request(server)
                .get('/status/health')
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });
});




