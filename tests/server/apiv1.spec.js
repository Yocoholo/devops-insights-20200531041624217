
const requireHelper = require('./requireHelper');
const apiv1 = requireHelper.require('routes/apiv1');
const assert = require('chai').assert;
const sinon = require('sinon');

// create mock request and response
let reqMock = {};

let resMock = {};
resMock.status = function() {
  return this;
};
resMock.send = function() {
  return this;
};
resMock.end = function() {
  return this;
};
sinon.spy(resMock, "status");
sinon.spy(resMock, "send");


describe('Get Weather', function() {

  it('with without zip code', function() {
    reqMock = {
      query: {

      }
    };

    apiv1.getWeather(reqMock, resMock);

    assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
  });

  it('with valid zip code and error from request call', function() {
    reqMock = {
      query: {
        zip: 79968
      }
    };

    const request = function( obj, callback ){
      callback("error", null, null);
    };

    apiv1.__set__("request", request);

    apiv1.getWeather(reqMock, resMock);

    assert(resMock.status.lastCall.calledWith(400), 'Unexpected response:' + resMock.status.lastCall.args);
    assert(resMock.send.lastCall.calledWith('Failed to get the data'), 'Unexpected response:' + resMock.send.lastCall.args);
  });

  it('with incomplete zip code', function() {
    reqMock = {
      query: {
        zip: 79968
      }
    };

    const request = function( obj, callback ){
      callback(null, null, {});
    };

    apiv1.__set__("request", request);

    apiv1.getWeather(reqMock, resMock);

    assert(resMock.status.lastCall.calledWith(400), 'Unexpected response:' + resMock.status.lastCall.args);
    assert(resMock.send.lastCall.args[0].msg === 'Failed', 'Unexpected response:' + resMock.send.lastCall.args);
  });

  it('with valid zip code', function() {
    reqMock = {
      query: {
        zip: 79968
      }
    };

    const body = {
      cod: 200,
      name: 'El Paso',
      weather: [
        {
          main: 'cold'
        }
      ],
      main: {
        temp: 78
      }
    };

    const request = function( obj, callback ){
      callback(null, null, body);
    };

    apiv1.__set__("request", request);

    apiv1.getWeather(reqMock, resMock);

    assert(resMock.status.lastCall.calledWith(200), 'Unexpected response:' + resMock.status.lastCall.args);
    assert(resMock.send.lastCall.args[0].city === 'El Paso', 'Unexpected response:' + resMock.send.lastCall.args[0].city);
    assert(resMock.send.lastCall.args[0].weather === 'Conditions are cold and temperature is 78 F', 'Unexpected response:' + resMock.send.lastCall.args[0].weather);
  });
});
