import axios from 'axios';
import displayMovies from '../dom.js';

const key = process.env.MOVIEDB_API_SECRET;
const baseUrl = process.env.MOVIEDB_API_LINK;
const url = `${baseUrl}/popular?api_key=${key}&language=en-US&page=1`;
const urlInvolvement = process.env.INVOLVEMENT_API_LINK;
const idInvolvement = process.env.INVOLVEMENT_ID;

const postData = async (id) => {
  const response = await axios.post(
    `${urlInvolvement}/apps/${idInvolvement}/likes/`,
    {
      item_id: `${id}`,
    },
  );
  return (response.data);
};

const getData = async () => {
  const response = await axios.get(`${url}`);
  await displayMovies(response.data.results);
  const items = document.querySelectorAll('.like');
  items.forEach((item) => {
    item.addEventListener('click', async (event) => {
      const res = await postData(item.id);
      if (res === 'Created') {
        const number = event.target.parentNode.parentNode.childNodes[5].childNodes[0].innerHTML;
        // eslint-disable-next-line max-len
        event.target.parentNode.parentNode.childNodes[5].childNodes[0].innerHTML = (Number(number) + 1);
        event.target.outerHTML = `<i id="${item.id}" class="fa fa-heart"></i>`;
      }
    });
  });
};
export default getData;
