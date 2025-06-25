
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TreeMap, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import { AlertTriangle, TrendingUp, TrendingDown, Users, Leaf, Building } from "lucide-react";
import { fetchProblemsData } from "../services/api";

const ProblemsAnalysisView = ({ selectedCountry, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const { data: problemsData, isLoading, error } = useQuery({
    queryKey: ['problems-data', selectedCountry],
    queryFn: () => fetchProblemsData(selectedCountry),
  });

  const categories = ["all", "social", "environmental", "governance"];
  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e'];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'Improving': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'Worsening': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'social': return <Users className="w-5 h-5" />;
      case 'environmental': return <Leaf className="w-5 h-5" />;
      case 'governance': return <Building className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getAllProblems = () => {
    if (!problemsData) return [];
    return [
      ...problemsData.social?.map(p => ({ ...p, categoryType: 'social' })) || [],
      ...problemsData.environmental?.map(p => ({ ...p, categoryType: 'environmental' })) || [],
      ...problemsData.governance?.map(p => ({ ...p, categoryType: 'governance' })) || []
    ];
  };

  const filteredProblems = selectedCategory === "all" 
    ? getAllProblems()
    : problemsData?.[selectedCategory]?.map(p => ({ ...p, categoryType: selectedCategory })) || [];

  const problemsByCategory = categories.slice(1).map(category => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: problemsData?.[category]?.length || 0,
    problems: problemsData?.[category] || []
  }));

  const severityData = filteredProblems.reduce((acc, problem) => {
    acc[problem.severity] = (acc[problem.severity] || 0) + 1;
    return acc;
  }, {});

  const severityChartData = Object.entries(severityData).map(([severity, count]) => ({
    name: severity,
    value: count
  }));

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse bg-gray-200 h-8 w-64 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
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
          <p className="text-red-600">Error loading problems data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">
          Problem Analysis - {selectedCountry}
        </h2>
        <Button variant="outline" size="sm">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Generate Action Plan
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Social Issues</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {problemsData?.social?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Active social challenges
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Environmental</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {problemsData?.environmental?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Environmental concerns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Governance</CardTitle>
            <Building className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {problemsData?.governance?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Governance issues
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="flex items-center gap-2"
              >
                {category !== "all" && getCategoryIcon(category)}
                {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="severity">Severity Analysis</TabsTrigger>
          <TabsTrigger value="details">Detailed Problems</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Problems by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={problemsByCategory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Problem Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={problemsByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {problemsByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="severity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Severity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={severityChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {severityChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>High Priority Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredProblems
                    .filter(problem => problem.severity === 'Critical' || problem.severity === 'High')
                    .slice(0, 5)
                    .map((problem, index) => (
                      <div key={index} className="flex items-start justify-between p-3 bg-red-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{problem.category}</p>
                          <p className="text-xs text-gray-600">{problem.affected} people affected</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(problem.severity)}>
                            {problem.severity}
                          </Badge>
                          {getTrendIcon(problem.trend)}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Problem Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Affected</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProblems.map((problem, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(problem.categoryType)}
                          <span className="font-medium">{problem.category}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{problem.categoryType}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(problem.severity)}>
                          {problem.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{problem.affected}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(problem.trend)}
                          <span className="text-sm">{problem.trend}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProblemsAnalysisView;
