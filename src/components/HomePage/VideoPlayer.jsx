import React, { useMemo } from "react";
import { Typography, Space } from "antd";
import { AreaChartOutlined} from "@ant-design/icons";
import ReactPlayer from "react-player";
import {
  useGetVideosIdQuery,
  useGetVideosQuery,
} from "../../services/financialApi";

const { Title, Text } = Typography;

const VideoPlayer = () => {
  const { data, isLoading, isError } = useGetVideosIdQuery();

  

  const {
    data: video,
    isLoading: isVideosLoading,
    isError: isVideosError,
  } = useGetVideosQuery(id || "");

  if (isLoading || isVideosLoading) {
    return <div>Loading...</div>;
  }
  if (isError || isVideosError) {
    return <div>Something went wrong</div>;
  }

  const id = data.Videos[0].ResourceId;
  

  return (
    <div style={{ width: "100%", position: "sticky", top: "86px" }}>
      <Space>
        <Title
          level={3}
          style={{ color: "#001529", fontWeight: "bold", paddingBottom: "5px" }}
        >
          Money Talks: Finance & Investing
        </Title>
      </Space>

      <ReactPlayer
        url={video?.video?.files?.sd}
        className="react-player"
        controls
        light={video?.video?.thumbnail}
        config={{
          file: {
            attributes: {
              poster: video?.video?.thumbnail,
            },
          },
        }}
      />
      <Space>
        <Title
          level={4}
          style={{ color: "#001529", fontWeight: "bold", padding: "5px" }}
        >
          <AreaChartOutlined
            style={{
              fontSize: "1.5rem",
              color: "#5DB43D",
              margin: "0 15px 0 5px",
            }}
          />
          {video.title}
        </Title>
      </Space>
    </div>
  );
};
export default React.memo(VideoPlayer);

