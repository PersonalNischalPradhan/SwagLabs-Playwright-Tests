module.exports = {
    urls: {
        swaglabsUrl: 'https://www.saucedemo.com/v1'
    },
    titles: {
        swaglabs: 'Swag Labs'
    },
    account: {
        usernames: ['standard_user', 'problem_user', 'locked_out_user', 'performance_glitch_user'],
        password: 'secret_sauce'
    },
    wrongCredentials: {
        wrongUsernames: ['123Test', 'standard_user1'],
        wrongPasswords: ['password', '234Test'],
        errorMessage: 'Username and password do not match any user in this service'
    },
    errorMessages: {
        lockedOut: 'Sorry, this user has been locked out.',
        '123Test-password': 'Username and password do not match any user in this service',
        '123Test-234Test': 'Username and password do not match any user in this service',
        'standard_user-password': 'Username and password do not match any user in this service',
        'standard_user1-234Test': 'Username and password do not match any user in this service'
    }
};
