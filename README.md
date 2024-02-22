# C2E Publisher Service Setup Guide

Please execute the folowing commands cefore starting the App for the first time.

> npm install

> npm run migrate

> npx sequelize-cli db:seed:all

> npm start


# C2E Publisher Service API Documentation (Open API Specification)

Welcome to the Curriki C2E Publisher Service API documentation. :tada: :tada: :tada:

## Table of Contents
- [Base URL](#base-url)
- [Authentication](#authentication)
- [C2E Routes](#c2e-routes)
  - [Publish C2E](#publish-c2e)
  - [Create C2E Manifest](#create-c2e-manifest)
- [C2E Store Routes](#c2e-store-routes)
  - [Get C2E Stores](#get-c2e-stores)
- [API Key Routes](#api-key-routes)

## Base URL

All endpoints are relative to the base URL:
```
https://api.curriki.org/api/v1
```

## Authentication

### API Key

All endpoints require an `x-api-key` header for authentication. Different roles have different API keys for access.

## C2E Routes

### Publish C2E

Endpoint to publish C2E with required entities.

- **URL:** `/c2e/publish`
- **Method:** `POST`
- **Summary:** Publish C2E (called from publisher tool)
- **Consumes:** `application/json`
- **Produces:** `application/json`
- **Parameters:**
  - `x-api-key` (header) - C2E Publisher Service API Key
    - **Type:** string
    - **Default:** APIKey (role: cee-publisher-tool)
    - **Required:** true
  - `payload` (body) - C2E entity details
    - **Type:** [PublishC2ERequest](#publishc2erequest)
    - **Required:** true
- **Responses:**
  - `200`:

    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": true
      }
      ```
  - `400`:

    - **Schema:**
      ```json
      {
        "code": 400,
        "message": "Invalid request payload",
        "result": false
      }
      ```

#### PublishC2ERequest
```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "C2E Title (which would be the as Educational Experience Title)"
    },
    "description": {
      "type": "string",
      "description": "C2E Description (which would be the as Educational Experience description)"
    },
    "creator": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "C2E Creator Name"
        },
        "email": {
          "type": "string",
          "description": "C2E Creator Email"
        }
      }
    },
    "storeId": {
      "type": "string",
      "description": "Unique identifier of the store"
    },
    "workflowItems": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/C2EWorkflowItem"
      }
    }
  }
}
```
> ```workflowItems``` payload object ["#/definitions/C2EWorkflowItem"](#c2eworkflowitem) would be defined as array of following type of objects:

#### C2EWorkflowItem
```json
   "C2EWorkflowItem": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Educational Experience Title"
        },
        "description": {
          "type": "string",
          "description": "Educational Experience description"
        },
        "type": {
          "type": "string",
          "description": "Type of the workflow item (e.g., Educational Experience)"
        },
        "subject": {
          "type": "array",
          "items": {
            "type": "string",
            "description": "Educational Experience Subjects"
          }
        },
        "educationLevel": {
          "type": "array",
          "items": {
            "type": "string",
            "description": "Educational Experience Education Levels"
          }
        },
        "keywords": {
          "type": "array",
          "items": {
            "type": "string",
            "description": "Educational Experience Keywords"
          }
        },
        "url": {
          "type": "string",
          "description": "Educational Experience C2E Protected URL"
        },
        "thumbnailUrl": {
          "type": "string",
          "description": "Educational Experience Thumbnail URL"
        },
        "media": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/C2EMedia"
          }
        }
      }
    }
```    

### Create C2E Manifest

Endpoint to create C2E Manifest.

- **URL:** `/c2e/manifest`
- **Method:** `POST`
- **Summary:** Create C2E Manifest (called from store service)
- **Consumes:** `application/json`
- **Produces:** `application/json`
- **Parameters:**
  - `x-api-key` (header) - API Key
    - **Type:** string
    - **Default:** APIKey (role: cee-store-service)
    - **Required:** true
  - `payload` (body) - C2E Manifest Data
    - **Type:** [CreateC2EManifestRequest](#createc2emanifestrequest)
    - **Required:** true
- **Responses:**
  - `200`:

    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": true
      }
      ```
  - `400`:

    - **Schema:**
      ```json
      {
        "code": 400,
        "message": "Invalid request payload",
        "result": false
      }
      ```

