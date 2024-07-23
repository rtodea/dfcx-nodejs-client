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

## Sample REST call

```http request
POST https://dialogflow.clients6.google.com/v3alpha1/projects/api-project-604594715070/locations/global/agents/ab6334d6-124b-4a1b-b79c-c80d8a1638ef/sessions/fb4bd9-1a5-9ac-dfd-c15d4b769:detectIntent
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjRmYjk2YjA1NzFlMTQ2OWRjOTc2NDQyOGZiZTA1ZDkwZGMyNjczNDAifQ.eyJpc3MiOiJhcGktcHJvamVjdC02MDQ1OTQ3MTUwNzBAYXBwc3BvdC5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiYXBpLXByb2plY3QtNjA0NTk0NzE1MDcwQGFwcHNwb3QuZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imh0dHBzOi8vZGlhbG9nZmxvdy5nb29nbGVhcGlzLmNvbS8iLCJleHAiOjE3MTYzODQ2MTksImlhdCI6MTcxNjM4MTAxOX0.s3uj8E6AM77BQvWcXg8PZx81wZmVlH6ewcbvy2yO8Q3BrD7IhGv2B_kcPn6cCiKSvteB2U-OoRTNWa2-TYhsvcdKARmBXWlOSt7SWW_HK9clqKQCpIAPiTwWKbrH7D8B7VUfpwB20E-2a1Imbkyd9eE5qn-toNNeq0YxA2Wg1EZURjhkMGOAKGmKRPfVVAawGLnBEzvk5jW4Vwu8AkCqXYtRupzBUWjCnc2jbevAdH_Bxo4V3N9IE6NVXWI123e1ux4DwXzkN9sD0A8sWXj2mpagNi7_QWIS-bdk-ptHU1SSXHFmHtzGXaC9P8CwCzmGIDlXZZ_RkPUdHnNmd-br9w
Content-Type: application/json

{"debugMode":true,"queryInput":{"languageCode":"en-US","text":{"text":"Hi!"}},"queryParams":{"llmModelSettings":{"model":"gemini-pro"},"playbookStateOverride":{"currentSessionTrace":{"actions":[],"name":"projects/api-project-604594715070/locations/global/agents/ab6334d6-124b-4a1b-b79c-c80d8a1638ef/playbooks/00000000-0000-0000-0000-000000000000/examples/-"}}}}
```