import './Main.css';
import '../components/components.css';
import CookieConsentBanner from './components/cookie-consent/Banner';
import { useMemo, useEffect } from 'react';
import { routes } from 'wasp/client/router';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'wasp/client/auth';
import { useIsLandingPage } from './hooks/useIsLandingPage';
import MainLayout from '../layout/MainLayout';
import { ModuleProvider } from '../modules/ModuleRegistry';
import ThemeProvider from '../theme/ThemeProvider';
import { AIProvider } from '../ai/AIProvider';
import { PluginRegistryProvider } from '../plugins';

/**
 * use this component to wrap all child components
 * this is useful for templates, themes, and context
 */
export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: user, isLoading } = useAuth();
  const isLandingPage = useIsLandingPage();

  const isAuthPage = useMemo(() => {
    return (
      location.pathname === routes.LoginRoute.build() ||
      location.pathname === routes.SignupRoute.build() ||
      location.pathname === routes.RequestPasswordResetRoute.build() ||
      location.pathname === routes.PasswordResetRoute.build() ||
      location.pathname === routes.EmailVerificationRoute.build()
    );
  }, [location]);

  const isAppRoute = useMemo(() => {
    return (
      !isAuthPage &&
      !isLandingPage &&
      location.pathname !== routes.PricingPageRoute.build() &&
      !location.pathname.startsWith('/admin')
    );
  }, [location, isAuthPage, isLandingPage]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [location]);

  // Redirect authenticated users away from auth pages
  useEffect(() => {
    if (!isLoading && user && isAuthPage) {
      navigate('/dashboard');
    }
  }, [user, isLoading, isAuthPage, navigate]);

  return (
    <ThemeProvider>
      <AIProvider>
        <ModuleProvider>
          <PluginRegistryProvider>
            {isAppRoute ? (
              <MainLayout>
                <Outlet />
              </MainLayout>
            ) : (
              <div className='min-h-screen dark:text-white dark:bg-boxdark-2'>
                <Outlet />
              </div>
            )}
            <CookieConsentBanner />
          </PluginRegistryProvider>
        </ModuleProvider>
      </AIProvider>
    </ThemeProvider>
  );
}
