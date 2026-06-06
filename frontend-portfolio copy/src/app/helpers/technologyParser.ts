// Helper function to safely parse technologies
const parseTechnologies = (technologies: any): string[] => {
  if (!technologies) return [];
  
  // If it's already an array, return it
  if (Array.isArray(technologies)) return technologies;
  
  // If it's a string, try to parse it
  if (typeof technologies === 'string') {
    try {
      const parsed = JSON.parse(technologies);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }
  
  return [];
};