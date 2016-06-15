var superagent = require('superagent');
var expect = require('expect.js');

describe('Test case Pay Orders', function() {
    var encodedData;
    var authorizationHeader;
    var end_point = 'http://localhost:8080';

    before(function() {
        encodedData = new Buffer('23032016:apikey23032016').toString('base64');
        authorizationHeader = 'Basic: ' + encodedData;
    });

    // Right
    it('login sucessful', function(done) {
        superagent.post(end_point + '/api/login')
            .set('Authorization', authorizationHeader)
            .send({
                username: "admin",
                password: "0192023a7bbd73250516f069df18b500"
            })
            .end(function(e, res) {
                
                console.log(res.body);
                
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body.status).to.eql('OK');
                expect(res.body.message).to.eql('Login');
                expect(res.body.data).not.to.eql(null);
                done();
            });
    });
    
    // Wrong
    it('login fail', function(done) {
        superagent.post(end_point + '/api/login')
            .set('Authorization', authorizationHeader)
            .send({
                username: "admin",
                password: "admin123"
            })
            .end(function(e, res) {
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body.status).to.eql('OK');
                expect(res.body.message).to.eql('Login');
                expect(res.body.data).to.eql(null);
                done();
            });
    });

});