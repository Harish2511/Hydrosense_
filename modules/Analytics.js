import React, { useState, useEffect } from "react";
import { InfluxDB } from "@influxdata/influxdb-client";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { VictoryBar, VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from "victory-native";

const token = '1f-jAzMp7AsoDQz-SLTYRLv43JRCNuMW_T8qq3AIuuz5aWJH-ktSHlV7zJCKmfyIGcOjrSIJ07cL7kYUmmzhPQ==';
const org = 'abb6618f3fac8447';
const url = 'https://us-east-1-1.aws.cloud2.influxdata.com';
const bucket = 'Hydrosense';

const AnalyticsPage = () => {
  const [waterLevelData, setWaterLevelData] = useState([]);
  const [motorStateData, setMotorStateData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [lastRecordTime, setLastRecordTime] = useState(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Update data every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const client = new InfluxDB({ url, token });
      const queryApi = client.getQueryApi(org);

      const waterLevelQuery = `
        from(bucket: "${bucket}")
        |> range(start: -3d)
        |> filter(fn: (r) => r["_measurement"] == "WaterLevel")
        |> keep(columns: ["_time", "_value"])
        |> sort(columns:["_time"])
      `;

      const waterLevelResult = await queryApi.collectRows(waterLevelQuery);

      if (waterLevelResult.length > 0) {
        const waterLevelDataPoints = waterLevelResult.map(row => ({
          x: new Date(row["_time"]),
          y: row["_value"]
        }));

        const latestWaterLevel = waterLevelDataPoints[waterLevelDataPoints.length - 1].y;
        let motorState, category;

        if (latestWaterLevel < 50) {
          motorState = 'ON';
          category = 'D';
        } else if (latestWaterLevel < 100) {
          motorState = 'ON';
          category = 'C';
        } else if (latestWaterLevel < 200) {
          motorState = 'OFF';
          category = 'B';
        } else {
          motorState = 'OFF';
          category = 'A';
        }

        setMotorStateData([{ x: new Date(), y: motorState }]);
        setCategoryData([{ x: new Date(), y: category }]);
        setLastRecordTime(new Date());
        
        // Take only the last 10 records for water level data
        setWaterLevelData(waterLevelDataPoints.slice(-20));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerText}>Water Level Analytics</Text>
        <Text>Last Record Time: {lastRecordTime ? lastRecordTime.toLocaleString() : 'N/A'}</Text>
        <VictoryChart theme={VictoryTheme.material} width={350} height={200}>
          <VictoryLine
            data={waterLevelData}
            x="x"
            y="y"
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" }
            }}
          />
          <VictoryAxis label="Time" style={{ tickLabels: { angle: -45 } }} />
          <VictoryAxis dependentAxis label="Water Level (cm)" />
        </VictoryChart>

        <VictoryChart theme={VictoryTheme.material} width={350} height={200}>
          <VictoryBar
            data={motorStateData}
            x="x"
            y="y"
            style={{
              data: { fill: "#007ACC" },
              parent: { border: "1px solid #ccc" }
            }}
          />
          <VictoryAxis label="Time" style={{ tickLabels: { angle: -45 } }} />
          <VictoryAxis dependentAxis label="Motor State" tickValues={['ON', 'OFF']} />
        </VictoryChart>

        <VictoryChart theme={VictoryTheme.material} width={350} height={200}>
          <VictoryBar
            data={categoryData}
            x="x"
            y="y"
            style={{
              data: { fill: "#3F7CAC" },
              parent: { border: "1px solid #ccc" }
            }}
          />
          <VictoryAxis label="Time" style={{ tickLabels: { angle: -45 } }} />
          <VictoryAxis dependentAxis label="Category" tickValues={['D', 'C', 'B', 'A']} />
        </VictoryChart>

        {/* Additional Insights */}
        <Text style={styles.headerText}>Water Level Distribution</Text>
        <VictoryChart theme={VictoryTheme.material} width={350} height={200}>
          <VictoryBar
            data={waterLevelData}
            x="x"
            y="y"
            style={{
              data: { fill: "#FF5733" },
              parent: { border: "1px solid #ccc" }
            }}
          />
        </VictoryChart>

        <Text style={styles.headerText}>Motor State Summary</Text>
        <Text>Total ON: {motorStateData.filter(item => item.y === 'ON').length}</Text>
        <Text>Total OFF: {motorStateData.filter(item => item.y === 'OFF').length}</Text>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default AnalyticsPage;
