import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {memo, useState} from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: '#fff',
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(0, 150, 0, ${opacity})`,
  strokeWidth: 0.5,
  barPercentage: 0.5,
};

const Chart = memo(function Chart({...props}) {
  const {data} = props;
  const [label, setLabel] = useState(() => {
    return getLabel(data);
  });
  const [dataChart, setDataChart] = useState(() => {
    return getDataChart(data);
  });

  return (
    <LineChart
      data={{
        labels: label,
        datasets: [
          {
            data: dataChart,
          },
        ],
      }}
      width={Dimensions.get('window').width - 7}
      height={350}
      verticalLabelRotation={100}
      xLabelsOffset={-13}
      yLabelsOffset={23}
      chartConfig={chartConfig}
      bezier
      style={{
        marginVertical: 6,
        borderRadius: 6,
      }}
    />
  );
});

const getLabel = data => {
  return data.map(element => element.username);
};

const getDataChart = data => {
  let result = data.map(element => element.score);
  return result;
};

export default Chart;
