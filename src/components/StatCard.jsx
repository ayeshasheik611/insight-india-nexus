
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StatCard = ({ stat }) => {
  const IconComponent = stat.icon;
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
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
};

export default StatCard;
