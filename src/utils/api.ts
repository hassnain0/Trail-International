const fetchData = async (url: string | URL | Request, method = 'GET', body = null, token: any) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    };
  
    const options = {
      method,
      headers,
    };
  
    if (body) {
        // @ts-ignore
      options.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };
  