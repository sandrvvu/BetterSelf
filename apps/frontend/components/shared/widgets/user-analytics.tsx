"use client";

import "react-calendar-heatmap/dist/styles.css";

import dynamic from "next/dynamic";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useGetUserAnalyticsQuery } from "@/state/features/analytics/analyticsApi";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui";
import { Spinner } from "..";

const CalendarHeatmap = dynamic(() => import("react-calendar-heatmap"), {
  ssr: false,
});

const COLORS = ["#F075AA", "#9F6BA0"]; // Consider defining more colors for larger datasets

export default function UserAnalytics() {
  const [months, setMonths] = useState(6);
  const { data, isLoading } = useGetUserAnalyticsQuery({ months });

  if (isLoading) return <Spinner />; // Show spinner only when loading

  // If data is completely empty or null, show a general message.
  // This handles the case where the backend returns an empty object or null,
  // indicating no analytics data at all for the user/period.
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="space-y-4 mt-10 bg-white rounded-xl shadow-sm p-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Your Progress Overview
        </h1>
        <p className="text-lg text-gray-600">
          No analytics data available for the selected period. Start setting
          goals and completing tasks to see your progress here!
        </p>
      </div>
    );
  }

  const {
    totalGoals,
    completedGoals,
    tasksByCategory,
    tasksByMonth,
    taskCalendar,
  } = data;

  // Data transformations - perform these ONLY if 'data' is available
  const pieData = [
    { name: "Completed", value: completedGoals },
    { name: "Incomplete", value: totalGoals - completedGoals },
  ];

  const barData = Object.entries(tasksByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  const lineData = Object.entries(tasksByMonth)
    .map(([month, count]) => ({
      month,
      count,
    }))
    .sort((a, b) => a.month.localeCompare(b.month)); // Ensure consistent sorting for line chart

  const heatmapData = Object.entries(taskCalendar).map(([date, count]) => ({
    date,
    count,
  }));

  const hasGoalData = totalGoals > 0 || completedGoals > 0;
  const hasCategoryData =
    barData.length > 0 && barData.some((d) => d.value > 0);
  const hasMonthlyData =
    lineData.length > 0 && lineData.some((d) => d.count > 0);
  const hasHeatmapData =
    heatmapData.length > 0 && heatmapData.some((d) => d.count > 0);

  return (
    <div className="space-y-4 mt-10 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-800">
        Your Progress Overview
      </h1>

      <div className="flex gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Period
          </label>
          <Select
            value={String(months)}
            onValueChange={(val: string) => setMonths(Number(val))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Last 3 months</SelectItem>
              <SelectItem value="6">Last 6 months</SelectItem>
              <SelectItem value="12">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-6 space-y-8 md:space-y-0">
        <div className="flex-1 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Goal Completion
          </h2>
          <p className="text-gray-500 mb-2 text-sm">
            Shows the ratio of completed to incomplete goals for the selected
            period.
          </p>
          {hasGoalData ? (
            <div className="flex items-center space-x-8">
              <PieChart width={300} height={300}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
              <div className="text-gray-600 min-w-fit">
                <p>Total Goals: {totalGoals}</p>
                <p>Completed: {completedGoals}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">
              No goal data available for this period.
            </div>
          )}
        </div>

        <div className="flex-1 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Tasks Completed by Category
          </h2>
          <p className="text-gray-500 mb-2 text-sm">
            Displays the number of completed tasks across each category for the
            selected period.
          </p>
          {hasCategoryData ? (
            <div className="w-full overflow-x-auto">
              <div
                className="max-w-[500px]"
                style={{ width: `${Math.max(500, barData.length * 100)}px` }}
              >
                <BarChart
                  width={Math.max(500, barData.length * 100)}
                  height={300}
                  data={barData}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" className="fill-emerald-200" />
                </BarChart>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">
              No task data by category for this period.
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Monthly Task Progress
        </h2>
        <p className="text-gray-500 mb-2 text-sm">
          Tracks how many tasks you completed each month within the selected
          timeframe.
        </p>
        {hasMonthlyData ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid stroke="#F075AA" strokeDasharray="5 5" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#49243E"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-500 py-10">
            No monthly task progress data for this period.
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Activity Heatmap
        </h2>
        <p className="text-gray-500 mb-4 text-sm">
          See your daily task activity over the last year.
        </p>
        {hasHeatmapData ? (
          <>
            <div className="overflow-x-auto">
              <CalendarHeatmap
                values={heatmapData}
                startDate={
                  new Date(new Date().setFullYear(new Date().getFullYear() - 1))
                }
                endDate={new Date()}
                classForValue={(value) => {
                  if (!value) return "fill-gray-100";
                  if (value.count > 4) return "fill-emerald-600";
                  if (value.count > 2) return "fill-emerald-400";
                  if (value.count > 0) return "fill-emerald-200";
                  return "fill-gray-100";
                }}
              />
            </div>
            <div className="flex items-center space-x-3 mt-3 text-sm text-gray-600">
              <span className="flex items-center">
                <span className="w-4 h-4 mr-1 rounded bg-gray-100" /> 0
              </span>
              <span className="flex items-center">
                <span className="w-4 h-4 mr-1 rounded bg-emerald-200" /> 1-2
              </span>
              <span className="flex items-center">
                <span className="w-4 h-4 mr-1 rounded bg-emerald-400" /> 3-4
              </span>
              <span className="flex items-center">
                <span className="w-4 h-4 mr-1 rounded bg-emerald-600" /> 5+
              </span>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 py-10">  
            No daily activity data for the heatmap.
          </div>
        )}
      </div>
    </div>
  );
}
