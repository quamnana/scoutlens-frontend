import React from "react";
import { Drawer, Progress, Descriptions, Tag, Row, Col } from "antd";
import { Radar } from "@ant-design/charts";

const PlayerDrawer = ({ visible, onClose, player }) => {
  if (!player) return null;

  // Radar chart configuration
  const radarConfig = {
    data: [
      { name: "Shot", value: player.shots },
      { name: "Assists", value: player.assists },
      { name: "Steals", value: player.steals },
      { name: "Fouls", value: player.fouls },
    ],
    xField: "name",
    yField: "value",
    meta: {
      value: {
        min: 0,
        max: 100, // Adjust based on data scale
      },
    },
    point: { size: 2 },
  };

  return (
    <Drawer
      title={player.fullName}
      visible={visible}
      onClose={onClose}
      width={600}
      extra={<Tag color="blue">{player.position}</Tag>}
    >
      {/* Player Info */}
      <Descriptions title="Player Info" bordered>
        <Descriptions.Item label="Team">{player.team}</Descriptions.Item>
        <Descriptions.Item label="Nationality">
          {player.nation}
        </Descriptions.Item>
        <Descriptions.Item label="Age">{player.age}</Descriptions.Item>
        <Descriptions.Item label="Position">
          {player.position}
        </Descriptions.Item>
      </Descriptions>

      {/* Radar Chart */}
      <h3>Player Attributes</h3>
      <Radar {...radarConfig} />

      {/* Key Stats */}
      <Row gutter={16}>
        <Col span={12}>
          <h4>Shots</h4>
          <Progress
            type="circle"
            percent={(player.shots / player.shotsAttempted) * 100}
            format={(percent) => `${player.shots} / ${player.shotsAttempted}`}
          />
        </Col>
        <Col span={12}>
          <h4>Fouls</h4>
          <Progress
            type="circle"
            percent={(player.fouls / 100) * 100}
            format={(percent) => `${player.fouls}`}
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <h4>Key Passes</h4>
          <Progress
            type="circle"
            percent={(player.keyPasses / 100) * 100}
            format={(percent) => `${player.keyPasses}`}
          />
        </Col>
        <Col span={12}>
          <h4>Steals</h4>
          <Progress
            type="circle"
            percent={(player.steals / 100) * 100}
            format={(percent) => `${player.steals}`}
          />
        </Col>
      </Row>

      {/* Appearance Data */}
      <h3 style={{ marginTop: "20px" }}>Appearance Data</h3>
      <Row gutter={16}>
        <Col span={12}>
          <h4>Matches Played</h4>
          <Progress
            percent={(player.matchesPlayed / player.totalMatches) * 100}
            format={(percent) => `${player.matchesPlayed}`}
          />
        </Col>
        <Col span={12}>
          <h4>Minutes Played</h4>
          <Progress
            percent={(player.minutesPlayed / player.totalMinutes) * 100}
            format={(percent) => `${player.minutesPlayed}`}
          />
        </Col>
      </Row>
    </Drawer>
  );
};

export default PlayerDrawer;
