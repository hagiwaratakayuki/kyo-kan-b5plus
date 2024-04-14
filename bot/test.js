// Imports the Google Cloud client library
const { Datastore, Key, PropertyFilter } = require('@google-cloud/datastore');
Symbol('KEY').description
// Creates a client
const datastore = new Datastore();

async function quickstart() {
    // The kind for the new entity

    const kind = 'Task';

    // The name/ID for the new entity
    const name = 'sampletask2';

    // The Cloud Datastore key for the new entity
    const taskKey = datastore.key([kind]);

    // Prepares the new entity
    const task = {
        key: taskKey,
        data: {
            description: 'coffe',
        },
    };


    await datastore.save(task);
    console.dir(task.key)

    console.log(`Saved ${task.key.name}: ${task.data.description}`);
    const query = datastore.createQuery('Task');
    query.filter(new PropertyFilter('description', '=', 'coffe'))
    query.limit(1)

    /**
     * @type {[Any, import("@google-cloud/datastore/build/src/query").RunQueryInfo]}
     */
    const [result, info] = await query.run();
    console.dir(info)
    console.log(result[0][Datastore.KEY])
    res = await query.start(info.endCursor).run();
    /**
     * @type {[Any, import("@google-cloud/datastore/build/src/query").RunQueryInfo]}
     */
    const [result2, info2] = await query.run();

    return result2[0][Datastore.KEY]

    const [response] = await datastore.get(taskKey)

    console.dir(response[Datastore.KEY])
}
quickstart().then(console.log);
