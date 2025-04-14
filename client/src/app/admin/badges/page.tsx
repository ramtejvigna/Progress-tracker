"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Medal, Plus, RefreshCw } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  pointsRequired: number;
}

export default function BadgesPage() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [addingBadge, setAddingBadge] = useState(false);
  
  const [newBadge, setNewBadge] = useState({
    name: "",
    description: "",
    imageUrl: "https://api.dicebear.com/6.x/shapes/svg?seed=badge",
    pointsRequired: 100,
  });

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    setRefreshing(true);
    try {
      const response = await fetch("/api/badges");
      if (!response.ok) {
        throw new Error("Failed to fetch badges");
      }
      const data = await response.json();
      setBadges(data.badges);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching badges");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleAddBadge = async () => {
    setAddingBadge(true);
    try {
      const response = await fetch("/api/badges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBadge),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to add badge");
      }

      // Reset form and refresh data
      setNewBadge({
        name: "",
        description: "",
        imageUrl: "https://api.dicebear.com/6.x/shapes/svg?seed=badge",
        pointsRequired: 100,
      });
      fetchBadges();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while adding badge");
    } finally {
      setAddingBadge(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Badge Management</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={fetchBadges} disabled={refreshing}>
            {refreshing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span className="ml-2">Refresh</span>
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Badges</CardTitle>
            <CardDescription>
              Create and manage badges for student achievements
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Badge
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Badge</DialogTitle>
                <DialogDescription>
                  Create a new badge that students can earn based on points.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="badgeName">Badge Name</Label>
                  <Input
                    id="badgeName"
                    type="text"
                    placeholder="e.g., Lab Master"
                    value={newBadge.name}
                    onChange={(e) => setNewBadge({ ...newBadge, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="badgeDescription">Description</Label>
                  <Input
                    id="badgeDescription"
                    type="text"
                    placeholder="e.g., Awarded for attending 10 lab sessions"
                    value={newBadge.description}
                    onChange={(e) => setNewBadge({ ...newBadge, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="badgeImageUrl">Image URL</Label>
                  <Input
                    id="badgeImageUrl"
                    type="text"
                    placeholder="URL to badge image"
                    value={newBadge.imageUrl}
                    onChange={(e) => setNewBadge({ ...newBadge, imageUrl: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="badgePoints">Points Required</Label>
                  <Input
                    id="badgePoints"
                    type="number"
                    min="1"
                    value={newBadge.pointsRequired}
                    onChange={(e) => setNewBadge({ ...newBadge, pointsRequired: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  onClick={handleAddBadge} 
                  disabled={addingBadge || !newBadge.name || !newBadge.description}
                >
                  {addingBadge ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Badge"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Badge</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Points Required</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {badges.length > 0 ? (
                  badges.map((badge) => (
                    <TableRow key={badge.id}>
                      <TableCell>
                        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                          <Medal className="h-5 w-5 text-primary" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{badge.name}</TableCell>
                      <TableCell>{badge.description}</TableCell>
                      <TableCell>{badge.pointsRequired} points</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No badges found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}