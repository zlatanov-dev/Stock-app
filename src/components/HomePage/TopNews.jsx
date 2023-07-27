import { List, Typography } from "antd";
import { useTopNewsQuery } from "../../services/stockApi";
import React from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../services/loading";

function TopNews() {
  const { data, isLoading, isError } = useTopNewsQuery();
  const dispatch = useDispatch();
  const { Title } = Typography;

  if (isLoading) {
    console.log("🚀 ~ file: TopNews.jsx:14 ~ TopNews ~ isLoading:", isLoading)
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const topNewsData = data.feed.slice(0, 5);
  dispatch(setLoading(isLoading));
  console.log("🚀 ~ file: TopNews.jsx:23 ~ TopNews ~ isLoading:", isLoading)

  return (
    <>
      <Title level={5}>Top News</Title>
      <List
        itemLayout="vertical"
        bordered
        dataSource={topNewsData}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <a href={item.url} target="_blank" rel="noreferrer" className="top-news-list-link">
              <span>
                {item.summary
                  ? item.summary.length > 100
                    ? `${item.summary.substring(0, 100)}....`
                    : item.summary
                  : "No summary available"}
              </span>
            </a>
          </List.Item>
        )}
      />
    </>
  );
}

export default React.memo(TopNews);
