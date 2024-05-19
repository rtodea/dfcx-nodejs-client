# Using `FuncTools` with Agent Builder Agent App (ABAA) bots

## References

1. [API availability](https://cloud.google.com/dialogflow/vertex/docs/quick/api)



## Documentation

According to the [official documentation](https://cloud.google.com/dialogflow/vertex/docs/concept/tools#client-side):

```
DetectIntentRequest {
  ...
  query_params {
    playbook_state_override {
      playbook_execution_mode: ALWAYS_CLIENT_EXECUTION
    }
  }
  ...
}
```

so we are replicating this into:

```
{
    session: sessionPath, 
    queryInput:
    {
        text: {
            text,
        },
        languageCode: 'en',
    },
    queryParams: 
    {
        playbookStateOverride: {
            playbookExecutionMode: 'ALWAYS_CLIENT_EXECUTION'
        }
    }
}
```

But looking into the `DetectIntentRequest` type definition from the 
[source file](https://raw.githubusercontent.com/googleapis/google-cloud-node/dialogflow-cx-v4.6.0/packages/google-cloud-dialogflow-cx/protos/protos.d.ts) there is a mismatch:

```
/** QueryParameters parameters */
                        parameters?: (google.protobuf.IStruct|null);

```
there is a mismatch.

We also see this behavior:

```
Error: 3 INVALID_ARGUMENT: 
com.google.apps.framework.request.BadRequestException: 
Session is waiting for tool call result of tool, 05edea2d-dbc2-4ed9-ba62-c0c50dcf2450, and action, TestToolVision1.
```