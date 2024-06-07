import { useState, useEffect } from "react";

export const useStudyTimer = () => {
    const [restValue, setRestValue] = useState(1);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");
    const [time, setTime] = useState(60);
    const [sessions, setSessions] = useState(1);
    const [focus, setFocus] = useState(false);
    const [pomodoroValue, setPomodoroValue] = useState(1);
    const [timeInSeconds, setTimeInSeconds] = useState(60);
    const [timer, setTimer] = useState<ReturnType<typeof setInterval>>();
    const [percentage, setPercentage] = useState(100);

    useEffect(() => {
        if (time === 0) {
            handleTimerStop(time);
        }
        setPercentage((time / timeInSeconds) * 100);
    }, [time, timeInSeconds])

    const handleTimerStop = (timeRemaining: number) => {
        if (timeRemaining === 0) {
            if (sessions === 0) {
                stopTimer();
                setDisabled(false);
                setPomodoroValue(1);
            } else {
                if (focus) {
                    setTime(restValue * 60);
                    setTimeInSeconds(restValue * 60);
                    const newSessions = sessions - 1;
                    setSessions(newSessions);
                    setFocus(false);
                } else {
                    setTime(pomodoroValue * 60);
                    setTimeInSeconds(pomodoroValue * 60);
                    setFocus(true);
                }
                startTimer();
            }
        }
    }


    const startTimer = () => {
        try {
            console.log("Start Timer Calls")
            stopTimer();
            setPercentage(100);
            const interval = setInterval(() => tick(), 1000);
            setTimer(interval);
            console.log("Start Timer Interval Set");
        }
        catch (err) {
            console.log(err);
        }
    };


    const tick = () => {
        setTime(time => time - 1);
    };


    const stopTimer = () => {
        if (timer !== undefined) {
            clearInterval(timer);
            setTimer(undefined);
        }
    };

    const handlePomodoroTime = (value: number) => {
        setPomodoroValue(value);
        setTime(value * 60);
    };

    const handleRestTime = (value: number) => {
        setRestValue(value);
    };

    const handleStart = () => {
        setError("");
        if (sessions <= 0) {
            setError("Number Of Sessions Must be Between 1 and 10 inclusive");
            return;
        }
        if (pomodoroValue === 0) {
            setError("Focus Time Must be Greater Than 0");
            return;
        }
        if (restValue === 0) {
            setError("Rest Time Must be Greater Than 0");
            return;
        }
        setFocus(true);
        setDisabled(true);
        startTimer();
    };

    return {
        pomodoroValue,
        restValue,
        focus,
        disabled,
        sessions,
        error,
        minutes: Math.floor(time / 60),
        seconds: time % 60,
        percentage,
        handlePomodoroTime,
        handleRestTime,
        setSessions,
        handleStart,
    }
}