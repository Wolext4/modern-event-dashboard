"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, LineChart, BarChart, PieChart, Users, Ticket, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample event data
const eventData = {
  id: 1,
  name: "Tech Conference 2025",
  date: "May 15-17, 2025",
  location: "San Francisco Convention Center",
}

// Sample analytics data
const analyticsData = {
  ticketSales: {
    total: 850,
    capacity: 1500,
    revenue: "$127,500",
    byType: [
      { name: "Early Bird", count: 500, revenue: "$75,000" },
      { name: "Regular", count: 300, revenue: "$45,000" },
      { name: "VIP", count: 50, revenue: "$7,500" },
    ],
    byDay: [
      { date: "2025-01-15", count: 50, revenue: "$7,500" },
      { date: "2025-02-01", count: 120, revenue: "$18,000" },
      { date: "2025-02-15", count: 200, revenue: "$30,000" },
      { date: "2025-03-01", count: 180, revenue: "$27,000" },
      { date: "2025-03-15", count: 150, revenue: "$22,500" },
      { date: "2025-04-01", count: 100, revenue: "$15,000" },
      { date: "2025-04-15", count: 50, revenue: "$7,500" },
    ],
  },
  attendees: {
    demographics: [
      { group: "18-24", count: 150 },
      { group: "25-34", count: 350 },
      { group: "35-44", count: 200 },
      { group: "45-54", count: 100 },
      { group: "55+", count: 50 },
    ],
    locations: [
      { location: "California", count: 400 },
      { location: "New York", count: 150 },
      { location: "Texas", count: 100 },
      { location: "Washington", count: 80 },
      { location: "Other States", count: 70 },
      { location: "International", count: 50 },
    ],
    registrationSource: [
      { source: "Website", count: 500 },
      { source: "Mobile App", count: 200 },
      { source: "Partner Referral", count: 100 },
      { source: "Social Media", count: 50 },
    ],
  },
  engagement: {
    pageViews: 12500,
    uniqueVisitors: 5800,
    conversionRate: "14.7%",
    averageTimeOnPage: "3m 24s",
    topReferrers: [
      { source: "Google", count: 2500 },
      { source: "Direct", count: 1800 },
      { source: "Twitter", count: 800 },
      { source: "LinkedIn", count: 500 },
      { source: "Facebook", count: 200 },
    ],
  },
}

