export const successResponse = (response: Record<string, unknown> | {}) => {
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  }
  
  export const clientErrorResponse = (response: Record<string, unknown> | {}) => {
    return {
      statusCode: 400,
      body: JSON.stringify(response)
    }
  }

  export const serverErrorResponse = (response: Record<string, unknown> | {} ) => {
    return {
      statusCode: 500,
      body: JSON.stringify(response)
    }
  }