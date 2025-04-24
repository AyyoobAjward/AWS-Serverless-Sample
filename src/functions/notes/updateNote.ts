import { middyfy } from "@libs/lambda";
import { clientErrorResponse, serverErrorResponse, successResponse } from "@libs/responses";
import { updateNoteInDB } from "./notesService";
import { APIGatewayEvent } from "aws-lambda";

const updateNote = async (event: APIGatewayEvent) => {
    try {
        if(!event.pathParameters.id) throw clientErrorResponse({message: 'no id found'});
        if(!event.pathParameters.body) throw clientErrorResponse({message: 'update data not found'});

        const allNotes = await updateNoteInDB(event.pathParameters.id, event.pathParameters.body)
        return successResponse({
            message: 'note updated successfully!',
            notes: {allNotes}
        })
    } catch(error) {
        serverErrorResponse({
            message: `error while updating the note, ${error}`
        })
    }
}   

export const main = middyfy(updateNote);