"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";

const AboutUs = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <section className="py-20 px-4 bg-linear-to-b from-background to-muted/20">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1 w-full"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/hero-bg3.jpg"
                  alt="Firstclass Projects - Professional Painting Contractors"
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    About Us
                  </h2>
                  <div className="h-1 w-24 bg-linear-to-r from-primary to-primary/60 rounded-full mt-2" />
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                Firstclass Projects commenced trading in 1988 as professional
                painting contractors based in Johannesburg and servicing the
                immediate surroundings. We have steadily grown into one of the
                largest painting and coatings contractors in South Africa having
                been involved in some of the most exciting, innovative and
                landmark projects completed over the past 28 years across the
                country.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-muted-foreground leading-relaxed"
              >
                Throughout its existence, Firstclass Projects has maintained a
                highly competent and motivated workforce, the majority of whom
                have been associated with the Company since inception.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="group">
                      Learn More About Us
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        Our Story & Commitment
                      </DialogTitle>
                      <DialogDescription className="text-base">
                        Discover more about Firstclass Projects and our journey
                        since 1988
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 text-foreground/90 leading-relaxed">
                      <p>
                        Our policy of hands-on training, promoting and uplifting
                        staff members from within our ranks, ensures that the
                        company is able to provide extremely resourceful teams
                        of individuals. These teams are in turn supervised by
                        highly experienced and skilled site managers and
                        contract managers.
                      </p>
                      <p>
                        This has been reflected in the steady growth that the
                        company has enjoyed over the past 28 years. Our
                        reputation as a reliable contractor, delivering work of
                        the highest quality within the severe time constraints
                        set by the industry, has allowed us to work for the most
                        reputable Building Contractors, Property Managers and
                        owners in the country.
                      </p>
                      <p>
                        Firstclass Projects have been proud members of the
                        Master Builders Association since 1989. We are preferred
                        applicators for Plascon and Dulux paints and have good
                        relationships with all the top paint manufacturers in
                        the industry allowing us to be flexible in our offerings
                        to clients ensuring they have a variety of choices. We
                        are a licensed applicator of Marmoran Coatings which
                        enables us to offer a wide range of specialised
                        &quot;trowel on&quot;, stone and spray applications.
                      </p>
                      <p>
                        Our status with these manufacturers enables us to offer
                        our clients authentic back to back guarantees on both
                        products and applications with independent assessment
                        and auditing of application and product as it is ordered
                        and applied. Working on new, redecoration and renovation
                        projects, we have been privileged to participate in the
                        restoration of some of Gauteng&apos;s oldest and most
                        interesting buildings. Our position and reputation
                        within the industry has afforded us the opportunity to
                        put our mark on the ever changing cityscapes.
                      </p>
                      <p>
                        Firstclass Projects are committed to utilizing the
                        latest technology on offer from the coatings industry.
                        We endeavour to work together with both our clients and
                        manufacturers to offer the most suitable, highest
                        quality, environmentally conscious and cost effective
                        solution.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.section>
  );
};

export default AboutUs;
