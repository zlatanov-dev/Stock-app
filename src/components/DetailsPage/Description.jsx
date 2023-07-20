import { Badge, Descriptions, Typography } from "antd";

import { useGetStockDetailsQuery } from "../../services/financialApi";
import { useParams } from "react-router-dom";
import millify from "millify";

export default function Description({ searchResults: stock }) {
  const { performanceId } = useParams();
  const { data, error, isLoading } = useGetStockDetailsQuery(performanceId);

  const { Title } = Typography;

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  const details = data.sections;
  
  const businessUrl = details.contact?.url
    ? `https://${details.contact.url}`
    : null;

  return (
    <Descriptions title={<Title level={2} style={{ color: "#001529" }}>Stock details</Title>}  layout="vertical" bordered>
      <Descriptions.Item label="Stock Name">{stock.name}</Descriptions.Item>
      <Descriptions.Item label="Ticker">{stock.ticker}</Descriptions.Item>
      <Descriptions.Item label="Currency">
        {stock.listedCurrency}
      </Descriptions.Item>
      <Descriptions.Item label="Market Cap">
        {stock.currencySymbol}
        {millify(stock.marketCap)}
      </Descriptions.Item>
      <Descriptions.Item label="Last Closing Price">
        {stock.currencySymbol}
        {stock.lastClose}
      </Descriptions.Item>
      <Descriptions.Item label="Day High">
        {stock.currencySymbol}
        {stock.dayRangeHigh}
      </Descriptions.Item>

      <Descriptions.Item label="Status" span={3}>
        {stock.tradingStatus === "Closed" ? (
          <Badge color="#870c1f" text="Closed" />
        ) : (
          <Badge color="#5db43d" text="Open" />
        )}
      </Descriptions.Item>

      <Descriptions.Item label="Website">
        {businessUrl ? (
          <a href={businessUrl} target="_blank" rel="noreferrer">
            {details.contact.url}
          </a>
        ) : (
          "Not available"
        )}
      </Descriptions.Item>
      <Descriptions.Item label="Sector">
        {details.sector.value}
      </Descriptions.Item>
      <Descriptions.Item label="Number of Employees">
        {details.totalEmployees.value}
      </Descriptions.Item>
      <Descriptions.Item label="Business Description">
        {details.businessDescription.value}
      </Descriptions.Item>
    </Descriptions>
  );
}
