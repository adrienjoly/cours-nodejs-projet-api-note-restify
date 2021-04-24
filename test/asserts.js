const assert = require('assert');

const tests = {};

tests.testError400Response = (statusCode, error, expectedError) => {
  assert.strictEqual(statusCode, 400);
  assert.strictEqual(error, expectedError);
};

tests.testError401Response = (statusCode, error) => {
  assert.strictEqual(statusCode, 401);
  assert.strictEqual(error, 'Utilisateur non connecté');
};

tests.testError403Response = (statusCode, error) => {
  assert.strictEqual(statusCode, 403);
  assert.strictEqual(error, 'Accès non autorisé à cette note');
};

tests.testError404Response = (statusCode, error) => {
  assert.strictEqual(statusCode, 404);
  assert.strictEqual(error, 'Cet identifiant est inconnu');
};

tests.testSuccessResponse = (statusCode, error) => {
  assert.strictEqual(statusCode, 200);
  assert.strictEqual(error, null);
};

module.exports = tests;
