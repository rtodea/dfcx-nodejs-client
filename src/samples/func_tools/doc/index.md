# Using `FuncTools` with Agent Builder Agent App (ABAA) bots

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
