
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { TrendingUp, TrendingDown, Smartphone, Globe, CreditCard, ShoppingCart } from "lucide-react";
import { fetchConsumerData } from "../services/api";

const ConsumerDataView = ({ selectedCountry, onFilterChange }) => {
  const { data: consumerData, isLoading, error } = useQuery({
    queryKey: ['consumer-data', selectedCountry],
    queryFn: () => fetchConsumerData(selectedCountry),
  });

  const economicTrendData = [
    { month: 'Jan', gdp: 6.2, inflation: 4.5, unemployment: 7.8 },
    { month: 'Feb', gdp: 6.4, inflation: 4.3, unemployment: 7.6 },
    { month: 'Mar', gdp: 6.6, inflation: 4.1, unemployment: 7.4 },
    { month: 'Apr', gdp: 6.8, inflation: 4.2, unemployment: 7.1 },
  ];

  const digitalTrendData = [
    { month: 'Jan', internet: 42.1, mobile: 115.2, payments: 21.8, ecommerce: 17.5 },
    { month: 'Feb', internet: 43.2, mobile: 116.8, payments: 22.4, ecommerce: 18.2 },
    { month: 'Mar', internet: 44.1, mobile: 117.9, payments: 23.1, ecommerce: 19.1 },
    { month: 'Apr', internet: 45.3, mobile: 118.7, payments: 23.4, ecommerce: 19.8 },
  ];

  const radarData = [
    { subject: 'GDP Growth', A: consumerData?.economic?.gdpGrowth || 0, fullMark: 10 },
    { subject: 'Internet Penetration', A: (consumerData?.digital?.internetPenetration || 0) / 10, fullMark: 10 },
    { subject: 'Mobile Usage', A: (consumerData?.digital?.mobileSubscribers || 0) / 20, fullMark: 10 },
    { subject: 'Digital Payments', A: (consumerData?.digital?.digitalPayments || 0) / 5, fullMark: 10 },
    { subject: 'E-commerce Growth', A: (consumerData?.digital?.eCommerceGrowth || 0) / 2, fullMark: 10 },
    { subject: 'Consumer Spending', A: (consumerData?.economic?.consumerSpending || 0) / 10, fullMark: 10 },
  ];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse bg-gray-200 h-8 w-64 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-red-600">Error loading consumer data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">
          Consumer Analytics - {selectedCountry}
        </h2>
        <Button variant="outline" size="sm">
          <TrendingUp className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <Tabs defaultValue="economic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="economic">Economic Indicators</TabsTrigger>
          <TabsTrigger value="digital">Digital Adoption</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="economic" className="space-y-6">
          {/* Economic Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">GDP Growth</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {consumerData?.economic?.gdpGrowth || 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Annual growth rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inflation Rate</CardTitle>
                <TrendingDown className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {consumerData?.economic?.inflation || 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Consumer price index
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unemployment</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {consumerData?.economic?.unemployment || 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Labor force participation
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Consumer Spending</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {consumerData?.economic?.consumerSpending || 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Of total GDP
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Economic Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={economicTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="gdp" stroke="#22c55e" strokeWidth={2} name="GDP Growth %" />
                  <Line type="monotone" dataKey="inflation" stroke="#f97316" strokeWidth={2} name="Inflation %" />
                  <Line type="monotone" dataKey="unemployment" stroke="#ef4444" strokeWidth={2} name="Unemployment %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="digital" className="space-y-6">
          {/* Digital Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Internet Penetration</CardTitle>
                <Globe className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {consumerData?.digital?.internetPenetration || 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Population with internet access
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mobile Subscribers</CardTitle>
                <Smartphone className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {consumerData?.digital?.mobileSubscribers || 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Per 100 inhabitants
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Digital Payments</CardTitle>
                <CreditCard className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {consumerData?.digital?.digitalPayments || 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Of total transactions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">E-commerce Growth</CardTitle>
                <ShoppingCart className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {consumerData?.digital?.eCommerceGrowth || 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Year-over-year growth
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Digital Adoption Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={digitalTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="internet" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.8} name="Internet %" />
                  <Area type="monotone" dataKey="mobile" stackId="2" stroke="#22c55e" fill="#22c55e" fillOpacity={0.8} name="Mobile %" />
                  <Area type="monotone" dataKey="payments" stackId="3" stroke="#a855f7" fill="#a855f7" fillOpacity={0.8} name="Digital Payments %" />
                  <Area type="monotone" dataKey="ecommerce" stackId="4" stroke="#f97316" fill="#f97316" fillOpacity={0.8} name="E-commerce Growth %" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Consumer Behavior Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name="Current Performance" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Badge variant="default" className="mt-1">Economic</Badge>
                    <div>
                      <p className="text-sm font-medium">Strong GDP Growth</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedCountry} shows consistent economic growth at {consumerData?.economic?.gdpGrowth || 0}% annually
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Badge variant="secondary" className="mt-1">Digital</Badge>
                    <div>
                      <p className="text-sm font-medium">Rising Digital Adoption</p>
                      <p className="text-xs text-muted-foreground">
                        Internet penetration at {consumerData?.digital?.internetPenetration || 0}% with growing mobile usage
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">Trend</Badge>
                    <div>
                      <p className="text-sm font-medium">E-commerce Boom</p>
                      <p className="text-xs text-muted-foreground">
                        {consumerData?.digital?.eCommerceGrowth || 0}% growth in online retail sector
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConsumerDataView;
