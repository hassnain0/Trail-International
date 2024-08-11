import axios from 'axios';


const Token = "61612befa2d17aa1183ace6d247ccb98ac3ccfa4";


export const submitData = async data => {
  const url = 'https://kc.kobotoolbox.org/api/v1/submissions';
  try {
    const response = await axios.post(url, data, {
      auth: {
        username: 'trail',
        password: 'hassnain12@',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (Error) {
    console.log(Error);
  }
};



export const updateForm = async (formId, submissionId, data) => {

  const url = `https://kc-eu.kobotoolbox.org/api/v2/assets/${formId}/data/${submissionId}/`;

  try {
    await axios.put(url, data, {
      headers: {
        'Authorization': `Token ${Token}`,
        'Content-Type': 'application/json',
        'Referer': 'https://kc-eu.kobotoolbox.org/'
      }
    });
    console.log('Form updated successfully');
  } catch (error) {
    if (error.response) {
      console.error('Error updating the form:', error.response.data);
      console.error('Status Code:', error.response.status);
    } else {
      console.error('Error message:', error.message);
    }
  }
}




//Get Forms Method
export const getForms = async () => {
  try {
    const api =`https://kc.kobotoolbox.org/api/v1/data`;
    const response = await axios.get(api, {
      headers: {
        Authorization: `Token ${Token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.data) {
      console.log(response.data)
      return response.data?.results;
    }
  } catch (err) {
    console.log('Error', err);
  }
};




// Delete Form Method

export const deleteForm = async formId => {
  try {
    const api = `https://eu.kobotoolbox.org/api/v2/assets/aq5sZfR2PcLxCj5jdsmcBQ/data/${formId}/`;
    const response = await axios.delete(api, {
      headers: {
        Authorization: 'Token fe3b7bc9cb1df4c1d15bff055a0c47b49aecb171',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 204) {
      console.log(`Form with ID ${formId} deleted successfully`);
      return response.status;
    }
  } catch (err) {
    console.error(
      'Error deleting the form:',
      err.response?.data || err.message,
    );
    return false;
  }
};
