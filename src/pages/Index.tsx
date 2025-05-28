
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChartArea, ChartBar, ChartPie, Database, FileText, Search } from "lucide-react";
import GovernmentSchemesView from "@/components/GovernmentSchemesView";
import ConsumerDataView from "@/components/ConsumerDataView";
import ProblemsAnalysisView from "@/components/ProblemsAnalysisView";
import ComparisonView from "@/components/ComparisonView";

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const countries = ["India", "United States", "China", "Brazil", "Germany", "Japan"];
  
  const dashboardStats = [
    { title: "Active Schemes", value: "1,247", change: "+12%", icon: Database },
    { title: "Consumer Indicators", value: "89", change: "+5%", icon: ChartBar },
    { title: "Problem Categories", value: "156", change: "+8%", icon: FileText },
    { title: "Data Points", value: "45.2K", change: "+23%", icon: ChartArea },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Data Intelligence Platform
              </h1>
              <p className="text-gray-600 mt-2">
                Government Schemes, Consumer Analytics & Problem Insights
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <div className="flex items-center mt-2">
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <Badge variant="secondary" className="ml-2 text-green-600 bg-green-100">
                          {stat.change}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700">Active Filters:</span>
              {activeFilters.map((filter, index) => (
                <Badge key={index} variant="outline" className="cursor-pointer">
                  {filter}
                  <button 
                    onClick={() => setActiveFilters(prev => prev.filter(f => f !== filter))}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="schemes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="schemes" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>Government Schemes</span>
            </TabsTrigger>
            <TabsTrigger value="consumer" className="flex items-center space-x-2">
              <ChartBar className="w-4 h-4" />
              <span>Consumer Data</span>
            </TabsTrigger>
            <TabsTrigger value="problems" className="flex items-center space-x-2">
              <ChartPie className="w-4 h-4" />
              <span>Problem Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center space-x-2">
              <ChartArea className="w-4 h-4" />
              <span>Comparison</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schemes" className="space-y-6">
            <GovernmentSchemesView 
              selectedCountry={selectedCountry} 
              onFilterChange={setActiveFilters}
            />
          </TabsContent>

          <TabsContent value="consumer" className="space-y-6">
            <ConsumerDataView 
              selectedCountry={selectedCountry}
              onFilterChange={setActiveFilters}
            />
          </TabsContent>

          <TabsContent value="problems" className="space-y-6">
            <ProblemsAnalysisView 
              selectedCountry={selectedCountry}
              onFilterChange={setActiveFilters}
            />
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <ComparisonView 
              selectedCountry={selectedCountry}
              availableCountries={countries}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
