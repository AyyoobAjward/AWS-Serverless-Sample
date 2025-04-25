export default {
    DynamoDB: {
        Type: 'AWS::DynamoDB::Table',
        Propeties: {
            TableName: 'notes'
        },
        KeySchema: {
            AttributeName: 'id'
        },
        
    }
}