const submitForm = async (formId: any, submissionData: any, token: any) => {
    const url: any = `https://kc.kobotoolbox.org/api/v1/submissions`;
    const body: any = {
      id: formId,
      submission: submissionData,
    };
  
    try {
      const response = await fetchData(url, 'POST', body, token);
      console.log('Form submitted:', response);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  