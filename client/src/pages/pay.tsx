import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import type { Bill } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Logo } from "@/components/Logo";

// Initialize Stripe
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Detect test mode
const isTestMode = import.meta.env.VITE_STRIPE_PUBLIC_KEY?.startsWith('pk_test_');

// Payment form component (inside Stripe Elements)
function PaymentForm({ bill, clientSecret, onSuccess }: { bill: Bill; clientSecret: string; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/pay/success`,
        },
        redirect: 'if_required'
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // If no error and paymentIntent exists, check the status
      if (paymentIntent) {
        // For ACH, status will be 'processing'; for cards, usually 'succeeded'
        if (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing') {
          // Record the payment on the server
          try {
            const response = await apiRequest("POST", "/api/payments/process", {
              billId: bill.id,
              stripePaymentIntentId: paymentIntent.id
            });
            
            await response.json();
            
            // Show appropriate message based on status
            if (paymentIntent.status === 'processing') {
              toast({
                title: "Payment Processing",
                description: "Your bank transfer is being processed. This typically takes 2-4 business days.",
              });
            } else {
              toast({
                title: "Payment Successful",
                description: "Thank you for your payment!",
              });
            }
            onSuccess();
          } catch (recordError: any) {
            console.error('Error recording payment:', recordError);
            const errorMessage = recordError.message || "Unknown error";
            toast({
              title: "Payment Confirmation Issue",
              description: `Payment was processed but there was an issue recording it: ${errorMessage}. Please contact support.`,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Payment Incomplete",
            description: `Payment status: ${paymentIntent.status}. Please try again or contact support.`,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full"
        size="lg"
      >
        {isProcessing ? "Processing..." : `Pay $${bill.amount}`}
      </Button>
    </form>
  );
}


export default function PayPage() {
  const [accountNumber, setAccountNumber] = useState("");
  const [bill, setBill] = useState<Bill | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { toast } = useToast();

  // Bill lookup functionality
  const billLookupMutation = useMutation({
    mutationFn: async (accountNum: string) => {
      const response = await fetch(`/api/bills/lookup/${accountNum}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Bill not found');
      }
      return response.json();
    },
    onSuccess: (data) => {
      setBill(data);
    },
    onError: (error) => {
      toast({
        title: "Account Not Found",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Payment intent creation
  const createPaymentIntentMutation = useMutation({
    mutationFn: async ({ billId }: { billId: number }) => {
      const response = await apiRequest("POST", "/api/create-payment-intent", { billId });
      const jsonData = await response.json();
      return jsonData as { clientSecret: string; paymentIntentId: string };
    },
    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
    },
    onError: (error) => {
      toast({
        title: "Payment Setup Failed",
        description: "Unable to initialize payment. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Automatically create payment intent when bill is loaded
  useEffect(() => {
    if (bill && !clientSecret) {
      createPaymentIntentMutation.mutate({
        billId: bill.id
      });
    }
  }, [bill]);

  const handleBillLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountNumber.trim()) {
      billLookupMutation.mutate(accountNumber.trim());
    }
  };


  const handlePaymentSuccess = () => {
    // Reset everything and show success
    setBill(null);
    setAccountNumber("");
    setClientSecret(null);
    toast({
      title: "Payment Complete",
      description: "Your payment has been processed successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Home Button - Positioned like navbar logo */}
      <div className="fixed top-0 left-0 z-50 p-4" style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top, 0))' }}>
        <a href="/" className="inline-block hover:opacity-80 transition-opacity">
          <Logo className="w-12 h-12" />
        </a>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto" style={{ paddingTop: '60px' }}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Pay Your Bill
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Enter your account number to view and pay your bill
            </p>
          </div>

          {/* Step 1: Account Number Lookup */}
          {!bill && (
            <Card>
              <CardHeader>
                <CardTitle>Look Up Your Bill</CardTitle>
                <CardDescription>
                  Enter your account number to find your bill details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBillLookup} className="space-y-4">
                  <div>
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      type="text"
                      placeholder="Enter your account number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={billLookupMutation.isPending}
                  >
                    {billLookupMutation.isPending ? "Looking up..." : "Look Up Bill"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Bill Details and Payment Form */}
          {bill && (
            <Card>
              <CardHeader>
                <CardTitle>Complete Payment</CardTitle>
                <CardDescription>
                  Review your bill details and enter payment information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Test Mode Banner */}
                {isTestMode && (
                  <Alert className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                    <AlertDescription className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>TEST MODE:</strong> For bank transfers, you'll see test banks like "Test Institution." 
                      In production, customers connect to their real bank or enter routing/account numbers. No real charges occur.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Bill Information */}
                <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Account:</span>
                    <span className="text-sm">{bill.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Customer:</span>
                    <span className="text-sm">{bill.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Description:</span>
                    <span className="text-sm">{bill.description}</span>
                  </div>
                  {bill.dueDate && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Due Date:</span>
                      <span className="text-sm">{new Date(bill.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Amount Due:</span>
                    <span className="text-2xl font-bold text-primary">${bill.amount}</span>
                  </div>
                </div>

                {/* Loading State for Payment Setup */}
                {createPaymentIntentMutation.isPending && (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                    <p>Setting up secure payment...</p>
                  </div>
                )}

                {/* Payment Form */}
                {clientSecret && !createPaymentIntentMutation.isPending && (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Choose your payment method below. Card payments process instantly. Bank transfers (ACH) have lower fees and settle in 2-4 business days.
                    </div>
                    <Elements 
                      stripe={stripePromise} 
                      options={{ 
                        clientSecret,
                        appearance: {
                          theme: 'stripe'
                        }
                      }}
                    >
                      <PaymentForm bill={bill} clientSecret={clientSecret} onSuccess={handlePaymentSuccess} />
                    </Elements>
                  </div>
                )}

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setBill(null);
                    setClientSecret(null);
                  }}
                  className="w-full"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Look Up Different Account
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}