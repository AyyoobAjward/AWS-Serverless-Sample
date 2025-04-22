import { handlerPath } from "@libs/handler-resolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'greeting', // folder name,
                // request: {
                //     shemas: {
                //         'application/json': schema
                //     }
                // }
            }
        }
    ]
}