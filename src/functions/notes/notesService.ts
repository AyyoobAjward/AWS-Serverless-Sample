import { DeleteCommand, PutCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@libs/db";

const fetchAllNotes = async (): Promise<any[]> => {
  try {
    const scanCommand = new ScanCommand({
      TableName: 'notes',
    });

    const response = await docClient.send(scanCommand);
    console.log(`Got the notes: ${JSON.stringify(response.Items)}`);
    return response.Items || [];
  } catch (error) {
    console.error(`Error fetching notes:`, error);
    throw error;
  }
};

const createNoteInDB = async (note: any): Promise<any> => {
    try {
      const putCommand = new PutCommand({
        TableName: "notes",
        Item: note,
      });
  
      await docClient.send(putCommand);
      return note;
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  };
  

  const updateNoteInDB = async (id: any, updates: any): Promise<any> => {
    try {
      const updateCommand = new UpdateCommand({
        TableName: "notes",
        Key: { id }, 
        UpdateExpression: "set #title = :title, #content = :content",
        ExpressionAttributeNames: {
          "#title": "title",
          "#content": "content",
        },
        ExpressionAttributeValues: {
          ":title": updates.title,
          ":content": updates.content,
        },
        ReturnValues: "ALL_NEW",
      });
  
      const result = await docClient.send(updateCommand);
      return result.Attributes;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  };
  

  const deleteNoteInDB = async (id: any): Promise<any> => {
    console.log('id:', id);
    try {
      const deleteCommand = new DeleteCommand({
        TableName: "notes",
        Key: { id: id }
      });
  
      await docClient.send(deleteCommand);
      return { message: `Note with id ${id} deleted.` };
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  };
  

export {
  fetchAllNotes,
  createNoteInDB,
  updateNoteInDB,
  deleteNoteInDB
};
