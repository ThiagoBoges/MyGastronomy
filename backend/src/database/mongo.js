import { MongoClient } from 'mongodb';


export const Mongo = {
    async connect({ mongoConnectionString, mongoDBName }) {
        try {
              const client = new MongoClient(mongoConnectionString)

              await client.connect()
              const db = client.db(mongoDBName)

              this.client = client 
              this.db = db

              return 'Connected to mongo database successfully!'

        } catch (error) {
            return { text: 'Error during mongo connection', error}
        }
    }
}