# pui-newsmanager-web

## Requirements

* node 8+ with npm

## Quick start

1. run `npm install`
2. run `npm run server`
3. open http://localhost:8080



## Edit/create page

The access to this pages is allowed only if the user is logged in.

### Usage of Summernote

We imported Summernote as an external library. It's a WYSIWYG plugin that allow us to create a HTML code
directly from the UI.

### Implementation of toast

We also imported ngToast. It's a library that allow to display notifications to the user. Like that
we are able inform users while update or creating a new post: if the modification was taking into
account or if something went wrong (no internet connection for instance).
