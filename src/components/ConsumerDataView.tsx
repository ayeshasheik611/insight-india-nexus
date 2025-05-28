
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";

interface ConsumerDataViewProps {
  selectedCountry: string;
  onFilterChange: (filters: string[]) => void;
}

const ConsumerDataView = ({ selectedCountry, onFilterChange }: ConsumerDataViewProps) => {
  // Mock economic indicators data
  const economicTrends = [
    { year: "2019", gdp: 2.9, inflation: 4.8, unemployment: 5.3, consumerSpending: 1200 },
    { year: "2020", gdp: -7.3, inflation: 6.2, unemployment: 7.1, consumerSpending: 980 },
    { year: "2021", gdp: 8.7, inflation: 5.1, unemployment: 6.8, consumerSpending: 1150 },
    { year: "2022", gdp: 6.8, inflation: 6.7, unemployment: 5.9, consumerSpending: 1350 },
    { year: "2023", gdp: 7.2, inflation: 5.4, unemployment: 5.2, consumerSpending: 1480 },
  ];

  // Digital usage indicators
  const digitalUsage = [
    { metric: "Internet Penetration", value: 52, change: "+8%", unit: "%" },
    { metric: "Mobile Subscribers", value: 84, change: "+12%", unit: "%" },
    { metric: "Digital Payments", value: 76, change: "+25%", unit: "%" },
    { metric: "E-commerce Usage", value: 38, change: "+18%", unit: "%" },
    { metric: "Social Media Users", value: 67, change: "+15%", unit: "%" },
    { metric: "Digital Banking", value: 45, change: "+22%", unit: "%" },
  ];

  // Regional digital divide data
  const regionalData = [
    { region: "Urban", internet: 78, mobile: 92, ecommerce: 58, banking: 67 },
    { region: "Semi-Urban", internet: 45, mobile: 81, ecommerce: 32, banking: 38 },
    { region: "Rural", internet: 31, mobile: 73, ecommerce: 18, banking: 24 },
  ];

  // Consumer behavior segments
  const consumerSegments = [
    { segment: "Digital Natives", size: 28, spending: 1800, growth: "+15%" },
    { segment: "Traditional Adopters", size: 35, spending: 1200, growth: "+8%" },
    { segment: "Price Conscious", size: 22, spending: 850, growth: "+5%" },
    { segment: "Premium Buyers", size: 15, spending: 2400, growth: "+12%" },
  ];

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return "text-green-600 bg-green-100";
    if (change.startsWith('-')) return "text-red-600 bg-red-100";
    return "text-gray-600 bg-gray-100";
  };

  return (
    <div className="space-y-6">
      {/* Economic Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Economic Indicators Trend</CardTitle>
            <CardDescription>Key economic metrics over time for {selectedCountry}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={economicTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="gdp" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="GDP Growth (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="inflation" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  name="Inflation (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="unemployment" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="Unemployment (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consumer Spending Trend</CardTitle>
            <CardDescription>Annual consumer spending in billions USD</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={economicTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}B`, "Consumer Spending"]} />
                <Area 
                  type="monotone" 
                  dataKey="consumerSpending" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Digital Usage Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Digital Usage Indicators</CardTitle>
          <CardDescription>Current digital adoption metrics for {selectedCountry}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {digitalUsage.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{item.metric}</h3>
                  <Badge className={getChangeColor(item.change)}>
                    {item.change}
                  </Badge>
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold text-blue-600">{item.value}</span>
                  <span className="text-sm text-gray-500">{item.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regional Digital Divide */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Digital Divide</CardTitle>
          <CardDescription>Digital adoption rates across different regions</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={regionalData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="internet" fill="#3B82F6" name="Internet %" />
              <Bar dataKey="mobile" fill="#10B981" name="Mobile %" />
              <Bar dataKey="ecommerce" fill="#F59E0B" name="E-commerce %" />
              <Bar dataKey="banking" fill="#8B5CF6" name="Digital Banking %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Consumer Segments */}
      <Card>
        <CardHeader>
          <CardTitle>Consumer Behavior Segments</CardTitle>
          <CardDescription>Market segmentation based on digital behavior and spending patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {consumerSegments.map((segment, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{segment.segment}</h3>
                  <Badge className={getChangeColor(segment.growth)}>
                    {segment.growth}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Market Share</p>
                    <p className="text-xl font-bold text-blue-600">{segment.size}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg. Annual Spending</p>
                    <p className="text-xl font-bold text-green-600">${segment.spending}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filter Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Data Filters</CardTitle>
          <CardDescription>Apply filters to focus on specific data segments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              onClick={() => onFilterChange(['Digital Economy'])}
            >
              Digital Economy Focus
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onFilterChange(['Urban Markets'])}
            >
              Urban Markets
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onFilterChange(['High Growth Segments'])}
            >
              High Growth Segments
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onFilterChange(['Rural Digital Divide'])}
            >
              Rural Digital Divide
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsumerDataView;
