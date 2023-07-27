import React from "react";
import { Tabs, List } from "antd";

import { useGetMoversQuery } from "../../services/financialApi.js";

function Movers() {
  const { data, isFetching, isError } = useGetMoversQuery();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) return <div>Oh no, there was an error</div>;


  return (
    <Tabs defaultActiveKey="1" className="tabs-container" items={Object.entries(data).map(([key, array]) => ({
      key,
      label: (key.charAt(0).toUpperCase() + key.slice(1)),
      children: (
        <List
          itemLayout="vertical"
          bordered
          dataSource={array}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{item.name}</span>
                <span>
                  {item.percentNetChange > 0 ? (
                    <span className="announcement-paragraph green">
                      {item.percentNetChange.toFixed(2)}%
                    </span>
                  ) : (
                    <span className="announcement-paragraph red">
                      {item.percentNetChange.toFixed(2)}%
                    </span>
                  )}
                </span>
              </div>
            </List.Item>
          )}
        />
      ),
    }))}>
    </Tabs>
  );
}


export default React.memo(Movers);