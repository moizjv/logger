// transpile:mocha

import { getDynamicLogger, restoreWriters, setupWriters,
         assertOutputContains } from './helpers';
//import chai from 'chai';
//const expect = chai.expect();

describe('normal logger', () => {
  let writers, log;
  before(() => {
    writers = setupWriters();
    log = getDynamicLogger(false, false);
    log.level = 'silly';
  });

  after(() => {
    restoreWriters(writers);
  });

  it('should not rewrite log levels outside of testing', () => {
    log.silly('silly');
    assertOutputContains(writers, 'silly');
    log.verbose('verbose');
    assertOutputContains(writers, 'verbose');
    log.verbose('debug');
    assertOutputContains(writers, 'debug');
    log.info('info');
    assertOutputContains(writers, 'info');
    log.http('http');
    assertOutputContains(writers, 'http');
    log.warn('warn');
    assertOutputContains(writers, 'warn');
    log.error('error');
    assertOutputContains(writers, 'error');
  });
  it('throw should not rewrite log levels outside of testing and throw error', () => {
    (() => { log.errorAndThrow('msg'); }).should.throw('msg');
    assertOutputContains(writers, 'msg');
  });
});

describe('normal logger with prefix', () => {
  let writers, log;
  before(() => {
    writers = setupWriters();
    log = getDynamicLogger(false, false, 'myprefix');
    log.level = 'silly';
  });

  after(() => {
    restoreWriters(writers);
  });

  it('should not rewrite log levels outside of testing', () => {
    log.silly('silly');
    assertOutputContains(writers, 'silly');
    assertOutputContains(writers, 'myprefix');
    log.verbose('verbose');
    assertOutputContains(writers, 'verbose');
    assertOutputContains(writers, 'myprefix');
    log.verbose('debug');
    assertOutputContains(writers, 'debug');
    assertOutputContains(writers, 'myprefix');
    log.info('info');
    assertOutputContains(writers, 'info');
    assertOutputContains(writers, 'myprefix');
    log.http('http');
    assertOutputContains(writers, 'http');
    assertOutputContains(writers, 'myprefix');
    log.warn('warn');
    assertOutputContains(writers, 'warn');
    assertOutputContains(writers, 'myprefix');
    log.error('error');
    assertOutputContains(writers, 'error');
    assertOutputContains(writers, 'myprefix');
  });
  it('throw should not rewrite log levels outside of testing and throw error', () => {
    (() => { log.errorAndThrow('msg'); }).should.throw('msg');
    assertOutputContains(writers, 'error');
    assertOutputContains(writers, 'myprefix');
  });
});
