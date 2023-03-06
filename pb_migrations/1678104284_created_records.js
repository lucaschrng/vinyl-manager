migrate((db) => {
  const collection = new Collection({
    "id": "phw92ieejbrbde6",
    "created": "2023-03-06 12:04:44.929Z",
    "updated": "2023-03-06 12:04:44.929Z",
    "name": "records",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "sbiuux5m",
        "name": "user_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "mce9lxpn",
        "name": "artist",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "8euw7abu",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "u8ms3fgj",
        "name": "year",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "fbgkiy0n",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "f74qmnf7",
        "name": "cover_url",
        "type": "url",
        "required": true,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "3pualpnm",
        "name": "tracks",
        "type": "json",
        "required": true,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "munip4a4",
        "name": "number_of_lps",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "hykt4czy",
        "name": "color",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("phw92ieejbrbde6");

  return dao.deleteCollection(collection);
})
