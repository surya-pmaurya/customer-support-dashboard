import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useTicketStore } from "../store/ticketStore";

const initialForm = {
  customerName: "",
  customerEmail: "",
  subject: "",
  description: "",
  priority: "Medium",
  status: "Open",
};

export default function NewTicketModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const createTicket = useTicketStore((state) => state.createTicket);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const closeModal = () => {
    if (submitting) return;

    setIsOpen(false);
    setForm(initialForm);
    setFormError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormError("");

    if (
      !form.customerName.trim() ||
      !form.customerEmail.trim() ||
      !form.subject.trim() ||
      !form.description.trim()
    ) {
      setFormError("Please complete all required fields.");
      return;
    }

    setSubmitting(true);

    const timestamp = new Date().toISOString();

    const result = await createTicket({
      id: String(Date.now()),

      customer: {
        name: form.customerName.trim(),
        email: form.customerEmail.trim(),
        avatar: "",
      },

      subject: form.subject.trim(),

      description: form.description.trim(),

      priority: form.priority,

      status: form.status,

      createdAt: timestamp,

      messages: [
        {
          id: `${Date.now()}-1`,
          sender: "customer",
          message: form.description.trim(),
          timestamp,
        },
      ],
    });

    setSubmitting(false);

    if (result.success) {
      setIsOpen(false);
      setForm(initialForm);
      setFormError("");
    } else {
      setFormError(result.message);
    }
  };

  return (
    <>
      {/* New Ticket Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        data-testid="new-ticket-button"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition-colors hover:bg-blue-500"
      >
        <Plus size={17} aria-hidden="true" />
        New Ticket
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] h-[100dvh] w-full overflow-hidden"
          role="presentation"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close new ticket form"
            className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Scroll Container */}
          <div className="relative z-10 flex h-full w-full items-center justify-center p-3 sm:p-6">
            {/* Modal Dialog */}
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="new-ticket-title"
              data-testid="new-ticket-modal"
              className="
  relative
  z-20
  flex
  h-auto
  max-h-[calc(100dvh-1.5rem)]
  w-full
  max-w-2xl
  flex-col
  overflow-hidden
  rounded-2xl
  border
  border-white/10
  bg-[#11141D]
  shadow-2xl
  shadow-black/60
  sm:max-h-[calc(100dvh-3rem)]
"
            >
              {/* Modal Header */}
              <div className="flex shrink-0 items-start justify-between border-b border-white/10 bg-[#11141D] p-5 sm:p-6">
                <div className="pr-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">
                    Support workspace
                  </p>

                  <h2
                    id="new-ticket-title"
                    className="mt-2 text-xl font-bold text-slate-50"
                  >
                    Create new ticket
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Add a customer request to the support queue.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="shrink-0 rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                  aria-label="Close"
                >
                  <X size={21} aria-hidden="true" />
                </button>
              </div>

              {/* Scrollable Form Area */}
              <form
                onSubmit={handleSubmit}
                className="
    min-h-0
    flex-1
    overflow-y-auto
    overscroll-contain
    p-5
    sm:p-6
    [-webkit-overflow-scrolling:touch]
  "
              >
                <div className="space-y-5">
                  {/* Form Error */}
                  {formError && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      {formError}
                    </div>
                  )}

                  {/* Customer Details */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-medium text-slate-200">
                        Customer name *
                      </span>

                      <input
                        name="customerName"
                        value={form.customerName}
                        onChange={updateField}
                        data-testid="input-customer-name"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#1E2333] px-3 py-2.5 text-sm text-white placeholder:text-slate-500"
                        placeholder="Enter customer name"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-200">
                        Customer email *
                      </span>

                      <input
                        type="email"
                        name="customerEmail"
                        value={form.customerEmail}
                        onChange={updateField}
                        data-testid="input-customer-email"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#1E2333] px-3 py-2.5 text-sm text-white placeholder:text-slate-500"
                        placeholder="customer@example.com"
                      />
                    </label>
                  </div>

                  {/* Subject */}
                  <label className="block">
                    <span className="text-sm font-medium text-slate-200">
                      Ticket subject *
                    </span>

                    <input
                      name="subject"
                      value={form.subject}
                      onChange={updateField}
                      data-testid="input-subject"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#1E2333] px-3 py-2.5 text-sm text-white placeholder:text-slate-500"
                      placeholder="Briefly describe the issue"
                    />
                  </label>

                  {/* Priority and Status */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-medium text-slate-200">
                        Priority
                      </span>

                      <select
                        name="priority"
                        value={form.priority}
                        onChange={updateField}
                        data-testid="select-priority"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#1E2333] px-3 py-2.5 text-sm text-white"
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-200">
                        Initial status
                      </span>

                      <select
                        name="status"
                        value={form.status}
                        onChange={updateField}
                        data-testid="select-status"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#1E2333] px-3 py-2.5 text-sm text-white"
                      >
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                      </select>
                    </label>
                  </div>

                  {/* Description */}
                  <label className="block">
                    <span className="text-sm font-medium text-slate-200">
                      Description *
                    </span>

                    <textarea
                      name="description"
                      value={form.description}
                      onChange={updateField}
                      data-testid="textarea-description"
                      rows="5"
                      className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-[#1E2333] px-3 py-2.5 text-sm text-white placeholder:text-slate-500"
                      placeholder="Describe the issue in detail..."
                    />
                  </label>

                  {/* Action Buttons */}
                  <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      data-testid="submit-ticket-button"
                      className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? "Creating..." : "Create Ticket"}
                    </button>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
