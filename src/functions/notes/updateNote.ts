import { middyfy } from "@libs/lambda";
import { clientErrorResponse, serverErrorResponse, successResponse } from "@libs/responses";
import { updateNoteInDB } from "./notesService";
import { APIGatewayEvent } from "aws-lambda";

const updateNote = async (event: APIGatewayEvent) => {
    try {
        if(!event.pathParameters.id) return clientErrorResponse({message: 'no id found'});
        if(!event.pathParameters.body) return clientErrorResponse({message: 'update data not found'});

        const updatedNote = await updateNoteInDB(event.pathParameters.id, event.pathParameters.body)
        return successResponse({
            message: 'note updated successfully!',
            notes: {updatedNote}
        })
    } catch(error) {
        return serverErrorResponse({
            message: `error while updating the note, ${error}`
        })
    }
}   

export const main = middyfy(updateNote);