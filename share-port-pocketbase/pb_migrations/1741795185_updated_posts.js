/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1125843985")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "file2359244304",
    "maxSelect": 1,
    "maxSize": 3000000,
    "mimeTypes": [
      "text/csv",
      "application/json",
      "text/x-python",
      "text/javascript",
      "text/x-php",
      "text/xml",
      "image/svg+xml",
      "text/html",
      "text/plain",
      "application/x-rar-compressed",
      "video/x-matroska",
      "audio/mp4",
      "image/gif",
      "application/vnd.microsoft.portable-executable",
      "image/jpeg",
      "image/vnd.mozilla.apng",
      "application/msword",
      "application/vnd.ms-powerpoint",
      "application/vnd.ms-excel",
      "application/pdf",
      "application/vnd.android.package-archive",
      "application/zip",
      "application/x-7z-compressed"
    ],
    "name": "file",
    "presentable": false,
    "protected": false,
    "required": true,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1125843985")

  // remove field
  collection.fields.removeById("file2359244304")

  return app.save(collection)
})
