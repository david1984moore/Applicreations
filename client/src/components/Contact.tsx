import { useState, useRef, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiRequest } from '@/lib/queryClient';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  businessName: z.string().optional(),
  projectDescription: z.string().min(1, 'Please tell us about your project')
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      businessName: '',
      projectDescription: ''
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = sectionRef.current?.querySelectorAll('.reveal');
    revealElements?.forEach(el => {
      observer.observe(el);
    });

    return () => {
      revealElements?.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      await apiRequest('POST', '/api/contact', data);
      setSubmitStatus('success');
      form.reset();
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
      
      // Hide the message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto reveal">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-neutral-dark/70">
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
          </div>
          
          <div className="bg-neutral-light rounded-lg p-8 md:p-10 shadow-md">
            {submitStatus === 'success' && (
              <div className="success-message rounded-md p-4 mb-4">
                Thank you for your submission! We will get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="error-message rounded-md p-4 mb-4">
                {errorMessage || 'Please fill in all required fields correctly.'}
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-neutral-dark mb-1">First Name *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple/50 focus:border-purple transition-colors"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-neutral-dark mb-1">Last Name *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple/50 focus:border-purple transition-colors"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-neutral-dark mb-1">Email *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email" 
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple/50 focus:border-purple transition-colors"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-neutral-dark mb-1">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="tel" 
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple/50 focus:border-purple transition-colors"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-neutral-dark mb-1">Business Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple/50 focus:border-purple transition-colors"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="projectDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-neutral-dark mb-1">Tell us about your project *</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={5}
                          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple/50 focus:border-purple transition-colors"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />
                
                <div className="text-center">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-gradient text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
