const Game = require('../models/game.model.js');
const { validationResult } = require('express-validator');

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


// Get random game with specific platform
exports.getRandomGameWithPlatform = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get random game with specific platform
    Game.findRandomByPlatform(req.params.platform, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'No games found with platform: ' + req.params.platform
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving random game with platform: ' + req.params.platform
                });
            }
        } else res.send(data);
    });
};

// Get random game with specific platform type
exports.getRandomGameWithPlatformType = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get random game with specific platform type
    Game.findRandomByPlatformType(req.params.platformType, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'No games found with platformType: ' + req.params.platformType
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving random game with platformType: ' + req.params.platformType
                });
            }
        } else res.send(data);
    });
};
