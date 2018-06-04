/**
* created by Hemadri Dasari on 02/05/2018
*/

//process.enc['NODE_ENV'] = 'test';
let mocha = require("mocha");
let chai = require('chai'),
	chaiHttp = require('chai-http');

//initialize chai http server
chai.use(chaiHttp);

let should = chai.should(),
	expect = chai.expect;

//import express app server
let server = require('../index');

let country = "us";
let category = "business";
let apiKey = config.apiKey;

describe('News Service', n => {
	describe('Url: /news/data {GET)', () => {
		it('should GET an array of news articles', (done) => {
			chai.request(server)
			.get(`/news/data?country=${country}&category=${category}`)
			.end((err, res) => {
				should.not.exist(err)
				should.exist(res)
				expect(err).to.be.null
				expect(res).to.be.json
				res.should.have.status(200)
				res.body.should.be.an('Object')
				res.body.data.should.be.an('Object')
				res.body.data.articles.should.be.an('Array')
				done()
			});
		});
	});
});