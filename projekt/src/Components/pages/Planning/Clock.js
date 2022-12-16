import React from "react";

const Clock = ({ timerDays }) => {
  Clock.defaultProps = {
    timerDays: 0,
  };

  return (
    <>
      <div>
        <p>{timerDays} dni</p>
      </div>
    </>
  );
};

export default Clock;
