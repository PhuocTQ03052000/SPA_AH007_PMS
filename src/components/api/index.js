import React, { useState, useEffect } from 'react';

// Component con (child component)
const ChildComponent = ({ onApiDataLoad }) => {
  const [apiData, setApiData] = useState('');

  // Simulate fetching data from API
  useEffect(() => {
    const fetchDataFromApi = async () => {
      // Replace the following line with your actual API call
      // For example, using fetch or axios
      const apiResponse = await fetch('https://api.example.com/data');
      const apiData = await apiResponse.json();
      setApiData(apiData);

      // Gọi hàm callback để truyền dữ liệu lên thành phần cha
      onApiDataLoad(apiData);
    };

    fetchDataFromApi();
  }, [onApiDataLoad]);

  return (
    <div>
      <h3>Child Component</h3>
      <p>API Data: {apiData}</p>
    </div>
  );
};

// Component cha (parent component)
const ParentComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [apiDataFromChild, setApiDataFromChild] = useState('');

  const handleChildApiDataLoad = (data) => {
    // Nhận dữ liệu từ component con và xử lý tại đây
    console.log('API Data from child component:', data);

    // So sánh dữ liệu từ component cha và component con
    if (inputValue === data) {
      console.log('Input value matches API data');
    } else {
      console.log('Input value does not match API data');
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  return (
    <div>
      <h2>Parent Component</h2>
      <label>
        Input Value:
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </label>
      <br />
      {/* Truyền hàm callback xuống component con */}
      <ChildComponent onApiDataLoad={handleChildApiDataLoad} />
    </div>
  );
};

export default ParentComponent;
