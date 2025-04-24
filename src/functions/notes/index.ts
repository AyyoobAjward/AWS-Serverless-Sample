import { handlerPath } from "@libs/handler-resolver";
import schema from "./schema";

const getAllNotes = {
    handler: `${handlerPath(__dirname)}/getAllNotes.main`,
    name: '${self:service}-{self:provider.stage}-getAllNotes',
    description: 'get all notes',
    events: [
        {
            http: {
                method: 'get',
                path: 'notes'
            }
        }
    ]
}

const createNote = {
    handler: `${handlerPath(__dirname)}/createNote.main`,
    name: '${self:service}-{self:provider.stage}-createNote',
    description: 'get all notes',
    events: [
        {
            http: {
                method: 'post',
                path: 'notes',
                request: {
                    schemas: {
                      'application/json': schema,
                    },
                },
            }
        }
    ]
}

const deleteNote = {
    handler: `${handlerPath(__dirname)}/deleteNote.main`,
    name: '${self:service}-{self:provider.stage}-deleteNote',
    description: 'get all notes',
    events: [
        {
            http: {
                method: 'delete',
                path: 'notes/{id}'
            }
        }
    ]
}

const updateNote = {
    handler: `${handlerPath(__dirname)}/updateNote.main`,
    name: '${self:service}-{self:provider.stage}-updateNote',
    description: 'get all notes',
    events: [
        {
            http: {
                method: 'put',
                path: 'notes/{id}'
            }
        }
    ]
}

export {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote
}