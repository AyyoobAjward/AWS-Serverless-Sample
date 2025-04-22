import { successResponse } from "@libs/api-gateway"
import { middyfy } from "@libs/lambda";

const greeting = () => {
    return successResponse({
        message: "Hello World"
    })
}

export const main = middyfy(greeting);