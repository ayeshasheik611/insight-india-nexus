
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface GovernmentSchemesViewProps {
  selectedCountry: string;
  onFilterChange: (filters: string[]) => void;
}

const GovernmentSchemesView = ({ selectedCountry, onFilterChange }: GovernmentSchemesViewProps) => {
  const [selectedRegion, setSelectedRegion] = useState("All Regions");

  // Mock data for government schemes
  const schemes = [
    {
      name: "Digital India Initiative",
      region: "National",
      category: "Technology",
      budget: "₹1,13,000 Cr",
      progress: 78,
      beneficiaries: "50 Cr+",
      status: "Active"
    },
    {
      name: "Pradhan Mantri Awas Yojana",
      region: "National",
      category: "Housing",
      budget: "₹2,17,000 Cr",
      progress: 65,
      beneficiaries: "1.2 Cr",
      status: "Active"
    },
    {
      name: "Swachh Bharat Mission",
      region: "National",
      category: "Environment",
      budget: "₹62,009 Cr",
      progress: 92,
      beneficiaries: "130 Cr",
      status: "Completed"
    },
    {
      name: "Jan Dhan Yojana",
      region: "National",
      category: "Financial Inclusion",
      budget: "₹28,000 Cr",
      progress: 85,
      beneficiaries: "45 Cr",
      status: "Active"
    },
    {
      name: "Maharashtra Employment Scheme",
      region: "Maharashtra",
      category: "Employment",
      budget: "₹15,000 Cr",
      progress: 72,
      beneficiaries: "2.5 Cr",
      status: "Active"
    },
    {
      name: "Kerala Digital Literacy",
      region: "Kerala",
      category: "Education",
      budget: "₹5,000 Cr",
      progress: 88,
      beneficiaries: "1.2 Cr",
      status: "Active"
    }
  ];

  const regionData = [
    { region: "National", schemes: 15, budget: 4200000, progress: 76 },
    { region: "Maharashtra", schemes: 8, budget: 850000, progress: 72 },
    { region: "Kerala", schemes: 6, budget: 420000, progress: 82 },
    { region: "Karnataka", schemes: 7, budget: 650000, progress: 68 },
    { region: "Tamil Nadu", schemes: 9, budget: 750000, progress: 74 },
  ];

  const categoryData = [
    { name: "Technology", value: 25, color: "#3B82F6" },
    { name: "Housing", value: 20, color: "#10B981" },
    { name: "Environment", value: 18, color: "#F59E0B" },
    { name: "Employment", value: 15, color: "#EF4444" },
    { name: "Education", value: 12, color: "#8B5CF6" },
    { name: "Others", value: 10, color: "#6B7280" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Completed": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Schemes</CardTitle>
          <CardDescription>Filter by region, category, or status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="All Regions">All Regions</option>
              <option value="National">National</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Kerala">Kerala</option>
              <option value="Karnataka">Karnataka</option>
            </select>
            <Button variant="outline" onClick={() => onFilterChange(['Technology'])}>
              Technology Schemes
            </Button>
            <Button variant="outline" onClick={() => onFilterChange(['Active'])}>
              Active Only
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Regional Overview Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Regional Budget Allocation</CardTitle>
            <CardDescription>Budget distribution across regions (in Crores)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value} Cr`, "Budget"]} />
                <Bar dataKey="budget" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheme Categories</CardTitle>
            <CardDescription>Distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schemes List */}
      <Card>
        <CardHeader>
          <CardTitle>Government Schemes - {selectedCountry}</CardTitle>
          <CardDescription>
            Comprehensive list of government schemes with implementation progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schemes
              .filter(scheme => selectedRegion === "All Regions" || scheme.region === selectedRegion)
              .map((scheme, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">{scheme.name}</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant="outline">{scheme.region}</Badge>
                      <Badge variant="outline">{scheme.category}</Badge>
                      <Badge className={getStatusColor(scheme.status)}>
                        {scheme.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg text-blue-600">{scheme.budget}</p>
                    <p className="text-sm text-gray-600">{scheme.beneficiaries} beneficiaries</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Implementation Progress</span>
                    <span className="font-medium">{scheme.progress}%</span>
                  </div>
                  <Progress 
                    value={scheme.progress} 
                    className={`h-2 ${getProgressColor(scheme.progress)}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernmentSchemesView;
