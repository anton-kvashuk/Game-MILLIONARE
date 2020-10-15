import React, { useState } from "react";
import GameStart from "./GameStart";
import GamePlay from "./GamePlay";
import GameFinish from "./GameFinish";

import { GAME_START, GAME_PLAY, GAME_FINISH } from "./constants";

export default function Game() {
  const [reward, setReward] = useState(0);
  const [screen, setScreen] = useState(GAME_START);

  const changeScreen = (screen) => () => setScreen(screen);

  switch (screen) {
    case GAME_START:
      return <GameStart setScreen={changeScreen(GAME_PLAY)} />;
    case GAME_PLAY:
      return (
        <GamePlay setScreen={changeScreen(GAME_FINISH)} setReward={setReward} />
      );
    default:
      return (
        <GameFinish setScreen={changeScreen(GAME_START)} reward={reward} />
      );
  }
}
