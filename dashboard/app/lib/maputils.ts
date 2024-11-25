export const getThreatBadgeColor = (threatLevel: string) => {
    switch (threatLevel) {
      case "high": return "bg-red-500 text-white";
      case "medium": return "bg-yellow-500 text-black";
      case "low": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

export const getThreatLevel = (fearLevel: number, stressLevel: number) => {
    const avgLevel = (fearLevel + stressLevel) / 2;
    if (avgLevel >= 80) return "high";
    if (avgLevel >= 50) return "medium";
    return "low";
  };