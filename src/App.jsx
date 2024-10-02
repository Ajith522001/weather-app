import { useState } from 'react'
import './App.css'

const WeatherDetails=({temp,city,country,lat,log,humidity,wind})=>{
  return(
    <>
      <div className="temp">{temp}°C</div>
      <div className="city">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div className="lat">
          <span>lattitude</span>
          <span>{lat}</span>
        </div>
        <div className="log">
          <span >longitude</span>
          <span>{log}</span>
        </div>
        <div className="humidity">
          <div className="humidity-percent">{humidity}</div>
          <div>humidity</div>
        </div>
        <div className="wind">
          <div className="wind-percent">{wind}</div>
          <div>wind</div>
        </div>
      </div>
    </>
  );
};

function App() {
  const[text,setText]=useState("chennai")
  const [temp,setTemp]= useState(0); 
  const [city,setCity] = useState("chennai");
  const[country,setCountry]=useState("india");
  const[lat,setLat]=useState(0);
  const[log,setLog]=useState(0);
  const[humidity,setHumidity]=useState(0);
  const[wind,setWind]=useState(0);
  const[cityNotFound,setCityNotFound]=useState(false);
  const[loading,setLoading]=useState(false);
  const search=async()=>{
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=21a6f74021c501956232884b8f4b05c9&units=Metric
  `
     try{
      let res=await fetch(url);
      let data=await res.json();
      if(data.cod === "404"){
        console.error("city not found")
        setCityNotFound(true);
        setLoading(false);
        return;
      };
    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setTemp(Math.floor(data.main.temp));
    setCity(data.name);
    setCountry(data.country);
    setLat(data.coord.lat);
    setLog(data.coord.lon);
     }catch(error){
        console.error("An error occurred:",error.message);
     }finally{
      setLoading(false)
     }
  }
  const handleCity=(e)=>{
    setText(e.target.value)
  };
  const handleKeyDown=(e) =>{
    if(e.key === "Enter"){search()}
  }
  
  return (
    <>
     <div>
         <div className="container">
             <div className="input-container">
                <input
                 type="text"
                 className="cityname"
                 placeholder="search city"
                 onChange={handleCity}
                 value={text}
                 onKeyDown={handleKeyDown}
                />
             </div>
              <div className="search-button">
                <button onClick={()=>search()}>search</button>
              </div>
              <div>
                <WeatherDetails temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>
              </div>
         </div>
     </div>
    </>
  );
}

export default App