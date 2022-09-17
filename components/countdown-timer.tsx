import React from "react";
import Countdown from "react-countdown";
import { useExpiration } from "../hooks";

type Props = { contract: any };

type RendererProps = {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

function countdownRenderer({
  hours,
  minutes,
  seconds,
  completed,
}: RendererProps) {
  if (completed) {
    return (
      <div className="my-4">
        <h2 className="text-white text-xl text-center ">
          Ticket sales have now CLOSED for this draw
        </h2>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-white text-sm mb-2 italic">Time remaining</h3>
      <div className="flex space-x-6">
        <div className="flex-1 text-white">
          <div className=" countdown">{hours}</div>
          <div className="countdown-label">hours</div>
        </div>
        <div className="flex-1 text-white">
          <div className=" countdown">{minutes}</div>
          <div className="countdown-label">minutes</div>
        </div>
        <div className="flex-1 text-white">
          <div className=" countdown">{seconds}</div>
          <div className="countdown-label">seconds</div>
        </div>
      </div>
    </div>
  );
}

const CountdownTimer = ({ contract }: Props) => {
  const expiration = useExpiration(contract);

  if (!expiration) return null;

  return (
    <div>
      <Countdown
        date={new Date(expiration * 10000)}
        renderer={countdownRenderer}
      />
    </div>
  );
};

export default CountdownTimer;
