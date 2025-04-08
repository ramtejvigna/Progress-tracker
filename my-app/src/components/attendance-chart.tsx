"use client"

import {
    BarChart as Chart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "@/components/ui/chart"

export function AttendanceChart() {
    const data = [
        { name: "Week 1", present: 5, absent: 0 },
        { name: "Week 2", present: 4, absent: 1 },
        { name: "Week 3", present: 5, absent: 0 },
        { name: "Week 4", present: 3, absent: 2 },
        { name: "Week 5", present: 5, absent: 0 },
        { name: "Week 6", present: 4, absent: 1 },
        { name: "Week 7", present: 5, absent: 0 },
        { name: "Week 8", present: 5, absent: 0 },
    ]

    return (
        <ResponsiveContainer width="100%" height={350}>
            <Chart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" stackId="a" fill="#22c55e" name="Present" />
                <Bar dataKey="absent" stackId="a" fill="#ef4444" name="Absent" />
            </Chart>
        </ResponsiveContainer>
    )
}
