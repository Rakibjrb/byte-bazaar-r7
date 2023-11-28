import { Cell, Pie, PieChart } from "recharts";
import PropTypes from "prop-types";

const Piechart = ({ totalReviews, totalVotes, totalreports }) => {
  const data = [
    { name: "Total Reviews", value: totalReviews?.length },
    { name: "Total Votes", value: totalVotes?.length },
    { name: "Total Reports", value: totalreports?.length },
  ];

  const COLORS = ["#FFBB28", "#FF8042", "#0088FE", "#00C49F"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <PieChart width={320} height={320}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={140}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

Piechart.propTypes = {
  totalReviews: PropTypes.array,
  totalVotes: PropTypes.array,
  totalreports: PropTypes.array,
};
export default Piechart;
