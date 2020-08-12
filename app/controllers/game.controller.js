const Game = require('../models/game.model.js');
const { validationResult } = require('express-validator');

// TODO: consider adding method that can take in multiple platforms or platform types for the random selector

// Create new Game
exports.createNewGame = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Save Game in DB
    Game.create(new Game(req.body), (err, data) => {
        if (err)
            if (err.code === 'ER_DUP_ENTRY')
                res.status(409).send({ message: 'Game with given title already exists: ' + req.body.title });
            else
                res.status(500).send({
                    message: err.message || 'Unknown error when creating new game'
                });
        else res.status(201).send(data);
    });
};

// Get Game with given gameId
exports.getGameById = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Find game by Id
    Game.findById(req.params.gameId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'Game not found with id: ' + req.params.gameId
                });
            } else {
                res.status(500).send({
                    message: 'Error getting game with id: '+ req.params.gameId
                });
            }
        } else res.send(data);
    });
}

// Update Game by gameId
exports.updateGame = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Update Game in DB
    Game.updateById(req.params.gameId, new Game(req.body), (err, data) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY')
                res.status(409).send({ message: 'Game with given title already exists: ' + req.body.title });
            else if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'Game not found with id: ' + req.params.gameId
                });
            } else {
                res.status(500).send({
                    message: 'Error updating game with id: '+ req.params.gameId
                });
            }
        } else res.send(data);
    });
};

// Update Game - status only
exports.updateGameStatus = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Game.updateStatusById(req.params.gameId, req.body.status, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'Game not found with id: ' + req.params.gameId
                });
            } else {
                res.status(500).send({
                    message: 'Error updating status for game with id: '+ req.params.gameId
                });
            }
        } else res.send(data);
    });
};

// Update Game - rating only
exports.updateGameRating = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Game.updateRatingById(req.params.gameId, req.body.rating, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'Game not found with id: ' + req.params.gameId
                });
            } else {
                res.status(500).send({
                    message: 'Error updating rating for game with id: '+ req.params.gameId
                });
            }
        } else res.send(data);
    });
};

// Delete Game by gameId
exports.deleteGame = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Delete Game from DB
    Game.delete(req.params.gameId, (err) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'Game not found with id: ' + req.params.gameId
                });
            } else {
                res.status(500).send({
                    message: 'Error deleting game with id: '+ req.params.gameId
                });
            }
        } else res.send({ message: 'Game was deleted successfully'});
    });
};

// Get all games with a particular status
exports.getGamesWithStatus = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get all games with a particular status from DB
    Game.findAllByStatus(req.params.status, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'No games found with status: ' + req.params.status
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving games with status: '+ req.params.status
                });
            }
        } else res.send(data);
    });
};

// Get all games on a particular platform
exports.getGamesWithPlatform = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get all games on a particular platform from DB
    Game.findAllByPlatform(req.params.platform, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'No games found on platform: ' + req.params.platform
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving games on platform: '+ req.params.platform
                });
            }
        } else res.send(data);
    });
};

// Get all games with a particular platformType
exports.getGamesWithPlatformType = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get all games with a particular platformType from DB
    Game.findAllByPlatformType(req.params.platformType, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'No games found with platformType: ' + req.params.platformType
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving games with platformType: '+ req.params.platformType
                });
            }
        } else res.send(data);
    });
};

// Get all games with a particular status, filtered by platform
exports.getGamesWithStatusAndPlatform = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get all games with a particular status, filtered by platform from the DB
    Game.findAllByStatusAndPlatform(req.params.status, req.params.platform, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'No games found with status: ' + req.params.status + ' with platform: ' + req.params.platform
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving games with status: ' + req.params.status + ' with platform: ' + req.params.platform
                });
            }
        } else res.send(data);
    });
};

// Get all games with a particular status, filtered by platform type
exports.getGamesWithStatusAndPlatformType = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get all games with a particular status, filtered by platform type from the DB
    Game.findAllByStatusAndPlatformType(req.params.status, req.params.platformType, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'No games found with status: ' + req.params.status + ' with platformType: ' + req.params.platformType
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving games with status: ' + req.params.status + ' with platformType: ' + req.params.platformType
                });
            }
        } else res.send(data);
    });
};

// TODO: need to consider if we want to include OnHold here or not - or give the user an option to not select that
// Add query parameter for OnHold = true, then use this to pass to the DB model method to add
// "status = 'Backlog' OR status = 'OnHold'" to the query. For now, it will only do Backlog

// Get random game with Backlog status with specific platform
exports.getRandomGameWithPlatform = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get random game with Backlog status with specific platform
    Game.findRandomByStatusAndPlatform('Backlog', req.params.platform, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'No games found with Backlog status with platform: ' + req.params.platform
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving games with Backlog status with platform: ' + req.params.platform
                });
            }
        } else res.send(data);
    });
};

// Get random game with Backlog status with specific platform type
exports.getRandomGameWithPlatformType = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get random game with Backlog status with specific platform type
    Game.findRandomByStatusAndPlatformType('Backlog', req.params.platformType, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'No games found with Backlog status with platformType: ' + req.params.platformType
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving games with Backlog status with platformType: ' + req.params.platformType
                });
            }
        } else res.send(data);
    });
};
