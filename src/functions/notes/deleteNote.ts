import { middyfy } from "@libs/lambda";
import { clientErrorResponse, serverErrorResponse, successResponse } from "@libs/responses";
import { deleteNoteInDB } from "./notesService";
import { APIGatewayEvent } from "aws-lambda";

const deleteNote = async (event: APIGatewayEvent) => {
    try {
        if(!event.pathParameters.id) 
        return clientErrorResponse({
            message: 'no id found'
        })

        const deletedNote = await deleteNoteInDB(event.pathParameters.id);
        return successResponse({
            message: 'note deleted successfully!',
            notes: { deletedNote }
        })
    } catch(error) {
        return serverErrorResponse({
            message: `error while deleting the note, ${error}`
        })
    }
}   

export const main = middyfy(deleteNote);