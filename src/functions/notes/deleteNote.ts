import { middyfy } from "@libs/lambda";
import { clientErrorResponse, serverErrorResponse, successResponse } from "@libs/responses";
import { deleteNoteInDB } from "./notesService";
import { APIGatewayEvent } from "aws-lambda";

const deleteNote = async (event: APIGatewayEvent) => {
    try {
        if(event.pathParameters.id) throw clientErrorResponse({
            message: 'no id found'
        })
        const allNotes = await deleteNoteInDB(event.pathParameters.id)
        return successResponse({
            message: 'note deleted successfully!',
            notes: {allNotes}
        })
    } catch(error) {
        serverErrorResponse({
            message: `error while deleting the note, ${error}`
        })
    }
}   

export const main = middyfy(deleteNote);