const { checkSchema } = require('express-validator');

const platforms = ['nintendo3ds', '3dsemulation', 'pcemulation', 'applearcade', 'ios', 'oculusquest', 'pc', 'ps3', 'ps4', 'vitaemulated', 'psp', 'psvita', 'psvr', 'nintendoswitch', 'wii', 'wiiu', 'xboxone'];
const platform_types =  ['pc', 'console', 'vr', 'handheld', 'mobile'];
const statuses = ['backlog', 'currentlyplaying', 'completed', 'onhold'];

exports.validateGameId = checkSchema( {
   gameId: {
       in: ['params'],
       errorMessage: 'gameId must be an integer',
       isInt: true
   }
});

exports.validateStatus = checkSchema( {
    shelf: {
        in: ['params'],
        customSanitizer: {
            options: (value, { req }) => {
                return req.params.status.toLowerCase();
            }
        },
        isIn: {
            errorMessage: 'status must be one of: backlog, currentlyplaying, completed, onhold',
            options: [statuses]
        }
    }
});

exports.validatePlatform = checkSchema( {
    platform: {
        in: ['params'],
        customSanitizer: {
            options: (value, { req }) => {
                return req.params.platform.toLowerCase();
            }
        },
        isIn: {
            errorMessage: 'platform must be one of: nintendo3ds, 3dsemulation, pcemulation, applearcade, ios, oculusquest, pc, ps3, ps4, vitaemulated, psp, psvita, psvr, nintendoswitch, wii, wiiu, xboxone',
            options: [platforms]
        }
    }
});

exports.validatePlatformType = checkSchema( {
    platformType: {
        in: ['params'],
        customSanitizer: {
            options: (value, { req }) => {
                return req.params.platformType.toLowerCase();
            }
        },
        isIn: {
            errorMessage: 'platformType must be one of: pc, console, vr, handheld, mobile',
            options: [platform_types]
        }
    }
});

exports.validateUpdateStatus = checkSchema({
    status: {
        in: ['body'],
        exists: true,
        errorMessage: 'status cannot be empty',
        customSanitizer: {
            options: (value, { req }) => {
                if (req.body.status)
                    return req.body.status.toLowerCase().replace(/\s/g, '');
            }
        },
        isIn: {
            errorMessage: 'status must be one of: backlog, currentlyplaying, completed, onhold',
            options: [statuses]
        }
    }
});

exports.validateUpdateRating = checkSchema({
    rating: {
        in: ['body'],
        exists: true,
        errorMessage: 'rating cannot be empty',
        isInt: {
            errorMessage: 'rating must be between 0 and 100',
            options: { min: 0, max: 100 }
        },
        toInt: true
    }
});

exports.validateGame = checkSchema( {
    title: {
        in: ['body'],
        notEmpty: true,
        errorMessage: 'title cannot be empty'
    },
    platform: {
        in: ['body'],
        exists: true,
        errorMessage: 'platform cannot be empty',
        customSanitizer: {
            options: (value, { req }) => {
                if (req.body.platform)
                    return req.body.platform.toLowerCase().replace(/\s/g, '');
            }
        },
        isIn: {
            errorMessage: 'platform must be one of: nintendo3ds, 3dsemulation, pcemulation, applearcade, ios, oculusquest, pc, ps3, ps4, vitaemulated, psp, psvita, psvr, nintendoswitch, wii, wiiu, xboxone',
            options: [platforms]
        }
    },
    platform_type: {
        in: ['body'],
        exists: true,
        errorMessage: 'platform_type cannot be empty',
        customSanitizer: {
            options: (value, { req }) => {
                if (req.body.platform_type)
                    return req.body.platform_type.toLowerCase().replace(/\s/g, '');
            }
        },
        isIn: {
            errorMessage: 'platform_type must be one of: pc, console, vr, handheld, mobile',
            options: [platform_types]
        }
    },
    status: {
        in: ['body'],
        exists: true,
        errorMessage: 'status cannot be empty',
        customSanitizer: {
            options: (value, { req }) => {
                if (req.body.status)
                    return req.body.status.toLowerCase().replace(/\s/g, '');
            }
        },
        isIn: {
            errorMessage: 'status must be one of: backlog, currentlyplaying, completed, onhold',
            options: [statuses]
        }
    },
    cover_url: {
        in: ['body'],
        optional: true,
        isURL: true,
        errorMessage: 'cover_url must be a valid URL'
    },
    rating: {
        in: ['body'],
        optional: true,
        isInt: {
            errorMessage: 'rating must be between 0 and 100',
            options: { min: 0, max: 100 }
        },
        toInt: true
    }
});
