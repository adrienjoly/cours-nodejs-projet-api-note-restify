const user = require('./user');
const notes = require('./notes');
const tests = require('./asserts');

describe('le serveur devrait', () => {
  it("retourner un code 401 avec le message 'Utilisateur non connecté' quand il reçoit une requête HTTP PATCH /notes/:id et que l'utilisateur n'est pas connecté", async () => {
    const patchNoteResponse = await notes.patch(1, null);
    const patchNoteResponseJson = await patchNoteResponse.json();

    tests.testError401Response(
      patchNoteResponse.status,
      patchNoteResponseJson.error
    );
  });

  it("retourner un code 404 avec le message 'Cet identifiant est inconnu' quand il reçoit une requête HTTP PATCH /notes/:id et que :id ne correspond à aucune note stockée dans la base de données", async () => {
    const signinResponse = await user.signin('test', 'test');
    const signinResponseJson = await signinResponse.json();

    const patchNoteResponse = await notes.patch(1, signinResponseJson.token);
    const patchNoteResponseJson = await patchNoteResponse.json();

    tests.testError404Response(
      patchNoteResponse.status,
      patchNoteResponseJson.error
    );
  });

  it("retourner un code 403 avec le message 'Accès non autorisé à cette note' quand il reçoit une requête HTTP PATCH /notes/:id et que l'id de la note appartient à un autre utilisateur", async () => {
    const signinResponse = await user.signin('test', 'test');
    const signinResponseJson = await signinResponse.json();

    const getNotesResponse = await notes.getAll(signinResponseJson.token);
    const getNotesResponseJson = await getNotesResponse.json();

    const signinOtherUserResponse = await user.signin('testt', 'testt');
    const signinOtherUserJson = await signinOtherUserResponse.json();

    const patchNoteResponse = await notes.patch(
      getNotesResponseJson.notes[0]._id,
      signinOtherUserJson.token
    );
    const patchNoteResponseJson = await patchNoteResponse.json();

    tests.testError403Response(
      patchNoteResponse.status,
      patchNoteResponseJson.error
    );
  });

  it('retourner un code 200 avec la propriété error == null quand il reçoit une requête HTTP PATCH /notes/:id et que la note a bien été modifiée', async () => {
    const signinResponse = await user.signin('test', 'test');
    const signinResponseJson = await signinResponse.json();

    const getNotesResponse = await notes.getAll(signinResponseJson.token);
    const getNotesResponseJson = await getNotesResponse.json();

    const patchNoteResponse = await notes.patch(
      getNotesResponseJson.notes[0]._id,
      signinResponseJson.token
    );
    const patchNoteResponseJson = await patchNoteResponse.json();

    tests.testSuccessResponse(
      patchNoteResponse.status,
      patchNoteResponseJson.error
    );
  });
});
