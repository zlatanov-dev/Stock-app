import { useEffect, useMemo, useState } from "react";
import { Typography, Row, Col, Avatar, Card } from "antd";
import { fetchNewsData } from "../services/fetchNewsId";
import { useGetNewsQuery } from "../services/newsApi";

const { Text, Title } = Typography;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = () => {
  const [newsId, setNewsId] = useState([]);
  const [newsThumbnail, setNewsThumbnail] = useState([]);
  const { data, isLoading, isError } = useGetNewsQuery(newsId.join(", "));
  const newsData = useMemo(() => data?.data?.contents || [], [data]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await fetchNewsData();
        const resultData = data?.main?.stream?.map((item) => item.id);
        setNewsId(resultData);
        const thumbnails = data?.main?.stream?.map(
          (item) => item.content.thumbnail.resolutions[0].url
        );
        setNewsThumbnail(thumbnails);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    if (data === null) {
      // If data is not available, fetch it.
      fetchNews();
    }
  }, [data]);

  if (isLoading && !data) return <p>Loading...</p>;
  if (isError) return <p>Error occurred while fetching data.</p>;

  return (
    <>
      <Title level={2} className="news-first-title">
        {" "}
        Investment Insights: Latest Market News and Trends{" "}
      </Title>
      <Row gutter={[24, 24]}>
        {newsData.map((news, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className="news-card">
              <a
                href={news?.content?.clickThroughUrl?.url}
                target="_blank"
                rel="noreferrer"
              >
                <div className="news-image-container">
                  <Title className="news-title" level={5}>
                    {news?.content?.title}
                  </Title>
                  <img
                    style={{ maxWidth: "200px", maxHeight: "100px" }}
                    src={newsThumbnail[index] || demoImage}
                    alt="news"
                  />
                </div>
                <p>
                  {news?.content?.summary
                    ? news.content.summary.length > 100
                      ? `${news.content.summary.substring(0, 100)}....`
                      : news.content.summary
                    : "No summary available"}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar src={newsThumbnail[index] || demoImage} alt="" />
                    <Text className="provider-name">
                      {news?.content?.provider?.displayName}
                    </Text>
                  </div>
                  <Text>{}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
