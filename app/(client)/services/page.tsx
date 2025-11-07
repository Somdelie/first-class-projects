import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PaintBucket,
  Home,
  Building2,
  Factory,
  Brush,
  Shield,
  Award,
  CheckCircle2,
  Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    icon: Home,
    title: "Residential Painting",
    description:
      "Transform your home with our expert interior and exterior painting services.",
    features: [
      "Interior wall painting",
      "Exterior house painting",
      "Ceiling painting",
      "Trim and molding",
      "Cabinet refinishing",
      "Deck staining",
    ],
    popular: true,
  },
  {
    icon: Building2,
    title: "Commercial Painting",
    description:
      "Professional painting solutions for offices, retail spaces, and commercial properties.",
    features: [
      "Office buildings",
      "Retail stores",
      "Restaurants",
      "Warehouses",
      "Property maintenance",
      "Emergency touch-ups",
    ],
    popular: false,
  },
  {
    icon: Factory,
    title: "Industrial Painting",
    description:
      "Heavy-duty protective coatings and industrial-grade painting services.",
    features: [
      "Protective coatings",
      "Anti-corrosion treatments",
      "Heavy machinery painting",
      "Safety markings",
      "Specialized primers",
      "High-performance finishes",
    ],
    popular: false,
  },
  {
    icon: Brush,
    title: "Specialty Finishes",
    description:
      "Custom decorative finishes and specialty painting techniques.",
    features: [
      "Faux finishing",
      "Textured walls",
      "Murals and artwork",
      "Metallic finishes",
      "Venetian plaster",
      "Color consulting",
    ],
    popular: false,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Consultation",
    description:
      "Free on-site consultation to assess your needs and provide detailed estimate.",
    icon: Phone,
  },
  {
    step: "02",
    title: "Preparation",
    description:
      "Thorough surface preparation including cleaning, sanding, and priming.",
    icon: Shield,
  },
  {
    step: "03",
    title: "Application",
    description:
      "Professional painting using premium materials and proven techniques.",
    icon: PaintBucket,
  },
  {
    step: "04",
    title: "Quality Check",
    description:
      "Comprehensive inspection and touch-ups to ensure perfect results.",
    icon: Award,
  },
];

const whyChooseUs = [
  "25+ years of experience",
  "Licensed and insured",
  "Premium quality paints",
  "Satisfaction guarantee",
  "Competitive pricing",
  "Timely completion",
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-emerald-600 rounded-full">
                <PaintBucket className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Professional Painting Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From residential homes to commercial buildings and industrial
              facilities, we deliver exceptional painting services with
              attention to detail and quality craftsmanship.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg" className="mr-4">
                  Get Free Quote
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg">
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Comprehensive painting solutions for every need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="relative h-full hover:shadow-lg transition-shadow"
              >
                {service.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-emerald-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                      <service.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link href="/contact">
                      <Button variant="outline" className="w-full">
                        Get Quote for {service.title}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Professional approach ensuring quality results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {step.step}
                    </span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-emerald-200 dark:bg-emerald-800 -z-10"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose First Class Projects?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                We combine years of experience with modern techniques and
                premium materials to deliver results that exceed expectations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whyChooseUs.map((reason, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {reason}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-4/3 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/hero-bg7.jpg"
                  alt="Professional painting team at work"
                  className="w-full h-full object-cover"
                  width={600}
                  height={450}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white p-4 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">25+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Get a free consultation and detailed quote for your painting
            project.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                <Phone className="mr-2 h-5 w-5" />
                Get Free Quote
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600"
              >
                View Our Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
