import axios from 'axios';
import { displayMovies } from '../dom.js';

const key = process.env.MOVIEDB_API_SECRET;
const baseUrl = process.env.MOVIEDB_API_LINK;
const url = `${baseUrl}/popular?api_key=${key}&language=en-US&page=1`;
const urlInvolvement = process.env.INVOLVEMENT_API_LINK || 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const idInvolvement = process.env.INVOLVEMENT_ID || 'v0DZEEXmzVXZDs3EcqLI';

const postData = async (id) => {
  try {
    const response = await axios.post(
      `${urlInvolvement}/apps/${idInvolvement}/likes/`,
      {
        item_id: `${id}`,
      },
    );
    return (response.data);
  } catch (error) {
    return error;
  }
};

const addLikes = async (event) => {
  const res = await postData(event.target.id);
  if (res === 'Created') {
    const number = event.target.parentNode.parentNode.childNodes[5].childNodes[0].innerHTML;
    // eslint-disable-next-line max-len
    event.target.parentNode.parentNode.childNodes[5].childNodes[0].innerHTML = (Number(number) + 1);
    event.target.outerHTML = `<i id="${event.target.id}" class="fa fa-heart"></i>`;
  }
};

const likesCounter = () => {
  const items = document.querySelectorAll('.like');
  items.forEach((item) => {
    item.addEventListener('click', addLikes);
  });
};

const getData = async () => {
  const response = await axios.get(`${url}`);
  await displayMovies(response.data.results);
  likesCounter();
};
export {
  getData, likesCounter, addLikes, postData,
};
