"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { CONTACT_EMAIL, INSTAGRAM_URL } from "@/data/band";

export default function ContactForm(): ReactNode {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setStatus("loading");

    const form: HTMLFormElement = e.currentTarget;
    const data: FormData = new FormData(form);

    try {
      const res: Response = await fetch("https://formspree.io/f/mdarjrbb", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <div className="cta-badge mb-4">
        ¿Querés contratarnos para tu evento o local? Envíanos un correo a{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </div>

      <div className="mt-4 text-start" style={{ maxWidth: 500, margin: "0 auto" }}>
        {status === "success" ? (
          <Alert variant="success" className="text-center">
            ¡Mensaje enviado con éxito! Te responderemos a la brevedad.
          </Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="glow-sm text-muted">Nombre</Form.Label>
              <Form.Control type="text" name="name" required className="form-control-focus-white bg-dark text-white border-brand" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="glow-sm text-muted">Email</Form.Label>
              <Form.Control type="email" name="email" required className="form-control-focus-white bg-dark text-white border-brand" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="glow-sm text-muted">Mensaje</Form.Label>
              <Form.Control as="textarea" name="message" rows={4} required className="form-control-focus-white bg-dark text-white border-brand" />
            </Form.Group>
            <Button type="submit" variant="light" className="w-100 glow-hover text-dark" disabled={status === "loading"}>
              {status === "loading" ? "Enviando..." : "Enviar"}
            </Button>
            {status === "error" && (
              <Alert variant="danger" className="mt-3 mb-0">
                Hubo un error al enviar el mensaje. Intentalo de nuevo.
              </Alert>
            )}
          </Form>
        )}
      </div>

      <p className="text-muted mt-4">
        o mandanos un mensaje a nuestro{" "}
        <a href={INSTAGRAM_URL} className="text-brand" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>.
      </p>
    </>
  );
}
