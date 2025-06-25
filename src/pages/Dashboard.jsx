
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartArea, ChartBar, ChartPie, Database } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";
import GovernmentSchemesView from "@/components/GovernmentSchemesView";
import ConsumerDataView from "@/components/ConsumerDataView";
import ProblemsAnalysisView from "@/components/ProblemsAnalysisView";
import ComparisonView from "@/components/ComparisonView";

const Dashboard = () => {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [activeFilters, setActiveFilters] = useState([]);

  const countries = ["India", "United States", "China", "Brazil", "Germany", "Japan"];
  
  const dashboardStats = [
    { title: "Active Schemes", value: "1,247", change: "+12%", icon: Database },
    { title: "Consumer Indicators", value: "89", change: "+5%", icon: ChartBar },
    { title: "Problem Categories", value: "156", change: "+8%", icon: Database },
    { title: "Data Points", value: "45.2K", change: "+23%", icon: ChartArea },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <DashboardHeader 
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        countries={countries}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
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

export default Dashboard;
