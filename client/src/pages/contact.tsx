import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useContactSubmission } from "@/hooks/useApi";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { CONTACT_INFO, SERVICES } from "@/lib/constants";

export default function Contact() {
  const { t, isRTL } = useI18n();
  const contactMutation = useContactSubmission();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      serviceInterest: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    contactMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div className="pt-16" data-testid="contact-page">
      {/* Hero Section */}
      <section className="section-padding bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${isRTL ? 'arabic-heading' : ''}`}>{t('contact.title')}</h1>
            <p className={`text-xl text-slate-300 max-w-3xl mx-auto ${isRTL ? 'arabic-body' : ''}`}>
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4" data-testid="contact-address">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-slate-300">Sudan, Khartoum<br />ELIZDEHAR Group of Companies</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4" data-testid="contact-phone">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-slate-300">+249 XXX XXX XXX</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4" data-testid="contact-email">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-slate-300">info@elizdehar.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4" data-testid="contact-hours">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-slate-300">Sun - Thu: 8:00 AM - 6:00 PM<br />Fri - Sat: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">First Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-primary"
                              data-testid="input-firstName"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Last Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-primary"
                              data-testid="input-lastName"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-primary"
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Service Interest</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger 
                              className="bg-slate-800 border-slate-700 text-white focus:border-primary"
                              data-testid="select-serviceInterest"
                            >
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="shoes-factory">Shoes Factory</SelectItem>
                            <SelectItem value="import-export">Import & Export</SelectItem>
                            <SelectItem value="agriculture">Agriculture</SelectItem>
                            <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-primary resize-none"
                            data-testid="textarea-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-blue-700"
                    disabled={contactMutation.isPending}
                    data-testid="button-submit"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Contact Options */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Other Ways to Reach Us</h2>
            <p className="text-xl text-slate-600">Choose the communication method that works best for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-slate-50 rounded-2xl">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Call Us Directly</h3>
              <p className="text-slate-600 mb-4">
                Speak with our team directly for immediate assistance and consultation.
              </p>
              <Button variant="outline" className="w-full">
                Call Now
              </Button>
            </div>

            <div className="text-center p-8 bg-slate-50 rounded-2xl">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="text-secondary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Email Support</h3>
              <p className="text-slate-600 mb-4">
                Send us detailed inquiries and we'll respond within 24 hours.
              </p>
              <Button variant="outline" className="w-full">
                Send Email
              </Button>
            </div>

            <div className="text-center p-8 bg-slate-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Visit Our Office</h3>
              <p className="text-slate-600 mb-4">
                Schedule a meeting at our headquarters in Khartoum, Sudan.
              </p>
              <Button variant="outline" className="w-full">
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
