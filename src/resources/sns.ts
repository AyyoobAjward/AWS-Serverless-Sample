export default {
    EmployeeCreate: {
        Type: 'AWS::SNS::Topic',
        Propeties: {
            TopicName: 'employee-create-topic-${sls:stage}'
        }
    }
}