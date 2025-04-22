import { successResponse } from "@libs/api-gateway"

const greeting = (event) => {
    return successResponse({
        message: "hello from AWS-Serverless Sample API"
    })
}

export const main = greeting;