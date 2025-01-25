import { useLocation } from 'react-router-dom';

export function DebugRouter() {
  const location = useLocation();
  
  console.log('Current route:', location.pathname);
  
  return null;
}