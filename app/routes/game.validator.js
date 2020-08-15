const { checkSchema } = require('express-validator');

const platforms = ['nintendo3ds', '3dsemulation', 'pcemulation', 'applearcade', 'ios', 'oculusquest', 'pc', 'ps3', 'ps4', 'vitaemulated', 'psp', 'psvita', 'psvr', 'nintendoswitch', 'wii', 'wiiu', 'xboxone'];
const platform_types =  ['pc', 'console', 'vr', 'handheld', 'mobile'];

exports.validateGameId = checkSchema( {
   gameId: {
       in: ['params'],
       errorMessage: 'gameId must be an integer',
       isInt: true
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
    cover_url: {
        in: ['body'],
        optional: true,
        isURL: true,
        errorMessage: 'cover_url must be a valid URL'
    }
});
