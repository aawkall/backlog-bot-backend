const gameValidator = require('./game.validator.js');

/* Routes:
   /games: POST (create)
   /games/:gameId: DELETE
   /games/random/platform/:platform GET (random with given platform)
   /games/random/platformType/:platformType GET (random with given platformType)
*/

module.exports = app => {
    const games = require('../controllers/game.controller.js');

    // Create new Game
    app.post('/games',
        gameValidator.validateGame,
        games.createNewGame);

    // Delete Game by gameId
    app.delete('/games/:gameId',
        gameValidator.validateGameId,
        games.deleteGame);

    // Get random game with platform
    app.get('/games/random/platform/:platform',
        gameValidator.validatePlatform,
        games.getRandomGameWithPlatform);

    // Get random game with platform type
    app.get('/games/random/platformType/:platformType',
        gameValidator.validatePlatformType,
        games.getRandomGameWithPlatformType);
};
