import { Connection, createConnection, getConnectionOptions } from 'typeorm';

const env = 'gg';
export default async (): Promise<Connection> =>{
    const defaultOptions = await getConnectionOptions();
    return createConnection(
        Object.assign(defaultOptions, {
            database: env === 'test' ? 'nlw04_test' :  defaultOptions.database
        })
    );
}