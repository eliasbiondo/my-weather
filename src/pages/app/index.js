import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';

import { openweather } from '../../api/weather';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { MainStyledComponent } from '../../components/MainStyledComponent';
import { Container } from '../../components/Container';
import { Menu } from '../../components/Menu';
import { MenuInfo } from '../../components/MenuInfo';
import { Logo } from '../../components/Logo';
import { WeatherData } from '../../components/WeatherData';
import { WeatherDataRow } from '../../components/WeatherDataRow';
import { TemperatureBox } from '../../components/TemperatureBox';
import { ClimaticData } from '../../components/ClimaticData';

export function Main(){

    // Grab the user's local date when page is renderized 
    let date = new Date;

    // Months name
    const months = ['January','February','March','April','May','June','July','August','Septempber','October', 'November', 'December'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Date hooks
    const [month, setMonth] = useState(date.getMonth())
    const [day, setDay] = useState(date.getDate())
    const [dayName, setDayName] = useState(date.getDay())
    const [hours, setHours] = useState(date.getHours())
    const [minutes, setMinutes] = useState(date.getMinutes())

    // Date refresher 
    useEffect(() => {
        setInterval(() => {
            date = new Date;
            setDay(date.getDate())
            setMinutes(date.getMinutes())
            setHours(date.getHours())
        }, 1000)
    }, [])

    // Ordinal Numbers Concordance
    const st = [1, 21, 31];
    const nd = [2, 22];

    function ordinalNumberConcordance(day) {
        if ( st.includes(day) ) {
            return 'st'
        } else if (nd.includes(day)) {
            return 'nd'
        } else {
            return 'th'
        }
    }

    const [location, setLocation] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition( position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            setLocation([lat, lon])

        })
    }, [])


    const [response, setResponse] = useState(false);
    const [weatherUpdateTime, setWeatherUpdateTime] = useState(false);
    const [sunriseTime, setSunriseTime] = useState(false);
    const [sunsetTime, setSunsetTime] = useState(false);
    const [canRender, setRender] = useState(false);

    const isFirstRun = useRef(true);
    useEffect (() => {
            
            if (isFirstRun.current) {
                isFirstRun.current = false;
                return;
            }
            
            async function getData() {
                const res = await openweather.get('/weather', {
                    params: {
                        lat: location[0],
                        lon: location[1],
                        units: 'metric',
                        appid: process.env.REACT_APP_OPEN_WEATHER_SECRET_KEY
                    }
                });
                setResponse(res['data']);
                setWeatherUpdateTime(new Date(res['data']['dt'] * 1000 + res['data']['timezone']))
                setSunriseTime( new Date(res['data']['sys']['sunrise'] * 1000 + res['data']['timezone']))
                setSunsetTime(new Date(res['data']['sys']['sunset'] * 1000 + res['data']['timezone']))
                setRender(1);
            }

            getData();

    }, [location])

    if (!canRender) {
        return(
            <h1>Olá!</h1>
        )
    }


    return (
        <MainStyledComponent temperature={response ? response['main']['temp'] : '0'}>
            <Container>
                <Menu>
                    <MenuInfo>
                        <span>{ hours < 10 ? '0' + hours : hours}:{ minutes < 10 ? '0' + minutes : minutes}</span>
                        <span>{ months[month] }, { day }{ordinalNumberConcordance(day)} </span>
                    </MenuInfo>
                    <Logo>
                        <img src="/images/sunny-icon.svg" alt="sunny icon" draggable="false"/>
                        <h1>my <br/> weather</h1>
                    </Logo>
                    <MenuInfo textAlign='right'>
                        <span>{response ? response['name'] : 'Loading..'}</span>
                        <span>{response ? response['sys']['country'] : 'Loading...'}</span>
                    </MenuInfo>
                </Menu>
                <WeatherData>
                    <WeatherDataRow>
                        <TemperatureBox temperature={response ? response['main']['temp'] : '0'}>
                            <img src="/images/weather_icons/sunny_01.svg" draggable="false"/>

                            <h1 className="temperature">{response['main']['temp'].toFixed(0)}º</h1>

                            <div className="info">
                                <p className="temperature-description"> {response['weather']['0']['main']} </p>

                                <p className="city-name"> {response['name']} </p>

                                <p className="weather-updated-time"> <b>{days[dayName]}, {day}</b> {months[month]}. {weatherUpdateTime.getHours() < 9 ? '0' + weatherUpdateTime.getHours() : weatherUpdateTime.getHours()}:{ weatherUpdateTime.getMinutes() < 10 ? '0' + weatherUpdateTime.getMinutes() : weatherUpdateTime.getMinutes()}</p>
                            </div>
                        </TemperatureBox>
                        <ClimaticData>
                            <div className="climatic-data-column">
                                <p>Min: <b>{response['main']['temp_min'].toFixed(0)}ºC</b></p>
                                <p>Max: <b>{response['main']['temp_max'].toFixed(0)}ºC</b></p>
                                <p>Feels Like: <b>{response['main']['feels_like'].toFixed(0)}ºC</b></p>
                            </div>
                            <div className="climatic-data-column" style={{textAlign: 'right'}}>
                                <p>Pressure: <b>{response['main']['pressure']} hPA</b></p>
                                <p>Humidity: <b>{response['main']['humidity']}%</b></p>
                                <p>Visibility: <b>{response['visibility']}m</b></p>
                            </div>
                        </ClimaticData>
                    </WeatherDataRow>
   
                    <WeatherDataRow>
                        <ClimaticData>
                                <div className="climatic-data-column">
                                    <div className="climatic-data-row">
                                        <div>
                                            <img src="/images/sunrise-icon.svg" alt="sunrise icon" draggable="false" />
                                            <p>Sunrise: </p>
                                        </div>
                                        <p><b>{sunriseTime.getHours() < 10 ? '0' + sunriseTime.getHours() : sunriseTime.getHours()}:{sunriseTime.getMinutes() < 10 ? '0' + sunriseTime.getMinutes() : sunriseTime.getMinutes()}</b></p>
                                    </div>
                                    <div className="climatic-data-row">
                                        <div>
                                            <img src="/images/sunset-icon.svg" alt="sunset icon" draggable="false" />
                                            <p>Sunset: </p>
                                        </div>
                                        <p><b>{sunsetTime.getHours() < 10 ? '0' + sunsetTime.getHours() : sunsetTime.getHours()}:{sunsetTime.getMinutes() < 10 ? '0' + sunsetTime.getMinutes() : sunsetTime.getMinutes()}</b></p>
                                    </div>
                                </div>
                        </ClimaticData>
                        <ClimaticData>
                                <div className="climatic-data-column fullsize">
                                    <div className="climatic-data-row">
                                        <div>
                                            <img src="/images/windspeed.svg" alt="windspeed icon" draggable="false" />
                                            <p>Wind Speed: </p>
                                        </div>
                                        <p><b>{response['wind']['speed'].toFixed(0)}m/s</b></p>
                                    </div>
                                    <div className="climatic-data-row">
                                        <div>
                                            <img src="/images/winddirection.svg" alt="wind direction icon" draggable="false" />
                                            <p>Wind Direction: </p>
                                        </div>
                                        <p><b>{response['wind']['deg'].toFixed(0)}º</b></p>
                                    </div>
                                </div>
                        </ClimaticData>
                    </WeatherDataRow>
                </WeatherData>

                <MapContainer style={{height: '20vh', width: '100%', borderRadius: '3rem', position: 'relative', zIndex: '500', marginTop:'2rem', marginBottom:'2rem'}} center={[location[0], location[1]]} zoom="20" scrollWheelZoom={true} zoomControl={false} attributionControl={false} dragging={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN}`}
                    />
                    <Marker position={[location[0], location[1]]}>

                    </Marker>
                </MapContainer>
                

            </Container>
        </MainStyledComponent>
    )


}