import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

function Chart() {
  const { todoList } = useSelector(state=>state.todos);
  const [totals, setTotals] = useState([0,0]);
  
  useEffect(() => {
    let newTotals = [10,5];
    newTotals[0] = todoList.reduce((a,i)=>{
        if(i.status==='pending') return a=a+1;
        return a;
    },0);
    newTotals[1] = todoList.reduce((a,i)=>{
        if(i.status!=='pending') return a=a+1;
        return a;
    },0);
    setTotals(newTotals);
  }, [todoList]);

  const options = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
      text: 'Task Status'
    },
    yAxis: {
        title: {
            text: undefined
        }
    },
    colors: ['#f5f12b', '#5bfc33'],
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Status',
        colorByPoint: true,
        data: [{
            name: 'Pending',
            y: totals[0]
          },
          {
            name: 'Completed',
            y: totals[1]
          }]
  }]
  };
  
  return (
    <div>
    <HighchartsReact
    highcharts={Highcharts}
    options={options}
    />
    </div>
  )
}
export default Chart