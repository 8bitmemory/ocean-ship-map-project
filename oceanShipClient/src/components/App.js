import React from 'react';
import './App.css';
import Map from './Map';
import{withScriptjs, withGoogleMap} from 'react-google-maps';


const WrappedMap = withScriptjs(withGoogleMap(Map));

function App() {

  const [input,setInput] = React.useState('');
  const [mmsi, setMmsi] = React.useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div style={{width: "100vw", height: "100vh" }}  className="App">
      <header className="App-header">
        <h1 className="App-title">Ocean Ships Map</h1>
        <p>You may search ship by mmsi if none is specified all will display</p>
        <input type='text' name='mmsi' placeholder='Enter an mmsi'  value={input} onChange={handleChange} />
        <button onClick={() => setMmsi(input)}>submit</button>
      </header>
      <WrappedMap 
        mmsi={mmsi}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
}

export default App;
