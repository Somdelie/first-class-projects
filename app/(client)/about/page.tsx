import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Award,
  Clock,
  Shield,
  Heart,
  Star,
  CheckCircle2,
  Calendar,
  Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const stats = [
  { icon: Calendar, value: "25+", label: "Years Experience" },
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Award, value: "1000+", label: "Projects Completed" },
  { icon: Star, value: "4.9", label: "Average Rating" },
];

const values = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description:
      "We use only premium materials and proven techniques to ensure lasting results.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description:
      "We respect your schedule and complete projects on time, every time.",
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description:
      "Your satisfaction is our priority. We go above and beyond to exceed expectations.",
  },
  {
    icon: Award,
    title: "Expert Craftsmanship",
    description:
      "Our skilled professionals bring decades of experience to every project.",
  },
];

const team = [
  {
    name: "Michael Johnson",
    role: "Owner & Master Painter",
    experience: "25+ years",
    specialties: ["Commercial Projects", "Specialty Finishes"],
    image: "/api/placeholder/300/300",
  },
  {
    name: "Sarah Williams",
    role: "Project Manager",
    experience: "15+ years",
    specialties: ["Residential Projects", "Color Consulting"],
    image: "/api/placeholder/300/300",
  },
  {
    name: "David Chen",
    role: "Lead Painter",
    experience: "12+ years",
    specialties: ["Industrial Coatings", "Surface Preparation"],
    image: "/api/placeholder/300/300",
  },
];

const certifications = [
  "Licensed Painting Contractor",
  "EPA Lead-Safe Certified",
  "OSHA Safety Trained",
  "Better Business Bureau A+ Rating",
  "Sherwin-Williams Certified",
  "Benjamin Moore Authorized Dealer",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                About First Class Projects
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                For over 25 years, we&apos;ve been transforming spaces with
                exceptional painting services. From small residential touch-ups
                to large commercial projects, we deliver quality results that
                stand the test of time.
              </p>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
                <Link href="/contact">
                  <Button size="lg">
                    <Phone className="mr-2 h-5 w-5" />
                    Get Quote
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" size="lg">
                    Our Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-4/3 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/hero-bg8.jpg"
                  alt="First Class Projects team"
                  className="w-full h-full object-cover"
                  width={600}
                  height={450}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto">
                      <stat.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-4/3 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/hero-bg1.jpg"
                  alt="Company history"
                  className="w-full h-full object-cover"
                  width={600}
                  height={450}
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Founded in 1999 by master painter Michael Johnson, First Class
                  Projects began as a small residential painting service with a
                  simple mission: deliver exceptional quality and customer
                  service on every project.
                </p>
                <p>
                  What started as a one-person operation has grown into a
                  full-service painting company with a team of skilled
                  professionals. We&apos;ve expanded our services to include
                  commercial and industrial projects while maintaining our
                  commitment to quality craftsmanship.
                </p>
                <p>
                  Today, we&apos;re proud to be the most trusted painting
                  contractor in the region, with hundreds of satisfied customers
                  and a reputation built on integrity, quality, and exceptional
                  service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="h-full hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-lg shrink-0">
                      <value.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experienced professionals dedicated to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Image
                      width={200}
                      height={200}
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-emerald-100 dark:border-emerald-900"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-2">
                    {member.role}
                  </p>
                  <Badge variant="outline" className="mb-4">
                    {member.experience}
                  </Badge>
                  <div className="space-y-1">
                    {member.specialties.map((specialty, idx) => (
                      <p
                        key={idx}
                        className="text-sm text-gray-600 dark:text-gray-300"
                      >
                        • {specialty}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Licensed & Certified
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Your assurance of professional service and quality
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Work with Us?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Experience the First Class Projects difference. Contact us for your
            next painting project.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                <Phone className="mr-2 h-5 w-5" />
                Contact Us Today
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600"
              >
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
