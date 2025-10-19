import type { Express } from "express";
import { db } from "../db";
import { applications, submissions, jobPostings } from "@db/schema";
import { eq, and, desc, sql } from "drizzle-orm";

export async function registerRoutes(app: Express) {
  // Get all applications for the current user
  app.get("/api/applications", async (req, res) => {
    try {
      const allApplications = await db
        .select()
        .from(applications)
        .orderBy(desc(applications.dateApplied));
      res.json(allApplications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  // Get a single application by ID
  app.get("/api/applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const application = await db
        .select()
        .from(applications)
        .where(eq(applications.id, id))
        .limit(1);

      if (application.length === 0) {
        return res.status(404).json({ error: "Application not found" });
      }

      res.json(application[0]);
    } catch (error) {
      console.error("Error fetching application:", error);
      res.status(500).json({ error: "Failed to fetch application" });
    }
  });

  // Create a new application
  app.post("/api/applications", async (req, res) => {
    try {
      const newApplication = await db
        .insert(applications)
        .values(req.body)
        .returning();
      res.status(201).json(newApplication[0]);
    } catch (error) {
      console.error("Error creating application:", error);
      res.status(500).json({ error: "Failed to create application" });
    }
  });

  // Update an application
  app.put("/api/applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedApplication = await db
        .update(applications)
        .set(req.body)
        .where(eq(applications.id, id))
        .returning();

      if (updatedApplication.length === 0) {
        return res.status(404).json({ error: "Application not found" });
      }

      res.json(updatedApplication[0]);
    } catch (error) {
      console.error("Error updating application:", error);
      res.status(500).json({ error: "Failed to update application" });
    }
  });

  // Delete an application
  app.delete("/api/applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deletedApplication = await db
        .delete(applications)
        .where(eq(applications.id, id))
        .returning();

      if (deletedApplication.length === 0) {
        return res.status(404).json({ error: "Application not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting application:", error);
      res.status(500).json({ error: "Failed to delete application" });
    }
  });

  // Get all submissions for a specific application
  app.get("/api/applications/:applicationId/submissions", async (req, res) => {
    try {
      const applicationId = parseInt(req.params.applicationId);
      const allSubmissions = await db
        .select()
        .from(submissions)
        .where(eq(submissions.applicationId, applicationId))
        .orderBy(desc(submissions.submittedAt));
      res.json(allSubmissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  // Create a new submission
  app.post("/api/submissions", async (req, res) => {
    try {
      const newSubmission = await db
        .insert(submissions)
        .values(req.body)
        .returning();
      res.status(201).json(newSubmission[0]);
    } catch (error) {
      console.error("Error creating submission:", error);
      res.status(500).json({ error: "Failed to create submission" });
    }
  });

  // Update a submission
  app.put("/api/submissions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedSubmission = await db
        .update(submissions)
        .set(req.body)
        .where(eq(submissions.id, id))
        .returning();

      if (updatedSubmission.length === 0) {
        return res.status(404).json({ error: "Submission not found" });
      }

      res.json(updatedSubmission[0]);
    } catch (error) {
      console.error("Error updating submission:", error);
      res.status(500).json({ error: "Failed to update submission" });
    }
  });

  // Delete a submission
  app.delete("/api/submissions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deletedSubmission = await db
        .delete(submissions)
        .where(eq(submissions.id, id))
        .returning();

      if (deletedSubmission.length === 0) {
        return res.status(404).json({ error: "Submission not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting submission:", error);
      res.status(500).json({ error: "Failed to delete submission" });
    }
  });

  // Get all job postings for a specific application
  app.get("/api/applications/:applicationId/postings", async (req, res) => {
    try {
      const applicationId = parseInt(req.params.applicationId);
      const allPostings = await db
        .select()
        .from(jobPostings)
        .where(eq(jobPostings.applicationId, applicationId))
        .orderBy(desc(jobPostings.postedDate));
      res.json(allPostings);
    } catch (error) {
      console.error("Error fetching job postings:", error);
      res.status(500).json({ error: "Failed to fetch job postings" });
    }
  });

  // Create a new job posting
  app.post("/api/postings", async (req, res) => {
    try {
      const newPosting = await db
        .insert(jobPostings)
        .values(req.body)
        .returning();
      res.status(201).json(newPosting[0]);
    } catch (error) {
      console.error("Error creating job posting:", error);
      res.status(500).json({ error: "Failed to create job posting" });
    }
  });

  // Update a job posting
  app.put("/api/postings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedPosting = await db
        .update(jobPostings)
        .set(req.body)
        .where(eq(jobPostings.id, id))
        .returning();

      if (updatedPosting.length === 0) {
        return res.status(404).json({ error: "Job posting not found" });
      }

      res.json(updatedPosting[0]);
    } catch (error) {
      console.error("Error updating job posting:", error);
      res.status(500).json({ error: "Failed to update job posting" });
    }
  });

  // Delete a job posting
  app.delete("/api/postings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deletedPosting = await db
        .delete(jobPostings)
        .where(eq(jobPostings.id, id))
        .returning();

      if (deletedPosting.length === 0) {
        return res.status(404).json({ error: "Job posting not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting job posting:", error);
      res.status(500).json({ error: "Failed to delete job posting" });
    }
  });

  // Get statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await db
        .select({
          totalApplications: sql<number>`count(*)`,
          activeApplications: sql<number>`count(*) filter (where ${applications.status} = 'active')`,
          pendingApplications: sql<number>`count(*) filter (where ${applications.status} = 'pending')`,
          rejectedApplications: sql<number>`count(*) filter (where ${applications.status} = 'rejected')`,
        })
        .from(applications);

      res.json(stats[0]);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  });
}