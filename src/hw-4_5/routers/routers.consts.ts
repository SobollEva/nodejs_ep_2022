export const jwtSecret = Buffer.from('key-secret', 'base64');
export const jwtErrorMessages = {
    failedToken: 'Failed to authenticate token',
    noToken: 'Token is not provided.'
}
