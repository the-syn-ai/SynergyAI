import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import LoadingAnimation from '@/components/animations/LoadingAnimation';

interface StripeCheckoutProps {
  serviceTier: 'basic' | 'pro' | 'enterprise';
  email?: string;
  onSuccess?: (sessionId: string) => void;
  onCancel?: () => void;
  buttonText?: string;
  className?: string;
}

export default function StripeCheckout({ 
  serviceTier, 
  email, 
  onSuccess, 
  onCancel,
  buttonText = 'Proceed to Checkout',
  className = '' 
}: StripeCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      const response = await apiRequest('/api/payment/create-checkout', {
        method: 'POST',
        body: JSON.stringify({ 
          tier: serviceTier,
          email
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      const { url, sessionId } = await response.json();
      
      if (url) {
        // If onSuccess is provided, call it with the session ID
        if (onSuccess) {
          onSuccess(sessionId);
        }
        
        // Redirect to Stripe Checkout
        window.location.href = url;
      } else {
        throw new Error('Invalid checkout URL');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Checkout Failed',
        description: 'There was a problem processing your payment. Please try again.',
        variant: 'destructive',
      });
      
      if (onCancel) {
        onCancel();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCheckout}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? <LoadingAnimation size="sm" className="mr-2" /> : null}
      {buttonText}
    </Button>
  );
}

// Plan selector component that displays different service tiers
export function PlanSelector({ 
  onSelect 
}: { 
  onSelect: (tier: 'basic' | 'pro' | 'enterprise') => void 
}) {
  const [selectedTier, setSelectedTier] = useState<'basic' | 'pro' | 'enterprise' | null>(null);
  const [plans, setPlans] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  React.useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await apiRequest('/api/payment/plans');
        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error('Error fetching plans:', error);
        toast({
          title: 'Error',
          description: 'Failed to load service plans. Please refresh the page.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, [toast]);

  const handleSelect = (tier: 'basic' | 'pro' | 'enterprise') => {
    setSelectedTier(tier);
    onSelect(tier);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingAnimation size="lg" />
      </div>
    );
  }

  if (!plans) {
    return (
      <div className="text-center py-8">
        <p>Unable to load service plans. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
      {['basic', 'pro', 'enterprise'].map((tier) => {
        const plan = plans[tier];
        if (!plan) return null;

        const isSelected = selectedTier === tier;
        
        return (
          <Card 
            key={tier} 
            className={`cursor-pointer transition-all ${
              isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
            }`}
            onClick={() => handleSelect(tier as 'basic' | 'pro' | 'enterprise')}
          >
            <CardHeader className="text-center">
              <CardTitle>{plan.name}</CardTitle>
              <p className="text-xl font-bold mt-2">${plan.price}/mo</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
              <ul className="space-y-2">
                {plan.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant={isSelected ? 'default' : 'outline'}
                onClick={() => handleSelect(tier as 'basic' | 'pro' | 'enterprise')}
              >
                {isSelected ? 'Selected' : 'Select Plan'}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}