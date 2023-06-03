const { rejects } = require('assert');
const fs = require('fs');
const path = require('path');

let items = [];
let categories = [];

function initialize() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, 'data', 'items.json'), 'utf8', (err, data) => {
            if(err) {
                reject('Unable to read items file');
                return;
            }
            items = JSON.parse(data);

            fs.readFile(path.join(__dirname, 'data', 'categories.json'), 'utf8', (err, data) => {
                if (err) {
                reject('Unable to read categories file');
                return;
                }
                categories = JSON.parse(data);

                resolve();
            });
        });
    });
}

function getAllItems() {
    return new Promise((resolve, reject) => {
        if(items.length === 0) {
            reject('No results returned');
            return;
        }
        resolve(items);
    })
}

function getPublishedItems() {
  return new Promise((resolve, reject) => {
    const publishedItems = items.filter((item) => item.published === true);
    if (publishedItems.length === 0) {
      reject("No results returned");
      return;
    }
    resolve(publishedItems);
  });
}

function getCategories() {
  return new Promise((resolve, reject) => {
    if (categories.length === 0) {
      reject("No results returned");
      return;
    }
    resolve(categories);
  });
}

module.exports = {
  initialize,
  getAllItems,
  getPublishedItems,
  getCategories,
};