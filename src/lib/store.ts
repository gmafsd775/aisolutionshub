import { Workflow } from "./types";

const WORKFLOWS_KEY = "ahmed_n8n_workflows";
const AUTH_KEY = "ahmed_n8n_auth";

const SAMPLE_WORKFLOWS: Workflow[] = [
  {
    id: "1",
    title: "Lead Generation Automation",
    description: "Automatically capture leads from multiple sources, enrich data, and push to your CRM. Saves 10+ hours per week.",
    price: 49,
    imageUrl: "",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Email Campaign Workflow",
    description: "Smart email sequences triggered by user behavior. Includes A/B testing and analytics integration.",
    price: 79,
    imageUrl: "",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Social Media Auto-Poster",
    description: "Schedule and auto-publish content across Twitter, LinkedIn, and Instagram with AI-generated captions.",
    price: 59,
    imageUrl: "",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Invoice & Payment Tracker",
    description: "Automate invoice generation, payment reminders, and financial reporting with Stripe/PayPal integration.",
    price: 99,
    imageUrl: "",
    createdAt: new Date().toISOString(),
  },
];

export function getWorkflows(): Workflow[] {
  const stored = localStorage.getItem(WORKFLOWS_KEY);
  if (!stored) {
    localStorage.setItem(WORKFLOWS_KEY, JSON.stringify(SAMPLE_WORKFLOWS));
    return SAMPLE_WORKFLOWS;
  }
  return JSON.parse(stored);
}

export function saveWorkflow(workflow: Workflow): void {
  const workflows = getWorkflows();
  workflows.push(workflow);
  localStorage.setItem(WORKFLOWS_KEY, JSON.stringify(workflows));
}

export function updateWorkflow(id: string, updates: Partial<Workflow>): void {
  const workflows = getWorkflows();
  const index = workflows.findIndex((w) => w.id === id);
  if (index !== -1) {
    workflows[index] = { ...workflows[index], ...updates };
    localStorage.setItem(WORKFLOWS_KEY, JSON.stringify(workflows));
  }
}

export function deleteWorkflow(id: string): void {
  const workflows = getWorkflows().filter((w) => w.id !== id);
  localStorage.setItem(WORKFLOWS_KEY, JSON.stringify(workflows));
}

export function getWorkflowById(id: string): Workflow | undefined {
  return getWorkflows().find((w) => w.id === id);
}

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function login(username: string, password: string): boolean {
  if (username === "Ahmed577" && password === "Tahzarusm@577") {
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}
