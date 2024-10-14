import { Card, Table, Tag } from "antd";

const PlayersPreviewTable = ({ data, pageSize = 10 }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Nation",
      dataIndex: "nation",
      key: "nation",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (_, { position }) => {
        let color;
        let _position;
        if (position === "GK") {
          color = "orange";
          _position = "Goalkeeper";
        } else if (["DF"].includes(position)) {
          color = "lime";
          _position = "Defender";
        } else if (["MF", "MFDF", "MFFW", "DFMF"]) {
          color = "gold";
          _position = "Midfielder";
        } else {
          color = "volcano";
          _position = "Forward";
        }
        return (
          <Tag color={color} key={position}>
            {_position.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
    },
    {
      title: "League",
      dataIndex: "league",
      key: "league",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
  ];

  return (
    <Card title="Players" className="mt-4 md:mt-0">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: pageSize }}
      />
    </Card>
  );
};

export default PlayersPreviewTable;
