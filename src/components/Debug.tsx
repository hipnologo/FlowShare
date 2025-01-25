import { useLocation } from 'react-router-dom';

export function DebugRouter() {
  const location = useLocation();
  console.log('Current route:', location.pathname);
  console.log('Current search:', location.search);
  console.log('Current hash:', location.hash);
  return null;
}