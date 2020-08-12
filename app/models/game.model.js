const sql = require('./db.js');

// TODO: do we need a getAllByPlatform, regardless of status? Right now, it requires status

// Constructor
const Game = function(game) {
    this.title = game.title;
    this.platform = game.platform;
    this.platform_type = game.platform_type;
    this.status = game.status;
    this.cover_url = game.cover_url;
    this.rating = game.rating;
    this.notes = game.notes;

    // Set defaults if not provided - for optional fields
    // If field is not provided in an update / PUT, it will be overwritten
    if (this.cover_url == null)
        this.cover_url = '';
    if (this.rating == null)
        this.rating = -1;
    if (this.notes == null)
        this.notes = '';
};

// Create new Game
Game.create = (game, result) => {
    sql.query(
        'INSERT INTO games SET title = ?, platform = ?, platform_type = ?, status = ?, cover_url = ?, rating = ?, notes = ?',
        [game.title, game.platform, game.platform_type, game.status, game.cover_url, game.rating, game.notes],
        (err, res) => {
        if (err) {
            console.log('Error creating new game: ', err);
            result(err, null);
            return;
        }

        console.log('Created new game: ', { id: res.insertId, ...game });
        result(null, { id: res.insertId, ...game });
    });
};

// Find Game by gameId
Game.findById = (gameId, result) => {
    sql.query('SELECT * FROM games WHERE id = ?', gameId, (err, res) => {
        if (err) {
            console.log('Error finding game with given id : ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found game with given id: ', res);
            result(null, res[0]);
            return;
        }

        // Game with that id was not found
        result({ kind: 'not_found' }, null);
    });
};

// Update Game by gameId
Game.updateById = (gameId, game, result) => {
    sql.query(
        'UPDATE games SET title = ?, platform = ?, platform_type = ?, status = ?, cover_url = ?, rating = ?, notes = ? WHERE id = ?',
        [game.title, game.platform, game.platform_type, game.status, game.cover_url, game.rating, game.notes, gameId],
        (err, res) => {
            if (err) {
                console.log('Error updating game: ', err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // Game with that ID was not found
                result({ kind: 'not_found' }, null);
                return;
            }

            console.log('Updated game: ', { id: gameId, ...game });
            result(null, { id: gameId, ...game });
    });
};

// Update status for Game with gameId
Game.updateStatusById = (gameId, status, result) => {
    sql.query(
        'UPDATE games SET status = ? WHERE id = ?', [status, gameId], (err, res) => {
            if (err) {
                console.log('Error updating status for game: ', err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // Game with that ID was not found
                result({ kind: 'not_found' }, null);
                return;
            }

            console.log('Updated status for game: ', { id: gameId, status });
            result(null, { id: gameId, status });
        });
};

// Update rating for Game with gameId
Game.updateRatingById = (gameId, rating, result) => {
    sql.query(
        'UPDATE games SET rating = ? WHERE id = ?', [rating, gameId], (err, res) => {
            if (err) {
                console.log('Error updating rating for game: ', err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // Game with that ID was not found
                result({ kind: 'not_found' }, null);
                return;
            }

            console.log('Updated rating for game: ', { id: gameId, rating });
            result(null, { id: gameId, rating });
        });
};

// Delete Game by gameId
Game.delete = (gameId, result) => {
    sql.query('DELETE FROM games WHERE id = ?', gameId, (err, res) => {
        if (err) {
            console.log('Error deleting game: ', err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // Game with that gameId was not found
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Deleted game with gameId: ', gameId);
        result(null, res);
    });
};

// Find all games with a particular status
Game.findAllByStatus = (status, result) => {
    sql.query('SELECT * FROM games WHERE status = ?', status, (err, res) => {
        if (err) {
            console.log('Error finding all games with status: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found games with status: ', res);
            result(null, res);
            return;
        }

        // No games with status were found
        result({ kind: 'not_found' }, null);
    });
};

// Find all games on a particular platform
Game.findAllByPlatform = (platform, result) => {
    sql.query('SELECT * FROM games WHERE platform = ?', platform, (err, res) => {
        if (err) {
            console.log('Error finding all games on platform: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found games on platform: ', res);
            result(null, res);
            return;
        }

        // No games on platform were found
        result({ kind: 'not_found' }, null);
    });
};

// Find all games with a particular platform_type
Game.findAllByPlatformType = (platform_type, result) => {
    sql.query('SELECT * FROM games WHERE platform_type = ?', platform_type, (err, res) => {
        if (err) {
            console.log('Error finding all games with platform_type: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found games with platform_type: ', res);
            result(null, res);
            return;
        }

        // No games with platform_type were found
        result({ kind: 'not_found' }, null);
    });
};

// Find all games with a particular status with given platform
Game.findAllByStatusAndPlatform = (status, platform, result) => {
    sql.query('SELECT * FROM games WHERE status = ? AND platform = ?', [status, platform], (err, res) => {
        if (err) {
            console.log('Error finding all games by status and platform: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found games with specified status and platform: ', res);
            result(null, res);
            return;
        }

        // No games with status and platform were found
        result({ kind: 'not_found' }, null);
    });
};

// Find all games with a particular status and platform type
Game.findAllByStatusAndPlatformType = (status, platform_type, result) => {
    sql.query('SELECT * FROM games WHERE status = ? AND platform_type = ?', [status, platform_type], (err, res) => {
        if (err) {
            console.log('Error finding all games by status and platform_type: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found games with specified status and platform_type: ', res);
            result(null, res);
            return;
        }

        // No games with status and platform_type were found
        result({ kind: 'not_found' }, null);
    });
};

// Pick a random game with the given status and platform type
Game.findRandomByStatusAndPlatformType = (status, platform_type, result) => {
    sql.query('SELECT * FROM games WHERE status = ? AND platform_type = ? ORDER BY RAND() LIMIT 1', [status, platform_type], (err, res) => {
        if (err) {
            console.log('Error finding all games by status and platform_type: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found games with specified status and platform_type: ', res);
            result(null, res);
            return;
        }

        // No games with the given status and platform type were found
        result({ kind: 'not_found' }, null);
    });
};

// Pick a random game with the given status and platform
Game.findRandomByStatusAndPlatform = (status, platform, result) => {
    sql.query('SELECT * FROM games WHERE status = ? AND platform = ? ORDER BY RAND() LIMIT 1', [status, platform], (err, res) => {
        if (err) {
            console.log('Error finding all games by status and platform: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found games with specified status and platform: ', res);
            result(null, res);
            return;
        }

        // No games with the given status and platform were found
        result({ kind: 'not_found' }, null);
    });
};

module.exports = Game;
