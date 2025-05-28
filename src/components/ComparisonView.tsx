
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";

interface ComparisonViewProps {
  selectedCountry: string;
  availableCountries: string[];
}

const ComparisonView = ({ selectedCountry, availableCountries }: ComparisonViewProps) => {
  const [comparisonCountries, setComparisonCountries] = useState<string[]>([selectedCountry, "United States"]);
  const [comparisonMetric, setComparisonMetric] = useState("overall");

  // Mock comparison data
  const countryMetrics = {
    "India": {
      gdpGrowth: 7.2,
      digitalAdoption: 52,
      governanceScore: 6.8,
      environmentalScore: 5.4,
      socialScore: 6.9,
      totalSchemes: 1247,
      schemeProgress: 76,
      problemSeverity: 7.1
    },
    "United States": {
      gdpGrowth: 2.1,
      digitalAdoption: 89,
      governanceScore: 8.2,
      environmentalScore: 7.1,
      socialScore: 7.8,
      totalSchemes: 892,
      schemeProgress: 84,
      problemSeverity: 5.9
    },
    "China": {
      gdpGrowth: 5.5,
      digitalAdoption: 73,
      governanceScore: 6.1,
      environmentalScore: 5.8,
      socialScore: 6.7,
      totalSchemes: 2156,
      schemeProgress: 82,
      problemSeverity: 6.8
    },
    "Brazil": {
      gdpGrowth: 1.8,
      digitalAdoption: 67,
      governanceScore: 5.9,
      environmentalScore: 6.2,
      socialScore: 6.1,
      totalSchemes: 758,
      schemeProgress: 71,
      problemSeverity: 7.4
    },
    "Germany": {
      gdpGrowth: 1.4,
      digitalAdoption: 85,
      governanceScore: 8.9,
      environmentalScore: 8.3,
      socialScore: 8.5,
      totalSchemes: 634,
      schemeProgress: 91,
      problemSeverity: 4.2
    },
    "Japan": {
      gdpGrowth: 0.9,
      digitalAdoption: 83,
      governanceScore: 8.1,
      environmentalScore: 7.6,
      socialScore: 8.1,
      totalSchemes: 567,
      schemeProgress: 88,
      problemSeverity: 4.8
    }
  };

  // Prepare comparison data
  const comparisonData = comparisonCountries.map(country => ({
    country,
    ...countryMetrics[country as keyof typeof countryMetrics]
  }));

  // Radar chart data for multi-dimensional comparison
  const radarData = comparisonCountries.map(country => {
    const metrics = countryMetrics[country as keyof typeof countryMetrics];
    return {
      country,
      "GDP Growth": metrics.gdpGrowth,
      "Digital Adoption": metrics.digitalAdoption / 10,
      "Governance": metrics.governanceScore,
      "Environment": metrics.environmentalScore,
      "Social": metrics.socialScore,
      "Scheme Progress": metrics.schemeProgress / 10
    };
  });

  // Historical comparison data (mock)
  const historicalData = [
    { year: "2019", India: 4.2, "United States": 2.3, China: 6.0, Germany: 0.6 },
    { year: "2020", India: -7.3, "United States": -3.4, China: 2.2, Germany: -4.9 },
    { year: "2021", India: 8.7, "United States": 5.7, China: 8.1, Germany: 2.9 },
    { year: "2022", India: 6.8, "United States": 2.1, China: 3.0, Germany: 1.8 },
    { year: "2023", India: 7.2, "United States": 2.1, China: 5.5, Germany: 1.4 },
  ];

  const countryColors = {
    "India": "#FF6B35",
    "United States": "#004E89",
    "China": "#DC2626",
    "Brazil": "#16A34A",
    "Germany": "#EAB308",
    "Japan": "#8B5CF6"
  };

  const addComparisonCountry = (country: string) => {
    if (!comparisonCountries.includes(country) && comparisonCountries.length < 4) {
      setComparisonCountries([...comparisonCountries, country]);
    }
  };

  const removeComparisonCountry = (country: string) => {
    if (comparisonCountries.length > 1) {
      setComparisonCountries(comparisonCountries.filter(c => c !== country));
    }
  };

  return (
    <div className="space-y-6">
      {/* Comparison Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Country Comparison Setup</CardTitle>
          <CardDescription>Select countries to compare and analysis metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Selected Countries:</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {comparisonCountries.map(country => (
                  <Badge key={country} variant="outline" className="flex items-center space-x-2">
                    <span>{country}</span>
                    {comparisonCountries.length > 1 && (
                      <button 
                        onClick={() => removeComparisonCountry(country)}
                        className="ml-1 text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Add Countries:</h3>
              <div className="flex flex-wrap gap-2">
                {availableCountries
                  .filter(country => !comparisonCountries.includes(country))
                  .map(country => (
                    <Button 
                      key={country}
                      variant="outline" 
                      size="sm"
                      onClick={() => addComparisonCountry(country)}
                      disabled={comparisonCountries.length >= 4}
                    >
                      + {country}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Key Metrics Comparison</CardTitle>
          <CardDescription>Side-by-side comparison of important indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Metric</th>
                  {comparisonCountries.map(country => (
                    <th key={country} className="text-center py-3 px-4 font-medium">
                      {country}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">GDP Growth Rate (%)</td>
                  {comparisonCountries.map(country => {
                    const metrics = countryMetrics[country as keyof typeof countryMetrics];
                    return (
                      <td key={country} className="text-center py-3 px-4">
                        <span className={`font-bold ${metrics.gdpGrowth > 5 ? 'text-green-600' : metrics.gdpGrowth > 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {metrics.gdpGrowth}%
                        </span>
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Digital Adoption (%)</td>
                  {comparisonCountries.map(country => {
                    const metrics = countryMetrics[country as keyof typeof countryMetrics];
                    return (
                      <td key={country} className="text-center py-3 px-4">
                        <span className="font-bold text-blue-600">{metrics.digitalAdoption}%</span>
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Governance Score (0-10)</td>
                  {comparisonCountries.map(country => {
                    const metrics = countryMetrics[country as keyof typeof countryMetrics];
                    return (
                      <td key={country} className="text-center py-3 px-4">
                        <span className="font-bold text-purple-600">{metrics.governanceScore}</span>
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Total Schemes</td>
                  {comparisonCountries.map(country => {
                    const metrics = countryMetrics[country as keyof typeof countryMetrics];
                    return (
                      <td key={country} className="text-center py-3 px-4">
                        <span className="font-bold text-indigo-600">{metrics.totalSchemes.toLocaleString()}</span>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Scheme Progress (%)</td>
                  {comparisonCountries.map(country => {
                    const metrics = countryMetrics[country as keyof typeof countryMetrics];
                    return (
                      <td key={country} className="text-center py-3 px-4">
                        <span className="font-bold text-green-600">{metrics.schemeProgress}%</span>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Visual Comparisons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>GDP Growth Comparison</CardTitle>
            <CardDescription>Economic growth rates across countries</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="gdpGrowth" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Digital Adoption vs Governance</CardTitle>
            <CardDescription>Relationship between digital adoption and governance scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="digitalAdoption" fill="#10B981" name="Digital Adoption %" />
                <Bar dataKey="governanceScore" fill="#8B5CF6" name="Governance Score (x10)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Historical Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Historical GDP Growth Trends</CardTitle>
          <CardDescription>5-year comparison of economic growth patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              {comparisonCountries.map(country => (
                <Line
                  key={country}
                  type="monotone"
                  dataKey={country}
                  stroke={countryColors[country as keyof typeof countryColors]}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Multi-dimensional Radar Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Multi-Dimensional Performance Radar</CardTitle>
          <CardDescription>Comprehensive comparison across all key dimensions</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <RadarChart data={radarData[0]} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 10]} />
              {comparisonCountries.map((country, index) => (
                <Radar
                  key={country}
                  name={country}
                  dataKey={country}
                  stroke={Object.values(countryColors)[index]}
                  fill={Object.values(countryColors)[index]}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              ))}
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparisonView;
