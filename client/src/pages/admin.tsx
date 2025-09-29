import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, LogOut, DollarSign, Users, FileText, Edit, Trash2 } from "lucide-react";
import type { Bill, BillInsert } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

function AddBillDialog({ onBillAdded }: { onBillAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountNumber: "",
    customerName: "",
    customerEmail: "",
    amount: "",
    description: "",
    dueDate: ""
  });
  const { toast } = useToast();

  const addBillMutation = useMutation({
    mutationFn: async (billData: Omit<BillInsert, 'id' | 'createdAt' | 'updatedAt'>) => {
      return await apiRequest("POST", "/api/admin/bills", billData);
    },
    onSuccess: () => {
      toast({
        title: "Bill Created",
        description: "New bill has been added successfully.",
      });
      setOpen(false);
      setFormData({
        accountNumber: "",
        customerName: "",
        customerEmail: "",
        amount: "",
        description: "",
        dueDate: ""
      });
      onBillAdded();
    },
    onError: (error: any) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      
      // Show specific error message if available
      const errorMessage = error?.message || error?.errors?.[0]?.message || "Failed to create bill. Please try again.";
      console.error("Create bill error:", error);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  });

  // Validate form fields
  const isFormValid = 
    formData.accountNumber.trim().length > 0 &&
    formData.customerName.trim().length >= 2 &&
    formData.customerEmail.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail) &&
    formData.amount.trim().length > 0 &&
    parseFloat(formData.amount || "0") > 0 &&
    formData.description.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    // Ensure amount is properly formatted as a decimal string
    const formattedAmount = parseFloat(formData.amount || "0").toFixed(2);
    
    addBillMutation.mutate({
      accountNumber: formData.accountNumber,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      amount: formattedAmount,
      description: formData.description,
      dueDate: formData.dueDate ? formData.dueDate : undefined
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Bill
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Add New Bill</DialogTitle>
          <DialogDescription>
            Create a new bill for a customer. An email notification will be sent automatically with payment instructions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                type="text"
                placeholder="ACCT-001"
                value={formData.accountNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, accountNumber: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                type="text"
                placeholder="John Smith"
                value={formData.customerName}
                onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="customerEmail">Customer Email</Label>
              <Input
                id="customerEmail"
                type="email"
                placeholder="john@example.com"
                value={formData.customerEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
                required
              />
              <p className="text-sm text-muted-foreground mt-1">
                Bill notification will be sent to this email
              </p>
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="150.00"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Monthly service fee"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date (Optional)</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
          </div>
          <div className="pt-4 border-t mt-4">
            <Button 
              type="submit" 
              disabled={!isFormValid || addBillMutation.isPending} 
              className="w-full"
            >
              {addBillMutation.isPending ? "Creating..." : "Create Bill"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditBillDialog({ bill, onBillUpdated }: { bill: Bill; onBillUpdated: () => void }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountNumber: bill.accountNumber,
    customerName: bill.customerName,
    customerEmail: bill.customerEmail,
    amount: bill.amount,
    description: bill.description,
    dueDate: bill.dueDate ? new Date(bill.dueDate).toISOString().split('T')[0] : ""
  });
  const { toast } = useToast();

  const updateBillMutation = useMutation({
    mutationFn: async (billData: Partial<BillInsert>) => {
      return await apiRequest("PUT", `/api/admin/bills/${bill.id}`, billData);
    },
    onSuccess: () => {
      toast({
        title: "Bill Updated",
        description: "Bill has been updated successfully.",
      });
      setOpen(false);
      onBillUpdated();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update bill. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure amount is properly formatted as a decimal string
    const formattedAmount = parseFloat(formData.amount || "0").toFixed(2);
    
    updateBillMutation.mutate({
      accountNumber: formData.accountNumber,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      amount: formattedAmount,
      description: formData.description,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Bill</DialogTitle>
          <DialogDescription>
            Update the bill information for {bill.customerName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto flex-1 pr-2">
          <div>
            <Label htmlFor="edit-accountNumber">Account Number</Label>
            <Input
              id="edit-accountNumber"
              type="text"
              value={formData.accountNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, accountNumber: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-customerName">Customer Name</Label>
            <Input
              id="edit-customerName"
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-customerEmail">Customer Email</Label>
            <Input
              id="edit-customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-amount">Amount</Label>
            <Input
              id="edit-amount"
              type="number"
              step="0.01"
              min="0.01"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-dueDate">Due Date (Optional)</Label>
            <Input
              id="edit-dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
            />
          </div>
          <Button type="submit" disabled={updateBillMutation.isPending} className="w-full">
            {updateBillMutation.isPending ? "Updating..." : "Update Bill"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteBillButton({ bill, onBillDeleted }: { bill: Bill; onBillDeleted: () => void }) {
  const { toast } = useToast();

  const deleteBillMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("DELETE", `/api/admin/bills/${bill.id}`);
    },
    onSuccess: () => {
      toast({
        title: "Bill Deleted",
        description: "Bill has been deleted successfully.",
      });
      onBillDeleted();
    },
    onError: (error: any) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error?.message || "Failed to delete bill. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleDelete = () => {
    if (bill.status === 'paid') {
      toast({
        title: "Cannot Delete",
        description: "Paid bills cannot be deleted to maintain financial records.",
        variant: "destructive",
      });
      return;
    }

    if (confirm(`Are you sure you want to delete the bill for ${bill.customerName} (${bill.accountNumber})?\n\nThis action cannot be undone.`)) {
      deleteBillMutation.mutate();
    }
  };

  return (
    <Button 
      variant="destructive" 
      size="sm" 
      onClick={handleDelete}
      disabled={deleteBillMutation.isPending || bill.status === 'paid'}
    >
      <Trash2 className="h-4 w-4 mr-1" />
      {deleteBillMutation.isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}

export default function AdminPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  // Fetch bills
  const { data: bills, isLoading: billsLoading } = useQuery<Bill[]>({
    queryKey: ["/api/admin/bills"],
    enabled: isAuthenticated,
    retry: false,
  });

  const handleBillAdded = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/admin/bills"] });
  };

  const handleBillUpdated = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/admin/bills"] });
  };

  const handleBillDeleted = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/admin/bills"] });
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  const totalBills = bills?.length || 0;
  const paidBills = bills?.filter(bill => bill.status === 'paid').length || 0;
  const unpaidBills = totalBills - paidBills;
  const totalAmount = bills?.reduce((sum, bill) => sum + parseFloat(bill.amount), 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Welcome back, {user?.firstName || user?.email}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <FileText className="h-8 w-8 mr-3 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bills</p>
                <p className="text-2xl font-bold">{totalBills}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 mr-3 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Paid Bills</p>
                <p className="text-2xl font-bold">{paidBills}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <FileText className="h-8 w-8 mr-3 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unpaid Bills</p>
                <p className="text-2xl font-bold">{unpaidBills}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <DollarSign className="h-8 w-8 mr-3 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bills Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Bills Management</CardTitle>
                <CardDescription>
                  Manage customer bills and track payments
                </CardDescription>
              </div>
              <AddBillDialog onBillAdded={handleBillAdded} />
            </div>
          </CardHeader>
          <CardContent>
            {billsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                <p>Loading bills...</p>
              </div>
            ) : bills && bills.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bills.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell className="font-mono">{bill.accountNumber}</TableCell>
                      <TableCell>{bill.customerName}</TableCell>
                      <TableCell className="font-semibold">${bill.amount}</TableCell>
                      <TableCell>
                        <Badge variant={bill.status === 'paid' ? 'default' : 'secondary'}>
                          {bill.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {bill.dueDate ? new Date(bill.dueDate).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell>
                        {new Date(bill.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <EditBillDialog bill={bill} onBillUpdated={handleBillUpdated} />
                          <DeleteBillButton bill={bill} onBillDeleted={handleBillDeleted} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No bills yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by creating your first customer bill
                </p>
                <AddBillDialog onBillAdded={handleBillAdded} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}