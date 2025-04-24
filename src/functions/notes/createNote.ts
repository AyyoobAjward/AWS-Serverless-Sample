import { middyfy } from "@libs/lambda";
import { serverErrorResponse, successResponse } from "@libs/responses";
import { createNoteInDB } from "./notesService";
import { APIGatewayEvent } from "aws-lambda";

const createNote = async (event: APIGatewayEvent) => {
    try {
        const allNotes = await createNoteInDB(event.body)
        return successResponse({
            message: 'note created successfully!',
            notes: {allNotes}
        })
    } catch(error) {
        serverErrorResponse({
            message: `error while creating the note, ${error}`
        })
    }
}   

export const main = middyfy(createNote);