import 'babel-polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../../../server';


describe('Test suite for question controller', () => {
  describe('GET /questions, for all questions in the endpoint', () => {
    it('respond with json', (done) => {
      request(app)
        .get('/api/v1/questions')
        .set('Content-Type', 'application/json')
        .expect(200);
      done();
    });
    it('should return an 200 for object', (done) => {
      request(app)
        .get('/api/v1/questions')
        .end((error, res) => {
          expect(res.status).to.eql(200);
          done();
        });
    });
  });
  describe('GET /questions/:id, for single question resource', () => {
    it('should be an object with keys and values', (done) => {
      request(app)
        .get('/api/v1/question/1')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body.id).to.not.equal(null);
          expect(res.body.title).to.not.equal(null);
          expect(res.body.body).to.not.equal(null);
          expect(res.body.answers).to.not.equal(null);
          done();
        });
    });
  });
  describe('POST /questions/, to post single question resource', () => {
    describe('POST /questions', () => {
      it('responds with json', (done) => {
        request(app)
          .post('/questions')
          .send({ title: 'qwerty', body: 'qwerty' })
          .set('Accept', 'application/json')
          .expect(200)
          .end((err) => {
            if (err) return done(err);
            done();
          });
      });
      it('should be an object with keys and values', (done) => {
        request(app)
          .post('/api/v1/question/')
          .set('Accept', 'application/json')
          .expect(200)
          .send({
            id: '1',
            title: 'This is a test',
            body: 'this is a bosy',
          })
          .end((err, res) => {
            expect(res.err).to.be.not.eql(null);
            expect(res.status).to.be.not.eql(null);
            done();
          });
      });
      it('responds with json', (done) => {
        request(app)
          .post('localhost:3000/api/v1/questions')
          .send({
            id: '1',
            title: 'This is a test',
            body: 'this is a bosy',
            answer: ['one', 'two'],
          })
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            expect(res.body.id).to.not.equal(null);
            expect(res.body.title).to.not.equal(null);
            expect(res.body.body).to.not.equal(null);
            expect(res.body.answers).to.not.equal(null);
            done();
          });
      });
    });
  });
});
