import axios from 'axios';

import { postData } from './api/api.js';

const urlInvolvement = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const idInvolvement = 'v0DZEEXmzVXZDs3EcqLI';
const receiveData = async () => {
  try {
    const response = await axios.get(
      `${urlInvolvement}/apps/${idInvolvement}/likes/`,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
test('like counter is working', async () => {
  const date = (Date.now());
  await postData(date);
  const data = await receiveData();
  const item = data.filter(
    (info) => info.item_id === `${date}`,
  );

  expect(item[0].likes).toBe(1);
});
