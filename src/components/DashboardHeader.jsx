
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const DashboardHeader = ({ selectedCountry, onCountryChange, countries }) => {
  return (
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
              onChange={(e) => onCountryChange(e.target.value)}
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
  );
};

export default DashboardHeader;
