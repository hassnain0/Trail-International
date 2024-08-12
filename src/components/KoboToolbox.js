import axios from 'axios';

const Token = "61612befa2d17aa1183ace6d247ccb98ac3ccfa4";
const assetId="aVKbqVF39UmEUAggvp5SgE"


export const submitData = async data => {
  const url = 'https://kc-eu.kobotoolbox.org/api/v1/submissions';
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
  try {
    console.log("Token ",Token)
    const apiUrl=`https://kf.kobotoolbox.org/api/v2/assets/${assetId}/data/${submissionId}/enketo/edit/?return_url=false`;
    const response = await axios.get(apiUrl,
      {
        headers: {
          "Authorization": `Token ${Token}`, // Replace with your actual token
        },
      }
    );
    // The URL to open the instance in Enketo for editing
    const enketoEditUrl = response.data.url;
    console.log('Enketo Edit URL:', enketoEditUrl);

    return enketoEditUrl;
  } catch (error) {
    console.error('Error fetching Enketo edit URL:', error.response.data);
    throw error;
  }
}


//Get Forms Method
export const getForms = async () => {
  try {
    const api = `https://kf.kobotoolbox.org/api/v2/assets/${assetId}/data`;
    const response = await axios.get(api, {
      headers: {
        Authorization: `Token ${Token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.data?.results) {
      return response.data?.results;
    }
  } catch (err) {
    console.log('Error', err);
  }
};


// Delete Form Method

export const deleteForm = async formId => {
  try {
    const api = `https://kf.kobotoolbox.org/api/v2/assets/${assetId}/data/${formId}/`;
    const response = await axios.delete(api, {
      headers: {
        Authorization:`Token ${Token}`,
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
