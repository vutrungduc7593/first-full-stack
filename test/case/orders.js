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

    // it('pay orders', function(done) {
    //     superagent.post(end_point + '/api/orders/pay')
    //         .set('Authorization', authorizationHeader)
    //         .send({
    //             ids: ['56f66c5d275425df0a3d87e7', '56f9ec7f6c035c2809a1a7e8', '56f9ed069c2e544209c715b7']
    //         })
    //         .end(function(e, res) {
    //             expect(e).to.eql(null);
    //             expect(typeof res.body).to.eql('object');
    //             expect(res.body.status).to.eql('OK');
    //             expect(res.body.message).to.eql('Paid orders');
    //             expect(res.body.data).not.to.eql(null);
    //             expect(res.body.data).to.eql(3);
    //             done();
    //         });
    // });
    
    it('pay order', function(done) {
        superagent.post(end_point + '/api/orders/pay')
            .set('Authorization', authorizationHeader)
            .send({
                id: '56f66c5d275425df0a3d87e7'
            })
            .end(function(e, res) {
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body.status).to.eql('OK');
                expect(res.body.message).to.eql('Paid orders');
                expect(res.body.data).not.to.eql(null);
                expect(res.body.data).to.eql('56f66c5d275425df0a3d87e7');
                done();
            });
    });

});