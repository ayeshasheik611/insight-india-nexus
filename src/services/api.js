
// Mock data for government schemes
export const fetchGovernmentSchemes = async (country) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    schemes: [
      { id: 1, name: "Digital India Initiative", category: "Technology", status: "Active", budget: "$2.5B" },
      { id: 2, name: "Make in India", category: "Manufacturing", status: "Active", budget: "$1.8B" },
      { id: 3, name: "Skill Development Program", category: "Education", status: "Active", budget: "$900M" },
    ],
    total: 1247,
    active: 1180,
    completed: 67
  };
};

// Mock data for consumer indicators
export const fetchConsumerData = async (country) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    economic: {
      gdpGrowth: 6.8,
      inflation: 4.2,
      unemployment: 7.1,
      consumerSpending: 68.5
    },
    digital: {
      internetPenetration: 45.3,
      mobileSubscribers: 118.7,
      digitalPayments: 23.4,
      eCommerceGrowth: 19.8
    }
  };
};

// Mock data for problems analysis
export const fetchProblemsData = async (country) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    social: [
      { category: "Healthcare Access", severity: "High", affected: "45M", trend: "Improving" },
      { category: "Education Quality", severity: "Medium", affected: "23M", trend: "Stable" },
    ],
    environmental: [
      { category: "Air Pollution", severity: "Critical", affected: "780M", trend: "Worsening" },
      { category: "Water Scarcity", severity: "High", affected: "200M", trend: "Worsening" },
    ],
    governance: [
      { category: "Corruption", severity: "Medium", affected: "15M", trend: "Improving" },
      { category: "Digital Divide", severity: "High", affected: "400M", trend: "Improving" },
    ]
  };
};