export default function EventAnalyticsPage({ params }: { params: { id: string } }) {
  const [dateRange, setDateRange] = useState("all")

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/events/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Event Analytics</h1>
          <p className="text-muted-foreground">Analytics and insights for {eventData.name}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Select defaultValue={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ticket Sales</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.ticketSales.total}</div>
              <p className="text-xs text-muted-foreground">
                out of {analyticsData.ticketSales.capacity} (
                {Math.round((analyticsData.ticketSales.total / analyticsData.ticketSales.capacity) * 100)}%)
              </p>
              <div className="mt-4 h-[60px]">
                {/* This would be a chart in a real implementation */}
                <div className="flex h-full items-end gap-1">
                  {analyticsData.ticketSales.byDay.map((day, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-primary/80 hover:bg-primary"
                      style={{ height: `${(day.count / 200) * 100}%` }}
                      title={`${day.date}: ${day.count} tickets`}
                    ></div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.ticketSales.revenue}</div>
              <p className="text-xs text-muted-foreground">
                Average ticket price: $
                {Math.round(
                  Number.parseInt(analyticsData.ticketSales.revenue.replace(/[^0-9.-]+/g, "")) /
                    analyticsData.ticketSales.total,
                )}
              </p>
              <div className="mt-4 h-[60px]">
                {/* This would be a chart in a real implementation */}
                <div className="flex h-full items-end gap-1">
                  {analyticsData.ticketSales.byType.map((type, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-primary/80 hover:bg-primary"
                      style={{ height: `${(Number.parseInt(type.revenue.replace(/[^0-9.-]+/g, "")) / 75000) * 100}%` }}
                      title={`${type.name}: ${type.revenue}`}
                    ></div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.engagement.pageViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {analyticsData.engagement.uniqueVisitors.toLocaleString()} unique visitors
              </p>
              <div className="mt-4 h-[60px]">
                {/* This would be a chart in a real implementation */}
                <div className="flex h-full items-end gap-1">
                  {analyticsData.engagement.topReferrers.map((referrer, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-primary/80 hover:bg-primary"
                      style={{ height: `${(referrer.count / 2500) * 100}%` }}
                      title={`${referrer.source}: ${referrer.count} visits`}
                    ></div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList>
          <TabsTrigger value="sales">Sales Analysis</TabsTrigger>
          <TabsTrigger value="attendees">Attendee Demographics</TabsTrigger>
          <TabsTrigger value="engagement">Engagement Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Sales by Type</CardTitle>
                  <CardDescription>Distribution of ticket sales by ticket type</CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="h-[300px] w-full">
                    {/* This would be a pie chart in a real implementation */}
                    <div className="flex h-full items-center justify-center">
                      <PieChart className="h-40 w-40 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {analyticsData.ticketSales.byType.map((type, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full bg-primary`} style={{ opacity: 0.5 + i * 0.2 }}></div>
                          <span>{type.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{type.count} tickets</div>
                          <div className="text-sm text-muted-foreground">{type.revenue}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Sales Timeline</CardTitle>
                  <CardDescription>Ticket sales over time</CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="h-[300px] w-full">
                    {/* This would be a line chart in a real implementation */}
                    <div className="flex h-full items-center justify-center">
                      <LineChart className="h-40 w-40 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm text-muted-foreground">Peak Day</div>
                        <div className="font-medium">Feb 15, 2025</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Peak Sales</div>
                        <div className="font-medium">200 tickets</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Avg. Daily</div>
                        <div className="font-medium">~28 tickets</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Sales Forecast</CardTitle>
                <CardDescription>Projected ticket sales until event date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  {/* This would be a line chart with projection in a real implementation */}
                  <div className="flex h-full items-center justify-center">
                    <LineChart className="h-40 w-40 text-muted-foreground" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm text-muted-foreground">Current Sales</div>
                    <div className="text-lg font-medium">{analyticsData.ticketSales.total} tickets</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm text-muted-foreground">Projected Sales</div>
                    <div className="text-lg font-medium">1,350 tickets</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm text-muted-foreground">Current Revenue</div>
                    <div className="text-lg font-medium">{analyticsData.ticketSales.revenue}</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm text-muted-foreground">Projected Revenue</div>
                    <div className="text-lg font-medium">$202,500</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Sales Report
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="attendees" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Age Demographics</CardTitle>
                  <CardDescription>Attendee distribution by age group</CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="h-[300px] w-full">
                    {/* This would be a bar chart in a real implementation */}
                    <div className="flex h-full items-center justify-center">
                      <BarChart className="h-40 w-40 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {analyticsData.attendees.demographics.map((group, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span>{group.group}</span>
                        <div className="text-right">
                          <div className="font-medium">{group.count} attendees</div>
                          <div className="text-sm text-muted-foreground">
                            {Math.round((group.count / analyticsData.ticketSales.total) * 100)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Attendee distribution by location</CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="h-[300px] w-full">
                    {/* This would be a map chart in a real implementation */}
                    <div className="flex h-full items-center justify-center">
                      <div className="h-40 w-40 rounded-md bg-muted"></div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {analyticsData.attendees.locations.map((location, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span>{location.location}</span>
                        <div className="text-right">
                          <div className="font-medium">{location.count} attendees</div>
                          <div className="text-sm text-muted-foreground">
                            {Math.round((location.count / analyticsData.ticketSales.total) * 100)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Registration Sources</CardTitle>
                <CardDescription>How attendees registered for the event</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  {/* This would be a pie chart in a real implementation */}
                  <div className="flex h-full items-center justify-center">
                    <PieChart className="h-40 w-40 text-muted-foreground" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {analyticsData.attendees.registrationSource.map((source, i) => (
                    <div key={i} className="rounded-lg border p-3">
                      <div className="text-sm text-muted-foreground">{source.source}</div>
                      <div className="text-lg font-medium">{source.count}</div>
                      <div className="text-xs text-muted-foreground">
                        {Math.round((source.count / analyticsData.ticketSales.total) * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Attendee Report
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="engagement" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Website Traffic</CardTitle>
                  <CardDescription>Visitor traffic to event page</CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="h-[300px] w-full">
                    {/* This would be a line chart in a real implementation */}
                    <div className="flex h-full items-center justify-center">
                      <LineChart className="h-40 w-40 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Page Views</div>
                      <div className="text-lg font-medium">{analyticsData.engagement.pageViews.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Unique Visitors</div>
                      <div className="text-lg font-medium">
                        {analyticsData.engagement.uniqueVisitors.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Conversion Rate</div>
                      <div className="text-lg font-medium">{analyticsData.engagement.conversionRate}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Avg. Time on Page</div>
                      <div className="text-lg font-medium">{analyticsData.engagement.averageTimeOnPage}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where visitors are coming from</CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="h-[300px] w-full">
                    {/* This would be a bar chart in a real implementation */}
                    <div className="flex h-full items-center justify-center">
                      <BarChart className="h-40 w-40 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {analyticsData.engagement.topReferrers.map((referrer, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span>{referrer.source}</span>
                        <div className="text-right">
                          <div className="font-medium">{referrer.count.toLocaleString()} visits</div>
                          <div className="text-sm text-muted-foreground">
                            {Math.round((referrer.count / analyticsData.engagement.pageViews) * 100)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>Visitor journey from page view to ticket purchase</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  {/* This would be a funnel chart in a real implementation */}
                  <div className="flex h-full items-center justify-center">
                    <div className="space-y-2">
                      <div className="h-8 w-[400px] rounded bg-primary/80"></div>
                      <div className="ml-10 h-8 w-[320px] rounded bg-primary/70"></div>
                      <div className="ml-20 h-8 w-[240px] rounded bg-primary/60"></div>
                      <div className="ml-30 h-8 w-[160px] rounded bg-primary/50"></div>
                      <div className="ml-40 h-8 w-[80px] rounded bg-primary/40"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-5 gap-2">
                  <div className="rounded-lg border p-2 text-center">
                    <div className="text-xs text-muted-foreground">Page Views</div>
                    <div className="text-sm font-medium">12,500</div>
                    <div className="text-xs text-muted-foreground">100%</div>
                  </div>
                  <div className="rounded-lg border p-2 text-center">
                    <div className="text-xs text-muted-foreground">Ticket Info</div>
                    <div className="text-sm font-medium">5,800</div>
                    <div className="text-xs text-muted-foreground">46.4%</div>
                  </div>
                  <div className="rounded-lg border p-2 text-center">
                    <div className="text-xs text-muted-foreground">Cart</div>
                    <div className="text-sm font-medium">2,100</div>
                    <div className="text-xs text-muted-foreground">16.8%</div>
                  </div>
                  <div className="rounded-lg border p-2 text-center">
                    <div className="text-xs text-muted-foreground">Checkout</div>
                    <div className="text-sm font-medium">1,050</div>
                    <div className="text-xs text-muted-foreground">8.4%</div>
                  </div>
                  <div className="rounded-lg border p-2 text-center">
                    <div className="text-xs text-muted-foreground">Purchase</div>
                    <div className="text-sm font-medium">850</div>
                    <div className="text-xs text-muted-foreground">6.8%</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Engagement Report
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
