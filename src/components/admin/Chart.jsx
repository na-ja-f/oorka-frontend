import React, { useState, useEffect } from "react";
import { chartData } from '../../services/api/admin/apiMethods'
import ReactApexChart from "react-apexcharts";

function Chart() {
    const [userData, setUserData] = useState([]);
    const [postData, setPostData] = useState([]);

    const [options] = useState({
        chart: {
            height: 350,
            type: "line",
        },
        stroke: {
            width: 5,
            curve: "smooth",
        },
        xaxis: {
            type: "datetime",
            labels: {
                formatter: function (value, timestamp, opts) {
                    return opts.dateFormatter(new Date(value), "MMM yyyy");
                },
            },
        },
        title: {
            text: "User Growth and Post Creation",
            align: "left",
            style: {
                fontSize: "16px",
                color: "#666",
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                gradientToColors: ["#7E3AF2", "#3BA55D"], // Purple and Green
                shadeIntensity: 1,
                type: "horizontal",
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100],
            },
        },
        yaxis: {
            min: 0,
        },
    });

    useEffect(() => {
        chartData()
            .then((response) => {
                const { userJoinStats, postCreationStats } = response.data;
                setUserData(userJoinStats.map((item) => ({
                    month: new Date(item._id).toISOString(), // Convert month to ISO string
                    userCount: item.userCount,
                })));

                setPostData(postCreationStats.map((item) => ({
                    month: new Date(item._id).toISOString(),
                    postCount: item.postCount,
                })));
            })
            .catch((error) => {
                console.error("Error fetching chart data:", error);
            });

    }, []);

    const userSeries = [
        {
            name: "Users Joined",
            data: userData.map((data) => [new Date(data.month).getTime(), data.userCount]),
        },
    ];

    const postSeries = [
        {
            name: "Posts Created",
            data: postData.map((data) => [new Date(data.month).getTime(), data.postCount]),
        },
    ];

    return (
        <>
            <div id="chart" className="ms-20 mt-5 items-center w-5/6">
                <ReactApexChart
                    options={options}
                    series={userSeries.concat(postSeries)}
                    type="line"
                    height={350}
                />
            </div>
            <div id="html-dist"></div>
        </>
    )
}

export default Chart
