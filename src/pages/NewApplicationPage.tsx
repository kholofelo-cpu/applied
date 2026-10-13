import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Stage } from "../types";
import { useApplications } from "../hooks/useApplications";
import { STAGES, STAGE_LABELS, todayISO } from "../lib/applications";

type FormValues = {
  company: string;
  role: string;
  link: string;
  dateSent: string;
  stage: Stage;
  notes: string;
};

// The native select and textarea keep a plain style that matches the shadcn inputs.
const nativeClass =
  "w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

// Draws an error message under a field, or nothing if there is no error.
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-sm text-red-700 dark:text-red-400">
      {message}
    </p>
  );
}

export function NewApplicationPage() {
  const navigate = useNavigate();
  const { add } = useApplications();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      company: "",
      role: "",
      link: "",
      dateSent: todayISO(),
      stage: "wishlist",
      notes: "",
    },
  });

  // useRef on a DOM node: focus the first field when the form opens.
  // register() already hands us a ref, so we pass the element to both.
  const { ref: companyRef, ...companyField } = register("company", {
    validate: (v) => v.trim().length >= 2 || "Company is required",
  });
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  // Only runs when every rule passes.
  async function onSubmit(values: FormValues) {
    await add({
      company: values.company.trim(),
      role: values.role.trim(),
      link: values.link.trim() || undefined,
      dateSent: values.dateSent,
      stage: values.stage,
      notes: values.notes.trim() || undefined,
    });
    navigate("/");
  }

  return (
    <main className="mx-auto max-w-xl space-y-4 p-4">
      <Link to="/" className="text-sm underline">
        ← Back to all applications
      </Link>
      <h1 className="text-2xl font-bold">Add an application</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            type="text"
            aria-invalid={errors.company ? "true" : "false"}
            aria-describedby={errors.company ? "company-error" : undefined}
            {...companyField}
            ref={(el) => {
              companyRef(el);
              firstFieldRef.current = el;
            }}
          />
          <FieldError id="company-error" message={errors.company?.message} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="role">Job title</Label>
          <Input
            id="role"
            type="text"
            aria-invalid={errors.role ? "true" : "false"}
            aria-describedby={errors.role ? "role-error" : undefined}
            {...register("role", {
              validate: (v) => v.trim().length >= 2 || "Job title is required",
            })}
          />
          <FieldError id="role-error" message={errors.role?.message} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="link">Link to the advert (optional)</Label>
          <Input
            id="link"
            type="text"
            placeholder="https://careers.example.com/…"
            aria-invalid={errors.link ? "true" : "false"}
            aria-describedby={errors.link ? "link-error" : undefined}
            {...register("link", {
              validate: (v) => {
                if (v.trim() === "") return true;
                try {
                  const url = new URL(v.trim());
                  return (
                    url.protocol === "http:" ||
                    url.protocol === "https:" ||
                    "That does not look like a link"
                  );
                } catch {
                  return "That does not look like a link";
                }
              },
            })}
          />
          <FieldError id="link-error" message={errors.link?.message} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="dateSent">Date sent</Label>
            <Input
              id="dateSent"
              type="date"
              aria-invalid={errors.dateSent ? "true" : "false"}
              aria-describedby={errors.dateSent ? "dateSent-error" : undefined}
              {...register("dateSent", {
                validate: (v) => {
                  if (!v) return "Date sent is required";
                  return v <= todayISO() || "You cannot have sent it tomorrow";
                },
              })}
            />
            <FieldError id="dateSent-error" message={errors.dateSent?.message} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="stage">Stage</Label>
            <select id="stage" className={nativeClass} {...register("stage")}>
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {STAGE_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes (optional)</Label>
          <textarea id="notes" rows={3} className={nativeClass} {...register("notes")} />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : "Save application"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </form>
    </main>
  );
}