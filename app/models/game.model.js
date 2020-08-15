const sql = require('./db.js');

// Constructor
const Game = function(game) {
    this.title = game.title;
    this.platform = game.platform;
    this.platform_type = game.platform_type;
    this.cover_url = game.cover_url;
    this.notes = game.notes;

    // Set defaults if not provided - for optional fields
    // If field is not provided in an update / PUT, it will be overwritten
    if (this.cover_url == null)
        this.cover_url = '';
    if (this.notes == null)
        this.notes = '';
};

// Create new Game
Game.create = (game, result) => {
    sql.query(
        'INSERT INTO games SET title = ?, platform = ?, platform_type = ?, cover_url = ?, notes = ?',
        [game.title, game.platform, game.platform_type, game.cover_url, game.notes],
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

// Pick a random game with the given platform type
Game.findRandomByPlatformType = (platform_type, result) => {
    sql.query('SELECT * FROM games WHERE platform_type = ? ORDER BY RAND() LIMIT 1', platform_type, (err, res) => {
        if (err) {
            console.log('Error finding random game with specified platform_type: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found random game with specified platform_type: ', res);
            result(null, res);
            return;
        }

        // No games with the given platform type were found
        result({ kind: 'not_found' }, null);
    });
};

// Pick a random game with the given platform
Game.findRandomByPlatform = (platform, result) => {
    sql.query('SELECT * FROM games WHERE platform = ? ORDER BY RAND() LIMIT 1', platform, (err, res) => {
        if (err) {
            console.log('Error finding random game with specified platform: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found random game with specified platform: ', res);
            result(null, res);
            return;
        }

        // No games with the given platform were found
        result({ kind: 'not_found' }, null);
    });
};

module.exports = Game;
