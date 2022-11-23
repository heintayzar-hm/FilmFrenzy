import axios from 'axios';

export default class Comments {
  constructor() {
    this.involvementApi = process.env.INVOLVEMENT_API_LINK;
    this.involvementApiId = process.env.INVOLVEMENT_ID;
    this.commentsEndPoint = `/apps/${this.involvementApiId}/comments`;
    this.commentsAllEndPoint = `/apps/${this.involvementApiId}/comments?item_id=`;
  }

    // eslint-disable-next-line consistent-return
    getComments = async (id) => {
      try {
        // eslint-disable-next-line consistent-return
        return await axios.get(`${this.involvementApi}${this.commentsAllEndPoint}${id}`).then((res) => {
          if (res.status === 200) {
            return res;
          }
        });
      } catch (error) {
        if (error.response) {
          return false;
        }
      }
    }

    addComment = async (itemId, username, comment) => {
      try {
        // eslint-disable-next-line consistent-return
        return await axios.post(`${this.involvementApi}${this.commentsEndPoint}`, {
          item_id: itemId,
          username,
          comment,
        }).then((res) => {
          if (res.status === 201) {
            return true;
          }
          throw new Error('Fail');
        });
      } catch (error) {
        throw new Error('Fail');
      }
    }
}