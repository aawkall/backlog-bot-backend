const gameValidator = require('./game.validator.js');

/* Routes:
   /games: POST (create)
   /games/:gameId: GET, PUT (update), DELETE
   /games/:gameId/status: PUT (update status only)
   /games/:gameId/rating: PUT (update rating only)
   /games/status/:status: GET (by status)
   /games/platform/:platform: GET (by platform)
   /games/platformType/:platformType: GET (by platformType)
   /games/status/:status/platform/:platform: GET (by status and platform)
   /games/status/:status/platformType/:platformType: GET (by status and platformType)
   /games/random/platform/:platform GET (from Backlog status with platform)
   /games/random/platformType/:platformType GET (from Backlog status with platformType)
*/

module.exports = app => {
    const games = require('../controllers/game.controller.js');

    // Create new Game
    app.post('/games',
        gameValidator.validateGame,
        games.createNewGame);

    // Get Game with gameId
    app.get('/games/:gameId',
        gameValidator.validateGameId,
        games.getGameById);

    // Update Game by gameId
    app.put('/games/:gameId',
        gameValidator.validateGameId, gameValidator.validateGame,
        games.updateGame);

    // Update Game - status only
    app.put('/games/:gameId/status',
        gameValidator.validateGameId, gameValidator.validateUpdateStatus,
        games.updateGameStatus);

    // Update Game - rating only
    app.put('/games/:gameId/rating',
        gameValidator.validateGameId, gameValidator.validateUpdateRating,
        games.updateGameRating);

    // Delete Game by gameId
    app.delete('/games/:gameId',
        gameValidator.validateGameId,
        games.deleteGame);

    // Get all games with a particular status
    app.get('/games/status/:status',
        gameValidator.validateStatus,
        games.getGamesWithStatus);

    // Get all games on a particular platform
    app.get('/games/platform/:platform',
        gameValidator.validatePlatform,
        games.getGamesWithPlatform);

    // Get all games with a particular platformType
    app.get('/games/platformType/:platformType',
        gameValidator.validatePlatformType,
        games.getGamesWithPlatformType);

    // Get all games with a particular status and platform
    app.get('/games/status/:status/platform/:platform',
        gameValidator.validateStatus, gameValidator.validatePlatform,
        games.getGamesWithStatusAndPlatform);

    // Get all games with a particular status and platform type
    app.get('/games/status/:status/platformType/:platformType',
        gameValidator.validateStatus, gameValidator.validatePlatformType,
        games.getGamesWithStatusAndPlatformType);

    // Get random game from Backlog with platform
    app.get('/games/random/platform/:platform',
        gameValidator.validatePlatform,
        games.getRandomGameWithPlatform);

    // Get random game from Backlog with platform type
    app.get('/games/random/platformType/:platformType',
        gameValidator.validatePlatformType,
        games.getRandomGameWithPlatformType);
};
