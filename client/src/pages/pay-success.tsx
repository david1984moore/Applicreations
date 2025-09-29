import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Logo } from "@/components/Logo";

export default function PaySuccess() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'processing' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const processPayment = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentIntentId = urlParams.get('payment_intent');
        const clientSecret = urlParams.get('payment_intent_client_secret');
        const accountNumber = urlParams.get('account');

        if (!paymentIntentId) {
          setStatus('error');
          setMessage('Missing payment information');
          return;
        }

        // Verify payment with Stripe and get bill details
        const response = await fetch(`/api/bills/lookup/${accountNumber}`);
        if (!response.ok) {
          throw new Error('Bill not found');
        }
        const bill = await response.json();

        // Record the payment
        const recordResponse = await apiRequest("POST", "/api/payments/process", {
          billId: bill.id,
          stripePaymentIntentId: paymentIntentId
        });

        const result = await recordResponse.json();
        
        if (result.status === 'paid' || result.status === 'processing') {
          if (result.status === 'processing') {
            setStatus('processing');
            setMessage('Your bank transfer is being processed. This typically takes 2-4 business days. You will receive an email confirmation once the payment clears.');
          } else {
            setStatus('success');
            setMessage('Your payment has been successfully processed. Thank you!');
          }
        } else {
          setStatus('error');
          setMessage('Unable to confirm payment status. Please contact support.');
        }
      } catch (error: any) {
        console.error('Payment processing error:', error);
        setStatus('error');
        setMessage(error.message || 'An error occurred while processing your payment');
      }
    };

    processPayment();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            {status === 'loading' && (
              <>
                <div className="flex justify-center mb-4">
                  <Loader2 className="h-16 w-16 animate-spin text-purple-600" />
                </div>
                <CardTitle>Processing Payment</CardTitle>
                <CardDescription>Please wait while we confirm your payment...</CardDescription>
              </>
            )}
            
            {status === 'success' && (
              <>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
                <CardTitle className="text-green-600">Payment Successful!</CardTitle>
                <CardDescription>Your payment has been confirmed</CardDescription>
              </>
            )}

            {status === 'processing' && (
              <>
                <div className="flex justify-center mb-4">
                  <Loader2 className="h-16 w-16 text-blue-600" />
                </div>
                <CardTitle className="text-blue-600">Payment Processing</CardTitle>
                <CardDescription>Your bank transfer is being processed</CardDescription>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="flex justify-center mb-4">
                  <XCircle className="h-16 w-16 text-red-600" />
                </div>
                <CardTitle className="text-red-600">Payment Issue</CardTitle>
                <CardDescription>There was a problem with your payment</CardDescription>
              </>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            {message && (
              <Alert className={
                status === 'success' ? 'border-green-200 bg-green-50' :
                status === 'processing' ? 'border-blue-200 bg-blue-50' :
                status === 'error' ? 'border-red-200 bg-red-50' :
                ''
              }>
                <AlertDescription className="text-center">
                  {message}
                </AlertDescription>
              </Alert>
            )}

            {(status === 'success' || status === 'processing' || status === 'error') && (
              <Button
                onClick={() => setLocation('/')}
                className="w-full"
                variant={status === 'error' ? 'destructive' : 'default'}
              >
                {status === 'error' ? 'Try Again' : 'Return to Home'}
              </Button>
            )}

            {status === 'error' && (
              <p className="text-sm text-center text-gray-600">
                If you continue to experience issues, please contact{' '}
                <a href="mailto:solutions@applicreations.com" className="text-purple-600 hover:underline">
                  solutions@applicreations.com
                </a>
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
