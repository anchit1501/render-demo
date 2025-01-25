import models from '../models/index.js';
import db from '../config/connection.js';
export default async (modelName, collectionName) => {
    try {
        // Check if the model exists in the models object
        const model = models[modelName];
        if (!model || !model.db || !model.db.db) {
            throw new Error(`Model or database connection not found for model: ${modelName}`);
        }
        // Check if the collection exists
        const modelExists = await model.db.db.listCollections({
            name: collectionName,
        }).toArray();
        // If the collection exists, drop it
        if (modelExists.length) {
            await db.dropCollection(collectionName);
        }
    }
    catch (err) {
        throw err;
    }
};
