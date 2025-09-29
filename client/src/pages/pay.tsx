import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard, Building2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import type { Bill } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

// Initialize Stripe
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Payment form component (inside Stripe Elements)
function PaymentForm({ bill, onSuccess }: { bill: Bill; onSuccess: () => void }) {
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
      const { error } = await stripe.confirmPayment({
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
      } else {
        toast({
          title: "Payment Successful",
          description: "Thank you for your payment!",
        });
        onSuccess();
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

// Payment method selection component
function PaymentMethodSelector({ 
  bill, 
  onPaymentMethodSelect 
}: { 
  bill: Bill; 
  onPaymentMethodSelect: (method: 'card' | 'ach') => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Choose Payment Method</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className="cursor-pointer hover:bg-muted/50 border-2 transition-colors"
          onClick={() => onPaymentMethodSelect('card')}
        >
          <CardContent className="flex items-center p-6">
            <CreditCard className="h-8 w-8 mr-3 text-primary" />
            <div>
              <h4 className="font-semibold">Credit/Debit Card</h4>
              <p className="text-sm text-muted-foreground">Instant processing</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:bg-muted/50 border-2 transition-colors"
          onClick={() => onPaymentMethodSelect('ach')}
        >
          <CardContent className="flex items-center p-6">
            <Building2 className="h-8 w-8 mr-3 text-primary" />
            <div>
              <h4 className="font-semibold">Bank Transfer (ACH)</h4>
              <p className="text-sm text-muted-foreground">Lower fees, 2-4 business days</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function PayPage() {
  const [accountNumber, setAccountNumber] = useState("");
  const [bill, setBill] = useState<Bill | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ach' | null>(null);
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
    mutationFn: async ({ amount, billId, paymentMethod }: { amount: string; billId: number; paymentMethod: 'card' | 'ach' }) => {
      return await apiRequest("POST", "/api/create-payment-intent", { amount, billId, paymentMethod }) as Promise<{ clientSecret: string; paymentIntentId: string }>;
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

  const handleBillLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountNumber.trim()) {
      billLookupMutation.mutate(accountNumber.trim());
    }
  };

  const handlePaymentMethodSelect = (method: 'card' | 'ach') => {
    setPaymentMethod(method);
    if (bill) {
      createPaymentIntentMutation.mutate({
        amount: bill.amount,
        billId: bill.id,
        paymentMethod: method
      });
    }
  };

  const handleBackToBillDetails = () => {
    setPaymentMethod(null);
    setClientSecret(null);
  };

  const handlePaymentSuccess = () => {
    // Reset everything and show success
    setBill(null);
    setAccountNumber("");
    setPaymentMethod(null);
    setClientSecret(null);
    toast({
      title: "Payment Complete",
      description: "Your payment has been processed successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
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

          {/* Step 2: Bill Details and Payment Method Selection */}
          {bill && !paymentMethod && (
            <Card>
              <CardHeader>
                <CardTitle>Bill Details</CardTitle>
                <CardDescription>
                  Review your bill and choose a payment method
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Bill Information */}
                <div className="space-y-3">
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

                <PaymentMethodSelector 
                  bill={bill} 
                  onPaymentMethodSelect={handlePaymentMethodSelect}
                />

                <Button 
                  variant="outline" 
                  onClick={() => setBill(null)}
                  className="w-full"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Look Up Different Account
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Payment Form */}
          {bill && paymentMethod && clientSecret && (
            <Card>
              <CardHeader>
                <CardTitle>Complete Payment</CardTitle>
                <CardDescription>
                  Paying ${bill.amount} for {bill.customerName} via {paymentMethod === 'card' ? 'Credit/Debit Card' : 'Bank Transfer'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Elements 
                  stripe={stripePromise} 
                  options={{ 
                    clientSecret,
                    appearance: {
                      theme: 'stripe'
                    }
                  }}
                >
                  <PaymentForm bill={bill} onSuccess={handlePaymentSuccess} />
                </Elements>

                <Button 
                  variant="outline" 
                  onClick={handleBackToBillDetails}
                  className="w-full mt-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Change Payment Method
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Loading State */}
          {createPaymentIntentMutation.isPending && (
            <Card>
              <CardContent className="py-8">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                  <p>Setting up payment...</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}