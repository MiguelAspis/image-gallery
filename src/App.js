import React, {useState, useEffect } from 'react';
import Card from './components/Card';
import Search from './components/Search';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState('');


  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=16023096-1f90b67915799ac5fb7d24bad&q=${term}&image_type=photo`)
    .then(res => res.json())
    .then(data => {
      setImages(data.hits);
      setLoading(false);
    })
    .catch(err => console.log(err))
  }, [term])
  
  return (
    <div className="container mx-auto">
      <Search searchText={(text) => setTerm(text)} />

    {!loading && images.legth === 0 && <h1 className="text-5xl 
    text-center mx-auto mt-32">No Images found</h1> }

      {loading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading</h1> : <div className="grid grid-cols-3 gap-4">
        {images.map(image=> 
          <Card key={image.id} image={image}/>
        )}
      </div>}
    </div>
  );
}

export default App;
