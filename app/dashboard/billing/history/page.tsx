"use client"

import Link from "next/link"
import { ArrowLeft, Download, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Invoice {
  id: string
  date: string
  amount: number
  status: "paid" | "pending" | "failed"
  description: string
}

const invoices: Invoice[] = [
  {
    id: "INV-001",
    date: "Apr 1, 2025",
    amount: 29.0,
    status: "paid",
    description: "EventMaster Pro Plan - Monthly",
  },
  {
    id: "INV-002",
    date: "Mar 1, 2025",
    amount: 29.0,
    status: "paid",
    description: "EventMaster Pro Plan - Monthly",
  },
  {
    id: "INV-003",
    date: "Feb 1, 2025",
    amount: 29.0,
    status: "paid",
    description: "EventMaster Pro Plan - Monthly",
  },
  {
    id: "INV-004",
    date: "Jan 1, 2025",
    amount: 29.0,
    status: "paid",
    description: "EventMaster Pro Plan - Monthly",
  },
  {
    id: "INV-005",
    date: "Dec 1, 2024",
    amount: 29.0,
    status: "paid",
    description: "EventMaster Pro Plan - Monthly",
  },
]

export default function BillingHistoryPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/profile">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Billing History</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>View and download your past invoices.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Invoices</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        invoice.status === "paid"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : invoice.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View invoice</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download invoice</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
          <CardDescription>Summary of your billing and payment history.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground">Current Plan</div>
              <div className="mt-1 text-2xl font-bold">Pro Plan</div>
              <div className="mt-1 text-sm text-muted-foreground">$29.00/month</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground">Next Billing Date</div>
              <div className="mt-1 text-2xl font-bold">May 1, 2025</div>
              <div className="mt-1 text-sm text-muted-foreground">Automatic renewal</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground">Total Spent</div>
              <div className="mt-1 text-2xl font-bold">$145.00</div>
              <div className="mt-1 text-sm text-muted-foreground">Last 5 months</div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium mb-2">Payment Method</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-muted p-2">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">Visa ending in 4242</div>
                  <div className="text-sm text-muted-foreground">Expires 04/25</div>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/billing/payment-methods">Change</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
