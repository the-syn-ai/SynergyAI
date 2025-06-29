import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PlanSelector } from '@/components/payment/StripeCheckout';
import StripeCheckout from '@/components/payment/StripeCheckout';
import PageTransition from '@/components/animations/PageTransition';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  company: z.string().optional(),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Signup() {
  const [activeTab, setActiveTab] = useState('account');
  const [selectedTier, setSelectedTier] = useState<'basic' | 'pro' | 'enterprise' | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      company: '',
      phone: '',
    },
  });

  const onPlanSelect = (tier: 'basic' | 'pro' | 'enterprise') => {
    setSelectedTier(tier);
    setActiveTab('details');
  };

  const onSubmitDetails = (data: FormValues) => {
    if (!selectedTier) {
      toast({
        title: "No plan selected",
        description: "Please select a service plan before proceeding.",
        variant: "destructive",
      });
      setActiveTab('plan');
      return;
    }
    
    // Proceed to payment
    setActiveTab('payment');
  };

  const handleCheckoutSuccess = (sessionId: string) => {
    // Store the session ID or user details in localStorage if needed
    localStorage.setItem('checkoutSessionId', sessionId);
    localStorage.setItem('userDetails', JSON.stringify(form.getValues()));
    
    // Will redirect to Stripe checkout page
  };

  // Include special handling for success page
  if (window.location.pathname === '/signup/success') {
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    
    return (
      <PageTransition>
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
              <CardDescription>
                Thank you for choosing SynergyAI Automations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="rounded-full bg-green-100 p-3 inline-block mx-auto">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-green-600"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Your payment has been processed</h3>
                <p className="text-muted-foreground">
                  We're setting up your services. Your confirmation number is:
                </p>
                <p className="font-mono text-sm bg-muted p-2 rounded">{sessionId}</p>
              </div>
              
              <div className="space-y-4 pt-4">
                <p>The next step is to schedule your onboarding call with our team.</p>
                <Button onClick={() => window.location.href = "https://cal.com/synergyai/onboarding"}>
                  Schedule Onboarding Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container max-w-5xl mx-auto px-4 py-12">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get Started with SynergyAI</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Select a plan, provide your details, and start optimizing your business with our AI-powered solutions today.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="plan">Choose Plan</TabsTrigger>
              <TabsTrigger value="details">Your Details</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="plan" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Your Plan</CardTitle>
                  <CardDescription>
                    Choose the plan that best fits your business needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PlanSelector onSelect={onPlanSelect} />
                </CardContent>
              </Card>
              
              {selectedTier && (
                <div className="flex justify-end">
                  <Button onClick={() => setActiveTab('details')}>
                    Continue to Details
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="details" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Details</CardTitle>
                  <CardDescription>
                    Please provide your information to continue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitDetails)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="John" />
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
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Doe" />
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
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" placeholder="john.doe@example.com" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company (Optional)</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Your Company" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone (Optional)</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="(555) 123-4567" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setActiveTab('plan')}
                        >
                          Back to Plans
                        </Button>
                        <Button type="submit">
                          Continue to Payment
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payment" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                  <CardDescription>
                    Complete your purchase securely with Stripe
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedTier ? (
                    <div className="space-y-6">
                      <div className="border rounded-lg p-4 bg-muted/50">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">Selected Plan:</h3>
                            <p className="text-lg font-semibold capitalize">{selectedTier} Plan</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            onClick={() => setActiveTab('plan')}
                          >
                            Change
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <p className="mb-4 text-center">
                          Click the button below to proceed to our secure payment system powered by Stripe.
                        </p>
                        
                        <StripeCheckout 
                          serviceTier={selectedTier}
                          email={form.getValues('email')}
                          onSuccess={handleCheckoutSuccess}
                          buttonText="Secure Checkout"
                          className="w-full"
                        />
                        
                        <div className="mt-4 flex items-center justify-center space-x-2">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="text-green-600"
                          >
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>
                          <span className="text-sm text-muted-foreground">Secure SSL Encrypted Payment</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p>Please select a plan first.</p>
                      <Button 
                        onClick={() => setActiveTab('plan')} 
                        className="mt-4"
                      >
                        Choose a Plan
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
}