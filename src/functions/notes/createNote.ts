import { middyfy } from "@libs/lambda";
import { clientErrorResponse, serverErrorResponse, successResponse } from "@libs/responses";
import { createNoteInDB } from "./notesService";
import { APIGatewayEvent } from "aws-lambda";

const createNote = async (event: APIGatewayEvent) => {
    try {
        if(!event.body) return clientErrorResponse({message: 'no create body found'})
        const createdNote = await createNoteInDB(event.body)
        return successResponse({
            message: 'note created successfully!',
            notes: {createdNote}
        })
    } catch(error) {
        return serverErrorResponse({
            message: `error while creating the note, ${error}`
        })
    }
}   

export const main = middyfy(createNote);