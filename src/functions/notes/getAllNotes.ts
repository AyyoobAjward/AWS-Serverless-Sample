import { middyfy } from "@libs/lambda";
import { serverErrorResponse, successResponse } from "@libs/responses";
import { fetchAllNotes } from "./notesService";

const getAllNotes = async () => {
    try {
        const allNotes = await fetchAllNotes();
        return successResponse({
            message: 'All noted fetched successfully!',
            notes: {allNotes}
        })
    } catch(error) {
        serverErrorResponse({
            message: `error while getting the notes, ${error}`
        })
    }
}   

export const main = middyfy(getAllNotes);