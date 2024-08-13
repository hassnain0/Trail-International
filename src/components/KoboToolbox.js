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

// https://kf.kobotoolbox.org/accounts/login/?next=/api/v2/assets/${assetId}/data/119085042/edit/?return_url=false
export const updateForm = async (formId,data) => {
  console.log("data",data)
  const payload = {
    payload:{
    submission_ids: [formId], // Replace with your actual submission ID(s)
    data: data
  }
};
  try {
    const api = `https://kf.kobotoolbox.org/api/v2/assets/${assetId}/data/bulk/`;
    const response = await axios.patch(api, payload, {
     
      headers: {
        "Authorization":`Token ${Token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log('Form updated successfully:', response.data);
      return response.data;
    }
  } catch (err) {
    console.log('Error updating form:', err);
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
