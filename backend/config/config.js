import dotenv from 'dotenv'
dotenv.config();

const required = (key) => {
    const value = process.env[key];
    if (!value) throw new Error(`Missing env variable: ${key}`);
    return value;
}

export const config = {
    mongoUri:  required('MONGO_URI'),
};