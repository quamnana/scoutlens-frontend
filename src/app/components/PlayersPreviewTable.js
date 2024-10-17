import { Card, Table, Tag } from "antd";
import { getPositionTagColor } from "../utils/app_utils";

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
        const tagInfo = getPositionTagColor(position);
        return (
          <Tag color={tagInfo.color} key={position}>
            {tagInfo._position.toUpperCase()}
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
