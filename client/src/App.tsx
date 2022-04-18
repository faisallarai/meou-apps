import React, { useEffect, useState } from 'react';
import catService from './services/cats';

const App = () => {

  const [imageId, setImageId] = useState('');

  useEffect(() => {
    catService.getAll().then(res => {
      console.log(res.data)
      setImageId(res.data.cat.imageId)
    })
  },[])

  return <div>
    <h1>Hour Cat</h1>
    {imageId && <img
        src={`https://meou-api.s3.us-east-2.amazonaws.com/${imageId}.jpeg`}
        width={260}
        height={360}
        alt=""
      />}
    
   
  </div>;
};

export default App;
