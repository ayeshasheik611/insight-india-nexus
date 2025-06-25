
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ScatterChart,
  Scatter
} from "recharts";
import { Compare, Download, TrendingUp, Globe } from "lucide-react";

const ComparisonView = ({ selectedCountry, availableCountries }) => {
  const [compareCountries, setCompareCountries] = useState([selectedCountry]);
  const [comparisonMetric, setComparisonMetric] = useState("overall");

  // Mock data for comparison
  const getCountryData = (country) => ({
    country,
    "GDP Growth": Math.random() * 10,
    "Digital Adoption": Math.random() * 100,
    "Governance": Math.random() * 10,
    "Environment": Math.random() * 10,
    "Social": Math.random() * 10,
    "Scheme Progress": Math.random() * 100
  });

  const comparisonData = compareCountries.map(country => getCountryData(country));

  const radarData = [
    {
      subject: 'GDP Growth',
      ...compareCountries.reduce((acc, country, index) => {
        acc[country] = comparisonData[index]["GDP Growth"];
        return acc;
      }, {}),
      fullMark: 10
    },
    {
      subject: 'Digital Adoption',
      ...compareCountries.reduce((acc, country, index) => {
        acc[country] = comparisonData[index]["Digital Adoption"] / 10;
        return acc;
      }, {}),
      fullMark: 10
    },
    {
      subject: 'Governance',
      ...compareCountries.reduce((acc, country, index) => {
        acc[country] = comparisonData[index]["Governance"];
        return acc;
      }, {}),
      fullMark: 10
    },
    {
      subject: 'Environment',
      ...compareCountries.reduce((acc, country, index) => {
        acc[country] = comparisonData[index]["Environment"];
        return acc;
      }, {}),
      fullMark: 10
    },
    {
      subject: 'Social',
      ...compareCountries.reduce((acc, country, index) => {
        acc[country] = comparisonData[index]["Social"];
        return acc;
      }, {}),
      fullMark: 10
    }
  ];

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1'];

  const addCountryToComparison = (country) => {
    if (!compareCountries.includes(country) && compareCountries.length < 5) {
      setCompareCountries([...compareCountries, country]);
    }
  };

  const removeCountryFromComparison = (country) => {
    if (compareCountries.length > 1) {
      setCompareCountries(compareCountries.filter(c => c !== country));
    }
  };

  const schemeComparisonData = compareCountries.map(country => ({
    country,
    active: Math.floor(Math.random() * 500) + 100,
    completed: Math.floor(Math.random() * 200) + 50,
    budget: Math.floor(Math.random() * 50) + 10
  }));

  const timeSeriesData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2024, i).toLocaleString('default', { month: 'short' });
    const data = { month };
    compareCountries.forEach(country => {
      data[country] = Math.random() * 10 + 5;
    });
    return data;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">
          Country Comparison
        </h2>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Country Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compare className="w-5 h-5" />
            Select Countries to Compare
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {compareCountries.map((country, index) => (
                <Badge 
                  key={country} 
                  variant="default" 
                  className="flex items-center gap-2 px-3 py-1"
                  style={{ backgroundColor: colors[index % colors.length] }}
                >
                  <Globe className="w-3 h-3" />
                  {country}
                  {compareCountries.length > 1 && (
                    <button
                      onClick={() => removeCountryFromComparison(country)}
                      className="ml-2 text-white hover:text-gray-200"
                    >
                      ×
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            
            {compareCountries.length < 5 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Add country:</span>
                <Select onValueChange={addCountryToComparison}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCountries
                      .filter(country => !compareCountries.includes(country))
                      .map(country => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Metrics */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium">Comparison Focus:</span>
            <Select value={comparisonMetric} onValueChange={setComparisonMetric}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overall">Overall Performance</SelectItem>
                <SelectItem value="economic">Economic Indicators</SelectItem>
                <SelectItem value="digital">Digital Transformation</SelectItem>
                <SelectItem value="governance">Governance Quality</SelectItem>
                <SelectItem value="social">Social Development</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="radar" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="radar">Multi-dimensional</TabsTrigger>
          <TabsTrigger value="bar">Side-by-side</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="schemes">Schemes</TabsTrigger>
        </TabsList>

        <TabsContent value="radar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Multi-dimensional Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={500}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis domain={[0, 10]} tickCount={6} />
                  {compareCountries.map((country, index) => (
                    <Radar
                      key={country}
                      name={country}
                      dataKey={country}
                      stroke={colors[index % colors.length]}
                      fill={colors[index % colors.length]}
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                  ))}
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {compareCountries.map((country, index) => (
              <Card key={country}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    />
                    {country}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>GDP Growth:</span>
                      <span className="font-semibold">{comparisonData[index]["GDP Growth"].toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Digital Score:</span>
                      <span className="font-semibold">{comparisonData[index]["Digital Adoption"].toFixed(0)}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Governance:</span>
                      <span className="font-semibold">{comparisonData[index]["Governance"].toFixed(1)}/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Side-by-side Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="GDP Growth" fill="#8884d8" name="GDP Growth %" />
                  <Bar dataKey="Governance" fill="#82ca9d" name="Governance Score" />
                  <Bar dataKey="Social" fill="#ffc658" name="Social Development" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  {compareCountries.map((country, index) => (
                    <Line
                      key={country}
                      type="monotone"
                      dataKey={country}
                      stroke={colors[index % colors.length]}
                      strokeWidth={2}
                      name={`${country} Performance`}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schemes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Government Schemes Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={schemeComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="active" fill="#22c55e" name="Active Schemes" />
                  <Bar dataKey="completed" fill="#3b82f6" name="Completed Schemes" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schemeComparisonData.map((data, index) => (
              <Card key={data.country}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{data.country}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Schemes</span>
                      <Badge variant="default" className="bg-green-600">
                        {data.active}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Completed</span>
                      <Badge variant="secondary" className="bg-blue-600 text-white">
                        {data.completed}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Budget</span>
                      <span className="font-semibold">${data.budget}B</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span>Success Rate</span>
                        <span className="font-semibold text-green-600">
                          {((data.completed / (data.active + data.completed)) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComparisonView;
