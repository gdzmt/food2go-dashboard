import React from 'react';
import axios from 'axios';

export function useKsqlDb() {

  function fetch(resource) {
    return new Promise(async (resolve, reject) => {
      await axios.get(`/api/${resource}`)
        .then((res) => {
          resolve(res?.data);
        })
        .catch((err) => {
          console.log(err);
          reject('Data not found');
        });
    });
  }

  return { fetch };
}