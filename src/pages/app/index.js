import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';

import { openweather } from '../../api/weather';

import { MainStyledComponent } from '../../components/MainStyledComponent';
import { Container } from '../../components/Container';
import { Menu } from '../../components/Menu';
import { MenuInfo } from '../../components/MenuInfo';
import { Logo } from '../../components/Logo';
import { WeatherData } from '../../components/WeatherData';
import { WeatherDataRow } from '../../components/WeatherDataRow';
import { TemperatureBox } from '../../components/TemperatureBox';

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
                        lang: 'pt_br',
                        units: 'metric',
                        appid: process.env.REACT_APP_OPEN_WEATHER_SECRET_KEY
                    }
                });
                setResponse(res['data']);
                setWeatherUpdateTime(new Date(res['data']['dt'] * 1000 + res['data']['timezone']))
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
                            <img src="/images/weather_icons/sunny_01.svg" />

                            <h1 className="temperature">{response['main']['temp'].toFixed(0)}º</h1>

                            <div className="info">
                                <p className="temperature-description"> {response['weather']['0']['main']} </p>

                                <p className="city-name"> {response['name']} </p>

                                <p className="weather-updated-time"> <b>{days[dayName]}, {day}</b> {months[month]}. {weatherUpdateTime.getHours() < 9 ? '0' + weatherUpdateTime.getHours() : weatherUpdateTime.getHours()}:{ weatherUpdateTime.getMinutes() < 10 ? '0' + weatherUpdateTime.getMinutes() : weatherUpdateTime.getMinutes()}</p>
                            </div>
                        </TemperatureBox>
                    </WeatherDataRow>
                                    
                </WeatherData>
            </Container>
        </MainStyledComponent>
    )


}