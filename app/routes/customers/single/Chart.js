import { Svg, Rectangle } from 'cx/svg';
import { CategoryAxis, Chart, Gridlines, Legend, LineGraph, NumericAxis } from 'cx/charts';

export default () => (
   <cx>
      <div>
         <Svg style="width:500px;height:400px" margin="10 20 30 50">
            <Chart
               offset="20 -10 -40 40"
               axes={{
                  x: { type: CategoryAxis, hideLine: true, hideTicks: true },
                  y: <NumericAxis vertical />,
               }}
            >
               <Rectangle fill="white" />
               <Gridlines />
               <LineGraph
                  data-bind="$page.turnover"
                  name="Invoiced amount per month"
                  colorIndex={7}
                  xField="month"
                  yField="amount"
                  area
                  active-bind="$page.show.chart"
               />
            </Chart>
         </Svg>
         <div>
            <Legend vertical class="ml-20 mt-6 text-xl" />
         </div>
      </div>
   </cx>
);
