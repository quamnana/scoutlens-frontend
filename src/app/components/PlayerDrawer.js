// src/app/components/PlayerDrawer.js
import React from "react";
import { Drawer } from "antd";

const PlayerDrawer = ({ visible, onClose, player }) => {
  return (
    <Drawer
      title={player ? player.name : "Player Details"}
      visible={visible}
      onClose={onClose}
      width={400}
    >
      {player && (
        <div>
          <p>
            <strong>Team:</strong> {player.team}
          </p>
          <p>
            <strong>Position:</strong> {player.position}
          </p>
          <p>
            <strong>Age:</strong> {player.age}
          </p>
        </div>
      )}
    </Drawer>
  );
};

export default PlayerDrawer;
