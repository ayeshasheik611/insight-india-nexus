
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

interface ProblemsAnalysisViewProps {
  selectedCountry: string;
  onFilterChange: (filters: string[]) => void;
}

const ProblemsAnalysisView = ({ selectedCountry, onFilterChange }: ProblemsAnalysisViewProps) => {
  // Problem categories distribution
  const problemCategories = [
    { name: "Social", value: 42, color: "#EF4444", issues: 156 },
    { name: "Environmental", value: 35, color: "#10B981", issues: 128 },
    { name: "Governance", value: 23, color: "#3B82F6", issues: 89 },
  ];

  // Social problems breakdown
  const socialProblems = [
    { issue: "Education Access", severity: 8.5, affected: 25, trend: "Improving", budget: 15000 },
    { issue: "Healthcare Gap", severity: 7.8, affected: 30, trend: "Stable", budget: 22000 },
    { issue: "Digital Divide", severity: 7.2, affected: 40, trend: "Improving", budget: 8500 },
    { issue: "Employment", severity: 8.1, affected: 35, trend: "Declining", budget: 18000 },
    { issue: "Gender Inequality", severity: 6.9, affected: 48, trend: "Improving", budget: 5200 },
    { issue: "Rural-Urban Gap", severity: 7.5, affected: 42, trend: "Stable", budget: 12000 },
  ];

  // Environmental problems
  const environmentalProblems = [
    { issue: "Air Pollution", severity: 9.1, affected: 60, trend: "Declining", budget: 25000 },
    { issue: "Water Scarcity", severity: 8.7, affected: 45, trend: "Declining", budget: 30000 },
    { issue: "Waste Management", severity: 7.4, affected: 38, trend: "Improving", budget: 15000 },
    { issue: "Forest Degradation", severity: 7.8, affected: 22, trend: "Stable", budget: 12000 },
    { issue: "Climate Adaptation", severity: 8.3, affected: 55, trend: "Declining", budget: 20000 },
  ];

  // Governance problems
  const governanceProblems = [
    { issue: "Corruption", severity: 7.6, affected: 35, trend: "Improving", budget: 8000 },
    { issue: "Bureaucratic Delays", severity: 6.8, affected: 42, trend: "Stable", budget: 5500 },
    { issue: "Policy Implementation", severity: 7.2, affected: 38, trend: "Improving", budget: 12000 },
    { issue: "Transparency", severity: 6.5, affected: 30, trend: "Improving", budget: 4200 },
    { issue: "Digital Governance", severity: 5.9, affected: 25, trend: "Improving", budget: 15000 },
  ];

  // Regional comparison data
  const regionalComparison = [
    { region: "North", social: 7.2, environmental: 8.5, governance: 6.8 },
    { region: "South", social: 6.8, environmental: 7.1, governance: 7.2 },
    { region: "East", social: 8.1, environmental: 7.8, governance: 7.5 },
    { region: "West", social: 6.5, environmental: 8.2, governance: 6.9 },
    { region: "Central", social: 7.8, environmental: 8.0, governance: 7.1 },
  ];

  // Impact assessment radar data
  const impactData = [
    { subject: 'Economic Impact', A: 7.5, fullMark: 10 },
    { subject: 'Social Impact', A: 8.2, fullMark: 10 },
    { subject: 'Environmental Impact', A: 6.8, fullMark: 10 },
    { subject: 'Political Impact', A: 5.9, fullMark: 10 },
    { subject: 'International Impact', A: 6.5, fullMark: 10 },
    { subject: 'Long-term Effect', A: 7.8, fullMark: 10 },
  ];

  const getSeverityColor = (severity: number) => {
    if (severity >= 8) return "bg-red-500";
    if (severity >= 6) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "Improving": return "text-green-600 bg-green-100";
      case "Declining": return "text-red-600 bg-red-100";
      case "Stable": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const renderProblemList = (problems: any[], title: string, bgColor: string) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className={`w-4 h-4 rounded-full ${bgColor}`}></div>
          <span>{title} Problems</span>
        </CardTitle>
        <CardDescription>{problems.length} identified issues</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {problems.map((problem, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">{problem.issue}</h3>
                <div className="flex items-center space-x-2">
                  <Badge className={getTrendColor(problem.trend)}>
                    {problem.trend}
                  </Badge>
                  <span className="text-sm text-gray-600">₹{problem.budget} Cr allocated</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-sm text-gray-600">Severity Score</p>
                  <p className="text-lg font-bold text-red-600">{problem.severity}/10</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Population Affected</p>
                  <p className="text-lg font-bold text-blue-600">{problem.affected}%</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Severity Level</span>
                  <span className="font-medium">{problem.severity}/10</span>
                </div>
                <Progress 
                  value={problem.severity * 10} 
                  className={`h-2 ${getSeverityColor(problem.severity)}`}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Problem Categories Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Problem Categories Distribution</CardTitle>
            <CardDescription>Breakdown of issues by category for {selectedCountry}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={problemCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {problemCategories.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {problemCategories.map((category, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <p className="text-sm text-gray-600">{category.issues} issues</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regional Problem Intensity</CardTitle>
            <CardDescription>Average severity scores by region</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionalComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="social" fill="#EF4444" name="Social" />
                <Bar dataKey="environmental" fill="#10B981" name="Environmental" />
                <Bar dataKey="governance" fill="#3B82F6" name="Governance" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Impact Assessment Radar */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Impact Assessment</CardTitle>
          <CardDescription>Multi-dimensional impact analysis across key areas</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={impactData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 10]} />
              <Radar
                name="Impact Score"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Problem Categories Details */}
      <div className="space-y-6">
        {renderProblemList(socialProblems, "Social", "bg-red-500")}
        {renderProblemList(environmentalProblems, "Environmental", "bg-green-500")}
        {renderProblemList(governanceProblems, "Governance", "bg-blue-500")}
      </div>

      {/* Filter Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Problem Analysis Filters</CardTitle>
          <CardDescription>Focus on specific problem categories or severity levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              onClick={() => onFilterChange(['High Severity'])}
            >
              High Severity (8+)
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onFilterChange(['Social Issues'])}
            >
              Social Issues
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onFilterChange(['Environmental'])}
            >
              Environmental
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onFilterChange(['Governance'])}
            >
              Governance
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onFilterChange(['Improving Trends'])}
            >
              Improving Trends
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProblemsAnalysisView;
