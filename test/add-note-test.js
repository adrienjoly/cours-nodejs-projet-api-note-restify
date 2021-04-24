const user = require('./user');
const notes = require('./notes');
const tests = require('./asserts');

describe('le serveur devrait', () => {
  it("retourner un code 401 avec le message 'Utilisateur non connecté' quand il reçoit une requête HTTP PUT /notes et que l'utilisateur n'est pas connecté", async () => {
    const getNotesResponse = await notes.add(null);
    const getNotesResponseJson = await getNotesResponse.json();

    tests.testError401Response(
      getNotesResponse.status,
      getNotesResponseJson.error
    );
  });

  it('retourner un code 200 avec la propriété error == null quand il reçoit une requête HTTP PUT /notes et que la note a bien été ajoutée', async () => {
    const signinResponse = await user.signin('test', 'test');
    const signinResponseJson = await signinResponse.json();

    const getNotesResponse = await notes.add(signinResponseJson.token);
    const getNotesResponseJson = await getNotesResponse.json();

    tests.testSuccessResponse(
      getNotesResponse.status,
      getNotesResponseJson.error
    );
  });
});
