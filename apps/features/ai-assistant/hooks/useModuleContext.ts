import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAIAssistantStore } from '../store/aiAssistantStore';
import { getModuleContext, moduleMap } from '../api/contextService';

export const useModuleContext = () => {
  const location = useLocation();
  const { setCurrentModuleContext } = useAIAssistantStore();
  
  useEffect(() => {
    const updateModuleContext = async () => {
      const currentPath = location.pathname;
      
      // Find the closest matching route
      const matchingRoute = Object.keys(moduleMap).find(route => 
        currentPath === route || currentPath.startsWith(`${route}/`)
      );
      
      if (matchingRoute) {
        const moduleInfo = moduleMap[matchingRoute];
        const context = await getModuleContext(
          moduleInfo.name,
          moduleInfo.description,
          moduleInfo.features
        );
        
        setCurrentModuleContext(context);
      } else {
        // Default context if no matching route
        setCurrentModuleContext(null);
      }
    };
    
    updateModuleContext();
  }, [location.pathname, setCurrentModuleContext]);
};
