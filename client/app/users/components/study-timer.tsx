"use client";
import { IonIcon } from "@ionic/react";
import { SetStateAction } from "react";
import { closeOutline } from "ionicons/icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import NumberInput from "./number-input";
import { useStudyTimer } from "../hooks/useStudyTimer";

interface IStudyTimer {
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
}

const StudyTimer = ({ show, setShow }: IStudyTimer) => {
  const {
    pomodoroValue,
    restValue,
    disabled,
    focus,
    sessions,
    error,
    minutes,
    seconds,
    percentage,
    handlePomodoroTime,
    handleRestTime,
    setSessions,
    handleStart,
  } = useStudyTimer();

  const handleClose = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      aria-hidden="true"
      className="z-50 fixed inset-0 flex justify-center items-center h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-yellow-400 rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            {disabled && (
              <div
                className={`px-4 py-2 bg-${focus ? "green" : "red"}-400 text-${
                  focus ? "green" : "red"
                }-950 border border-${focus ? "green" : "red"}-900 rounded-lg`}
              >{`${focus ? "Focus " : "Rest "}`}</div>
            )}
            <h3 className="text-xl font-semibold text-gray-900 text-bitBrown w-full text-center">
              Pomodoro Timer
            </h3>
            <button
              onClick={handleClose}
              type="button"
              className="bg-transparent text-bitBrown hover:bg-bitBrown hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="static-modal"
            >
              <IonIcon icon={closeOutline} className="text-2xl"></IonIcon>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="w-full flex">
            <div className="p-4 md:p-5 space-y-4 w-3/5">
              <CircularProgressbar
                styles={buildStyles({
                  rotation: 0.25,
                  textSize: "16px",
                  pathTransitionDuration: 0.5,
                  pathColor: `rgba(38, 31, 36, 1)`,
                  textColor: "#261f24",
                  trailColor: "#facc15",
                })}
                value={percentage}
                text={`${minutes <=9 && minutes>=0? "0"+minutes : minutes}:${
                  seconds <= 9 && seconds>=0 ? "0" + seconds : seconds
                }`}
              />
            </div>
            <div className="mt-6">
              <label className="text-bitBrown font-bold">Focus Time</label>
              <input
                id="default-range"
                type="range"
                min={1}
                max={120}
                value={pomodoroValue}
                onChange={(e) => handlePomodoroTime(parseInt(e.target.value))}
                disabled={disabled}
                className="w-11/12 h-2 mb-12 bg-bitBrown text-yellow-400 rounded-lg appearance-none cursor-pointer"
              />
              <br />
              <label className="text-bitBrown font-bold">Rest Time</label>
              <input
                id="default-range"
                type="range"
                min={1}
                max={15}
                value={restValue}
                onChange={(e) => handleRestTime(parseInt(e.target.value))}
                disabled={disabled}
                className="w-11/12 h-2 bg-bitBrown text-yellow-400 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-bitBrown mb-12">{`${restValue}:00`}</div>
              <div className="text-bitBrown font-bold">Number Of Sessions</div>
              <NumberInput
                value={sessions}
                updateValue={setSessions}
                min={1}
                max={15}
                disabled={disabled}
              />
              {!disabled && (
                <button
                  onClick={() => handleStart()}
                  className="bg-bitBrown text-white px-4 py-2 rounded-lg disabled:bg-gray-950 mb-4"
                >
                  Start
                </button>
              )}
              {error !== "" && (
                <div className="text-red-900 bg-red-400 border border-red-900 px-2 py-4 rounded-lg me-2 mb-2">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyTimer;
