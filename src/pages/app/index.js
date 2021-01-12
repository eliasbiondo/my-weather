import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import { MainStyledComponent } from '../../components/MainStyledComponent';
import { Container } from '../../components/Container';
import { Menu } from '../../components/Menu';
import { MenuDate } from '../../components/MenuDate';

export function Main(){

    let date = new Date;

    const months = ['January','February','March','April','May','June','July','August','Septempber','October', 'November', 'December']

    const st = [1, 21, 31];
    const nd = [2, 22];

    const [month, setMonth] = useState(date.getMonth())
    const [day, setDay] = useState(date.getDate())
    const [hours, setHours] = useState(date.getHours())
    const [minutes, setMinutes] = useState(date.getMinutes())


    useEffect(() => {
        setInterval(() => {
            date = new Date;
            setDay(date.getDate())
            setMinutes(date.getMinutes())
            setHours(date.getHours())
        }, 1000)
    }, [])




    function ordinalNumberConcordance(day) {
        if ( st.includes(day) ) {
            return 'st'
        } else if (nd.includes(day)) {
            return 'nd'
        } else {
            return 'th'
        }
    }



    return (
        <MainStyledComponent>
            <Container>
                <Menu>
                    <MenuDate>
                        <span>{ hours }:{ minutes < 10 ? '0' + minutes : minutes}</span>
                        <span>{ months[month] }, { day }{ordinalNumberConcordance(day)} </span>
                    </MenuDate>
                </Menu>
            </Container>
        </MainStyledComponent>
    )
}