import { useState, useRef, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiRequest } from '@/lib/queryClient';
import { useMobile } from '@/hooks/use-mobile';
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
  organizationName: z.string().optional(),
  projectDescription: z.string().min(1, 'Please tell us about your project')
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      organizationName: '',
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
    <section 
      id="contact" 
      ref={sectionRef} 
      className="pt-24 pb-20 relative overflow-hidden text-white"
      style={{ 
        background: 'linear-gradient(135deg, #6b48ff 0%, #3E8BFF 100%)',
        position: 'relative'
      }}
    >
      {/* Add a subtle gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30" 
        style={{ 
          background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent 70%)'
        }}
      ></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto reveal">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 relative inline-block text-white">Let's Go!</h2>
            <p className="text-lg text-white/80">
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-sm rounded-lg p-8 md:p-10 shadow-lg">
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
                        <FormLabel className="block text-sm font-medium text-white mb-1">First Name *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full px-4 py-2 rounded-md border-0 bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-black"
                          />
                        </FormControl>
                        <FormMessage className="text-red-200 text-sm mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-white mb-1">Last Name *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full px-4 py-2 rounded-md border-0 bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-black"
                          />
                        </FormControl>
                        <FormMessage className="text-red-200 text-sm mt-1" />
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
                        <FormLabel className="block text-sm font-medium text-white mb-1">Email *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email" 
                            className="w-full px-4 py-2 rounded-md border-0 bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-black"
                          />
                        </FormControl>
                        <FormMessage className="text-red-200 text-sm mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-white mb-1">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="tel" 
                            className="w-full px-4 py-2 rounded-md border-0 bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-black"
                          />
                        </FormControl>
                        <FormMessage className="text-red-200 text-sm mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="organizationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-white mb-1">Organization</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="w-full px-4 py-2 rounded-md border-0 bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-black"
                        />
                      </FormControl>
                      <FormMessage className="text-red-200 text-sm mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-white mb-1">Tell us about your project *</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={5}
                          className="w-full px-4 py-2 rounded-md border-0 bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-black"
                        />
                      </FormControl>
                      <FormMessage className="text-red-200 text-sm mt-1" />
                    </FormItem>
                  )}
                />

                <div className="text-center">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`animated-button ${isMobile ? 'animated-button-mobile' : ''} relative inline-flex items-center justify-center py-[10px] px-[26px] font-[500] text-[0.95rem] rounded-[50px] border-0 transition-transform duration-700 ease-out overflow-hidden outline-none shadow-none`}
                  >
                    <span className="button-text relative z-10 ml-5">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                    <span className="button-text-hover absolute z-10 ml-5">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}