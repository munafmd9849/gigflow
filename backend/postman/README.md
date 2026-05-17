# GigFlow Postman Test Setup

## Files

- `GigFlow.postman_collection.json` - complete API test collection.
- `GigFlow.local.postman_environment.json` - local environment with `baseUrl`, `adminToken`, `salesToken`, and `leadId`.

## Import Into Postman

1. Open Postman.
2. Import `postman/GigFlow.postman_collection.json`.
3. Import `postman/GigFlow.local.postman_environment.json`.
4. Select the `GigFlow Local` environment.
5. Start the GigFlow API with MongoDB running.
6. Run the collection from top to bottom.

The collection generates unique admin/sales emails for each run. Login requests automatically save JWTs with `pm.collectionVariables.set()`. The create lead request stores `leadId` for get, update, delete, and RBAC checks.

## Newman

Install Newman if it is not already available:

```bash
npm install --save-dev newman
```

Run the collection:

```bash
newman run postman/GigFlow.postman_collection.json -e postman/GigFlow.local.postman_environment.json
```

Run with CLI summary and exported report:

```bash
newman run postman/GigFlow.postman_collection.json -e postman/GigFlow.local.postman_environment.json --reporters cli,json --reporter-json-export postman/newman-report.json
```

## Suggested npm Scripts

```json
{
  "postman:test": "newman run postman/GigFlow.postman_collection.json -e postman/GigFlow.local.postman_environment.json",
  "postman:test:report": "newman run postman/GigFlow.postman_collection.json -e postman/GigFlow.local.postman_environment.json --reporters cli,json --reporter-json-export postman/newman-report.json"
}
```
