import { Line } from "react-chartjs-2";
import { StatsWrapper } from "../stats-wrapper/stats-wrapper";

export function ExpenseStats({ impression }: Props) {
   const bgCol = impression === "good" ? "rgba(130,255,160,0.2)" : "rgba(255,130,140,0.2)";
   const borCol = impression === "good" ? "rgba(130,255,160)" : "rgba(255,130,140)";

   const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
         {
            label: "Monthly Expenses (INR)",
            data: [1900, 2000, 1750, 2500, 1800, 1230],
            fill: true,
            backgroundColor: bgCol,
            borderColor: borCol,
         },
      ],
   };

   return (
      <StatsWrapper
         title="Monthly Expenses"
         description="Comprehensive overview of your monthly expenses Over time"
         //  impression="bad"
      >
         <Line data={data} />
      </StatsWrapper>
   );
}

interface Props {
   impression: "good" | "bad";
}
