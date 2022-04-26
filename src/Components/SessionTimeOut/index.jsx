import React, { useState, useCallback, useEffect, useRef, Fragment, useContext } from 'react';
import moment from 'moment';
import { AuthContext } from '../../contexts/auth';

const SessionTimeOut = () => {
    const { authenticated, logout } = useContext(AuthContext);
    const [events, setEvents] = useState(['click', 'load', 'scroll']);
    const [second, setSecond] = useState(0);

    let timeStamp;
    let warningInactiveInterval = useRef();
    let startTimerInterval = useRef();

    // start inactive check
    let timeChecker = () => {
        startTimerInterval.current = setTimeout(() => {
            let storedTimeStamp = sessionStorage.getItem('lastTimeStamp');
            warningInactive(storedTimeStamp);
        }, 10000);
    };

    // warning timer
    let warningInactive = (timeString) => {
        clearTimeout(startTimerInterval.current);

        warningInactiveInterval.current = setInterval(() => {
            const maxTime = 10; // Maximum ideal time given before logout 
            const popTime = 1; // remaining time (notification) left to logout.

            const diff = moment.duration(moment().diff(moment(timeString)));
            const minPast = diff.minutes();
            const leftSecond = 60 - diff.seconds();
                console.log(minPast + ' - ' + maxTime);
            if (minPast === popTime) {
                setSecond(leftSecond);
            }

            if (minPast === maxTime) {
                clearInterval(warningInactiveInterval.current);
                sessionStorage.removeItem('lastTimeStamp');
                logout();
                console.log('saiu');
            }
        }, 1000);
    };

    // reset interval timer
    let resetTimer = useCallback(() => {
        clearTimeout(startTimerInterval.current);
        clearInterval(warningInactiveInterval.current);

        if (authenticated) {
            timeStamp = moment();
            sessionStorage.setItem('lastTimeStamp', timeStamp);
        } else {
            clearInterval(warningInactiveInterval.current);
            sessionStorage.removeItem('lastTimeStamp');
        }
        timeChecker();
    }, [authenticated]);


    useEffect(() => {
        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

        timeChecker();

        return () => {
            clearTimeout(startTimerInterval.current);
        };
    }, [resetTimer, events, timeChecker]);


    return (
        <Fragment/>
    )
}

export default SessionTimeOut;