#### CreateC2EManifestRequest
```json
{
  "type": "object",
  "properties": {
    "ceeId": {
      "type": "string",
      "description": "C2E Id (which has already been created in C2E Publisher Service)"
    },
    "previewCeeSubscription": {
      "type": "object",
      "properties": {
        "ceeListingId": {
          "type": "string",
          "description": "C2E Listing Id (which has already been created in C2E Store Service)"
        },
        "type": {
          "type": "string",
          "description": "C2E Subscription Type (e.g., preview) (which has already been created in C2E Store Service)"
        },
        "licenseType": {
          "type": "string",
          "description": "C2E License Type (e.g., Creative Commons) (which has already been created in C2E Store Service)"
        },
        "licenseTerms": {
          "type": "string",
          "description": "C2E License Terms (which has already been created in C2E Store Service)"
        },
        "amount": {
          "type": "string",
          "description": "C2E Subscription Amount (which has already been created in C2E Store Service)"
        },
        "currency": {
          "type": "string",
          "description": "C2E Subscription Currency (e.g., USD) (which has already been created in C2E Store Service)"
        },
        "copyrightNotice": {
          "type": "string",
          "description": "C2E Subscription CopyRight Notice (which has already been created in C2E Store Service)"
        },
        "license": {
          "type": "string",
          "description": "C2E Subscription License (which has already been created in C2E Store Service)"
        },
        "clientId": {
          "type": "string",
          "description": "C2E Subscription Client Id (which is assoicated with Player Service and has already been created in C2E Store Service)"
       

 }
      }
    },
    "licensedCeeSubscription": {
      "type": "object",
      "properties": {
        "ceeListingId": {
          "type": "string",
          "description": "C2E Listing Id (which has already been created in C2E Store Service)"
        },
        "type": {
          "type": "string",
          "description": "C2E Subscription Type (e.g., licensed) (which has already been created in C2E Store Service)"
        },
        "licenseType": {
          "type": "string",
          "description": "C2E License Type (e.g., Creative Commons) (which has already been created in C2E Store Service)"
        },
        "licenseTerms": {
          "type": "string",
          "description": "C2E License Terms (which has already been created in C2E Store Service)"
        },
        "amount": {
          "type": "string",
          "description": "C2E Subscription Amount (which has already been created in C2E Store Service)"
        },
        "currency": {
          "type": "string",
          "description": "C2E Subscription Currency (e.g., USD) (which has already been created in C2E Store Service)"
        },
        "clientId": {
          "type": "string",
          "description": "C2E Subscription Client Id (which is assoicated with Player Service and has already been created in C2E Store Service)"
        }
      }
    }
  }
}
```

## C2E Store Routes

### Get C2E Stores

Endpoint to retrieve C2E Stores (called from publisher tool).

- **URL:** `/c2e-stores`
- **Method:** `GET`
- **Summary:** Get C2E Stores (called from publisher tool)
- **Parameters:**
  - `x-api-key` (header) - Get C2E Stores
    - **Type:** string
    - **Default:** APIKey (role: cee-publisher-tool)
    - **Required:** true
- **Responses:**
  - `200`:

    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": [
          {
            "id": "C2E Store ID",
            "name": "C2E Store Name"
          }
        ]
      }
      ```

## API Key Routes

### Get API Keys

Endpoint to retrieve API Keys.

- **URL:** `/keys`
- **Method:** `GET`
- **Summary:** Get API Keys
- **Parameters:**
  - `Authorization` (header) - Authorization
    - **Type:** string
    - **Default:** Bearer APIKey
    - **Required:** true
- **Responses:**
  - `200`:

    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": [
          {
            "key": "APIKey",
            "clientRole": "cee-publisher-tool | cee-store-service",
            "clientEmail": "demo-c2e-store@curriki.org"
          }
        ]
      }
      ```

---

This README provides a comprehensive overview of the Curriki C2E API endpoints, their functionalities, required parameters, and expected responses. For more detailed information, refer to the OpenAPI spec or the API implementation.

Please replace the placeholders such as `<Base URL>` with your actual API base URL.

Feel free to reach out if you have any questions or need further clarification.
