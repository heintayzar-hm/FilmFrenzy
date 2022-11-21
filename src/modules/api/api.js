import axios from 'axios';

const involvementUrl = process.env.INVOLVEMENT_API_LINK;

const createInvolvement = async () => {
  try {
    const res = await axios.post(`${involvementUrl}/apps`);
    if (res.status === 201) {
      return (res.data);
    }
    throw new Error('Creating Failed');
  } catch (err) {
    throw new Error('Creating failed');
  }
};

export { createInvolvement };