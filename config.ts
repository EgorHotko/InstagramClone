export const Config = {
    DB: {
        DB_USER: "admin",
        DB_PASSWORD: "admin",
        DB_HOST: "localhost",
        DB_NAME: "instagram"
    },
    EMAILDATA: {
        EMAIL: process.env.GMAIL_EMAIL,
        PASSWORD: process.env.GMAIL_PASSWORD
    },
    PHOTOSPATH: `\\photos`,
    STARTPHOTONAME: `startPhoto.jpg`,
    JWT_SECRET: 'ILoveCats',
    COOCKIE_SESSION: {
        name: 'session',
        keys: ['123'],
        maxAge: 60 * 60 * 1000
    }
}
