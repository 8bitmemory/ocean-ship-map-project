import React from 'react';
import{ GoogleMap, Polyline} from 'react-google-maps';

function useFetch (url) {
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    setLoading(true)

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setError(null)
        setLoading(false)
      })
      .catch((e) => {
        console.warn(e.message)
        setError('Error fetching data. Try again.')
        setLoading(false)
      })
  }, [url])

  return {loading, data, error}
}

const makeUrl= (mmsi) => {
  let queryParam = '';
  if(mmsi){
    queryParam = `?mmsi=${mmsi}`;
  }
  return `http://127.0.0.1:5000/api/ships${queryParam}`;
};

function Map({mmsi}) {
    const mmsiCache = React.useRef(null);

    const url = makeUrl(mmsi);
    const res = useFetch(url,{});

    if (res.loading) {
      return <div>Loading...</div>
    }
  
    if (res.error) {
      return (
        <React.Fragment>
          <p>{res.error}</p>
        </React.Fragment>
      )
    }

    const cordinates = res.data.ships
      .map((item)=>{
        if ((!isNaN(parseFloat(item.x))) && (!isNaN(parseFloat(item.y)))){
          return {mmsi:item.mmsi,lat:parseFloat(item.y),lng:parseFloat(item.x)}
        }    
      })
      .filter(( element ) => {
        return element !== undefined;
      });

    let dict = {};

    cordinates.forEach(element => {
      dict[element.mmsi] = [];
    });

    cordinates.forEach(element => {
      dict[element.mmsi].push({lat:element.lat-.1,lng:element.lng});
      dict[element.mmsi].push({lat:element.lat+.1,lng:element.lng});
    });

    if(!mmsiCache.current){
      mmsiCache.current = dict;
    }

    let lines = []

    for(var key in dict){
      lines.push(
        <Polyline 
            path={dict[key]}
            key={key}
            options={{ 
            strokeColor: '#FF0000',
            strokeOpacity: 1,
            strokeWeight: 4,
              icons: [{ 
                icon: "hello",
                offset: '0',
                repeat: '10px'
              }],
            }}
        />
      );
    }

    if(!mmsiCache.current[mmsi] && mmsi){
      return <div className='Warning-header'><h1> This mmsi number does not exist try another one </h1></div>
    }
      
    return (
      <GoogleMap
        defaultZoom={4} 
        defaultCenter={{ lat: 30.2669444, lng: -97.7427778 }} 
      >        
      {lines}
      </GoogleMap>
    );
  }

export default Map;
