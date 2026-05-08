import { Switch, Route } from "wouter";
import { OptimizedProviders } from "@/components/providers/OptimizedProviders";
import { PageAsyncBoundary } from "@/components/optimized/AsyncBoundary";
import { lazy, useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { optimizeAllImages } from "@/utils/imageOptimization";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Services = lazy(() => import("./pages/services"));
const ShoesFactory = lazy(() => import("./pages/shoes-factory"));
const Agriculture = lazy(() => import("./pages/agriculture"));
const ImportExport = lazy(() => import("./pages/import-export"));
const Team = lazy(() => import("./pages/team"));
const Contact = lazy(() => import("./pages/contact"));
const NotFound = lazy(() => import("./pages/not-found"));

function Router() {
  useEffect(() => {
    // Optimize images on route changes (with delay to ensure DOM is ready)
    const timer = setTimeout(() => {
      optimizeAllImages();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageAsyncBoundary>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/shoes-factory" component={ShoesFactory} />
            <Route path="/agriculture" component={Agriculture} />
            <Route path="/import-export" component={ImportExport} />
            <Route path="/team" component={Team} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </PageAsyncBoundary>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <OptimizedProviders>
      <Router />
    </OptimizedProviders>
  );
}

export default App;
