import { SearchBar } from "@/components/SearchBar";
import { FilterSection } from "@/components/FilterSection";
import { WorkflowCard } from "@/components/WorkflowCard";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useNavigate } from 'react-router-dom';

const featuredWorkflows = [
  {
    title: "Gmail to Slack Notification",
    description: "Automatically send Slack notifications for important Gmail messages",
    author: "John Doe",
    downloads: 1234,
    rating: 4.5,
    tags: ["Email", "Slack", "Notifications"],
    isPaid: false,
  },
  {
    title: "Twitter Lead Generation",
    description: "Capture and process Twitter leads automatically",
    author: "Jane Smith",
    downloads: 856,
    rating: 4.8,
    tags: ["Social Media", "CRM", "Marketing"],
    isPaid: true,
    price: "$4.99",
  },
  {
    title: "GitHub Issue Tracker",
    description: "Track and manage GitHub issues across multiple repositories",
    author: "Dev Team",
    downloads: 2341,
    rating: 4.7,
    tags: ["DevOps", "GitHub", "Productivity"],
    isPaid: false,
  },
  {
    title: "Automated Sales Pipeline",
    description: "Connect your CRM with email marketing automation",
    author: "Sales Pro",
    downloads: 1567,
    rating: 4.6,
    tags: ["Sales", "CRM", "Email"],
    isPaid: true,
    price: "$9.99",
  },
];

const Index = () => {
  const navigate = useNavigate(); 

  const handleUploadClick = () => {
    navigate('/upload');
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/90 to-primary text-white">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Discover and Share Powerful n8n Workflows
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Join our community of automation enthusiasts. Upload your workflows or discover new ones to streamline your processes.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Browse Workflows
              </Button>
              <Button size="lg" variant="outline" onClick={handleUploadClick} className="bg-white/10 hover:bg-white/20 border-white">
                Upload Workflow
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Workflows Carousel */}
      <section className="bg-white border-b">
        <div className="container py-12">
          <h2 className="text-2xl font-bold mb-6">Featured Workflows</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {featuredWorkflows.map((workflow, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <WorkflowCard {...workflow} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Main Content */}
      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <FilterSection />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-[280px]">
                <SearchBar />
              </div>
              <Button variant="default" onClick={handleUploadClick}>Upload Workflow</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredWorkflows.map((workflow, index) => (
                <WorkflowCard key={index} {...workflow} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;