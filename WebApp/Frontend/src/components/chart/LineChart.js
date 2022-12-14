import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { useQueryClient } from "react-query";

const LineChart = ({ selectedMacaddress, mqttData }) => {
  const [sensors, setSensors] = useState([]);
  const [macAddressData, setMacAddressData] = useState([]);
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["getSensorNames"]);

  useEffect(() => {
    if (selectedMacaddress) {
      setMacAddressData(mqttData?.data?.data);
    }
  }, [mqttData?.data, selectedMacaddress]);
  useEffect(() => {
    if (data?.data) {
      setSensors(data?.data?.[0]?.sensors);
    }
  }, [data]);

  const lineChart = {
    series: [
      {
        name: "Value",
        data: [
          parseInt(macAddressData[macAddressData?.length - 1]?.oee),
          parseInt(macAddressData[macAddressData?.length - 1]?.temperature),
          parseInt(macAddressData[macAddressData?.length - 1]?.humidity),
          parseInt(macAddressData[macAddressData?.length - 1]?.watts),
        ],
        offsetY: 0,
      },
    ],

    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },
      legend: {
        show: true,
      },

      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },

      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
        },
      },

      xaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c", "#8c8c9b", "#8c8c8c", "#8c8c8c"],
          },
        },
        categories: sensors,
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };

  const { Title } = Typography;

  return (
    <>
      <div className='linechart'>
        <div>
          <Title level={5}>{selectedMacaddress || "Macaddress"}</Title>
          {/* <Paragraph className="lastweek">
            than last week <span className="bnb2">+30%</span>
          </Paragraph> */}
        </div>
        {/* <div className='sales'>
          <ul>
            <li>{<MinusOutlined />} Macaddress</li>
            <li>{<MinusOutlined />} Sales</li>
          </ul>
        </div> */}
      </div>

      <ReactApexChart
        className='full-width'
        options={lineChart.options}
        series={lineChart.series}
        type='area'
        height={350}
        width={"100%"}
      />
    </>
  );
};

export default LineChart;
